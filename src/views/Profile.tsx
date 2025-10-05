import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { mockDentist } from '../data/mockData';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#2A6356]">Perfil</h1>
        <p className="text-[#2A6356] opacity-70 mt-1">Gestiona tu información personal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2A6356] to-[#3B917A] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {mockDentist.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#2A6356] text-white rounded-full hover:bg-[#234C43] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-[#2A6356] mt-4">{mockDentist.name}</h2>
            <p className="text-sm text-[#2A6356] opacity-70">{mockDentist.specialty}</p>
            <p className="text-xs text-[#2A6356] opacity-50 mt-1">
              Licencia: {mockDentist.license}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2A6356]">Información Personal</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm text-[#2A6356] hover:bg-[#F3FAF7] rounded-lg transition-colors"
              >
                Editar
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  defaultValue={mockDentist.name}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] disabled:bg-[#F3FAF7] disabled:opacity-70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Especialidad
                </label>
                <input
                  type="text"
                  defaultValue={mockDentist.specialty}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] disabled:bg-[#F3FAF7] disabled:opacity-70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={mockDentist.email}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] disabled:bg-[#F3FAF7] disabled:opacity-70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">Teléfono</label>
                <input
                  type="tel"
                  defaultValue={mockDentist.phone}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] disabled:bg-[#F3FAF7] disabled:opacity-70"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2A6356] mb-2">
                Número de Licencia
              </label>
              <input
                type="text"
                defaultValue={mockDentist.license}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356] disabled:bg-[#F3FAF7] disabled:opacity-70"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <h2 className="text-xl font-bold text-[#2A6356] mb-4">Seguridad</h2>
        <div className="flex items-center justify-between py-4 border-b border-[#D7F0E7]">
          <div>
            <p className="font-medium text-[#2A6356]">Contraseña</p>
            <p className="text-sm text-[#2A6356] opacity-70">Última actualización: hace 3 meses</p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 text-sm text-[#2A6356] hover:bg-[#F3FAF7] rounded-lg transition-colors"
          >
            Cambiar
          </button>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-[#2A6356]">Autenticación de dos factores</p>
            <p className="text-sm text-[#2A6356] opacity-70">
              Agrega una capa extra de seguridad
            </p>
          </div>
          <button className="px-4 py-2 text-sm text-[#2A6356] hover:bg-[#F3FAF7] rounded-lg transition-colors">
            Activar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-6">
        <h2 className="text-xl font-bold text-[#2A6356] mb-4">Preferencias</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#2A6356]">Notificaciones por email</p>
              <p className="text-sm text-[#2A6356] opacity-70">
                Recibe actualizaciones importantes por correo
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#D7F0E7] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2A6356] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A6356]"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#2A6356]">Notificaciones push</p>
              <p className="text-sm text-[#2A6356] opacity-70">
                Recibe notificaciones en tiempo real
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#D7F0E7] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2A6356] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A6356]"></div>
            </label>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-[#2A6356] mb-6">Cambiar Contraseña</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2A6356] mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-[#D7F0E7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6356]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 border border-[#D7F0E7] text-[#2A6356] rounded-lg hover:bg-[#F3FAF7] transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2A6356] text-white rounded-lg hover:bg-[#234C43] transition-colors">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
