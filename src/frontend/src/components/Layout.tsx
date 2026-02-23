import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div 
        className="relative bg-cover bg-center py-16 border-b-4 border-nz-gold"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x400.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-nz-navy/95 to-nz-navy/85" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
            Visa Application Status Check
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto">
            Check the status of your New Zealand visa application by entering your details below
          </p>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
