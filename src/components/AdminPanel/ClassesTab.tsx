import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, BookOpen, School, UserCheck, X } from 'lucide-react';

export const ClassesTab: React.FC = () => {
  const { data, addClass, deleteClass, showToast } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [teacher, setTeacher] = useState('');

  const handleOpenModal = () => {
    if (data.schools.length === 0) {
      showToast('Cadastre ao menos uma escola antes de adicionar turmas.', 'error');
      return;
    }
    setSchoolId(data.schools[0].entity_id);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !schoolId || !teacher.trim()) return;

    const school = data.schools.find(s => s.entity_id === schoolId);
    if (!school) return;

    addClass({
      class_name: className.trim(),
      class_school_id: schoolId,
      class_school_name: school.school_name,
      class_teacher: teacher.trim()
    });

    setClassName('');
    setTeacher('');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
        <div>
          <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Gerenciar Turmas</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Organize as salas de aula e seus respectivos professores
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Turma</span>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {data.classes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.classes.map(cls => {
              const studentsCount = data.students.filter(s => s.student_class_id === cls.entity_id).length;
              return (
                <div
                  key={cls.entity_id}
                  className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-zinc-900">
                        {cls.class_name}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
                        {studentsCount} aluno(s)
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-xs text-zinc-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                        <span className="truncate">{cls.class_school_name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        <span>Prof: {cls.class_teacher}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">
                      Criada em {new Date(cls.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja remover a turma "${cls.class_name}"?`)) {
                          deleteClass(cls.entity_id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                      title="Remover Turma"
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
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
            <p className="text-sm font-medium text-zinc-600">Nenhuma turma cadastrada ainda.</p>
            <p className="text-xs text-zinc-400 mt-1">Clique em "Nova Turma" para começar.</p>
          </div>
        )}
      </div>

      {/* Modal Nova Turma */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md border border-zinc-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
              <h2 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Nova Turma</span>
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
                  Nome da Turma *
                </label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                  placeholder="Ex: 8º Ano A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Escola Vinculada *
                </label>
                <select
                  required
                  value={schoolId}
                  onChange={e => setSchoolId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm bg-white text-zinc-900"
                >
                  {data.schools.map(s => (
                    <option key={s.entity_id} value={s.entity_id}>
                      {s.school_name} ({s.school_city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Professor(a) Responsável *
                </label>
                <input
                  type="text"
                  required
                  value={teacher}
                  onChange={e => setTeacher(e.target.value)}
                  placeholder="Ex: Profª. Maria Helena"
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
                  Salvar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
