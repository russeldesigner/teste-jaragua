import { ShieldCheck, Mic, UserPlus, Users, CalendarCheck } from 'lucide-react';

export const profilesConfig = [
  { id: 'admin', name: 'Administrador', icon: ShieldCheck, description: 'Acesso irrestrito a todos os módulos, configurações e BI.', allowedViews: ['all'] },
  { id: 'pastor', name: 'Pastor / Dirigente', icon: Mic, description: 'Acesso ao Painel do Altar, Dashboards de BI e Frequência.', allowedViews: ['dashboard', 'checkin', 'frequencia_obreiros', 'secretaria_lista'] },
  { id: 'recepcao', name: 'Recepção / Integração', icon: UserPlus, description: 'Exclusivo para registro de visitantes na porta.', allowedViews: ['checkin'] },
  { id: 'secretaria', name: 'Secretaria Geral', icon: Users, description: 'Gestão completa de membros e tabelas base do sistema.', allowedViews: ['secretaria_lista', 'secretaria_form', 'aprovacoes', 'base', 'dashboard'] },
  { id: 'obreiro', name: 'Portaria (Obreiros)', icon: CalendarCheck, description: 'Módulo exclusivo para apontamento de frequência.', allowedViews: ['frequencia_obreiros'] }
];
