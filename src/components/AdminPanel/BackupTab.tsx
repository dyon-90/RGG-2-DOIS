import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Download, Upload, FileSpreadsheet, FileText, Database, AlertTriangle, CheckCircle2, Trash2, CalendarDays, Server, ShieldCheck } from 'lucide-react';

export const BackupTab: React.FC = () => {
  const { data, exportJSON, exportCSV, exportPDF, importJSON, clearAllData, showToast } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      showToast('Por favor, selecione um arquivo válido no formato .json', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const res = await importJSON(content);
      setImportStatus(res);
      setTimeout(() => setImportStatus(null), 6000);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Export & Import Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-zinc-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-zinc-100">
              <Download className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base text-zinc-900">Exportar Dados</h3>
            </div>

            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Faça o download de todos os registros da plataforma (escolas, turmas, alunos, atividades, notas e mural) para backup ou relatórios.
            </p>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 mb-6">
              📊 <strong className="text-zinc-900">Inclui no backup:</strong> Escolas, turmas, alunos cadastrados, banco de atividades e notas atribuídas.
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={exportJSON}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Backup Completo (JSON)</span>
            </button>

            <button
              onClick={exportCSV}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center gap-2 transition"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Exportar Planilha (CSV)</span>
            </button>

            <button
              onClick={exportPDF}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>Gerar Relatório Imprimível (PDF)</span>
            </button>
          </div>
        </div>

        {/* Import Data */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-zinc-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-zinc-100">
              <Upload className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base text-zinc-900">Importar Dados</h3>
            </div>

            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Restaure um arquivo JSON de backup previamente salvo para alimentar a base de dados.
            </p>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
                dragActive
                  ? 'border-indigo-600 bg-indigo-50/40'
                  : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100/50'
              }`}
              onClick={() => document.getElementById('import-file-input')?.click()}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-600 opacity-80" />
              <p className="text-xs font-bold text-zinc-900">Arraste o arquivo JSON aqui</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">ou clique para procurar no computador</p>

              <input
                id="import-file-input"
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </div>

            {importStatus && (
              <div className={`mt-3 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                importStatus.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {importStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                )}
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Gestão do Estado do Banco:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (confirm('ATENÇÃO: Deseja realmente zerar todos os registros para iniciar o banco em branco em produção? (Recomendamos exportar um backup antes)')) {
                    clearAllData();
                  }
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition"
                title="Limpar todos os registros para cadastrar do zero em produção"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Zerar para Produção</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Database Statistics & Production Readiness */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-zinc-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-zinc-900">Estatísticas do Banco de Dados</h3>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pronto para Produção (Hostinger)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.schools.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Escolas</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.classes.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Turmas</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.students.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Alunos</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.activities.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Atividades</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.grades.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Notas</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.posts.length}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Mural</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
            <p className="text-2xl font-black text-zinc-900">{data.events?.length || 0}</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">Eventos</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 flex items-start gap-2.5 text-xs text-indigo-950">
          <Server className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-indigo-900">Persistência Centralizada em Nuvem Ativa (Google Cloud Firestore)</p>
            <p className="text-zinc-600 text-[11px]">
              Os dados são armazenados centralizadamente no banco de dados na nuvem com sincronização em tempo real multi-dispositivo. Qualquer computador ou navegador que acessar a aplicação visualiza e manipula exatamente a mesma base compartilhada de forma segura e instantânea.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
