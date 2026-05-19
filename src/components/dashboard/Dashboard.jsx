import { Accessibility, Activity, Award, Briefcase, GraduationCap, PieChart, Users } from 'lucide-react';
import { calcularIdade } from '../../utils/formatters';

function Card({ label, value, icon: Icon }) {
  return <div className="bg-white p-6 rounded-[24px] border border-stone-200 shadow-sm relative overflow-hidden"><div className="absolute top-0 right-0 p-4 opacity-5"><Icon size={80}/></div><p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1 z-10 relative">{label}</p><h4 className="text-4xl font-black text-stone-800 z-10 relative">{value}</h4></div>;
}
function ProgressBar({ label, count, total, colorClass = 'bg-amber-500' }) {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;
  return <div className="space-y-1.5"><div className="flex justify-between text-[11px] font-bold"><span className="text-stone-700 truncate pr-2">{label}</span><span className="text-stone-500 shrink-0">{count} ({percent}%)</span></div><div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden"><div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percent}%` }} /></div></div>;
}

export default function Dashboard({ data }) {
  const membros = data.membros || [];
  const total = membros.length;
  const faixas = { '0-11 Crianças': 0, '12-17 Adolescentes': 0, '18-35 Jovens': 0, '36-59 Adultos': 0, '60+ Seniores': 0, 'Não informada': 0 };
  membros.forEach((m) => { const idade = calcularIdade(m.dataNascimento); if (idade === null) faixas['Não informada']++; else if (idade <= 11) faixas['0-11 Crianças']++; else if (idade <= 17) faixas['12-17 Adolescentes']++; else if (idade <= 35) faixas['18-35 Jovens']++; else if (idade <= 59) faixas['36-59 Adultos']++; else faixas['60+ Seniores']++; });
  const batizados = membros.filter((m) => m.dataBatismo).length;
  const ebd = membros.filter((m) => m.participaEBD === 'Sim' || m.participaEBD === 'Eventualmente').length;
  const necessidades = membros.filter((m) => m.necessidadeId).length;

  if (!total) return <div className="bg-white p-12 text-center rounded-[32px] border border-stone-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center"><PieChart className="text-stone-300 mb-4" size={64}/><h4 className="text-xl font-black text-stone-800">Sem dados suficientes</h4><p className="text-stone-500 font-medium mt-2">Cadastre os membros na Secretaria para visualizar as estatísticas.</p></div>;

  return <div className="space-y-6"><div><h3 className="text-2xl font-black text-stone-800">Painel da Secretaria</h3><p className="text-sm text-stone-500 mt-1 font-medium">Visão geral e estatísticas da base.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><Card label="Total de Membros" value={total} icon={Users}/><Card label="Membros Batizados" value={batizados} icon={Activity}/><Card label="Necessidades Especiais" value={necessidades} icon={Accessibility}/><Card label="Participam EBD" value={ebd} icon={GraduationCap}/></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="bg-white p-6 md:p-8 rounded-[32px] border border-stone-200 shadow-sm"><h4 className="text-sm font-black text-stone-800 mb-6 border-b border-stone-100 pb-4 flex items-center gap-2"><Users size={16} className="text-amber-600"/> Faixa Etária</h4><div className="space-y-5">{Object.entries(faixas).map(([faixa, count]) => <ProgressBar key={faixa} label={faixa} count={count} total={total}/>)}</div></div><div className="bg-white p-6 md:p-8 rounded-[32px] border border-stone-200 shadow-sm"><h4 className="text-sm font-black text-stone-800 mb-6 border-b border-stone-100 pb-4 flex items-center gap-2"><Briefcase size={16} className="text-purple-600"/> Resumo</h4><div className="space-y-5"><ProgressBar label="Batizados" count={batizados} total={total} colorClass="bg-emerald-500"/><ProgressBar label="EBD Sim/Eventual" count={ebd} total={total} colorClass="bg-blue-500"/><ProgressBar label="Cuidado Especial" count={necessidades} total={total} colorClass="bg-purple-500"/></div></div></div></div>;
}
