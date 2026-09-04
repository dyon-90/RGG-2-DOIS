import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Send, Search, Filter, Award, CheckCircle2 } from 'lucide-react';

export const SubmissionsTab: React.FC = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState<string>('all');

  const filteredGrades = data.grades.filter(g => {
    const matchesSearch = g.grade_student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.grade_activity_name.toLowerCase().includes(searchTerm.toLowerCase());

    const act = data.activities.find(a => a.entity_id === g.grade_activity_id);
    const matchesDiscipline = filterDiscipline === 'all' || (act && act.activity_discipline === filterDiscipline);

    return matchesSearch && matchesDiscipline;
  });

  const disciplines = Array.from(new Set(data.activities.map(a => a.activity_discipline)));

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/70">
        <div>
          <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-600" />
            <span>Entregas & Avaliações</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Registro detalhado de todas as atividades corrigidas e pontuadas
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar aluno ou atividade..."
              className="pl-9 pr-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 w-48 sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={filterDiscipline}
              onChange={e => setFilterDiscipline(e.target.value)}
              className="text-xs text-zinc-700 bg-transparent focus:outline-none"
            >
              <option value="all">Todas Disciplinas</option>
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
              <th className="p-3.5 font-semibold">Aluno</th>
              <th className="p-3.5 font-semibold">Atividade</th>
              <th className="p-3.5 font-semibold text-center">Disciplina</th>
              <th className="p-3.5 font-semibold text-center">Data de Correção</th>
              <th className="p-3.5 font-semibold text-center">Nota Atribuída</th>
              <th className="p-3.5 font-semibold">Feedback</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-700">
            {filteredGrades.length > 0 ? (
              filteredGrades.map(grade => {
                const act = data.activities.find(a => a.entity_id === grade.grade_activity_id);
                const student = data.students.find(s => s.entity_id === grade.grade_student_id);

                return (
                  <tr key={grade.entity_id} className="hover:bg-zinc-50 transition">
                    <td className="p-3.5 font-medium text-zinc-900">
                      <div>{grade.grade_student_name}</div>
                      <div className="text-[11px] text-zinc-400">
                        {student ? student.student_class_name : 'Turma'}
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-zinc-800">
                      {grade.grade_activity_name}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 border border-indigo-100 text-indigo-700">
                        {act ? act.activity_discipline : 'Geral'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center text-zinc-500">
                      {new Date(grade.grade_date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-sm text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {grade.grade_value.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-3.5 text-zinc-500 italic max-w-xs truncate">
                      {grade.grade_feedback ? `"${grade.grade_feedback}"` : <span className="text-zinc-300">—</span>}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-zinc-400">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 opacity-30 text-zinc-400" />
                  <p className="text-sm">Nenhum registro de entrega encontrado.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
