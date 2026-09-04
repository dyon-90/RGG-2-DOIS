import React from 'react';
import { User } from 'lucide-react';
import { StackedBooksLogo } from './BrandIcons';

interface HeaderProps {
  currentRole: 'admin' | 'student' | null;
  currentUser: string | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, currentUser, onLogout }) => {
  const subtitle = currentRole === 'admin' 
    ? 'Painel Administrativo' 
    : currentRole === 'student' 
    ? 'Portal do Aluno' 
    : 'Painel Administrativo';

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#6924f5] via-[#7a32f7] to-[#8d47fa] text-white shadow-[0_4px_25px_rgba(105,36,245,0.35)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl p-2 flex items-center justify-center border border-white/30 shadow-inner flex-shrink-0">
            <StackedBooksLogo size={26} />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white leading-tight drop-shadow-xs">
              2+DOIS= Aprender!
            </h1>
            <p className="text-purple-100/90 text-xs font-medium leading-none mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* User Status & Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {currentUser && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/25 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-white">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="max-w-[130px] sm:max-w-[200px] truncate text-white">
                {currentUser}
              </span>
            </div>
          )}

          {currentRole && (
            <button
              onClick={onLogout}
              className="px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#ff5c5c] hover:bg-white/95 shadow-md hover:shadow-lg transition active:scale-95"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

