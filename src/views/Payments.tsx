import { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { mockPayments, mockPatients, mockTreatments } from '../data/mockData';

export default function Payments() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  const filteredPayments =
    selectedPatient === 'all'
      ? mockPayments
      : mockPayments.filter((p) => p.patientId === selectedPatient);

  const totalPaid = filteredPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = filteredPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2A6356]">Pagos</h1>
          <p className="text-[#2A6356] opacity-70 mt-1">Gestiona los pagos de tratamientos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Registrar Pago</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#D7F0E7] rounded-lg">
              <DollarSign className="w-6 h-6 text-[#2A6356]" />
            </div>
            <p className="text-sm text-[#2A6356] opacity-70 font-medium">Total Recibido</p>
          </div>
          <p className="text-3xl font-bold text-[#2A6356]">${totalPaid.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#FBF4F7] rounded-lg">
              <DollarSign className="w-6 h-6 text-[#632A37]" />
            </div>
            <p className="text-sm text-[#2A6356] opacity-70 font-medium">Total Pendiente</p>
          </div>
          <p className="text-3xl font-bold text-[#632A37]">${totalPending.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#FCF9EE] rounded-lg">
              <DollarSign className="w-6 h-6 text-[#DEC468]" />
            </div>
            <p className="text-sm text-[#2A6356] opacity-70 font-medium">Total</p>
          </div>
          <p className="text-3xl font-bold text-[#2A6356]">
            ${(totalPaid + totalPending).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2A6356] mb-2">
            Filtrar por paciente
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
          >
            <option value="all">Todos los pacientes</option>
            {mockPatients
              .filter((p) => p.status === 'active')
              .map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
          </select>
        </div>

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
                  Monto
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Fecha
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Método
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const patient = mockPatients.find((p) => p.id === payment.patientId);
                const treatment = mockTreatments.find((t) => t.id === payment.treatmentId);
                return (
                  <tr key={payment.id} className="border-b border-[#D7F0E7] hover:bg-[#F3FAF7]">
                    <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                      {patient?.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment?.name}</td>
                    <td className="py-3 px-4 text-sm font-bold text-[#2A6356]">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">{payment.date}</td>
                    <td className="py-3 px-4 text-sm text-[#2A6356]">{payment.method}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'paid'
                            ? 'bg-[#D7F0E7] text-[#2A6356]'
                            : 'bg-[#FBF4F7] text-[#632A37]'
                        }`}
                      >
                        {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2A6356] opacity-70">No hay pagos registrados</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-[#2A6356] mb-6">Registrar Pago</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Paciente</label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="">Seleccionar paciente</option>
                  {mockPatients
                    .filter((p) => p.status === 'active')
                    .map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Tratamiento
                </label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="">Seleccionar tratamiento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Monto</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  placeholder="Ej: 1500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Método de Pago
                </label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Fecha</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Estado</label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="paid">Pagado</option>
                  <option value="pending">Pendiente</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-[#D7F0E7] text-[#2A6356] rounded-lg hover:bg-[#F3FAF7] transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
