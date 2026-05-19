import { KeyRound, Lock, ShieldCheck, UserCircle, UserPlus } from 'lucide-react';
import Button from '../ui/Button';

export default function Login({ loginCreds, setLoginCreds, onLogin, onPublicAccess, connected }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/20 rounded-full blur-3xl" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-[#451a03] rounded-3xl mx-auto flex items-center justify-center shadow-xl mb-6 relative">
            <ShieldCheck size={48} className="text-amber-400" />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#faf8f5]"><Lock size={14} className="text-white"/></div>
          </div>
          <h1 className="text-3xl font-black text-stone-800 tracking-tight">Plataforma AD</h1>
          <p className="text-stone-500 mt-2 font-medium text-sm">Acesso restrito para obreiros e administração.</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-stone-200 shadow-xl mb-6">
          <form onSubmit={onLogin} className="space-y-6">
            <div className="space-y-1"><label className="text-[11px] font-black text-stone-500 uppercase tracking-wider flex items-center gap-1.5"><UserCircle size={14}/> Seu Login</label><input type="text" required value={loginCreds.username} onChange={e => setLoginCreds({...loginCreds, username: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none transition-all text-sm font-bold shadow-sm" placeholder="Digite seu usuário..." /></div>
            <div className="space-y-1"><label className="text-[11px] font-black text-stone-500 uppercase tracking-wider flex items-center gap-1.5"><KeyRound size={14}/> Senha de Acesso</label><input type="password" required value={loginCreds.password} onChange={e => setLoginCreds({...loginCreds, password: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-600 outline-none transition-all text-sm font-bold shadow-sm" placeholder="••••••••" /></div>
            <Button type="submit" className="w-full py-4 text-sm uppercase tracking-widest shadow-lg">Entrar no Sistema</Button>
          </form>
          <div className="mt-6 text-center border-t border-stone-100 pt-6"><p className="text-xs text-stone-400 mb-2 font-medium">Não possui login ou deseja atualizar sua ficha?</p><button type="button" onClick={onPublicAccess} className="text-sm font-black text-[#5c3a21] hover:text-amber-700 underline underline-offset-4 flex items-center justify-center gap-2 mx-auto"><UserPlus size={16}/> Acessar Autocadastro Público</button></div>
        </div>
        <div className="text-center text-stone-400 text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-2 opacity-70"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`}></div>{connected ? 'Sistema Conectado ao Servidor' : 'Firebase pendente de configuração'}</div><span>Primeiro acesso: admin / admin</span></div>
      </div>
    </div>
  );
}
