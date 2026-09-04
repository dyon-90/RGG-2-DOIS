import React from 'react';
import { StackedBooksLogo, GraduationCapLarge, AdminGearIcon } from './BrandIcons';

interface RoleSelectionProps {
  onSelectRole: (role: 'admin' | 'student') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="max-w-4xl mx-auto my-auto py-8 sm:py-16 px-4 animate-fade-in flex flex-col items-center justify-center">
      {/* Top Orange Squircle with Graduation Cap */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#ff9b57] via-[#ff8244] to-[#ff5938] shadow-xl shadow-orange-500/25 flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition duration-300">
        <GraduationCapLarge size={54} className="drop-shadow-sm" />
      </div>

      {/* Hero Welcome Text */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#132e25] tracking-tight mb-2">
          Bem-vindo!
        </h1>
        <p className="text-zinc-500 text-base sm:text-lg font-medium">
          Escolha seu tipo de acesso
        </p>
      </div>

      {/* Role Selection Glowing Purple Cards */}
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-2xl">
        {/* Administrator Card */}
        <div
          onClick={() => onSelectRole('admin')}
          className="group relative bg-gradient-to-br from-[#6f2ef7] via-[#6624f0] to-[#5914e6] rounded-[26px] p-8 sm:p-10 text-center flex flex-col items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(105,36,245,0.42)] hover:shadow-[0_25px_65px_rgba(105,36,245,0.6)] hover:-translate-y-2 active:scale-98 transition-all duration-300 border border-white/20 overflow-hidden"
        >
          {/* Subtle Ambient Light highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[26px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Gear Icon */}
            <div className="mb-4 transform group-hover:rotate-45 transition duration-500">
              <AdminGearIcon size={64} className="drop-shadow-md" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Administrador
            </h2>
            
            <p className="text-purple-100/90 text-sm sm:text-base font-medium">
              Controle total do sistema
            </p>
          </div>
        </div>

        {/* Student Card */}
        <div
          onClick={() => onSelectRole('student')}
          className="group relative bg-gradient-to-br from-[#6f2ef7] via-[#6624f0] to-[#5914e6] rounded-[26px] p-8 sm:p-10 text-center flex flex-col items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(105,36,245,0.42)] hover:shadow-[0_25px_65px_rgba(105,36,245,0.6)] hover:-translate-y-2 active:scale-98 transition-all duration-300 border border-white/20 overflow-hidden"
        >
          {/* Subtle Ambient Light highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[26px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Stacked Books Icon */}
            <div className="mb-4 transform group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
              <StackedBooksLogo size={60} className="drop-shadow-md" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Aluno
            </h2>
            
            <p className="text-purple-100/90 text-sm sm:text-base font-medium">
              Minhas atividades e notas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

