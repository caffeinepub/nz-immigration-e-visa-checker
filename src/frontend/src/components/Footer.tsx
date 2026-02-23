import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? window.location.hostname 
    : 'nz-visa-checker';

  return (
    <footer className="bg-nz-navy text-white/80 border-t-2 border-nz-gold mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-white mb-3">Important Information</h3>
            <p className="text-sm">
              This is a demonstration website. For official visa information, 
              please visit the Immigration New Zealand website.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm">
              For assistance with your visa application, please contact 
              Immigration New Zealand directly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Privacy</h3>
            <p className="text-sm">
              Your personal information is protected under the Privacy Act. 
              We handle all data with strict confidentiality.
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-sm">
          <p className="mb-2">
            © {currentYear} Immigration New Zealand. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nz-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
