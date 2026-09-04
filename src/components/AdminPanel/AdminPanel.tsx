import React, { useState } from 'react';
import { LayoutDashboard, School, BookOpen, Users, CheckSquare, Award, Send, Megaphone, CalendarDays, ShieldCheck, Database } from 'lucide-react';
import { DashboardTab } from './DashboardTab';
import { SchoolsTab } from './SchoolsTab';
import { ClassesTab } from './ClassesTab';
import { StudentsTab } from './StudentsTab';
import { ActivitiesTab } from './ActivitiesTab';
import { GradesTab } from './GradesTab';
import { SubmissionsTab } from './SubmissionsTab';
import { MuralTab } from './MuralTab';
import { AcademicCalendar } from '../Calendar/AcademicCalendar';
import { AdminsTab } from './AdminsTab';
import { BackupTab } from './BackupTab';

interface AdminPanelProps {
  currentAdmin: string;
}

type AdminTab = 'dashboard' | 'schools' | 'classes' | 'students' | 'activities' | 'grades' | 'submissions' | 'mural' | 'calendar' | 'admins' | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentAdmin }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schools', label: 'Escolas', icon: School },
    { id: 'classes', label: 'Turmas', icon: BookOpen },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'activities', label: 'Atividades', icon: CheckSquare },
    { id: 'grades', label: 'Notas', icon: Award },
    { id: 'submissions', label: 'Entregas', icon: Send },
    { id: 'mural', label: 'Mural', icon: Megaphone },
    { id: 'calendar', label: 'Calendário', icon: CalendarDays },
    { id: 'admins', label: 'Administradores', icon: ShieldCheck },
    { id: 'backup', label: 'Backup & Dados', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Tab Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Painel Administrativo
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Gestão pedagógica, acompanhamento de turmas e controle de registros
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 shadow-xs self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Sessão: <strong className="text-purple-950">{currentAdmin}</strong>
          </span>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6f2ef7] to-[#5914e6] text-white shadow-md shadow-purple-600/25'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-purple-50/50 border border-zinc-200 shadow-xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Tab */}
      <div>
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'schools' && <SchoolsTab />}
        {activeTab === 'classes' && <ClassesTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'activities' && <ActivitiesTab />}
        {activeTab === 'grades' && <GradesTab />}
        {activeTab === 'submissions' && <SubmissionsTab />}
        {activeTab === 'mural' && <MuralTab currentAdminName={currentAdmin} />}
        {activeTab === 'calendar' && <AcademicCalendar role="admin" />}
        {activeTab === 'admins' && <AdminsTab currentAdmin={currentAdmin} />}
        {activeTab === 'backup' && <BackupTab />}
      </div>
    </div>
  );
};

