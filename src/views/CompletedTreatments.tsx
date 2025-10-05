import { mockTreatments, mockPatients } from '../data/mockData';

export default function CompletedTreatments() {
  const completedTreatments = mockTreatments.filter((t) => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Tratamientos Realizados</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">
          Historial de procedimientos completados
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D7F0E7]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Paciente
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Tratamiento
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Descripción
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Fecha Inicio
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Fecha Fin
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Costo
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Responsable
                </th>
              </tr>
            </thead>
            <tbody>
              {completedTreatments.map((treatment) => {
                const patient = mockPatients.find((p) => p.id === treatment.patientId);
                return (
                  <tr key={treatment.id} className="border-b border-[#D7F0E7] hover:bg-[#F3FAF7]">
                    <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                      {patient?.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment.name}</td>
                    <td className="py-3 px-4 text-sm text-[#2A6356] max-w-xs truncate">
                      {treatment.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment.startDate}</td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">
                      {treatment.endDate || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                      ${treatment.cost.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">Dr. María González</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {completedTreatments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2A6356] opacity-70">No hay tratamientos completados</p>
          </div>
        )}
      </div>

      {completedTreatments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <h2 className="text-xl font-bold text-[#2A6356] mb-4">Resumen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-[#F3FAF7] rounded-lg">
              <p className="text-sm text-[#2A6356] opacity-70">Total de Procedimientos</p>
              <p className="text-3xl font-bold text-[#2A6356] mt-2">
                {completedTreatments.length}
              </p>
            </div>
            <div className="p-4 bg-[#F3FAF7] rounded-lg">
              <p className="text-sm text-[#2A6356] opacity-70">Ingresos Totales</p>
              <p className="text-3xl font-bold text-[#2A6356] mt-2">
                ${completedTreatments.reduce((sum, t) => sum + t.cost, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-[#F3FAF7] rounded-lg">
              <p className="text-sm text-[#2A6356] opacity-70">Promedio por Tratamiento</p>
              <p className="text-3xl font-bold text-[#2A6356] mt-2">
                $
                {Math.round(
                  completedTreatments.reduce((sum, t) => sum + t.cost, 0) /
                    completedTreatments.length
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
