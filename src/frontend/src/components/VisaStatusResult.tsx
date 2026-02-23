import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, XCircle, FileText, ArrowLeft, Calendar, Hash } from 'lucide-react';
import type { VisaApplication, ApplicationStatus } from '../backend';

interface VisaStatusResultProps {
  application: VisaApplication | null;
  onNewSearch: () => void;
}

function getStatusConfig(status: ApplicationStatus) {
  switch (status) {
    case 'approved':
      return {
        label: 'Approved',
        icon: CheckCircle2,
        badgeVariant: 'default' as const,
        className: 'bg-status-approved text-white',
        description: 'Your visa application has been approved. You will receive official documentation shortly.'
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        icon: Clock,
        badgeVariant: 'secondary' as const,
        className: 'bg-status-progress text-white',
        description: 'Your application is currently being processed by our team.'
      };
    case 'received':
      return {
        label: 'Received',
        icon: FileText,
        badgeVariant: 'outline' as const,
        className: 'bg-status-received text-white',
        description: 'We have received your application and it is awaiting initial review.'
      };
    case 'declined':
      return {
        label: 'Declined',
        icon: XCircle,
        badgeVariant: 'destructive' as const,
        className: 'bg-status-declined text-white',
        description: 'Your visa application has been declined. Please check your email for detailed information.'
      };
    default:
      return {
        label: 'Unknown',
        icon: FileText,
        badgeVariant: 'outline' as const,
        className: 'bg-muted',
        description: 'Status information unavailable.'
      };
  }
}

function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1000000);
  return date.toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function VisaStatusResult({ application, onNewSearch }: VisaStatusResultProps) {
  if (!application) {
    return (
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-nz-navy">Application Not Found</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg mb-6">
              No application found matching the provided details. Please check your information and try again.
            </p>
            <Button onClick={onNewSearch} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Try Another Search
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      <Button 
        onClick={onNewSearch} 
        variant="ghost" 
        className="gap-2 text-nz-navy hover:text-nz-navy/80"
      >
        <ArrowLeft className="h-4 w-4" />
        Check Another Application
      </Button>

      <Card className="shadow-lg border-2">
        <CardHeader className={`${statusConfig.className} text-white`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <StatusIcon className="h-8 w-8" />
              Application Status: {statusConfig.label}
            </CardTitle>
          </div>
          <p className="text-white/90 mt-2">{statusConfig.description}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm font-medium">Reference Number</span>
                </div>
                <p className="text-lg font-semibold text-nz-navy">
                  {application.applicationReferenceNumber}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Application Type</span>
                </div>
                <p className="text-lg font-semibold">
                  {application.applicationType} Visa
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Submitted</span>
                </div>
                <p className="text-base">
                  {formatDate(application.submissionDate)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <p className="text-base">
                  {formatDate(application.lastUpdated)}
                </p>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/50 p-4 rounded-md border">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {application.status === 'received' && (
                  <>
                    <li>• Your application will be assigned to an immigration officer</li>
                    <li>• You may be contacted if additional information is required</li>
                    <li>• Processing times vary depending on application type</li>
                  </>
                )}
                {application.status === 'in_progress' && (
                  <>
                    <li>• An immigration officer is reviewing your application</li>
                    <li>• Please respond promptly to any requests for information</li>
                    <li>• Check this page regularly for status updates</li>
                  </>
                )}
                {application.status === 'approved' && (
                  <>
                    <li>• Official approval documentation will be sent to your email</li>
                    <li>• Please review all conditions attached to your visa</li>
                    <li>• Keep your approval letter for travel purposes</li>
                  </>
                )}
                {application.status === 'declined' && (
                  <>
                    <li>• A detailed explanation has been sent to your email</li>
                    <li>• You may have the right to appeal this decision</li>
                    <li>• Contact Immigration New Zealand for further assistance</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
