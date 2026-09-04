import React from 'react';
import { useData } from '../../context/DataContext';
import { Trophy, School as SchoolIcon, BookOpen, Users, CheckSquare, Award } from 'lucide-react';

export const DashboardTab: React.FC = () => {
  const { data } = useData();

  // 1. Ranking by Schools
  const schoolsRanking = data.schools.map(school => {
    const classesInSchool = data.classes.filter(c => c.class_school_id === school.entity_id);
    const studentsInSchool = data.students.filter(s => classesInSchool.some(c => c.entity_id === s.student_class_id));
    const gradesForSchool = data.grades.filter(g => studentsInSchool.some(s => s.entity_id === g.grade_student_id));
    const totalGrade = gradesForSchool.reduce((sum, g) => sum + g.grade_value, 0);
    const averageGrade = gradesForSchool.length > 0 ? totalGrade / gradesForSchool.length : 0;
    return {
      name: school.school_name,
      city: school.school_city,
      total: totalGrade,
      average: averageGrade,
      count: gradesForSchool.length
    };
  }).filter(s => s.count > 0).sort((a, b) => b.total - a.total).slice(0, 5);

  // 2. Ranking by Classes
  const classesRanking = data.classes.map(cls => {
    const studentsInClass = data.students.filter(s => s.student_class_id === cls.entity_id);
    const gradesForClass = data.grades.filter(g => studentsInClass.some(s => s.entity_id === g.grade_student_id));
    const totalGrade = gradesForClass.reduce((sum, g) => sum + g.grade_value, 0);
    const averageGrade = gradesForClass.length > 0 ? totalGrade / gradesForClass.length : 0;
    return {
      name: cls.class_name,
      school: cls.class_school_name,
      total: totalGrade,
      average: averageGrade,
      count: gradesForClass.length
    };
  }).filter(c => c.count > 0).sort((a, b) => b.total - a.total).slice(0, 5);

  // 3. Ranking by Students
  const studentMap = new Map<string, { name: string; schoolClass: string; grades: number[] }>();
  data.grades.forEach(g => {
    const student = data.students.find(s => s.entity_id === g.grade_student_id);
    const className = student ? student.student_class_name : 'Turma';
    if (!studentMap.has(g.grade_student_id)) {
      studentMap.set(g.grade_student_id, { name: g.grade_student_name, schoolClass: className, grades: [g.grade_value] });
    } else {
      studentMap.get(g.grade_student_id)!.grades.push(g.grade_value);
    }
  });

  const studentsRanking = Array.from(studentMap.values()).map(s => {
    const total = s.grades.reduce((sum, v) => sum + v, 0);
    const avg = total / s.grades.length;
    return {
      name: s.name,
      schoolClass: s.schoolClass,
      total,
      average: avg,
      count: s.grades.length
    };
  }).sort((a, b) => b.total - a.total).slice(0, 5);

  // 4. Ranking by Activities
  const activitiesRanking = data.activities.map(activity => {
    const gradesForActivity = data.grades.filter(g => g.grade_activity_id === activity.entity_id);
    const totalGrade = gradesForActivity.reduce((sum, g) => sum + g.grade_value, 0);
    const averageGrade = gradesForActivity.length > 0 ? totalGrade / gradesForActivity.length : 0;
    return {
      name: activity.activity_name,
      discipline: activity.activity_discipline,
      total: totalGrade,
      average: averageGrade,
      count: gradesForActivity.length
    };
  }).filter(a => a.count > 0).sort((a, b) => b.total - a.total).slice(0, 5);

  // 5. Ranking Portuguese
  const portugueseActs = data.activities.filter(a => a.activity_discipline.toLowerCase().includes('portugu'));
  const ptStudentMap = new Map<string, { name: string; grades: number[] }>();
  portugueseActs.forEach(act => {
    data.grades.filter(g => g.grade_activity_id === act.entity_id).forEach(g => {
      if (!ptStudentMap.has(g.grade_student_id)) {
        ptStudentMap.set(g.grade_student_id, { name: g.grade_student_name, grades: [g.grade_value] });
      } else {
        ptStudentMap.get(g.grade_student_id)!.grades.push(g.grade_value);
      }
    });
  });

  const portugueseRanking = Array.from(ptStudentMap.values()).map(s => {
    const total = s.grades.reduce((sum, v) => sum + v, 0);
    const avg = total / s.grades.length;
    return { name: s.name, total, average: avg, count: s.grades.length };
  }).sort((a, b) => b.total - a.total).slice(0, 5);

  // 6. Ranking Mathematics
  const mathActs = data.activities.filter(a => a.activity_discipline.toLowerCase().includes('matem'));
  const mathStudentMap = new Map<string, { name: string; grades: number[] }>();
  mathActs.forEach(act => {
    data.grades.filter(g => g.grade_activity_id === act.entity_id).forEach(g => {
      if (!mathStudentMap.has(g.grade_student_id)) {
        mathStudentMap.set(g.grade_student_id, { name: g.grade_student_name, grades: [g.grade_value] });
      } else {
        mathStudentMap.get(g.grade_student_id)!.grades.push(g.grade_value);
      }
    });
  });

  const mathRanking = Array.from(mathStudentMap.values()).map(s => {
    const total = s.grades.reduce((sum, v) => sum + v, 0);
    const avg = total / s.grades.length;
    return { name: s.name, total, average: avg, count: s.grades.length };
  }).sort((a, b) => b.total - a.total).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top 4 Ranking Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Schools */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <SchoolIcon className="w-4 h-4 text-indigo-600" />
              <span>Ranking por Escola</span>
            </h3>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              Pontuação Geral
            </span>
          </div>
          <div className="p-4 space-y-2">
            {schoolsRanking.length > 0 ? (
              schoolsRanking.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900">{s.name}</p>
                      <p className="text-xs text-zinc-500">{s.city} • {s.count} avaliações</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{s.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {s.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Nenhum dado registrado</p>
            )}
          </div>
        </div>

        {/* Classes */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Ranking por Turma</span>
            </h3>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              Pontuação Geral
            </span>
          </div>
          <div className="p-4 space-y-2">
            {classesRanking.length > 0 ? (
              classesRanking.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900">{c.name}</p>
                      <p className="text-xs text-zinc-500">{c.school} • {c.count} notas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{c.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {c.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Nenhum dado registrado</p>
            )}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Top Alunos</span>
            </h3>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              Destaque Geral
            </span>
          </div>
          <div className="p-4 space-y-2">
            {studentsRanking.length > 0 ? (
              studentsRanking.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-amber-500 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900">{st.name}</p>
                      <p className="text-xs text-zinc-500">{st.schoolClass} • {st.count} atividades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{st.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {st.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Nenhum dado registrado</p>
            )}
          </div>
        </div>

        {/* Activities Ranking */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Ranking por Atividade</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Mais Pontuadas
            </span>
          </div>
          <div className="p-4 space-y-2">
            {activitiesRanking.length > 0 ? (
              activitiesRanking.map((a, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900 line-clamp-1">{a.name}</p>
                      <p className="text-xs text-zinc-500">{a.discipline} • {a.count} notas</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{a.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {a.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Nenhum dado registrado</p>
            )}
          </div>
        </div>
      </div>

      {/* Discipline Rankings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Portuguese */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Ranking - Português</span>
            </h3>
            <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Língua Portuguesa
            </span>
          </div>
          <div className="p-4 space-y-2">
            {portugueseRanking.length > 0 ? (
              portugueseRanking.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-blue-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900">{s.name}</p>
                      <p className="text-xs text-zinc-500">{s.count} atividade(s)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{s.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {s.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Sem atividades avaliadas em Português</p>
            )}
          </div>
        </div>

        {/* Mathematics */}
        <div className="bg-white rounded-2xl shadow-xs border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Ranking - Matemática</span>
            </h3>
            <span className="text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
              Matemática
            </span>
          </div>
          <div className="p-4 space-y-2">
            {mathRanking.length > 0 ? (
              mathRanking.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between hover:bg-zinc-100/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${i === 0 ? 'bg-purple-600 text-white shadow-xs' : 'bg-zinc-200 text-zinc-700'}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-zinc-900">{s.name}</p>
                      <p className="text-xs text-zinc-500">{s.count} atividade(s)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base text-zinc-900">{s.total.toFixed(1)} pts</p>
                    <p className="text-[11px] text-zinc-500">Média: {s.average.toFixed(1)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-xs text-zinc-400">Sem atividades avaliadas em Matemática</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
