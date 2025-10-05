import { useState } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import { mockPatients, Patient } from '../data/mockData';

interface PatientsProps {
  onSelectPatient: (patientId: string) => void;
}

export default function Patients({ onSelectPatient }: PatientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2A6356]">Pacientes</h1>
          <p className="text-[#2A6356] opacity-70 mt-1">
            Gestiona la información de tus pacientes
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nuevo Paciente</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A6356] opacity-50" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D7F0E7]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Nombre
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">Edad</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Teléfono
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Estado
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-[#D7F0E7] hover:bg-[#F3FAF7]">
                  <td className="py-3 px-4 text-sm text-[#2A6356]">#{patient.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                    {patient.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#2A6356]">{patient.age}</td>
                  <td className="py-3 px-4 text-sm text-[#2A6356]">{patient.phone}</td>
                  <td className="py-3 px-4 text-sm text-[#2A6356]">{patient.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active'
                          ? 'bg-[#D7F0E7] text-[#2A6356]'
                          : 'bg-[#FBF4F7] text-[#632A37]'
                      }`}
                    >
                      {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onSelectPatient(patient.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-[#2A6356] hover:bg-[#D7F0E7] rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2A6356] opacity-70">No se encontraron pacientes</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-[#2A6356] mb-6">Nuevo Paciente</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">Edad</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                    placeholder="Ej: 30"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                    placeholder="Ej: +52 55 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2A6356] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                    placeholder="Ej: email@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Dirección</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  placeholder="Ej: Calle Reforma 123, CDMX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Contacto de Emergencia
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                  placeholder="Ej: +52 55 9876 5432"
                />
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
