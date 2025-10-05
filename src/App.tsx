import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Patients from './views/Patients';
import ClinicalRecord from './views/ClinicalRecord';
import TreatmentPlan from './views/TreatmentPlan';
import OdontogramView from './views/OdontogramView';
import CompletedTreatments from './views/CompletedTreatments';
import Payments from './views/Payments';
import Attachments from './views/Attachments';
import ChangeLog from './views/ChangeLog';
import Profile from './views/Profile';

type View =
  | 'dashboard'
  | 'patients'
  | 'clinical-record'
  | 'treatment-plan'
  | 'odontogram'
  | 'completed-treatments'
  | 'payments'
  | 'attachments'
  | 'changelog'
  | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('1');

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentView('clinical-record');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients onSelectPatient={handleSelectPatient} />;
      case 'clinical-record':
        return <ClinicalRecord patientId={selectedPatientId} />;
      case 'treatment-plan':
        return <TreatmentPlan />;
      case 'odontogram':
        return <OdontogramView />;
      case 'completed-treatments':
        return <CompletedTreatments />;
      case 'payments':
        return <Payments />;
      case 'attachments':
        return <Attachments />;
      case 'changelog':
        return <ChangeLog />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={(view) => setCurrentView(view as View)}>
      {renderView()}
    </Layout>
  );
}
