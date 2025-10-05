import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { mockTreatments, mockPatients } from '../data/mockData';

export default function TreatmentPlan() {
  const [showModal, setShowModal] = useState(false);

  const activeTreatments = mockTreatments.filter((t) => t.status === 'active');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2A6356]">Plan de Tratamiento</h1>
          <p className="text-[#2A6356] opacity-70 mt-1">
            Gestiona los tratamientos activos
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Agregar Tratamiento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTreatments.map((treatment) => {
          const patient = mockPatients.find((p) => p.id === treatment.patientId);
          return (
            <div
              key={treatment.id}
              className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2A6356]">{treatment.name}</h3>
                  <p className="text-sm text-[#2A6356] opacity-70 mt-1">
                    Paciente: {patient?.name}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#D7F0E7] text-[#2A6356] rounded-full text-xs font-medium">
                  Activo
                </span>
              </div>

              <p className="text-[#2A6356] opacity-80 mb-4">{treatment.description}</p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D7F0E7]">
                <div>
                  <span className="text-sm text-[#2A6356] opacity-70">Fecha de Inicio</span>
                  <p className="font-medium text-[#2A6356]">{treatment.startDate}</p>
                </div>
                <div>
                  <span className="text-sm text-[#2A6356] opacity-70">Costo</span>
                  <p className="font-bold text-[#2A6356]">${treatment.cost.toLocaleString()}</p>
                </div>
                {treatment.teeth && treatment.teeth.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-sm text-[#2A6356] opacity-70">Dientes afectados</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {treatment.teeth.map((tooth) => (
                        <span
                          key={tooth}
                          className="px-2 py-1 bg-[#F3FAF7] text-[#2A6356] rounded text-sm font-medium"
                        >
                          {tooth}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-2 bg-[#F3FAF7] text-[#2A6356] rounded-lg hover:bg-[#D7F0E7] transition-colors text-sm font-medium">
                  Ver Detalles
                </button>
                <button className="flex-1 px-4 py-2 bg-[#DEC468] text-white rounded-lg hover:bg-[#D7B148] transition-colors text-sm font-medium">
                  Marcar Completado
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeTreatments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-12 text-center">
          <p className="text-[#2A6356] opacity-70">No hay tratamientos activos</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2A6356]">Agregar Tratamiento</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F3FAF7] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#2A6356]" />
              </button>
            </div>

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
                  Tipo de Tratamiento
                </label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="">Seleccionar tratamiento</option>
                  <option value="limpieza">Limpieza Dental</option>
                  <option value="empaste">Empaste</option>
                  <option value="endodoncia">Endodoncia</option>
                  <option value="extraccion">Extracción</option>
                  <option value="ortodoncia">Ortodoncia</option>
                  <option value="protesis">Prótesis</option>
                  <option value="blanqueamiento">Blanqueamiento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Descripción</label>
                <textarea
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] min-h-[100px]"
                  placeholder="Describe el tratamiento a realizar..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">
                    Costo Total
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                    placeholder="Ej: 1500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Estado</label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="active">Activo</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Dientes (opcional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  placeholder="Ej: 11, 12, 13"
                />
                <p className="text-xs text-[#2A6356] opacity-70 mt-1">
                  Separa los números de dientes con comas
                </p>
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
