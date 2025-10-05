export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  address: string;
  emergencyContact: string;
  allergies: string[];
  medicalHistory: string[];
}

export interface Treatment {
  id: string;
  patientId: string;
  name: string;
  description: string;
  cost: number;
  status: 'active' | 'completed' | 'suspended';
  startDate: string;
  endDate?: string;
  teeth?: number[];
}

export interface Payment {
  id: string;
  patientId: string;
  treatmentId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  method: string;
}

export interface Attachment {
  id: string;
  patientId: string;
  name: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface LogEntry {
  id: string;
  user: string;
  action: string;
  description: string;
  date: string;
}

export interface ToothStatus {
  toothNumber: number;
  condition?: string;
  treatments?: string[];
  notes?: string;
}

export const mockDentist = {
  id: '1',
  name: 'Dr. María González',
  specialty: 'Odontología General',
  email: 'maria.gonzalez@clinica.com',
  phone: '+52 55 1234 5678',
  license: 'DEN-12345',
};

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Juan Pérez Martínez',
    age: 35,
    phone: '+52 55 9876 5432',
    email: 'juan.perez@email.com',
    status: 'active',
    address: 'Calle Reforma 123, CDMX',
    emergencyContact: '+52 55 1111 2222',
    allergies: ['Penicilina'],
    medicalHistory: ['Hipertensión'],
  },
  {
    id: '2',
    name: 'Ana López García',
    age: 28,
    phone: '+52 55 8765 4321',
    email: 'ana.lopez@email.com',
    status: 'active',
    address: 'Av. Insurgentes 456, CDMX',
    emergencyContact: '+52 55 2222 3333',
    allergies: [],
    medicalHistory: [],
  },
  {
    id: '3',
    name: 'Carlos Ramírez Torres',
    age: 42,
    phone: '+52 55 7654 3210',
    email: 'carlos.ramirez@email.com',
    status: 'active',
    address: 'Calle Juárez 789, CDMX',
    emergencyContact: '+52 55 3333 4444',
    allergies: ['Látex'],
    medicalHistory: ['Diabetes tipo 2'],
  },
  {
    id: '4',
    name: 'María Fernández Silva',
    age: 31,
    phone: '+52 55 6543 2109',
    email: 'maria.fernandez@email.com',
    status: 'active',
    address: 'Av. Chapultepec 321, CDMX',
    emergencyContact: '+52 55 4444 5555',
    allergies: [],
    medicalHistory: [],
  },
  {
    id: '5',
    name: 'Roberto Sánchez Ruiz',
    age: 55,
    phone: '+52 55 5432 1098',
    email: 'roberto.sanchez@email.com',
    status: 'active',
    address: 'Calle Madero 654, CDMX',
    emergencyContact: '+52 55 5555 6666',
    allergies: ['Aspirina'],
    medicalHistory: ['Cardiopatía'],
  },
  {
    id: '6',
    name: 'Laura Martínez Díaz',
    age: 24,
    phone: '+52 55 4321 0987',
    email: 'laura.martinez@email.com',
    status: 'active',
    address: 'Av. Revolución 987, CDMX',
    emergencyContact: '+52 55 6666 7777',
    allergies: [],
    medicalHistory: [],
  },
  {
    id: '7',
    name: 'Pedro Gómez Hernández',
    age: 38,
    phone: '+52 55 3210 9876',
    email: 'pedro.gomez@email.com',
    status: 'inactive',
    address: 'Calle Hidalgo 147, CDMX',
    emergencyContact: '+52 55 7777 8888',
    allergies: [],
    medicalHistory: ['Asma'],
  },
  {
    id: '8',
    name: 'Carmen Rodríguez Castro',
    age: 47,
    phone: '+52 55 2109 8765',
    email: 'carmen.rodriguez@email.com',
    status: 'active',
    address: 'Av. Universidad 258, CDMX',
    emergencyContact: '+52 55 8888 9999',
    allergies: ['Ibuprofeno'],
    medicalHistory: [],
  },
  {
    id: '9',
    name: 'Luis Torres Morales',
    age: 29,
    phone: '+52 55 1098 7654',
    email: 'luis.torres@email.com',
    status: 'active',
    address: 'Calle Obregón 369, CDMX',
    emergencyContact: '+52 55 9999 0000',
    allergies: [],
    medicalHistory: [],
  },
  {
    id: '10',
    name: 'Sofía Jiménez Vargas',
    age: 33,
    phone: '+52 55 0987 6543',
    email: 'sofia.jimenez@email.com',
    status: 'active',
    address: 'Av. Constituyentes 741, CDMX',
    emergencyContact: '+52 55 0000 1111',
    allergies: [],
    medicalHistory: ['Gastritis'],
  },
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    patientId: '1',
    name: 'Limpieza Dental',
    description: 'Profilaxis y limpieza profunda',
    cost: 800,
    status: 'completed',
    startDate: '2025-08-15',
    endDate: '2025-08-15',
    teeth: [11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    id: '2',
    patientId: '1',
    name: 'Empaste',
    description: 'Restauración con resina en molar',
    cost: 1500,
    status: 'active',
    startDate: '2025-09-10',
    teeth: [36],
  },
  {
    id: '3',
    patientId: '2',
    name: 'Endodoncia',
    description: 'Tratamiento de conductos',
    cost: 4500,
    status: 'active',
    startDate: '2025-09-05',
    teeth: [16],
  },
  {
    id: '4',
    patientId: '3',
    name: 'Extracción',
    description: 'Extracción de muela del juicio',
    cost: 2000,
    status: 'completed',
    startDate: '2025-07-20',
    endDate: '2025-07-20',
    teeth: [38],
  },
  {
    id: '5',
    patientId: '4',
    name: 'Ortodoncia',
    description: 'Brackets metálicos superiores e inferiores',
    cost: 25000,
    status: 'active',
    startDate: '2025-06-01',
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    patientId: '1',
    treatmentId: '1',
    amount: 800,
    date: '2025-08-15',
    status: 'paid',
    method: 'Efectivo',
  },
  {
    id: '2',
    patientId: '1',
    treatmentId: '2',
    amount: 750,
    date: '2025-09-10',
    status: 'paid',
    method: 'Tarjeta',
  },
  {
    id: '3',
    patientId: '1',
    treatmentId: '2',
    amount: 750,
    date: '2025-10-10',
    status: 'pending',
    method: 'Tarjeta',
  },
  {
    id: '4',
    patientId: '2',
    treatmentId: '3',
    amount: 2250,
    date: '2025-09-05',
    status: 'paid',
    method: 'Transferencia',
  },
  {
    id: '5',
    patientId: '2',
    treatmentId: '3',
    amount: 2250,
    date: '2025-10-05',
    status: 'pending',
    method: 'Transferencia',
  },
  {
    id: '6',
    patientId: '3',
    treatmentId: '4',
    amount: 2000,
    date: '2025-07-20',
    status: 'paid',
    method: 'Efectivo',
  },
];

