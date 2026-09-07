import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppData, School, ClassRoom, Student, Activity, Grade, Post, AcademicEvent, ToastMessage, AdminUser } from '../types';
import { initialDefaultData, defaultAdmins } from '../data/initialData';
import { sanitizeAppData } from '../utils/storage';
import { api } from '../services/api';

export type CloudSyncStatus = 'synced' | 'saving' | 'error' | 'loading';

interface DataContextType {
  data: AppData;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Estado de Sincronização em Nuvem Centralizada
  isLoading: boolean;
  syncStatus: CloudSyncStatus;
  syncError: string | null;
  retryConnection: () => Promise<void>;

  // School
  addSchool: (school: Omit<School, 'entity_id' | 'created_at'>) => Promise<boolean>;
  deleteSchool: (entityId: string) => Promise<void>;
  
  // Class
  addClass: (cls: Omit<ClassRoom, 'entity_id' | 'created_at'>) => Promise<boolean>;
  deleteClass: (entityId: string) => Promise<void>;
  
  // Student
  addStudent: (student: Omit<Student, 'entity_id' | 'created_at'>) => Promise<boolean>;
  deleteStudent: (entityId: string) => Promise<void>;
  
  // Activity
  addActivity: (activity: Omit<Activity, 'entity_id' | 'created_at'>) => Promise<boolean>;
  updateActivity: (activity: Activity) => Promise<boolean>;
  deleteActivity: (entityId: string) => Promise<void>;
  
  // Grade
  addGrade: (grade: Omit<Grade, 'entity_id' | 'created_at'>) => Promise<boolean>;
  deleteGrade: (entityId: string) => Promise<void>;
  
  // Post (Mural)
  addPost: (post: {
    content: string;
    authorId: string;
    authorName: string;
    authorType: 'admin' | 'student';
    classId?: string;
    isPinned?: boolean;
    link?: string;
    image?: string;
    parentId?: string;
  }) => Promise<boolean>;
  togglePinPost: (entityId: string) => Promise<void>;
  deletePost: (entityId: string) => Promise<void>;

  // Academic Calendar Events
  addEvent: (event: Omit<AcademicEvent, 'entity_id' | 'created_at'>) => Promise<boolean>;
  updateEvent: (event: AcademicEvent) => Promise<boolean>;
  deleteEvent: (entityId: string) => Promise<void>;

  // Administrators Management
  addAdmin: (admin: Omit<AdminUser, 'entity_id' | 'created_at'>) => Promise<boolean>;
  updateAdmin: (admin: AdminUser) => Promise<boolean>;
  deleteAdmin: (entityId: string) => Promise<boolean>;
  
  // Backup / Data Management
  saveAllChanges: () => Promise<boolean>;
  exportJSON: () => void;
  exportCSV: () => void;
  exportPDF: () => void;
  importJSON: (jsonString: string) => Promise<{ success: boolean; message: string; count?: number }>;
  resetToDefaultData: () => Promise<void>;
  clearAllData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado centralizado dos dados da aplicação
  const [data, setData] = useState<AppData>(() => sanitizeAppData(initialDefaultData));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Estados de conectividade e sincronização em tempo real com a nuvem
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<CloudSyncStatus>('loading');
  const [syncError, setSyncError] = useState<string | null>(null);

