export default function Header({ title, userProfile, connected }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 h-16 flex items-center px-4 md:px-8 sticky top-0 z-20 justify-between shadow-sm">
      <h2 className="font-black text-stone-800 uppercase tracking-tight truncate flex items-center gap-2">{title}</h2>
      <div className="text-[10px] font-bold text-stone-400 flex items-center gap-4 shrink-0">
        <span className="hidden sm:inline bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">Perfil: <span className="text-stone-800">{userProfile?.name}</span></span>
        <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`}></div><span className="hidden sm:inline">{connected ? 'SISTEMA CONECTADO' : 'CONFIGURAR FIREBASE'}</span></div>
      </div>
    </header>
  );
}
