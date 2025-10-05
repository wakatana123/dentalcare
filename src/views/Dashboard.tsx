import { Users, Stethoscope, CreditCard, History } from 'lucide-react';
import { mockPatients, mockTreatments, mockPayments, mockLogs } from '../data/mockData';

export default function Dashboard() {
  const activePatients = mockPatients.filter((p) => p.status === 'active').length;
  const activeTreatments = mockTreatments.filter((t) => t.status === 'active').length;
  const pendingPayments = mockPayments.filter((p) => p.status === 'pending').length;
  const recentLogs = mockLogs.slice(0, 5);

  const totalPendingAmount = mockPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const cards = [
    {
      title: 'Pacientes Activos',
      value: activePatients,
      icon: Users,
      color: 'bg-[#2A6356]',
      lightColor: 'bg-[#D7F0E7]',
    },
    {
      title: 'Tratamientos Activos',
      value: activeTreatments,
      icon: Stethoscope,
      color: 'bg-[#DEC468]',
      lightColor: 'bg-[#FCF9EE]',
    },
    {
      title: 'Pagos Pendientes',
      value: pendingPayments,
      icon: CreditCard,
      color: 'bg-[#632A37]',
      lightColor: 'bg-[#FBF4F7]',
    },
    {
      title: 'Registros Totales',
      value: mockLogs.length,
      icon: History,
      color: 'bg-[#3B917A]',
      lightColor: 'bg-[#D7F0E7]',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Dashboard</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">Resumen de la actividad clínica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#2A6356] opacity-70 font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-[#2A6356] mt-2">{card.value}</p>
                </div>
                <div className={`${card.lightColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <h2 className="text-xl font-bold text-[#2A6356] mb-4">Pagos Pendientes</h2>
          <div className="space-y-3">
            {mockPayments
              .filter((p) => p.status === 'pending')
              .slice(0, 3)
              .map((payment) => {
                const patient = mockPatients.find((p) => p.id === payment.patientId);
                const treatment = mockTreatments.find((t) => t.id === payment.treatmentId);
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-[#FBF4F7] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[#2A6356]">{patient?.name}</p>
                      <p className="text-sm text-[#2A6356] opacity-70">{treatment?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#632A37]">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-[#2A6356] opacity-70">{payment.date}</p>
                    </div>
                  </div>
                );
              })}
            {pendingPayments === 0 && (
              <p className="text-center py-8 text-[#2A6356] opacity-70">
                No hay pagos pendientes
              </p>
            )}
          </div>
          {pendingPayments > 0 && (
            <div className="mt-4 pt-4 border-t border-[#D7F0E7]">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#2A6356]">Total Pendiente</p>
                <p className="text-xl font-bold text-[#632A37]">
                  ${totalPendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <h2 className="text-xl font-bold text-[#2A6356] mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex gap-3 p-3 bg-[#F3FAF7] rounded-lg">
                <div className="flex-shrink-0 w-2 h-2 bg-[#2A6356] rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#2A6356] text-sm">{log.action}</p>
                  <p className="text-xs text-[#2A6356] opacity-70 truncate">{log.description}</p>
                  <p className="text-xs text-[#2A6356] opacity-50 mt-1">
                    {new Date(log.date).toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <h2 className="text-xl font-bold text-[#2A6356] mb-4">Tratamientos Activos</h2>
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
                  Fecha Inicio
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Costo
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTreatments
                .filter((t) => t.status === 'active')
                .map((treatment) => {
                  const patient = mockPatients.find((p) => p.id === treatment.patientId);
                  return (
                    <tr key={treatment.id} className="border-b border-[#D7F0E7] hover:bg-[#F3FAF7]">
                      <td className="py-3 px-4 text-sm text-[#2A6356]">{patient?.name}</td>
                      <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment.name}</td>
                      <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment.startDate}</td>
                      <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                        ${treatment.cost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-[#D7F0E7] text-[#2A6356] rounded-full text-xs font-medium">
                          Activo
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
