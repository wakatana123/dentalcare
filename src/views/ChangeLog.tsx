import { useState } from 'react';
import { Filter } from 'lucide-react';
import { mockLogs } from '../data/mockData';

export default function ChangeLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const logDate = new Date(log.date);
    const matchesDateFrom = !dateFrom || logDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || logDate <= new Date(dateTo);

    return matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const getActionColor = (action: string) => {
    if (action.includes('Registro')) return 'bg-[#D7F0E7] text-[#2A6356]';
    if (action.includes('Creación')) return 'bg-[#FCF9EE] text-[#975926]';
    if (action.includes('Actualización')) return 'bg-[#F3FAF7] text-[#2A6356]';
    if (action.includes('Finalización')) return 'bg-[#D7F0E7] text-[#3B917A]';
    if (action.includes('Exportación')) return 'bg-[#FBF4F7] text-[#632A37]';
    return 'bg-[#F3FAF7] text-[#2A6356]';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Bitácora de Cambios</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">
          Historial de todas las acciones realizadas
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-[#2A6356]" />
          <h2 className="text-lg font-bold text-[#2A6356]">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2A6356] mb-2">Buscar</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en acciones o descripciones..."
              className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2A6356] mb-2">Fecha Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2A6356] mb-2">Fecha Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
            />
          </div>
        </div>

        {(searchTerm || dateFrom || dateTo) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-[#2A6356] opacity-70">
              Mostrando {filteredLogs.length} de {mockLogs.length} registros
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setDateFrom('');
                setDateTo('');
              }}
              className="text-sm text-[#632A37] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <div key={log.id}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-3 h-3 bg-[#2A6356] rounded-full"></div>
                  {index !== filteredLogs.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#D7F0E7] mt-2"></div>
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                        <span className="text-sm text-[#2A6356] opacity-70">{log.user}</span>
                      </div>
                      <p className="text-[#2A6356]">{log.description}</p>
                    </div>
                    <span className="text-sm text-[#2A6356] opacity-50 whitespace-nowrap">
                      {new Date(log.date).toLocaleString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2A6356] opacity-70">No se encontraron registros</p>
          </div>
        )}
      </div>
    </div>
  );
}