export const mockAttachments: Attachment[] = [
  {
    id: '1',
    patientId: '1',
    name: 'radiografia_panoramica.jpg',
    type: 'Imagen',
    uploadDate: '2025-08-10',
    uploadedBy: 'Dr. María González',
  },
  {
    id: '2',
    patientId: '1',
    name: 'consentimiento_informado.pdf',
    type: 'Documento',
    uploadDate: '2025-08-14',
    uploadedBy: 'Dr. María González',
  },
  {
    id: '3',
    patientId: '1',
    name: 'foto_intraoral.jpg',
    type: 'Imagen',
    uploadDate: '2025-09-01',
    uploadedBy: 'Dr. María González',
  },
  {
    id: '4',
    patientId: '2',
    name: 'radiografia_periapical.jpg',
    type: 'Imagen',
    uploadDate: '2025-09-01',
    uploadedBy: 'Dr. María González',
  },
  {
    id: '5',
    patientId: '2',
    name: 'plan_tratamiento.pdf',
    type: 'Documento',
    uploadDate: '2025-09-03',
    uploadedBy: 'Dr. María González',
  },
  {
    id: '6',
    patientId: '2',
    name: 'presupuesto.pdf',
    type: 'Documento',
    uploadDate: '2025-09-03',
    uploadedBy: 'Dr. María González',
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    user: 'Dr. María González',
    action: 'Registro de paciente',
    description: 'Nuevo paciente Juan Pérez Martínez registrado',
    date: '2025-08-10T10:30:00',
  },
  {
    id: '2',
    user: 'Dr. María González',
    action: 'Creación de tratamiento',
    description: 'Limpieza Dental para Juan Pérez Martínez',
    date: '2025-08-14T14:15:00',
  },
  {
    id: '3',
    user: 'Dr. María González',
    action: 'Registro de pago',
    description: 'Pago de $800 para tratamiento de Limpieza Dental',
    date: '2025-08-15T09:45:00',
  },
  {
    id: '4',
    user: 'Dr. María González',
    action: 'Actualización de expediente',
    description: 'Adjunto radiografía panorámica de Juan Pérez Martínez',
    date: '2025-08-10T11:00:00',
  },
  {
    id: '5',
    user: 'Dr. María González',
    action: 'Finalización de tratamiento',
    description: 'Limpieza Dental completada para Juan Pérez Martínez',
    date: '2025-08-15T16:30:00',
  },
  {
    id: '6',
    user: 'Dr. María González',
    action: 'Registro de paciente',
    description: 'Nuevo paciente Ana López García registrado',
    date: '2025-09-01T09:00:00',
  },
  {
    id: '7',
    user: 'Dr. María González',
    action: 'Creación de tratamiento',
    description: 'Endodoncia para Ana López García',
    date: '2025-09-03T10:30:00',
  },
  {
    id: '8',
    user: 'Dr. María González',
    action: 'Actualización de odontograma',
    description: 'Diagnóstico agregado en diente 16 para Ana López García',
    date: '2025-09-03T11:00:00',
  },
  {
    id: '9',
    user: 'Dr. María González',
    action: 'Registro de pago',
    description: 'Anticipo de $2,250 para Endodoncia',
    date: '2025-09-05T15:20:00',
  },
  {
    id: '10',
    user: 'Dr. María González',
    action: 'Creación de tratamiento',
    description: 'Empaste para Juan Pérez Martínez',
    date: '2025-09-10T08:30:00',
  },
  {
    id: '11',
    user: 'Dr. María González',
    action: 'Registro de paciente',
    description: 'Nuevo paciente Carlos Ramírez Torres registrado',
    date: '2025-07-15T13:00:00',
  },
  {
    id: '12',
    user: 'Dr. María González',
    action: 'Creación de tratamiento',
    description: 'Extracción para Carlos Ramírez Torres',
    date: '2025-07-18T14:00:00',
  },
  {
    id: '13',
    user: 'Dr. María González',
    action: 'Finalización de tratamiento',
    description: 'Extracción completada para Carlos Ramírez Torres',
    date: '2025-07-20T11:30:00',
  },
  {
    id: '14',
    user: 'Dr. María González',
    action: 'Registro de pago',
    description: 'Pago de $2,000 para Extracción',
    date: '2025-07-20T12:00:00',
  },
  {
    id: '15',
    user: 'Dr. María González',
    action: 'Registro de paciente',
    description: 'Nuevo paciente María Fernández Silva registrado',
    date: '2025-06-01T10:00:00',
  },
  {
    id: '16',
    user: 'Dr. María González',
    action: 'Creación de tratamiento',
    description: 'Ortodoncia para María Fernández Silva',
    date: '2025-06-01T11:00:00',
  },
  {
    id: '17',
    user: 'Dr. María González',
    action: 'Actualización de perfil',
    description: 'Actualización de información de contacto',
    date: '2025-09-25T16:00:00',
  },
  {
    id: '18',
    user: 'Dr. María González',
    action: 'Exportación de expediente',
    description: 'Expediente de Juan Pérez Martínez exportado a HTML',
    date: '2025-09-28T10:15:00',
  },
  {
    id: '19',
    user: 'Dr. María González',
    action: 'Actualización de expediente',
    description: 'Alergias actualizadas para Carlos Ramírez Torres',
    date: '2025-07-15T13:30:00',
  },
  {
    id: '20',
    user: 'Dr. María González',
    action: 'Registro de pago',
    description: 'Pago de $750 para tratamiento de Empaste',
    date: '2025-09-10T09:00:00',
  },
];
