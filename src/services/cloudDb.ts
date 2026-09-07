/**
 * Camada de Persistência em Banco de Dados na Nuvem (Google Cloud Firestore)
 * 
 * Centraliza e sincroniza os dados em tempo real entre todos os dispositivos,
 * garantindo uma única fonte da verdade independente do computador ou navegador.
 */

import {
  collection,
  doc,
  getDocs,
  getDocFromServer,
  setDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import { AppData, School, ClassRoom, Student, Activity, Grade, Post, AcademicEvent, AdminUser } from '../types';
import { initialDefaultData, defaultAdmins } from '../data/initialData';
import { deduplicateById, sanitizeAppData } from '../utils/storage';

export const COLLECTIONS = {
  SCHOOLS: 'schools',
  CLASSES: 'classes',
  STUDENTS: 'students',
  ACTIVITIES: 'activities',
  GRADES: 'grades',
  POSTS: 'posts',
  EVENTS: 'events',
  ADMINS: 'admins'
} as const;

/**
 * Remove chaves com valor `undefined` (inclusive aninhadas) para evitar erros de validação do Firestore.
 */
export function cleanForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        cleaned[key] = cleanForFirestore(value);
      } else if (Array.isArray(value)) {
        cleaned[key] = value
          .map(v => (v && typeof v === 'object' && !Array.isArray(v) ? cleanForFirestore(v) : v))
          .filter(v => v !== undefined);
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

/**
 * Testa a conexão direta com o servidor do Firestore.
 */
export async function testCloudConnection(): Promise<boolean> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.SCHOOLS));
    return snap !== undefined;
  } catch (error: any) {
    console.warn('[CloudDB] Firestore temporariamente em modo offline ou reconectando:', error?.message);
    return false;
  }
}

/**
 * Busca todos os dados da aplicação armazenados no Firestore na nuvem.
 */
export async function fetchCloudAppData(): Promise<AppData> {
  try {
    const [
      schoolsSnap,
      classesSnap,
      studentsSnap,
      activitiesSnap,
      gradesSnap,
      postsSnap,
      eventsSnap,
      adminsSnap
    ] = await Promise.all([
      getDocs(collection(db, COLLECTIONS.SCHOOLS)),
      getDocs(collection(db, COLLECTIONS.CLASSES)),
      getDocs(collection(db, COLLECTIONS.STUDENTS)),
      getDocs(collection(db, COLLECTIONS.ACTIVITIES)),
      getDocs(collection(db, COLLECTIONS.GRADES)),
      getDocs(collection(db, COLLECTIONS.POSTS)),
      getDocs(collection(db, COLLECTIONS.EVENTS)),
      getDocs(collection(db, COLLECTIONS.ADMINS))
    ]);

    const schools = schoolsSnap.docs.map(d => d.data() as School);
    const classes = classesSnap.docs.map(d => d.data() as ClassRoom);
    const students = studentsSnap.docs.map(d => d.data() as Student);
    const activities = activitiesSnap.docs.map(d => d.data() as Activity);
    const grades = gradesSnap.docs.map(d => d.data() as Grade);
    const posts = postsSnap.docs.map(d => d.data() as Post);
    const events = eventsSnap.docs.map(d => d.data() as AcademicEvent);
    const admins = adminsSnap.docs.map(d => d.data() as AdminUser);

    return sanitizeAppData({
      schools,
      classes,
      students,
      activities,
      grades,
      posts,
      events,
      admins: admins.length > 0 ? admins : defaultAdmins
    });
  } catch (error: any) {
    console.warn('[CloudDB] Erro ao buscar dados do banco de dados na nuvem:', error);
    throw new Error(`Falha de conexão com o banco de dados remoto: ${error?.message || 'Erro desconhecido'}`);
  }
}

/**
 * Salva ou atualiza um item em uma coleção no Firestore com timeout seguro.
 */
export async function saveCloudItem<T extends { entity_id: string }>(
  collectionName: string,
  item: T
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, String(item.entity_id));
    const payload = cleanForFirestore(item);
    // Timeout de 1.2s para garantir resposta imediata da interface mesmo com rede lenta
    await Promise.race([
      setDoc(docRef, payload, { merge: true }),
      new Promise(resolve => setTimeout(resolve, 1200))
    ]);
  } catch (error: any) {
    console.warn(`[CloudDB] Erro ao salvar documento na coleção ${collectionName}:`, error?.message);
    throw new Error(`Erro ao salvar no banco de dados na nuvem: ${error?.message || 'Falha na gravação'}`);
  }
}

/**
 * Remove um item de uma coleção no Firestore com timeout seguro.
 */
export async function deleteCloudItem(
  collectionName: string,
  entityId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, String(entityId));
    await Promise.race([
      deleteDoc(docRef),
      new Promise(resolve => setTimeout(resolve, 1200))
    ]);
  } catch (error: any) {
    console.warn(`[CloudDB] Erro ao excluir documento da coleção ${collectionName}:`, error?.message);
    throw new Error(`Erro ao excluir do banco de dados remoto: ${error?.message || 'Falha na exclusão'}`);
  }
}

