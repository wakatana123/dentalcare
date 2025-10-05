import { useState } from 'react';
import { FileDown, User, FileText, Stethoscope, CreditCard, Paperclip, History } from 'lucide-react';
import { mockPatients, mockTreatments, mockPayments, mockAttachments, mockLogs } from '../data/mockData';
import Odontogram from '../components/Odontogram';

interface ClinicalRecordProps {
  patientId: string;
}

export default function ClinicalRecord({ patientId }: ClinicalRecordProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [odontogramType, setOdontogramType] = useState<'adult' | 'child'>('adult');

  const patient = mockPatients.find((p) => p.id === patientId);
  const patientTreatments = mockTreatments.filter((t) => t.patientId === patientId);
  const patientPayments = mockPayments.filter((p) => p.patientId === patientId);
  const patientAttachments = mockAttachments.filter((a) => a.patientId === patientId);
  const patientLogs = mockLogs.filter((l) => l.description.includes(patient?.name || ''));

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-[#2A6356] opacity-70">Paciente no encontrado</p>
      </div>
    );
  }

  const exportToHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Expediente - ${patient.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #2A6356; }
          h1 { color: #2A6356; border-bottom: 3px solid #2A6356; padding-bottom: 10px; }
          h2 { color: #2A6356; margin-top: 30px; }
          .info-row { display: flex; gap: 20px; margin: 10px 0; }
          .info-label { font-weight: bold; min-width: 150px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #D7F0E7; padding: 12px; text-align: left; }
          th { background-color: #D7F0E7; }
        </style>
      </head>
      <body>
        <h1>Expediente Clínico - ${patient.name}</h1>

        <h2>Datos Personales</h2>
        <div class="info-row"><span class="info-label">Edad:</span> ${patient.age} años</div>
        <div class="info-row"><span class="info-label">Teléfono:</span> ${patient.phone}</div>
        <div class="info-row"><span class="info-label">Email:</span> ${patient.email}</div>
        <div class="info-row"><span class="info-label">Dirección:</span> ${patient.address}</div>
        <div class="info-row"><span class="info-label">Contacto de Emergencia:</span> ${patient.emergencyContact}</div>

        <h2>Historial Médico</h2>
        <div class="info-row"><span class="info-label">Alergias:</span> ${patient.allergies.length > 0 ? patient.allergies.join(', ') : 'Ninguna'}</div>
        <div class="info-row"><span class="info-label">Condiciones:</span> ${patient.medicalHistory.length > 0 ? patient.medicalHistory.join(', ') : 'Ninguna'}</div>

        <h2>Tratamientos</h2>
        <table>
          <thead>
            <tr>
              <th>Tratamiento</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Estado</th>
              <th>Fecha Inicio</th>
            </tr>
          </thead>
          <tbody>
            ${patientTreatments.map(t => `
              <tr>
                <td>${t.name}</td>
                <td>${t.description}</td>
                <td>$${t.cost.toLocaleString()}</td>
                <td>${t.status === 'active' ? 'Activo' : t.status === 'completed' ? 'Completado' : 'Suspendido'}</td>
                <td>${t.startDate}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Pagos</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${patientPayments.map(p => `
              <tr>
                <td>${p.date}</td>
                <td>$${p.amount.toLocaleString()}</td>
                <td>${p.method}</td>
                <td>${p.status === 'paid' ? 'Pagado' : 'Pendiente'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <p style="margin-top: 40px; text-align: center; color: #666;">
          Generado el ${new Date().toLocaleDateString('es-MX')}
        </p>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expediente_${patient.name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'summary', label: 'Resumen', icon: User },
    { id: 'odontogram', label: 'Odontograma', icon: FileText },
    { id: 'treatments', label: 'Tratamientos', icon: Stethoscope },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'attachments', label: 'Adjuntos', icon: Paperclip },
    { id: 'log', label: 'Bitácora', icon: History },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2A6356]">{patient.name}</h1>
          <p className="text-[#2A6356] opacity-70 mt-1">
            Expediente Clínico #{patient.id}
          </p>
        </div>
        <button
          onClick={exportToHTML}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors"
        >
          <FileDown className="w-5 h-5" />
          Exportar Expediente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] overflow-hidden">
        <div className="flex overflow-x-auto border-b border-[#D7F0E7]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#2A6356] text-[#2A6356] bg-[#F3FAF7]'
                    : 'text-[#2A6356] opacity-60 hover:opacity-100 hover:bg-[#F3FAF7]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#2A6356] mb-4">Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Edad</span>
                    <p className="font-medium text-[#2A6356]">{patient.age} años</p>
                  </div>
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Teléfono</span>
                    <p className="font-medium text-[#2A6356]">{patient.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Email</span>
                    <p className="font-medium text-[#2A6356]">{patient.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Estado</span>
                    <p className="font-medium text-[#2A6356]">
                      {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-[#2A6356] opacity-70">Dirección</span>
                    <p className="font-medium text-[#2A6356]">{patient.address}</p>
                  </div>
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Contacto de Emergencia</span>
                    <p className="font-medium text-[#2A6356]">{patient.emergencyContact}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#2A6356] mb-4">Antecedentes Médicos</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Alergias</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {patient.allergies.length > 0 ? (
                        patient.allergies.map((allergy, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#FBF4F7] text-[#632A37] rounded-full text-sm"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#2A6356] opacity-70">Ninguna registrada</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-[#2A6356] opacity-70">Condiciones Médicas</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {patient.medicalHistory.length > 0 ? (
                        patient.medicalHistory.map((condition, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#FCF9EE] text-[#975926] rounded-full text-sm"
                          >
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#2A6356] opacity-70">Ninguna registrada</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'odontogram' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-[#2A6356]">Tipo de dentición:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOdontogramType('adult')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      odontogramType === 'adult'
                        ? 'bg-[#2A6356] text-white'
                        : 'bg-[#F3FAF7] text-[#2A6356] hover:bg-[#D7F0E7]'
                    }`}
                  >
                    Adulto (32 dientes)
                  </button>
                  <button
                    onClick={() => setOdontogramType('child')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      odontogramType === 'child'
                        ? 'bg-[#2A6356] text-white'
                        : 'bg-[#F3FAF7] text-[#2A6356] hover:bg-[#D7F0E7]'
                    }`}
                  >
                    Niño (20 dientes)
                  </button>
                </div>
              </div>
              <Odontogram
                type={odontogramType}
                onToothClick={setSelectedTooth}
                toothStatus={{
                  16: { condition: 'Caries', color: '#DEC468' },
                  36: { condition: 'Obturado', color: '#3B917A' },
                  38: { condition: 'Ausente', color: '#632A37' },
                }}
              />
              {selectedTooth && (
                <div className="mt-6 p-4 bg-[#F3FAF7] rounded-lg">
                  <h4 className="font-bold text-[#2A6356] mb-2">
                    Diente seleccionado: {selectedTooth}
                  </h4>
                  <p className="text-sm text-[#2A6356] opacity-70">
                    Clic para agregar diagnóstico o tratamiento
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'treatments' && (
            <div className="space-y-4">
              {patientTreatments.length > 0 ? (
                patientTreatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    className="p-4 border border-[#D7F0E7] rounded-lg hover:bg-[#F3FAF7] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2A6356]">{treatment.name}</h4>
                        <p className="text-sm text-[#2A6356] opacity-70 mt-1">
                          {treatment.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <span className="text-[#2A6356]">
                            <strong>Inicio:</strong> {treatment.startDate}
                          </span>
                          {treatment.endDate && (
                            <span className="text-[#2A6356]">
                              <strong>Fin:</strong> {treatment.endDate}
                            </span>
                          )}
                          <span className="text-[#2A6356]">
                            <strong>Costo:</strong> ${treatment.cost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          treatment.status === 'active'
                            ? 'bg-[#D7F0E7] text-[#2A6356]'
                            : treatment.status === 'completed'
                            ? 'bg-[#FCF9EE] text-[#975926]'
                            : 'bg-[#FBF4F7] text-[#632A37]'
                        }`}
                      >
                        {treatment.status === 'active'
                          ? 'Activo'
                          : treatment.status === 'completed'
                          ? 'Completado'
                          : 'Suspendido'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-[#2A6356] opacity-70">
                  No hay tratamientos registrados
                </p>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#D7F0E7]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                      Tratamiento
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2A6356]">
                      Monto
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
                  {patientPayments.map((payment) => {
                    const treatment = mockTreatments.find((t) => t.id === payment.treatmentId);
                    return (
                      <tr key={payment.id} className="border-b border-[#D7F0E7] hover:bg-[#F3FAF7]">
                        <td className="py-3 px-4 text-sm text-[#2A6356]">{payment.date}</td>
                        <td className="py-3 px-4 text-sm text-[#2A6356]">{treatment?.name}</td>
                        <td className="py-3 px-4 text-sm font-medium text-[#2A6356]">
                          ${payment.amount.toLocaleString()}
                        </td>
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
              {patientPayments.length === 0 && (
                <p className="text-center py-8 text-[#2A6356] opacity-70">
                  No hay pagos registrados
                </p>
              )}
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-3">
              {patientAttachments.length > 0 ? (
                patientAttachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-4 border border-[#D7F0E7] rounded-lg hover:bg-[#F3FAF7] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#F3FAF7] rounded-lg">
                        <Paperclip className="w-5 h-5 text-[#2A6356]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2A6356]">{attachment.name}</p>
                        <p className="text-sm text-[#2A6356] opacity-70">
                          {attachment.type} • Subido por {attachment.uploadedBy} •{' '}
                          {attachment.uploadDate}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm text-[#2A6356] hover:bg-[#D7F0E7] rounded-lg transition-colors">
                      Descargar
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-[#2A6356] opacity-70">
                  No hay archivos adjuntos
                </p>
              )}
              <button className="w-full mt-4 px-4 py-2 border-2 border-dashed border-[#D7F0E7] text-[#2A6356] rounded-lg hover:bg-[#F3FAF7] transition-colors">
                + Subir Archivo
              </button>
            </div>
          )}

          {activeTab === 'log' && (
            <div className="space-y-3">
              {patientLogs.length > 0 ? (
                patientLogs.map((log) => (
                  <div key={log.id} className="flex gap-3 p-4 bg-[#F3FAF7] rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#2A6356] rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-[#2A6356]">{log.action}</p>
                          <p className="text-sm text-[#2A6356] opacity-70 mt-1">{log.description}</p>
                        </div>
                        <span className="text-xs text-[#2A6356] opacity-50 whitespace-nowrap">
                          {new Date(log.date).toLocaleString('es-MX')}
                        </span>
                      </div>
                      <p className="text-xs text-[#2A6356] opacity-50 mt-2">{log.user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-[#2A6356] opacity-70">
                  No hay registros de actividad
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
