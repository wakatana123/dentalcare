import { useState } from 'react';
import { Upload, File, Image, Download } from 'lucide-react';
import { mockAttachments, mockPatients } from '../data/mockData';

export default function Attachments() {
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  const filteredAttachments =
    selectedPatient === 'all'
      ? mockAttachments
      : mockAttachments.filter((a) => a.patientId === selectedPatient);

  const getFileIcon = (type: string) => {
    if (type === 'Imagen') return Image;
    return File;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Adjuntos</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">
          Gestiona los archivos de tus pacientes
        </p>
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
            {mockPatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 p-8 border-2 border-dashed border-[#D7F0E7] rounded-lg hover:border-[#2A6356] hover:bg-[#F3FAF7] transition-colors cursor-pointer">
          <div className="text-center">
            <Upload className="w-12 h-12 text-[#2A6356] mx-auto mb-4 opacity-50" />
            <p className="text-[#2A6356] font-medium mb-1">Subir Archivo</p>
            <p className="text-sm text-[#2A6356] opacity-70">
              Arrastra archivos aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-[#2A6356] opacity-50 mt-2">
              Formatos soportados: JPG, PNG, PDF, DOCX (Máx. 10MB)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttachments.map((attachment) => {
            const patient = mockPatients.find((p) => p.id === attachment.patientId);
            const IconComponent = getFileIcon(attachment.type);

            return (
              <div
                key={attachment.id}
                className="border border-[#D7F0E7] rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-3 bg-[#F3FAF7] rounded-lg">
                    <IconComponent className="w-6 h-6 text-[#2A6356]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#2A6356] truncate">{attachment.name}</p>
                    <p className="text-xs text-[#2A6356] opacity-70 mt-1">{patient?.name}</p>
                    <p className="text-xs text-[#2A6356] opacity-50 mt-1">
                      {attachment.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#D7F0E7] flex items-center justify-between">
                  <span className="text-xs text-[#2A6356] opacity-70">{attachment.type}</span>
                  <button className="flex items-center gap-1 px-3 py-1 text-xs text-[#2A6356] hover:bg-[#F3FAF7] rounded-lg transition-colors">
                    <Download className="w-3 h-3" />
                    Descargar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAttachments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2A6356] opacity-70">No hay archivos adjuntos</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <h2 className="text-xl font-bold text-[#2A6356] mb-4">Estadísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F3FAF7] rounded-lg">
            <p className="text-sm text-[#2A6356] opacity-70">Total de Archivos</p>
            <p className="text-2xl font-bold text-[#2A6356] mt-2">
              {filteredAttachments.length}
            </p>
          </div>
          <div className="p-4 bg-[#F3FAF7] rounded-lg">
            <p className="text-sm text-[#2A6356] opacity-70">Imágenes</p>
            <p className="text-2xl font-bold text-[#2A6356] mt-2">
              {filteredAttachments.filter((a) => a.type === 'Imagen').length}
            </p>
          </div>
          <div className="p-4 bg-[#F3FAF7] rounded-lg">
            <p className="text-sm text-[#2A6356] opacity-70">Documentos</p>
            <p className="text-2xl font-bold text-[#2A6356] mt-2">
              {filteredAttachments.filter((a) => a.type === 'Documento').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
