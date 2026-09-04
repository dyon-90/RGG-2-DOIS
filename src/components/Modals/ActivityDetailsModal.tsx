import React from 'react';
import { Activity, Grade } from '../../types';
import { X, Calendar, BookOpen, ExternalLink, Globe, Award, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

interface ActivityDetailsModalProps {
  activity: Activity;
  grade?: Grade;
  onClose: () => void;
}

export const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, grade, onClose }) => {
  const dueDate = new Date(activity.activity_due_date);
  const isOverdue = !grade && dueDate < new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {activity.activity_discipline}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${
                grade
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isOverdue
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}>
                {grade ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {grade ? 'Corrigida' : isOverdue ? 'Prazo Expirado' : 'Pendente'}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-zinc-900 leading-snug">
              {activity.activity_name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-zinc-500 font-semibold text-[10px] uppercase mb-1">Turma</p>
              <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                {activity.activity_class_name}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <p className="text-zinc-500 font-semibold text-[10px] uppercase mb-1">Prazo de Entrega</p>
              <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                {dueDate.toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Orientações & Descrição
            </h4>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {activity.activity_description || 'Nenhuma descrição detalhada fornecida para esta atividade.'}
            </div>
          </div>

          {/* External Material */}
          {activity.activity_link && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                Material de Estudo
              </h4>
              <a
                href={activity.activity_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-xs font-semibold hover:bg-indigo-50 transition group"
              >
                <div className="flex items-center gap-2 truncate">
                  <ExternalLink className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span className="truncate">Acessar Material Complementar</span>
                </div>
                <span className="text-[11px] text-indigo-600 group-hover:underline">Abrir link →</span>
              </a>
            </div>
          )}

          {/* Embedded URL Page */}
          {activity.activity_embed_url && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                Página da Atividade
              </h4>
              <a
                href={activity.activity_embed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-semibold hover:bg-zinc-100 transition group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span className="truncate">Abrir Página Incorporada</span>
                </div>
                <span className="text-[11px] text-indigo-600 group-hover:underline">Acessar →</span>
              </a>
            </div>
          )}

          {/* Grade & Feedback Section if available */}
          {grade && (
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Sua Avaliação
                </span>
                <span className="text-2xl font-black text-emerald-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-emerald-200">
                  {grade.grade_value.toFixed(1)} / 10
                </span>
              </div>

              {grade.grade_feedback && (
                <div className="mt-2 pt-2 border-t border-emerald-200/60 text-xs text-emerald-950 flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Feedback do Professor:</span>
                    <p className="mt-0.5 italic">"{grade.grade_feedback}"</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