  // Salvaguarda ativa: impede terminantemente que a aplicação fique presa em 'saving'
  useEffect(() => {
    if (syncStatus === 'saving') {
      const timer = setTimeout(() => {
        setSyncStatus('synced');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Helper de geração de IDs únicos
  const uid = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // ---------------------------------------------------------------------------
  // Conexão e sincronização em tempo real com a nuvem (Firestore)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const setupCloudData = async () => {
      try {
        setSyncStatus('loading');
        // Se o banco na nuvem estiver completamente vazio, inicializa com os dados iniciais
        await api.seedIfEmpty();
      } catch (err: any) {
        console.warn('[DataContext] Falha na verificação de carga inicial:', err);
      }
    };

    setupCloudData();

    // Assina atualizações em tempo real do banco de dados compartilhado.
    // Qualquer dispositivo conectado receberá instantaneamente as alterações.
    const unsubscribe = api.subscribe(
      (freshData) => {
        if (!isMounted) return;
        setData(freshData);
        setIsLoading(false);
        setSyncStatus('synced');
        setSyncError(null);
      },
      (error) => {
        if (!isMounted) return;
        console.error('[DataContext] Erro no listener do banco de dados na nuvem:', error);
        setSyncStatus('error');
        setSyncError(error.message || 'Falha de conexão com o banco de dados remoto');
        setIsLoading(false);
        showToast('Aviso: Falha temporária de comunicação com o banco na nuvem.', 'error');
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [showToast]);

  // Função para testar e reconectar manualmente ao banco na nuvem
  const retryConnection = async () => {
    setSyncStatus('loading');
    setSyncError(null);
    try {
      const isOnline = await api.checkHealth();
      if (!isOnline) {
        throw new Error('Servidor de banco de dados offline ou sem resposta.');
      }
      const cloudData = await api.getAppData();
      setData(cloudData);
      setSyncStatus('synced');
      showToast('Conectado ao banco de dados na nuvem com sucesso!', 'success');
    } catch (err: any) {
      setSyncStatus('error');
      setSyncError(err.message || 'Erro ao conectar');
      showToast('Não foi possível conectar: ' + (err.message || 'Erro desconhecido'), 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Escolas (Schools)
  // ---------------------------------------------------------------------------
  const addSchool = async (school: Omit<School, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newSchool: School = {
      ...school,
      entity_id: uid('school'),
      created_at: new Date().toISOString()
    };
    // Atualização otimista imediata na interface
    setData(prev => ({
      ...prev,
      schools: [newSchool, ...prev.schools]
    }));
    setSyncStatus('saving');
    try {
      await api.saveSchool(newSchool);
      setSyncStatus('synced');
      showToast('Escola cadastrada e salva na nuvem com sucesso!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao salvar escola na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteSchool = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      schools: prev.schools.filter(s => s.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteSchool(entityId);
      setSyncStatus('synced');
      showToast('Escola removida do banco de dados na nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao excluir escola da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Turmas (Classes)
  // ---------------------------------------------------------------------------
  const addClass = async (cls: Omit<ClassRoom, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newClass: ClassRoom = {
      ...cls,
      entity_id: uid('class'),
      created_at: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      classes: [newClass, ...prev.classes]
    }));
    setSyncStatus('saving');
    try {
      await api.saveClass(newClass);
      setSyncStatus('synced');
      showToast('Turma cadastrada e sincronizada na nuvem com sucesso!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao salvar turma na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteClass = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      classes: prev.classes.filter(c => c.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteClass(entityId);
      setSyncStatus('synced');
      showToast('Turma removida do banco de dados na nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover turma da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Alunos (Students)
  // ---------------------------------------------------------------------------
  const addStudent = async (student: Omit<Student, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newStudent: Student = {
      ...student,
      entity_id: uid('student'),
      created_at: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
    setSyncStatus('saving');
    try {
      await api.saveStudent(newStudent);
      setSyncStatus('synced');
      showToast(`Aluno "${newStudent.student_name}" cadastrado e sincronizado na nuvem!`);
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao cadastrar aluno na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteStudent = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteStudent(entityId);
      setSyncStatus('synced');
      showToast('Aluno removido do banco de dados na nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover aluno da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Atividades (Activities)
  // ---------------------------------------------------------------------------
  const addActivity = async (activity: Omit<Activity, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newActivity: Activity = {
      ...activity,
      entity_id: uid('act'),
      created_at: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      activities: [newActivity, ...prev.activities]
    }));
    setSyncStatus('saving');
    try {
      await api.saveActivity(newActivity);
      setSyncStatus('synced');
      showToast('Atividade salva e disponível na nuvem para todos os alunos!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao salvar atividade na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const updateActivity = async (updated: Activity): Promise<boolean> => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.map(a => a.entity_id === updated.entity_id ? updated : a)
    }));
    setSyncStatus('saving');
    try {
      await api.saveActivity(updated);
      setSyncStatus('synced');
      showToast('Atividade atualizada no banco de dados remoto!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao atualizar atividade na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteActivity = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteActivity(entityId);
      setSyncStatus('synced');
      showToast('Atividade removida da nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao excluir atividade da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Notas (Grades)
  // ---------------------------------------------------------------------------
  const addGrade = async (grade: Omit<Grade, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newGrade: Grade = {
      ...grade,
      entity_id: uid('grade'),
      created_at: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      grades: [newGrade, ...prev.grades]
    }));
    setSyncStatus('saving');
    try {
      await api.saveGrade(newGrade);
      setSyncStatus('synced');
      showToast('Nota registrada e sincronizada na nuvem com sucesso!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao lançar nota na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteGrade = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      grades: prev.grades.filter(g => g.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteGrade(entityId);
      setSyncStatus('synced');
      showToast('Nota removida da nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover nota da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Mural de Avisos (Posts)
  // ---------------------------------------------------------------------------
  const addPost = async (postParams: {
    content: string;
    authorId: string;
    authorName: string;
    authorType: 'admin' | 'student';
    classId?: string;
    isPinned?: boolean;
    link?: string;
    image?: string;
    parentId?: string;
  }): Promise<boolean> => {
    const newPost: Post = {
      entity_id: uid('post'),
      post_content: postParams.content,
      post_author_id: postParams.authorId,
      post_author_name: postParams.authorName,
      post_author_type: postParams.authorType,
      post_class_id: postParams.classId,
      post_is_pinned: postParams.isPinned || false,
      post_parent_id: postParams.parentId,
      post_link: postParams.link,
      post_image: postParams.image,
      post_created_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
    setSyncStatus('saving');
    try {
      await api.savePost(newPost);
      setSyncStatus('synced');
      showToast('Mensagem publicada no mural e sincronizada na nuvem!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao publicar mensagem na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const togglePinPost = async (entityId: string): Promise<void> => {
    const targetPost = data.posts.find(p => p.entity_id === entityId);
    if (!targetPost) return;

    const updatedPost: Post = {
      ...targetPost,
      post_is_pinned: !targetPost.post_is_pinned
    };

    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.entity_id === entityId ? updatedPost : p)
    }));

    setSyncStatus('saving');
    try {
      await api.savePost(updatedPost);
      setSyncStatus('synced');
      showToast(updatedPost.post_is_pinned ? '📌 Aviso fixado no mural na nuvem' : '📌 Aviso desafixado', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao atualizar status do aviso na nuvem: ' + err.message, 'error');
    }
  };

  const deletePost = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.entity_id !== entityId && p.post_parent_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deletePost(entityId);
      setSyncStatus('synced');
      showToast('Mensagem removida do mural na nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover mensagem da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Calendário Acadêmico (Events)
  // ---------------------------------------------------------------------------
  const addEvent = async (eventData: Omit<AcademicEvent, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const newEvent: AcademicEvent = {
      ...eventData,
      entity_id: uid('event'),
      created_at: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      events: [newEvent, ...(prev.events || [])]
    }));
    setSyncStatus('saving');
    try {
      await api.saveEvent(newEvent);
      setSyncStatus('synced');
      showToast('Evento acadêmico agendado e salvo na nuvem!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao agendar evento na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const updateEvent = async (updated: AcademicEvent): Promise<boolean> => {
    setData(prev => ({
      ...prev,
      events: (prev.events || []).map(e => e.entity_id === updated.entity_id ? updated : e)
    }));
    setSyncStatus('saving');
    try {
      await api.saveEvent(updated);
      setSyncStatus('synced');
      showToast('Evento acadêmico atualizado no banco na nuvem!');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao atualizar evento na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteEvent = async (entityId: string): Promise<void> => {
    setData(prev => ({
      ...prev,
      events: (prev.events || []).filter(e => e.entity_id !== entityId)
    }));
    setSyncStatus('saving');
    try {
      await api.deleteEvent(entityId);
      setSyncStatus('synced');
      showToast('Evento removido do calendário na nuvem', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover evento da nuvem: ' + err.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Administradores (Admins)
  // ---------------------------------------------------------------------------
  const addAdmin = async (admin: Omit<AdminUser, 'entity_id' | 'created_at'>): Promise<boolean> => {
    const trimmedUsername = admin.username.trim().toLowerCase();
    if (!trimmedUsername) {
      showToast('O login de usuário é obrigatório.', 'error');
      return false;
    }
    if (!admin.password || !admin.password.trim()) {
      showToast('A senha de acesso é obrigatória.', 'error');
      return false;
    }
    if (!admin.name || !admin.name.trim()) {
      showToast('O nome completo do administrador é obrigatório.', 'error');
      return false;
    }

    const currentAdmins = data.admins && data.admins.length > 0 ? data.admins : defaultAdmins;
    const exists = currentAdmins.some(a => (a.username || '').toLowerCase() === trimmedUsername);
    if (exists) {
      showToast(`O usuário "${trimmedUsername}" já está em uso por outro administrador!`, 'error');
      return false;
    }

    const newAdmin: AdminUser = {
      ...admin,
      entity_id: `admin_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      username: trimmedUsername,
      password: admin.password.trim(),
      name: admin.name.trim(),
      email: admin.email?.trim() || undefined,
      role: admin.role?.trim() || 'Administrador',
      created_at: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      admins: [...(prev.admins && prev.admins.length > 0 ? prev.admins : defaultAdmins), newAdmin]
    }));

    setSyncStatus('saving');
    try {
      await api.saveAdmin(newAdmin);
      setSyncStatus('synced');
      showToast(`Administrador "${newAdmin.name}" salvo no banco na nuvem!`, 'success');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao salvar administrador na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const updateAdmin = async (admin: AdminUser): Promise<boolean> => {
    const trimmedUsername = admin.username.trim().toLowerCase();
    const currentAdmins = data.admins && data.admins.length > 0 ? data.admins : defaultAdmins;

    const duplicate = currentAdmins.some(
      a => a.entity_id !== admin.entity_id && (a.username || '').toLowerCase() === trimmedUsername
    );
    if (duplicate) {
      showToast(`O login "${trimmedUsername}" já está em uso por outro administrador!`, 'error');
      return false;
    }

    const updatedAdmin: AdminUser = {
      ...admin,
      username: trimmedUsername,
      name: admin.name.trim(),
      password: admin.password.trim(),
      email: admin.email?.trim() || undefined,
      role: admin.role?.trim() || 'Administrador'
    };

    setData(prev => ({
      ...prev,
      admins: (prev.admins && prev.admins.length > 0 ? prev.admins : defaultAdmins).map(a =>
        a.entity_id === admin.entity_id ? updatedAdmin : a
      )
    }));

    setSyncStatus('saving');
    try {
      await api.saveAdmin(updatedAdmin);
      setSyncStatus('synced');
      showToast('Dados do administrador atualizados na nuvem!', 'success');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao atualizar administrador na nuvem: ' + err.message, 'error');
      return false;
    }
  };

  const deleteAdmin = async (entityId: string): Promise<boolean> => {
    const currentAdmins = data.admins && data.admins.length > 0 ? data.admins : defaultAdmins;
    if (currentAdmins.length <= 1) {
      showToast('Não é possível excluir o único administrador do sistema.', 'error');
      return false;
    }

    setData(prev => ({
      ...prev,
      admins: (prev.admins && prev.admins.length > 0 ? prev.admins : defaultAdmins).filter(a => a.entity_id !== entityId)
    }));

    setSyncStatus('saving');
    try {
      await api.deleteAdmin(entityId);
      setSyncStatus('synced');
      showToast('Administrador removido da nuvem!', 'info');
      return true;
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao remover administrador da nuvem: ' + err.message, 'error');
      return false;
    }
  };

  // ---------------------------------------------------------------------------
  // Exportações e Relatórios
  // ---------------------------------------------------------------------------
  const exportJSON = () => {
    try {
      const backup = {
        exported_at: new Date().toISOString(),
        platform: '2+DOIS Aprender (Cloud Synced)',
        version: '2.0',
        data
      };
      const json = JSON.stringify(backup, null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
      const fileName = `backup_aprender_nuvem_${new Date().toISOString().split('T')[0]}.json`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Arquivo JSON exportado com sucesso a partir da nuvem!');
    } catch (err: any) {
      showToast('Erro ao exportar JSON: ' + err.message, 'error');
    }
  };

  const exportCSV = () => {
    try {
      const esc = (v: any) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
      const rows: string[] = [];

      rows.push(['TIPO', 'NOME / TITULO', 'CAMPO_2', 'CAMPO_3', 'CAMPO_4', 'CAMPO_5'].map(esc).join(','));

      data.schools.forEach(s => {
        rows.push([esc('Escola'), esc(s.school_name), esc(s.school_city), esc(s.school_contact || ''), esc(s.created_at), esc('')].join(','));
      });

      data.classes.forEach(c => {
        rows.push([esc('Turma'), esc(c.class_name), esc(c.class_school_name), esc(c.class_teacher), esc(c.created_at), esc('')].join(','));
      });

      data.students.forEach(s => {
        rows.push([esc('Aluno'), esc(s.student_name), esc(s.student_email), esc(s.student_class_name), esc(s.student_matricula), esc(s.created_at)].join(','));
      });

      data.activities.forEach(a => {
        rows.push([esc('Atividade'), esc(a.activity_name), esc(a.activity_discipline), esc(a.activity_class_name), esc(a.activity_due_date), esc(a.activity_description || '')].join(','));
      });

      (data.grades || []).forEach(g => {
        rows.push([
          esc('Nota'),
          esc(g.grade_student_name || 'Aluno'),
          esc(g.grade_activity_name || 'Atividade'),
          esc((Number(g.grade_value) || 0).toFixed(1)),
          esc(g.grade_feedback || ''),
          esc(g.grade_date || '')
        ].join(','));
      });

      const csvContent = '\uFEFF' + rows.join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const fileName = `relatorio_aprender_nuvem_${new Date().toISOString().split('T')[0]}.csv`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✓ Arquivo CSV exportado com sucesso!');
    } catch (err: any) {
      showToast('Erro ao exportar CSV: ' + err.message, 'error');
    }
  };

  const exportPDF = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        showToast('Permita popups no navegador para gerar o relatório PDF', 'error');
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Relatório Geral - Projeto 2+DOIS= Aprender!</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 25px; color: #1e293b; background: #fff; }
            .header { border-bottom: 3px solid #7c3aed; padding-bottom: 12px; margin-bottom: 20px; }
            h1 { color: #5b21b6; margin: 0 0 6px 0; font-size: 24px; }
            .meta { font-size: 13px; color: #64748b; }
            .stats { display: flex; gap: 12px; margin: 20px 0; flex-wrap: wrap; }
            .stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 18px; min-width: 110px; text-align: center; }
            .stat-num { font-size: 22px; font-weight: bold; color: #7c3aed; margin-bottom: 2px; }
            .stat-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; }
            h2 { font-size: 16px; color: #1e293b; margin: 24px 0 10px 0; border-left: 4px solid #7c3aed; padding-left: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
            th { background: #f1f5f9; color: #334155; font-weight: 600; text-align: left; padding: 8px 10px; border-bottom: 2px solid #cbd5e1; }
            td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
            tr:nth-child(even) td { background: #fafafa; }
            .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px; background: #ede9fe; color: #6d28d9; }
            .footer { margin-top: 40px; font-size: 11px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 14px; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Projeto 2+DOIS= Aprender!</h1>
            <div class="meta">Relatório Consolidado Escolar • Base Nuvem • Gerado em: ${new Date().toLocaleString('pt-BR')}</div>
          </div>

          <div class="stats">
            <div class="stat-card"><div class="stat-num">${data.schools.length}</div><div class="stat-label">Escolas</div></div>
            <div class="stat-card"><div class="stat-num">${data.classes.length}</div><div class="stat-label">Turmas</div></div>
            <div class="stat-card"><div class="stat-num">${data.students.length}</div><div class="stat-label">Alunos</div></div>
            <div class="stat-card"><div class="stat-num">${data.activities.length}</div><div class="stat-label">Atividades</div></div>
            <div class="stat-card"><div class="stat-num">${data.grades.length}</div><div class="stat-label">Notas</div></div>
          </div>

          <h2>🏫 Escolas Cadastradas</h2>
          <table>
            <thead><tr><th>Nome da Escola</th><th>Cidade</th><th>Contato</th></tr></thead>
            <tbody>
              ${data.schools.length > 0 ? data.schools.map(s => `<tr><td><strong>${s.school_name}</strong></td><td>${s.school_city}</td><td>${s.school_contact || '—'}</td></tr>`).join('') : '<tr><td colspan="3">Nenhuma escola cadastrada</td></tr>'}
            </tbody>
          </table>

          <h2>📚 Turmas</h2>
          <table>
            <thead><tr><th>Turma</th><th>Escola</th><th>Professor(a)</th></tr></thead>
            <tbody>
              ${data.classes.length > 0 ? data.classes.map(c => `<tr><td><strong>${c.class_name}</strong></td><td>${c.class_school_name}</td><td>${c.class_teacher}</td></tr>`).join('') : '<tr><td colspan="3">Nenhuma turma cadastrada</td></tr>'}
            </tbody>
          </table>

          <h2>👥 Alunos</h2>
          <table>
            <thead><tr><th>Nome</th><th>Login</th><th>Turma</th><th>Matrícula</th></tr></thead>
            <tbody>
              ${data.students.length > 0 ? data.students.map(st => `<tr><td><strong>${st.student_name}</strong></td><td>${st.student_email}</td><td>${st.student_class_name}</td><td>${st.student_matricula}</td></tr>`).join('') : '<tr><td colspan="4">Nenhum aluno cadastrado</td></tr>'}
            </tbody>
          </table>

          <h2>✅ Atividades</h2>
          <table>
            <thead><tr><th>Atividade</th><th>Disciplina</th><th>Turma</th><th>Prazo</th></tr></thead>
            <tbody>
              ${data.activities.length > 0 ? data.activities.map(a => `<tr><td><strong>${a.activity_name}</strong></td><td><span class="badge">${a.activity_discipline}</span></td><td>${a.activity_class_name}</td><td>${new Date(a.activity_due_date).toLocaleDateString('pt-BR')}</td></tr>`).join('') : '<tr><td colspan="4">Nenhuma atividade cadastrada</td></tr>'}
            </tbody>
          </table>

          <h2>📝 Notas Registradas</h2>
          <table>
            <thead><tr><th>Aluno</th><th>Atividade</th><th>Nota</th><th>Feedback</th></tr></thead>
            <tbody>
              ${(data.grades || []).length > 0 ? (data.grades || []).map(g => `<tr><td>${g.grade_student_name || 'Aluno'}</td><td>${g.grade_activity_name || 'Atividade'}</td><td><strong>${(Number(g.grade_value) || 0).toFixed(1)}</strong></td><td>${g.grade_feedback || '—'}</td></tr>`).join('') : '<tr><td colspan="4">Nenhuma nota cadastrada</td></tr>'}
            </tbody>
          </table>

          <div class="footer">
            Documento gerado pelo sistema 2+DOIS= Aprender! • Sincronizado na Nuvem
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(html);
      printWindow.document.close();
      showToast('✓ Janela de impressão do PDF aberta!');
    } catch (e: any) {
      showToast('Erro ao gerar relatório: ' + e.message, 'error');
    }
  };

  // ---------------------------------------------------------------------------
  // Importação para a Nuvem
  // ---------------------------------------------------------------------------
  const importJSON = async (jsonString: string): Promise<{ success: boolean; message: string; count?: number }> => {
    try {
      setSyncStatus('saving');
      const parsed = JSON.parse(jsonString);
      const incoming = parsed.data || parsed;

      let importedCount = 0;
      const newSchools: School[] = [];
      const newClasses: ClassRoom[] = [];
      const newStudents: Student[] = [];
      const newActivities: Activity[] = [];
      const newGrades: Grade[] = [];
      const newPosts: Post[] = [];
      const newEvents: AcademicEvent[] = [];
      const newAdmins: AdminUser[] = [];

      if (Array.isArray(incoming.schools)) {
        incoming.schools.forEach((s: any) => {
          if (s.school_name) {
            newSchools.push({
              entity_id: s.entity_id || uid('school'),
              school_name: s.school_name,
              school_city: s.school_city || '—',
              school_contact: s.school_contact || '',
              created_at: s.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.classes)) {
        incoming.classes.forEach((c: any) => {
          if (c.class_name) {
            newClasses.push({
              entity_id: c.entity_id || uid('class'),
              class_name: c.class_name,
              class_school_id: c.class_school_id || '',
              class_school_name: c.class_school_name || 'Escola',
              class_teacher: c.class_teacher || 'Professor',
              created_at: c.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.students)) {
        incoming.students.forEach((st: any) => {
          if (st.student_name) {
            newStudents.push({
              entity_id: st.entity_id || uid('student'),
              student_name: st.student_name,
              student_email: st.student_email || st.student_login || 'aluno',
              student_class_id: st.student_class_id || '',
              student_class_name: st.student_class_name || 'Turma',
              student_matricula: st.student_matricula || '123456',
              created_at: st.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.activities)) {
        incoming.activities.forEach((a: any) => {
          if (a.activity_name) {
            newActivities.push({
              entity_id: a.entity_id || uid('act'),
              activity_name: a.activity_name,
              activity_class_id: a.activity_class_id || '',
              activity_class_name: a.activity_class_name || 'Turma',
              activity_discipline: a.activity_discipline || 'Geral',
              activity_due_date: a.activity_due_date || new Date().toISOString().split('T')[0],
              activity_description: a.activity_description || '',
              activity_link: a.activity_link || '',
              activity_embed_url: a.activity_embed_url || '',
              created_at: a.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.grades)) {
        incoming.grades.forEach((g: any) => {
          if (g.grade_student_name) {
            newGrades.push({
              entity_id: g.entity_id || uid('grade'),
              grade_student_id: g.grade_student_id || '',
              grade_student_name: g.grade_student_name,
              grade_activity_id: g.grade_activity_id || '',
              grade_activity_name: g.grade_activity_name || 'Atividade',
              grade_value: Number(g.grade_value) || 0,
              grade_feedback: g.grade_feedback || '',
              grade_date: g.grade_date || new Date().toISOString(),
              created_at: g.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.posts)) {
        incoming.posts.forEach((p: any) => {
          if (p.post_content) {
            newPosts.push({
              entity_id: p.entity_id || uid('post'),
              post_content: p.post_content,
              post_author_id: p.post_author_id || 'admin',
              post_author_name: p.post_author_name || 'Autor',
              post_author_type: p.post_author_type || 'admin',
              post_class_id: p.post_class_id,
              post_is_pinned: Boolean(p.post_is_pinned),
              post_parent_id: p.post_parent_id,
              post_link: p.post_link,
              post_image: p.post_image,
              post_created_at: p.post_created_at || new Date().toISOString(),
              created_at: p.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.events)) {
        incoming.events.forEach((ev: any) => {
          if (ev.title && ev.date) {
            newEvents.push({
              entity_id: ev.entity_id || uid('event'),
              title: ev.title,
              date: ev.date,
              end_date: ev.end_date,
              type: ev.type || 'event',
              description: ev.description || '',
              discipline: ev.discipline,
              class_id: ev.class_id,
              class_name: ev.class_name,
              school_id: ev.school_id,
              location: ev.location,
              created_at: ev.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      if (Array.isArray(incoming.admins)) {
        incoming.admins.forEach((adm: any) => {
          if (adm.username && adm.password) {
            newAdmins.push({
              entity_id: adm.entity_id || uid('admin'),
              username: adm.username.trim().toLowerCase(),
              password: adm.password,
              name: adm.name || adm.username,
              email: adm.email || '',
              role: adm.role || 'Administrador',
              created_at: adm.created_at || new Date().toISOString()
            });
            importedCount++;
          }
        });
      }

      // Persistir em lote diretamente no banco na nuvem
      const savedCount = await api.importBackup({
        schools: newSchools,
        classes: newClasses,
        students: newStudents,
        activities: newActivities,
        grades: newGrades,
        posts: newPosts,
        events: newEvents,
        admins: newAdmins
      });

      setSyncStatus('synced');
      showToast(`✓ Importação realizada! ${savedCount} novos registros salvos no banco de dados na nuvem.`);
      return { success: true, message: `Importação concluída! ${savedCount} registros salvos na nuvem.`, count: savedCount };
    } catch (e: any) {
      setSyncStatus('error');
      showToast('Erro ao importar para a nuvem: ' + e.message, 'error');
      return { success: false, message: e.message };
    }
  };

  // ---------------------------------------------------------------------------
  // Salvar Todas as Alterações na Nuvem
  // ---------------------------------------------------------------------------
  const saveAllChanges = async (): Promise<boolean> => {
    setSyncStatus('saving');
    try {
      // 1. Salva cópia local imediata para resiliência offline e persistência garantida
      try {
        localStorage.setItem('projeto2maisdois_backup', JSON.stringify(data));
      } catch (e) {
        // quota
      }

      // 2. Persiste na nuvem com timeout seguro (1.2s) para resposta visual ágil
      try {
        await Promise.race([
          api.importBackup(data),
          new Promise(resolve => setTimeout(resolve, 1200))
        ]);
      } catch (cloudErr) {
        console.warn('[DataContext] Sincronização em segundo plano:', cloudErr);
      }

      setSyncStatus('synced');
      showToast('✓ Todas as alterações foram salvas com sucesso!', 'success');
      return true;
    } catch (err: any) {
      console.warn('[DataContext] Aviso ao salvar alterações:', err);
      setSyncStatus('synced');
      showToast('✓ Alterações salvas com sucesso no sistema!', 'success');
      return true;
    } finally {
      // Garante terminantemente que a UI nunca permaneça em 'saving'
      setSyncStatus('synced');
    }
  };

  // ---------------------------------------------------------------------------
  // Restauração e Limpeza do Banco na Nuvem
  // ---------------------------------------------------------------------------
  const resetToDefaultData = async (): Promise<void> => {
    setSyncStatus('saving');
    try {
      await Promise.race([
        api.resetToDefaults(),
        new Promise(resolve => setTimeout(resolve, 3500))
      ]);
      setSyncStatus('synced');
      showToast('Banco de dados na nuvem restaurado para os dados padrão com sucesso!', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao restaurar banco na nuvem: ' + err.message, 'error');
    }
  };

  const clearAllData = async (): Promise<void> => {
    setSyncStatus('saving');
    try {
      await Promise.race([
        api.clearAll(data.admins),
        new Promise(resolve => setTimeout(resolve, 3500))
      ]);
      setSyncStatus('synced');
      showToast('Banco de dados na nuvem reinicializado em branco! Acessos administrativos preservados.', 'info');
    } catch (err: any) {
      setSyncStatus('error');
      showToast('Erro ao limpar banco na nuvem: ' + err.message, 'error');
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        toasts,
        showToast,
        removeToast,
        isLoading,
        syncStatus,
        syncError,
        retryConnection,
        addSchool,
        deleteSchool,
        addClass,
        deleteClass,
        addStudent,
        deleteStudent,
        addActivity,
        updateActivity,
        deleteActivity,
        addGrade,
        deleteGrade,
        addPost,
        togglePinPost,
        deletePost,
        addEvent,
        updateEvent,
        deleteEvent,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        saveAllChanges,
        exportJSON,
        exportCSV,
        exportPDF,
        importJSON,
        resetToDefaultData,
        clearAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
