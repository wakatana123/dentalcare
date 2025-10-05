import { useState } from 'react';
import Odontogram from '../components/Odontogram';
import { X } from 'lucide-react';

export default function OdontogramView() {
  const [odontogramType, setOdontogramType] = useState<'adult' | 'child'>('adult');
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Odontograma</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">
          Vista interactiva del estado dental del paciente
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
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
          onToothClick={handleToothClick}
          toothStatus={{
            16: { condition: 'Caries', color: '#DEC468' },
            36: { condition: 'Obturado', color: '#3B917A' },
            38: { condition: 'Ausente', color: '#632A37' },
            11: { condition: 'Sano', color: '#FFFFFF' },
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <h2 className="text-xl font-bold text-[#2A6356] mb-4">Diagnósticos Registrados</h2>
          <div className="space-y-3">
            <div className="p-4 bg-[#FCF9EE] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#2A6356]">Diente 16</span>
                <span className="px-2 py-1 bg-[#DEC468] text-white rounded text-xs">Caries</span>
              </div>
              <p className="text-sm text-[#2A6356] opacity-70">
                Caries oclusal detectada en primer molar superior derecho
              </p>
              <p className="text-xs text-[#2A6356] opacity-50 mt-2">Registrado: 03/09/2025</p>
            </div>

            <div className="p-4 bg-[#F3FAF7] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#2A6356]">Diente 36</span>
                <span className="px-2 py-1 bg-[#3B917A] text-white rounded text-xs">Obturado</span>
              </div>
              <p className="text-sm text-[#2A6356] opacity-70">
                Restauración con amalgama en primer molar inferior derecho
              </p>
              <p className="text-xs text-[#2A6356] opacity-50 mt-2">Registrado: 15/08/2025</p>
            </div>

            <div className="p-4 bg-[#FBF4F7] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#2A6356]">Diente 38</span>
                <span className="px-2 py-1 bg-[#632A37] text-white rounded text-xs">Ausente</span>
              </div>
              <p className="text-sm text-[#2A6356] opacity-70">
                Tercer molar inferior derecho extraído
              </p>
              <p className="text-xs text-[#2A6356] opacity-50 mt-2">Registrado: 20/07/2025</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <h2 className="text-xl font-bold text-[#2A6356] mb-4">Instrucciones</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-[#2A6356] text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-[#2A6356]">Selecciona un diente</p>
                <p className="text-sm text-[#2A6356] opacity-70">
                  Haz clic en cualquier diente del odontograma
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-[#2A6356] text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-[#2A6356]">Registra el diagnóstico</p>
                <p className="text-sm text-[#2A6356] opacity-70">
                  Agrega información sobre el estado del diente
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-[#2A6356] text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-[#2A6356]">Asocia tratamientos</p>
                <p className="text-sm text-[#2A6356] opacity-70">
                  Vincula el diagnóstico con un plan de tratamiento
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#F3FAF7] rounded-lg">
            <p className="text-sm font-medium text-[#2A6356] mb-2">Leyenda de Colores</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-white border-2 border-[#2A6356]"></div>
                <span className="text-[#2A6356]">Sano</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#DEC468]"></div>
                <span className="text-[#2A6356]">Caries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#3B917A]"></div>
                <span className="text-[#2A6356]">Obturado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#632A37]"></div>
                <span className="text-[#2A6356]">Ausente</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTooth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2A6356]">
                Diente {selectedTooth}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedTooth(null);
                }}
                className="p-2 hover:bg-[#F3FAF7] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#2A6356]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Condición
                </label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="sano">Sano</option>
                  <option value="caries">Caries</option>
                  <option value="obturado">Obturado</option>
                  <option value="ausente">Ausente</option>
                  <option value="corona">Corona</option>
                  <option value="endodoncia">Endodoncia</option>
                  <option value="fractura">Fractura</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Diagnóstico
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] min-h-[100px]"
                  placeholder="Describe el diagnóstico detallado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Tratamiento Sugerido
                </label>
                <select className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]">
                  <option value="">Seleccionar tratamiento</option>
                  <option value="limpieza">Limpieza</option>
                  <option value="empaste">Empaste</option>
                  <option value="endodoncia">Endodoncia</option>
                  <option value="extraccion">Extracción</option>
                  <option value="corona">Corona</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedTooth(null);
                }}
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
