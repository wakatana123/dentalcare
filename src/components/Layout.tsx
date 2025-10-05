import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, ClipboardList, Smile, Stethoscope, CreditCard, Paperclip, History, CircleUser as UserCircle, Bell, LogOut, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Pacientes', icon: Users },
  { id: 'clinical-record', label: 'Expediente Clínico', icon: FileText },
  { id: 'treatment-plan', label: 'Plan de Tratamiento', icon: ClipboardList },
  { id: 'odontogram', label: 'Odontograma', icon: Smile },
  { id: 'completed-treatments', label: 'Tratamientos Realizados', icon: Stethoscope },
  { id: 'payments', label: 'Pagos', icon: CreditCard },
  { id: 'attachments', label: 'Adjuntos', icon: Paperclip },
  { id: 'changelog', label: 'Bitácora de Cambios', icon: History },
  { id: 'profile', label: 'Perfil', icon: UserCircle },
];

export default function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3FAF7]">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#D7F0E7] z-20 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-[#F3FAF7] rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-[#2A6356]" />
            ) : (
              <Menu className="w-5 h-5 text-[#2A6356]" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Smile className="w-8 h-8 text-[#2A6356]" />
            <span className="text-xl font-bold text-[#2A6356]">DentalCare</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-[#F3FAF7] rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#2A6356]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#632A37] rounded-full"></span>
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#F3FAF7] rounded-lg">
            <UserCircle className="w-5 h-5 text-[#2A6356]" />
            <span className="text-sm font-medium text-[#2A6356]">Dr. María González</span>
          </div>
          <button className="p-2 hover:bg-[#F3FAF7] rounded-lg transition-colors">
            <LogOut className="w-5 h-5 text-[#632A37]" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-[#D7F0E7] z-20 transform transition-transform lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2A6356] text-white'
                    : 'text-[#2A6356] hover:bg-[#F3FAF7]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
