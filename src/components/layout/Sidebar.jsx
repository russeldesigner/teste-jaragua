import {
  CalendarCheck,
  CheckSquare,
  ClipboardList,
  Database,
  LayoutDashboard,
  LogOut,
  Menu,
  UserPlus,
  Users,
  X
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  setOpen,
  currentView,
  setCurrentView,
  canAccess,
  userProfile,
  logout,
  aprovacoesCount
}) {
  const itemClass = (active) =>
    `w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
      active
        ? 'bg-amber-100 text-amber-900 shadow-sm'
        : 'text-stone-500 hover:bg-stone-50 hover:text-amber-700'
    }`;

  const goTo = (view) => {
    setCurrentView(view);

    // Fecha o menu automaticamente no mobile
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Overlay no mobile */}
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          ${
            isOpen
              ? 'translate-x-0 w-72 md:w-64'
              : '-translate-x-full md:translate-x-0 md:w-20'
          }
          bg-white border-r border-stone-200
          transition-all duration-300
          flex flex-col shadow-sm
        `}
      >
        {/* Topo */}
        <div className="p-6 border-b border-amber-900/50 flex flex-col items-center justify-center bg-[#451a03] text-amber-50 relative min-h-[140px]">
          <button
            onClick={() => setOpen(!isOpen)}
            className="absolute top-4 right-4 p-1 hover:bg-[#78350f] rounded text-amber-200"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div
            className={`${
              isOpen
                ? 'w-[84px] h-[84px] mb-3'
                : 'w-10 h-10 mt-6'
            } rounded-full border-[3px] border-amber-500/50 shadow-xl bg-[#5c3a21] flex items-center justify-center font-black text-amber-300`}
          >
            AD
          </div>

          {isOpen && (
            <span className="font-black tracking-[0.15em] uppercase text-xs text-amber-400">
              Plataforma AD
            </span>
          )}
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {isOpen && (
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-3">
              Sistema
            </p>
          )}

          {canAccess('dashboard') && (
            <button
              onClick={() => goTo('dashboard')}
              className={itemClass(currentView === 'dashboard')}
            >
              <LayoutDashboard size={20} />
              {isOpen && <span className="font-bold">Painel</span>}
            </button>
          )}

          {canAccess('checkin') && (
            <button
              onClick={() => goTo('checkin')}
              className={itemClass(currentView === 'checkin')}
            >
              <ClipboardList size={20} />
              {isOpen && <span className="font-bold">Recepção</span>}
            </button>
          )}

          {canAccess('frequencia_obreiros') && (
            <button
              onClick={() => goTo('frequencia_obreiros')}
              className={itemClass(
                currentView === 'frequencia_obreiros'
              )}
            >
              <CalendarCheck size={20} />
              {isOpen && <span className="font-bold">Obreiros</span>}
            </button>
          )}

          {canAccess('secretaria_lista') && (
            <button
              onClick={() => goTo('secretaria_lista')}
              className={itemClass(
                currentView.includes('secretaria')
              )}
            >
              <Users size={20} />
              {isOpen && <span className="font-bold">Membros</span>}
            </button>
          )}

          {canAccess('aprovacoes') && (
            <button
              onClick={() => goTo('aprovacoes')}
              className={itemClass(currentView === 'aprovacoes')}
            >
              <CheckSquare size={20} />

              {isOpen && (
                <span className="font-bold flex-1 text-left">
                  Aprovações
                </span>
              )}

              {isOpen && aprovacoesCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {aprovacoesCount}
                </span>
              )}
            </button>
          )}

          {canAccess('base') && (
            <button
              onClick={() => goTo('base')}
              className={itemClass(currentView === 'base')}
            >
              <Database size={20} />
              {isOpen && <span className="font-bold">Tabelas Base</span>}
            </button>
          )}

          {userProfile?.id === 'autocadastro' && (
            <button
              onClick={() => goTo('autocadastro')}
              className={itemClass(currentView === 'autocadastro')}
            >
              <UserPlus size={20} />
              {isOpen && <span className="font-bold">Meu Cadastro</span>}
            </button>
          )}
        </nav>

        {/* Rodapé */}
        <div className="p-4 border-t border-stone-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-stone-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
            {isOpen && <span className="font-bold">Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
