import { useState } from 'react';
import { Layout } from './components/Layout';
import { VisaStatusForm } from './components/VisaStatusForm';
import { VisaStatusResult } from './components/VisaStatusResult';
import { useVisaStatusCheck } from './hooks/useQueries';
import type { VisaApplication } from './backend';

function App() {
  const [applicationData, setApplicationData] = useState<VisaApplication | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { checkStatus, isLoading, error } = useVisaStatusCheck();

  const handleCheckStatus = async (referenceNumber: string) => {
    const result = await checkStatus(referenceNumber);
    setApplicationData(result);
    setShowResult(true);
  };

  const handleNewSearch = () => {
    setShowResult(false);
    setApplicationData(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!showResult ? (
          <VisaStatusForm 
            onSubmit={handleCheckStatus} 
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <VisaStatusResult 
            application={applicationData} 
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
