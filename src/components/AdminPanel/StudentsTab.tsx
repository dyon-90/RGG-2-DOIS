import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Users, Key, Mail, BookOpen, X, Award } from 'lucide-react';

export const StudentsTab: React.FC = () => {
  const { data, addStudent, deleteStudent, showToast } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenModal = () => {
    if (data.classes.length === 0) {
      showToast('Cadastre ao menos uma turma antes de adicionar alunos.', 'error');
      return;
    }
    setClassId(data.classes[0].entity_id);
    setPassword('123456');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !login.trim() || !classId || !password.trim()) return;

    const cls = data.classes.find(c => c.entity_id === classId);
    if (!cls) return;

    addStudent({
      student_name: name.trim(),
      student_email: login.trim().toLowerCase(),
      student_class_id: classId,
      student_class_name: cls.class_name,
      student_matricula: password.trim()
    });

    setName('');
    setLogin('');
    setPassword('123456');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
        <div>
          <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Gerenciar Alunos</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Cadastre os estudantes com suas credenciais de login e turma
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Aluno</span>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {(data.students || []).length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.students || []).map(student => {
              const studentGrades = (data.grades || []).filter(g => g.grade_student_id === student.entity_id);
              const totalPoints = studentGrades.reduce((sum, g) => sum + (Number(g.grade_value) || 0), 0);
              const avg = studentGrades.length > 0 && !isNaN(totalPoints) ? (totalPoints / studentGrades.length).toFixed(1) : '—';

              return (
                <div
                  key={student.entity_id}
                  className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-zinc-900 leading-tight">
                        {student.student_name}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-indigo-600" />
                        {student.student_class_name}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-xs text-zinc-600 mb-3 bg-zinc-50/80 p-2.5 rounded-xl border border-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span>Login: <strong className="text-zinc-900">{student.student_email}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span>Senha: <strong className="text-zinc-900">{student.student_matricula}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-2 px-1">
                      <span>Notas: {studentGrades.length}</span>
                      <span className="font-semibold text-indigo-600 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Média: {avg}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">
                      Cadastrado em {new Date(student.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja remover o aluno "${student.student_name}"?`)) {
                          deleteStudent(student.entity_id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                      title="Remover Aluno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
            <p className="text-sm font-medium text-zinc-600">Nenhum aluno cadastrado ainda.</p>
            <p className="text-xs text-zinc-400 mt-1">Clique em "Novo Aluno" para adicionar.</p>
          </div>
        )}
      </div>

      {/* Modal Novo Aluno */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md border border-zinc-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
              <h2 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Novo Aluno</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (!login) {
                      const clean = e.target.value.toLowerCase().trim().replace(/\s+/g, '.');
                      setLogin(clean);
                    }
                  }}
                  placeholder="Ex: Maria Clara Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Turma *
                </label>
                <select
                  required
                  value={classId}
                  onChange={e => setClassId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900"
                >
                  {data.classes.map(c => (
                    <option key={c.entity_id} value={c.entity_id}>
                      {c.class_name} — {c.class_school_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Login de Acesso *
                </label>
                <input
                  type="text"
                  required
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  placeholder="Ex: maria.silva"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Senha / Matrícula *
                </label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Ex: 123456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition"
                >
                  Salvar Aluno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
