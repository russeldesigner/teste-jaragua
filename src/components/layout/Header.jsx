import { Menu } from 'lucide-react';

export default function Header({
  title,
  userProfile,
  connected,
  setSidebarOpen
}) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 h-16 flex items-center px-4 md:px-8 sticky top-0 z-20 justify-between shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        {/* Botão hamburger no mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl bg-stone-100 text-stone-700"
        >
          <Menu size={20} />
        </button>

        <h2 className="font-black text-stone-800 uppercase tracking-tight truncate max-w-[58vw] md:max-w-none flex items-center gap-2 text-sm md:text-base">
          {title}
        </h2>
      </div>

      <div className="text-[10px] font-bold text-stone-400 flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
          Perfil:{' '}
          <span className="text-stone-800">
            {userProfile?.name}
          </span>
        </span>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connected
                ? 'bg-emerald-500'
                : 'bg-orange-500 animate-pulse'
            }`}
          ></div>

          <span className="hidden sm:inline">
            {connected
              ? 'SISTEMA CONECTADO'
              : 'CONFIGURAR FIREBASE'}
          </span>
        </div>
      </div>
    </header>
  );
}
