import { useState } from 'react';
import { useActor } from './useActor';
import type { VisaApplication } from '../backend';

export function useVisaStatusCheck() {
  const { actor } = useActor();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async (referenceNumber: string): Promise<VisaApplication | null> => {
    if (!actor) {
      setError('Backend connection not available');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await actor.getVisaApplication(referenceNumber);
      
      if (!result) {
        setError('No application found with the provided reference number');
        return null;
      }

      return result;
    } catch (err) {
      console.error('Error checking visa status:', err);
      setError('An error occurred while checking your application status. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkStatus,
    isLoading,
    error
  };
}
