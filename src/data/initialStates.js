import { getHoje } from '../utils/formatters';

export const listaUFs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export const baseCollections = [
  'setores', 'congregacoes', 'ministerios', 'departamentos', 'cargos', 'situacoes',
  'tipos_pessoa', 'funcoes', 'estados_civil', 'escolaridades', 'necessidades', 'tipos_visita',
  'membros', 'visitantes', 'reunioes', 'presencas', 'aprovacoes'
];

export const baseLabels = {
  setores: 'Setores', congregacoes: 'Congregações', ministerios: 'Ministérios', departamentos: 'Departamentos', cargos: 'Cargos', situacoes: 'Situações', tipos_pessoa: 'Tipos de Pessoa', funcoes: 'Funções Ministeriais', estados_civil: 'Estados Civis', escolaridades: 'Escolaridades', necessidades: 'Necessidades Especiais', tipos_visita: 'Tipos de Visita'
};

export const initialBaseState = { nome: '', responsavelId: '', cep: '', rua: '', bairro: '', cidade: '', uf: '', numero: '', setorVinculoId: '' };

export const initialMemberState = {
  nome: '', cpf: '', dataNascimento: '', estadoCivilId: '', nacionalidade: 'Brasileiro(a)', cabecaFamilia: 'Não', temFilhos: 'Não', necessidadeId: '', detalhesNecessidade: '', familiaId: '', vinculoTitularId: '', foto: '', whatsapp: '', email: '', cep: '', rua: '', numero: '', complemento: '', pontoReferencia: '', bairro: '', cidade: '', uf: '', escolaridadeId: '', profissao: '', formacaoSecular: '', formacaoTeologica: '', cursosCertificados: '', situacaoId: '', tipoPessoaId: '', congregacaoId: '', dataBatismo: '', participaEBD: 'Não', historicoCargos: [], atuacoesMinisterio: [], sistemaLogin: '', sistemaSenha: '', sistemaPerfilId: '', conjuge: { nome: '', dataNascimento: '', dataCasamento: '', whatsapp: '', membroAdj: 'Não', atuacoes: [] }, filhos: []
};

export const initialVisitorState = { nome: '', whatsapp: '', tipoVisitaId: '', cidade: '', uf: '', dataVisita: getHoje(), observacoes: '', status: 'Aguardando', isCarta: 'Não', foiConvertido: false };
