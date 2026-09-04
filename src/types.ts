export interface School {
  entity_id: string;
  school_name: string;
  school_city: string;
  school_contact?: string;
  created_at: string;
}

export interface ClassRoom {
  entity_id: string;
  class_name: string;
  class_school_id: string;
  class_school_name: string;
  class_teacher: string;
  created_at: string;
}

export interface Student {
  entity_id: string;
  student_name: string;
  student_email: string; // Used as Login
  student_class_id: string;
  student_class_name: string;
  student_matricula: string; // Used as Password
  created_at: string;
}

export interface Activity {
  entity_id: string;
  activity_name: string;
  activity_class_id: string;
  activity_class_name: string;
  activity_discipline: string; // e.g., "Português" | "Matemática"
  activity_due_date: string;
  activity_description?: string;
  activity_link?: string;
  activity_embed_url?: string;
  created_at: string;
}

export interface Grade {
  entity_id: string;
  grade_student_id: string;
  grade_student_name: string;
  grade_activity_id: string;
  grade_activity_name: string;
  grade_value: number;
  grade_feedback?: string;
  grade_date: string;
  created_at: string;
}

export interface Post {
  entity_id: string;
  post_content: string;
  post_author_id: string;
  post_author_name: string;
  post_author_type: 'admin' | 'student';
  post_class_id?: string;
  post_is_pinned: boolean;
  post_parent_id?: string;
  post_link?: string;
  post_image?: string;
  post_created_at: string;
  created_at: string;
}

export type AcademicEventType = 'exam' | 'holiday' | 'deadline' | 'event' | 'meeting';

export interface AcademicEvent {
  entity_id: string;
  title: string;
  date: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  type: AcademicEventType;
  description?: string;
  discipline?: string;
  class_id?: string;
  class_name?: string;
  school_id?: string;
  location?: string;
  created_at: string;
}

export interface AdminUser {
  entity_id: string;
  username: string; // Login de acesso (ex: dyon.gomes)
  password: string; // Senha de acesso
  name: string; // Nome completo do administrador
  email?: string;
  role?: string; // Cargo/função (ex: Administrador Geral, Coordenador Pedagógico)
  created_at: string;
}

export interface AppData {
  schools: School[];
  classes: ClassRoom[];
  students: Student[];
  activities: Activity[];
  grades: Grade[];
  posts: Post[];
  events?: AcademicEvent[];
  admins?: AdminUser[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
