import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle } from 'lucide-react';

interface VisaStatusFormProps {
  onSubmit: (referenceNumber: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function VisaStatusForm({ onSubmit, isLoading, error }: VisaStatusFormProps) {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!referenceNumber.trim()) {
      errors.referenceNumber = 'Application reference number is required';
    } else if (!/^REF\d{6}$/.test(referenceNumber.trim())) {
      errors.referenceNumber = 'Reference number must be in format REF123456';
    }

    if (!passportNumber.trim()) {
      errors.passportNumber = 'Passport number is required';
    } else if (!/^[A-Z]\d{8}$/.test(passportNumber.trim())) {
      errors.passportNumber = 'Passport number must be in format P12345678';
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        errors.dateOfBirth = 'Date of birth must be in the past';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(referenceNumber.trim());
    }
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-2xl text-nz-navy">Check Your Application Status</CardTitle>
        <CardDescription className="text-base">
          Enter your application details to view the current status of your visa application
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="referenceNumber" className="text-base font-semibold">
              Application Reference Number *
            </Label>
            <Input
              id="referenceNumber"
              type="text"
              placeholder="e.g., REF123456"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
              className={validationErrors.referenceNumber ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {validationErrors.referenceNumber && (
              <p className="text-sm text-destructive">{validationErrors.referenceNumber}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Your reference number was provided when you submitted your application
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportNumber" className="text-base font-semibold">
              Passport Number *
            </Label>
            <Input
              id="passportNumber"
              type="text"
              placeholder="e.g., P12345678"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
              className={validationErrors.passportNumber ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {validationErrors.passportNumber && (
              <p className="text-sm text-destructive">{validationErrors.passportNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-base font-semibold">
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={validationErrors.dateOfBirth ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {validationErrors.dateOfBirth && (
              <p className="text-sm text-destructive">{validationErrors.dateOfBirth}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-muted/50 p-4 rounded-md border">
            <p className="text-sm text-muted-foreground">
              <strong>Sample applications for testing:</strong>
              <br />
              REF123456 (Received) | REF234567 (In Progress) | REF345678 (Approved) | REF456789 (Declined)
              <br />
              Use passport format P12345678 and any valid date of birth
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-nz-navy hover:bg-nz-navy/90 text-white font-semibold py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Checking Status...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Check Application Status
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