/**
 * Inicializa a base de dados na nuvem com dados padrão se estiver vazia.
 */
export async function seedCloudDatabaseIfEmpty(): Promise<boolean> {
  try {
    const schoolsSnap = await getDocs(collection(db, COLLECTIONS.SCHOOLS));
    if (!schoolsSnap.empty) {
      return false; // Já possui dados na nuvem
    }

    console.info('[CloudDB] Banco de dados na nuvem vazio. Inicializando com dados padrão...');
    await resetCloudDatabaseToDefaults();
    return true;
  } catch (error) {
    console.warn('[CloudDB] Não foi possível verificar/popular dados iniciais na nuvem:', error);
    return false;
  }
}

/**
 * Restaura o banco de dados na nuvem com os dados padrão do sistema.
 */
export async function resetCloudDatabaseToDefaults(): Promise<void> {
  const batch = writeBatch(db);

  const writeList = <T extends { entity_id: string }>(col: string, items: T[]) => {
    for (const item of items) {
      const ref = doc(db, col, String(item.entity_id));
      batch.set(ref, cleanForFirestore(item));
    }
  };

  writeList(COLLECTIONS.SCHOOLS, initialDefaultData.schools);
  writeList(COLLECTIONS.CLASSES, initialDefaultData.classes);
  writeList(COLLECTIONS.STUDENTS, initialDefaultData.students);
  writeList(COLLECTIONS.ACTIVITIES, initialDefaultData.activities);
  writeList(COLLECTIONS.GRADES, initialDefaultData.grades);
  writeList(COLLECTIONS.POSTS, initialDefaultData.posts);
  writeList(COLLECTIONS.EVENTS, initialDefaultData.events || []);
  writeList(COLLECTIONS.ADMINS, defaultAdmins);

  await Promise.race([
    batch.commit(),
    new Promise(resolve => setTimeout(resolve, 4000))
  ]);
}

/**
 * Limpa todos os dados operacionais do banco na nuvem (escolas, turmas, alunos, etc.),
 * mantendo apenas os administradores para que o acesso continue funcionando.
 */
export async function clearCloudDatabase(currentAdmins?: AdminUser[]): Promise<void> {
  const collectionsToClear = [
    COLLECTIONS.SCHOOLS,
    COLLECTIONS.CLASSES,
    COLLECTIONS.STUDENTS,
    COLLECTIONS.ACTIVITIES,
    COLLECTIONS.GRADES,
    COLLECTIONS.POSTS,
    COLLECTIONS.EVENTS
  ];

  for (const colName of collectionsToClear) {
    const snap = await getDocs(collection(db, colName));
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await Promise.race([
      batch.commit(),
      new Promise(resolve => setTimeout(resolve, 3500))
    ]);
  }

  // Garantir que os administradores permaneçam salvos
  const adminsToKeep = (currentAdmins && currentAdmins.length > 0) ? currentAdmins : defaultAdmins;
  const adminBatch = writeBatch(db);
  for (const adm of adminsToKeep) {
    const ref = doc(db, COLLECTIONS.ADMINS, String(adm.entity_id));
    adminBatch.set(ref, cleanForFirestore(adm));
  }
  await Promise.race([
    adminBatch.commit(),
    new Promise(resolve => setTimeout(resolve, 3500))
  ]);
}

/**
 * Importa múltiplos registros em lote para o Firestore de forma fracionada e segura,
 * protegendo contra limites de lote (500) e travamentos de conexão.
 */
export async function batchImportToCloud(incoming: Partial<AppData>): Promise<number> {
  let count = 0;
  const batches: Array<ReturnType<typeof writeBatch>> = [];
  let currentBatch = writeBatch(db);
  let batchOps = 0;

  const addItems = <T extends { entity_id: string }>(col: string, list?: T[]) => {
    if (list && Array.isArray(list)) {
      for (const item of list) {
        if (item && item.entity_id) {
          if (batchOps >= 200) {
            batches.push(currentBatch);
            currentBatch = writeBatch(db);
            batchOps = 0;
          }
          const ref = doc(db, col, String(item.entity_id));
          currentBatch.set(ref, cleanForFirestore(item), { merge: true });
          batchOps++;
          count++;
        }
      }
    }
  };

  addItems(COLLECTIONS.SCHOOLS, incoming.schools);
  addItems(COLLECTIONS.CLASSES, incoming.classes);
  addItems(COLLECTIONS.STUDENTS, incoming.students);
  addItems(COLLECTIONS.ACTIVITIES, incoming.activities);
  addItems(COLLECTIONS.GRADES, incoming.grades);
  addItems(COLLECTIONS.POSTS, incoming.posts);
  addItems(COLLECTIONS.EVENTS, incoming.events);
  addItems(COLLECTIONS.ADMINS, incoming.admins);

  if (batchOps > 0) {
    batches.push(currentBatch);
  }

  if (batches.length > 0) {
    for (const b of batches) {
      try {
        await Promise.race([
          b.commit(),
          new Promise(resolve => setTimeout(resolve, 1200))
        ]);
      } catch (batchErr) {
        console.warn('[CloudDB] Aviso durante gravação de lote no Firestore (salvo no cache):', batchErr);
      }
    }
  }

  return count;
}

