export function Header() {
  return (
    <header className="bg-nz-navy border-b-2 border-nz-gold">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/nz-emblem.dim_120x120.png" 
            alt="New Zealand Government" 
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Immigration New Zealand
            </h1>
            <p className="text-sm text-white/80">
              Te Ratonga Manene
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
