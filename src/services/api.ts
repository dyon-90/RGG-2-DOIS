/**
 * Camada de API e Comunicação com o Backend / Banco de Dados na Nuvem
 * 
 * Fornece métodos tipados para consumo do front-end, desacoplando
 * completamente os componentes visuais dos detalhes de infraestrutura.
 */

import {
  COLLECTIONS,
  fetchCloudAppData,
  saveCloudItem,
  deleteCloudItem,
  subscribeToCloudAppData,
  seedCloudDatabaseIfEmpty,
  resetCloudDatabaseToDefaults,
  clearCloudDatabase,
  batchImportToCloud,
  testCloudConnection
} from './cloudDb';
import { School, ClassRoom, Student, Activity, Grade, Post, AcademicEvent, AdminUser, AppData } from '../types';

export const api = {
  /**
   * Testa a conectividade com o banco de dados remoto.
   */
  async checkHealth(): Promise<boolean> {
    return testCloudConnection();
  },

  /**
   * Obtém todos os dados da nuvem.
   */
  async getAppData(): Promise<AppData> {
    return fetchCloudAppData();
  },

  /**
   * Assina atualizações em tempo real do banco de dados na nuvem.
   */
  subscribe(onData: (data: AppData) => void, onError: (err: Error) => void) {
    return subscribeToCloudAppData(onData, onError);
  },

  /**
   * Garante a população inicial da base se estiver vazia no primeiro uso.
   */
  async seedIfEmpty(): Promise<boolean> {
    return seedCloudDatabaseIfEmpty();
  },

  // Escolas
  async saveSchool(school: School): Promise<void> {
    return saveCloudItem(COLLECTIONS.SCHOOLS, school);
  },
  async deleteSchool(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.SCHOOLS, entityId);
  },

  // Turmas
  async saveClass(cls: ClassRoom): Promise<void> {
    return saveCloudItem(COLLECTIONS.CLASSES, cls);
  },
  async deleteClass(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.CLASSES, entityId);
  },

  // Alunos
  async saveStudent(student: Student): Promise<void> {
    return saveCloudItem(COLLECTIONS.STUDENTS, student);
  },
  async deleteStudent(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.STUDENTS, entityId);
  },

  // Atividades
  async saveActivity(activity: Activity): Promise<void> {
    return saveCloudItem(COLLECTIONS.ACTIVITIES, activity);
  },
  async deleteActivity(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.ACTIVITIES, entityId);
  },

  // Notas
  async saveGrade(grade: Grade): Promise<void> {
    return saveCloudItem(COLLECTIONS.GRADES, grade);
  },
  async deleteGrade(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.GRADES, entityId);
  },

  // Mural de Avisos
  async savePost(post: Post): Promise<void> {
    return saveCloudItem(COLLECTIONS.POSTS, post);
  },
  async deletePost(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.POSTS, entityId);
  },

  // Calendário Acadêmico
  async saveEvent(event: AcademicEvent): Promise<void> {
    return saveCloudItem(COLLECTIONS.EVENTS, event);
  },
  async deleteEvent(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.EVENTS, entityId);
  },

  // Administradores
  async saveAdmin(admin: AdminUser): Promise<void> {
    return saveCloudItem(COLLECTIONS.ADMINS, admin);
  },
  async deleteAdmin(entityId: string): Promise<void> {
    return deleteCloudItem(COLLECTIONS.ADMINS, entityId);
  },

  // Gestão Global do Banco
  async resetToDefaults(): Promise<void> {
    return resetCloudDatabaseToDefaults();
  },

  async clearAll(currentAdmins?: AdminUser[]): Promise<void> {
    return clearCloudDatabase(currentAdmins);
  },

  async importBackup(data: Partial<AppData>): Promise<number> {
    return batchImportToCloud(data);
  }
};