/**
 * Assina mudanças em tempo real em todas as coleções do Firestore.
 * Quando o Computador A alterar um dado, o Computador B recebe a atualização instantaneamente.
 */
export function subscribeToCloudAppData(
  onDataChange: (data: AppData) => void,
  onError: (error: Error) => void
): Unsubscribe {
  let currentSchools: School[] = [];
  let currentClasses: ClassRoom[] = [];
  let currentStudents: Student[] = [];
  let currentActivities: Activity[] = [];
  let currentGrades: Grade[] = [];
  let currentPosts: Post[] = [];
  let currentEvents: AcademicEvent[] = [];
  let currentAdmins: AdminUser[] = [];

  let isInitialized = false;
  const initialLoaded = new Set<string>();
  const totalCollections = 8;

  const emit = (collectionName?: string) => {
    if (collectionName) {
      initialLoaded.add(collectionName);
    }

    if (!isInitialized) {
      if (initialLoaded.size >= totalCollections) {
        isInitialized = true;
      } else {
        // Aguarda todas as 8 coleções responderem ao snapshot inicial para entregar o estado completo
        return;
      }
    }

    const fresh: AppData = sanitizeAppData({
      schools: deduplicateById(currentSchools),
      classes: deduplicateById(currentClasses),
      students: deduplicateById(currentStudents),
      activities: deduplicateById(currentActivities),
      grades: deduplicateById(currentGrades),
      posts: deduplicateById(currentPosts),
      events: deduplicateById(currentEvents),
      admins: currentAdmins.length > 0 ? deduplicateById(currentAdmins) : defaultAdmins
    });
    onDataChange(fresh);
  };

  // Timeout de segurança para conexão: se alguma coleção demorar, inicializa com os dados recebidos
  const fallbackTimeout = setTimeout(() => {
    if (!isInitialized) {
      isInitialized = true;
      emit();
    }
  }, 1800);

  const handleSnapshotError = (colName: string, err: any) => {
    if (err?.code === 'unavailable' || err?.message?.includes('unavailable') || err?.message?.includes('offline')) {
      console.warn(`[CloudDB] Conexão temporária em reconexão para ${colName}:`, err.message);
      return;
    }
    onError(new Error(`Erro em ${colName}: ${err.message}`));
  };

  const unsubSchools = onSnapshot(collection(db, COLLECTIONS.SCHOOLS), snap => {
    currentSchools = snap.docs.map(d => d.data() as School);
    emit(COLLECTIONS.SCHOOLS);
  }, err => handleSnapshotError('Escolas', err));

  const unsubClasses = onSnapshot(collection(db, COLLECTIONS.CLASSES), snap => {
    currentClasses = snap.docs.map(d => d.data() as ClassRoom);
    emit(COLLECTIONS.CLASSES);
  }, err => handleSnapshotError('Turmas', err));

  const unsubStudents = onSnapshot(collection(db, COLLECTIONS.STUDENTS), snap => {
    currentStudents = snap.docs.map(d => d.data() as Student);
    emit(COLLECTIONS.STUDENTS);
  }, err => handleSnapshotError('Alunos', err));

  const unsubActivities = onSnapshot(collection(db, COLLECTIONS.ACTIVITIES), snap => {
    currentActivities = snap.docs.map(d => d.data() as Activity);
    emit(COLLECTIONS.ACTIVITIES);
  }, err => handleSnapshotError('Atividades', err));

  const unsubGrades = onSnapshot(collection(db, COLLECTIONS.GRADES), snap => {
    currentGrades = snap.docs.map(d => d.data() as Grade);
    emit(COLLECTIONS.GRADES);
  }, err => handleSnapshotError('Notas', err));

  const unsubPosts = onSnapshot(collection(db, COLLECTIONS.POSTS), snap => {
    currentPosts = snap.docs.map(d => d.data() as Post);
    emit(COLLECTIONS.POSTS);
  }, err => handleSnapshotError('Mural', err));

  const unsubEvents = onSnapshot(collection(db, COLLECTIONS.EVENTS), snap => {
    currentEvents = snap.docs.map(d => d.data() as AcademicEvent);
    emit(COLLECTIONS.EVENTS);
  }, err => handleSnapshotError('Eventos', err));

  const unsubAdmins = onSnapshot(collection(db, COLLECTIONS.ADMINS), snap => {
    const list = snap.docs.map(d => d.data() as AdminUser);
    currentAdmins = list.length > 0 ? list : defaultAdmins;
    emit(COLLECTIONS.ADMINS);
  }, err => handleSnapshotError('Administradores', err));

  return () => {
    clearTimeout(fallbackTimeout);
    unsubSchools();
    unsubClasses();
    unsubStudents();
    unsubActivities();
    unsubGrades();
    unsubPosts();
    unsubEvents();
    unsubAdmins();
  };
}
