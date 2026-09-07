import { AppData, AdminUser } from '../types';
import { defaultAdmins } from '../data/initialData';

/**
 * Deduplica qualquer coleção pelo atributo único `entity_id`.
 */
export function deduplicateById<T extends { entity_id: string }>(items: T[] | undefined): T[] {
  if (!items || !Array.isArray(items)) return [];
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (item && item.entity_id) {
      if (!seen.has(item.entity_id)) {
        seen.add(item.entity_id);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Higieniza e garante a integridade dos dados da aplicação compartilhados na nuvem.
 */
export function sanitizeAppData(raw: any): AppData {
  if (!raw || typeof raw !== 'object') {
    return {
      schools: [],
      classes: [],
      students: [],
      activities: [],
      grades: [],
      posts: [],
      events: [],
      admins: defaultAdmins
    };
  }

  const rawAdmins = deduplicateById<AdminUser>(raw.admins).filter(
    (a): a is AdminUser => Boolean(a && a.username && a.password && a.name)
  );

  const sanitizedGrades = deduplicateById(raw.grades).map((g: any) => ({
    ...g,
    grade_student_id: g.grade_student_id || '',
    grade_student_name: g.grade_student_name || 'Aluno',
    grade_activity_id: g.grade_activity_id || '',
    grade_activity_name: g.grade_activity_name || 'Atividade',
    grade_value: typeof g.grade_value === 'number' && !isNaN(g.grade_value)
      ? g.grade_value
      : (!isNaN(Number(g.grade_value)) && g.grade_value !== null && g.grade_value !== '' ? Number(g.grade_value) : 0),
    grade_date: g.grade_date || new Date().toISOString()
  }));

  return {
    schools: deduplicateById(raw.schools),
    classes: deduplicateById(raw.classes),
    students: deduplicateById(raw.students),
    activities: deduplicateById(raw.activities),
    grades: sanitizedGrades,
    posts: deduplicateById(raw.posts),
    events: deduplicateById(raw.events),
    admins: rawAdmins && rawAdmins.length > 0 ? rawAdmins : defaultAdmins
  };
}

/**
 * Comprime um arquivo de imagem utilizando Canvas do navegador e exporta como Data URL JPEG.
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Falha ao processar o contexto 2D da imagem'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Falha ao decodificar a imagem'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Falha ao ler arquivo de imagem'));
    reader.readAsDataURL(file);
  });
}
