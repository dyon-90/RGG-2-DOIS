import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { RoleSelection } from './components/RoleSelection';
import { AdminLogin } from './components/AdminLogin';
import { StudentLogin } from './components/StudentLogin';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { StudentDashboard } from './components/StudentPanel/StudentDashboard';
import { ToastContainer } from './components/ToastContainer';
import { Student } from './types';
import { StackedBooksLogo } from './components/BrandIcons';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'admin' | 'student' | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<string | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const handleSelectRole = (role: 'admin' | 'student') => {
    setCurrentRole(role);
  };

  const handleAdminSuccess = (username: string) => {
    setCurrentAdmin(username);
  };

  const handleStudentSuccess = (student: Student) => {
    setCurrentStudent(student);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentAdmin(null);
    setCurrentStudent(null);
  };

  const currentUser = currentRole === 'admin' 
    ? (currentAdmin ? `Admin (${currentAdmin})` : null)
    : (currentStudent ? currentStudent.student_name : null);

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-[#f4f2fb] text-zinc-900 antialiased font-sans">
        <Header
          currentRole={currentRole}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
          {/* 1. Initial Role Selection */}
          {!currentRole && (
            <RoleSelection onSelectRole={handleSelectRole} />
          )}

          {/* 2. Admin Authentication flow */}
          {currentRole === 'admin' && !currentAdmin && (
            <AdminLogin
              onSuccess={handleAdminSuccess}
              onBack={() => setCurrentRole(null)}
            />
          )}

          {/* 3. Admin Main Panel */}
          {currentRole === 'admin' && currentAdmin && (
            <AdminPanel currentAdmin={currentAdmin} />
          )}

          {/* 4. Student Authentication flow */}
          {currentRole === 'student' && !currentStudent && (
            <StudentLogin
              onSuccess={handleStudentSuccess}
              onBack={() => setCurrentRole(null)}
            />
          )}

          {/* 5. Student Dashboard */}
          {currentRole === 'student' && currentStudent && (
            <StudentDashboard student={currentStudent} />
          )}
        </main>

        <footer className="py-5 text-center text-xs font-medium text-purple-900/60 border-t border-purple-100 bg-white/70 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#6f2ef7] rounded-md flex items-center justify-center p-0.5 shadow-xs">
                <StackedBooksLogo size={14} />
              </div>
              <span className="font-extrabold text-zinc-900 tracking-tight">2+DOIS= Aprender!</span>
              <span className="text-purple-300">•</span>
              <span>Plataforma Educacional</span>
            </div>
            <p className="text-purple-900/50 text-[11px]">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </footer>

        <ToastContainer />
      </div>
    </DataProvider>
  );
}

