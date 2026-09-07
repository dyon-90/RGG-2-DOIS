import React, { useState } from 'react';
import { Lock, LogIn, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { defaultAdmins } from '../data/initialData';
import { AdminGearIcon } from './BrandIcons';

interface AdminLoginProps {
  onSuccess: (username: string) => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, showToast } = useData();

  const currentAdminList = data.admins && data.admins.length > 0 ? data.admins : defaultAdmins;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const valid = currentAdminList.find(
      c => (c.username || '').toLowerCase() === cleanUser && c.password === cleanPassword
    );

    if (valid) {
      setTimeout(() => {
        showToast(`Bem-vindo, ${valid.name || valid.username}!`, 'success');
        onSuccess(valid.username);
      }, 400);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setError('Usuário ou senha incorretos. Verifique suas credenciais.');
      }, 300);
    }
  };

  return (
    <div className="max-w-md mx-auto my-auto py-6 sm:py-10 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-950/5 border border-purple-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6f2ef7] to-[#5914e6] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-600/30">
            <AdminGearIcon size={38} />
          </div>
          <h2 className="font-display text-2xl font-bold text-zinc-900 tracking-tight">
            Acesso Administrativo
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Informe suas credenciais para gerenciar a plataforma
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Usuário
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Digite seu usuário (ex: dyon.gomes)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6f2ef7] text-sm bg-white text-zinc-900 placeholder:text-zinc-400 transition"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Senha
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6f2ef7] text-sm bg-white text-zinc-900 placeholder:text-zinc-400 transition"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6f2ef7] to-[#5914e6] hover:from-[#6524f0] hover:to-[#500dd8] shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition disabled:opacity-70 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <CheckCircle className="w-4 h-4 animate-spin" />
                <span>Validando acesso...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Acessar Painel</span>
              </>
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={onBack}
          className="w-full mt-6 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center gap-1.5 transition border border-transparent hover:border-zinc-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para seleção de perfil</span>
        </button>
      </div>
    </div>
  );
};

