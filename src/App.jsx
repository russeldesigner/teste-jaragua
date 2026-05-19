import { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, appId } from './config/firebase';
import { profilesConfig } from './config/profilesConfig';
import { useFirebaseData } from './hooks/useFirebaseData';
import { initialBaseState, initialMemberState, initialVisitorState } from './data/initialStates';
import Login from './components/layout/Login';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Modal from './components/ui/Modal';
import Dashboard from './components/dashboard/Dashboard';
import MembersList from './components/secretaria/MembersList';
import MemberForm from './components/secretaria/MemberForm';
import ApprovalQueue from './components/secretaria/ApprovalQueue';
import BaseTables from './components/base/BaseTables';
import VisitorCheckin from './components/checkin/VisitorCheckin';
import WorkersAttendance from './components/obreiros/WorkersAttendance';

export default function App() {
  const { user, data, loading, error, saveRecord, removeRecord, updateRecord, firebaseReady } = useFirebaseData();
  const [userProfile, setUserProfile] = useState(null);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null });
  const [memberData, setMemberData] = useState(initialMemberState);
  const [visitorData, setVisitorData] = useState(initialVisitorState);
  const [formData, setFormData] = useState(initialBaseState);
  const [activeTab, setActiveTab] = useState('setores');
  const [editId, setEditId] = useState(null);

  const showModal = (title, message, type = 'info', onConfirm = null) => setModal({ isOpen: true, title, message, type, onConfirm });
  const closeModal = () => setModal((m) => ({ ...m, isOpen: false }));

  const canAccess = (view) => {
    if (!userProfile) return false;
    if (userProfile.allowedViews.includes('all')) return true;
    return userProfile.allowedViews.includes(view);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCreds.username === 'admin' && loginCreds.password === 'admin') {
      setUserProfile(profilesConfig.find(p => p.id === 'admin'));
      setCurrentView('dashboard');
      return;
    }
    const memberMatched = (data.membros || []).find(m => m.sistemaLogin === loginCreds.username && m.sistemaSenha === loginCreds.password);
    if (!memberMatched) return showModal('Erro de Acesso', 'Usuário ou senha incorretos.', 'info');
    const profile = profilesConfig.find(p => p.id === memberMatched.sistemaPerfilId);
    if (!profile) return showModal('Atenção', 'Usuário sem perfil válido atribuído.', 'info');
    setUserProfile(profile);
    setCurrentView(profile.id === 'recepcao' ? 'checkin' : profile.id === 'obreiro' ? 'frequencia_obreiros' : 'dashboard');
  };

  const handlePublicAccess = () => {
    setUserProfile({ id: 'autocadastro', name: 'Autocadastro', allowedViews: ['autocadastro'] });
    setCurrentView('autocadastro');
  };

  const handleDelete = (collectionName, id) => {
    showModal('Excluir Registro', 'Tem certeza que deseja remover este registro? Esta ação não pode ser desfeita.', 'confirm', async () => {
      try { await removeRecord(collectionName, id); closeModal(); }
      catch (err) { closeModal(); showModal('Erro', err.message); }
    });
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      await saveRecord('membros', memberData, editId);
      showModal('Sucesso', 'Ficha salva com sucesso.', 'success');
      setMemberData(initialMemberState);
      setEditId(null);
      setCurrentView('secretaria_lista');
    } catch (err) { showModal('Erro', err.message); }
  };

  const handleSaveVisitor = async (e) => {
    e.preventDefault();
    try {
      await saveRecord('visitantes', visitorData);
      showModal('Sucesso', 'Visitante enviado para o altar.', 'success');
      setVisitorData(initialVisitorState);
    } catch (err) { showModal('Erro', err.message); }
  };

  const handleApprove = async (item) => {
    try {
      const { id, origem, status, createdAt, ...payload } = item;
      await saveRecord('membros', payload);
      await removeRecord('aprovacoes', id);
      showModal('Oficializado!', 'Cadastro aprovado e movido para membros.', 'success');
    } catch (err) { showModal('Erro', err.message); }
  };

  const handleBaseSave = async (e) => {
    e.preventDefault();
    try {
      await saveRecord(activeTab, formData, editId);
      showModal('Sucesso', 'Registro salvo com sucesso.', 'success');
      setFormData(initialBaseState);
      setEditId(null);
    } catch (err) { showModal('Erro', err.message); }
  };

  const handleConvertVisitor = async (visitante) => {
    try {
      await saveRecord('membros', { ...initialMemberState, nome: visitante.nome, whatsapp: visitante.whatsapp, cidade: visitante.cidade, uf: visitante.uf });
      await updateRecord('visitantes', visitante.id, { foiConvertido: true });
      showModal('Ficha Criada!', `${visitante.nome} agora possui um rascunho na Secretaria.`, 'success');
    } catch (err) { showModal('Erro', err.message); }
  };

  const openMeeting = async () => {
    try { await saveRecord('reunioes', { data: new Date().toISOString().split('T')[0], tipo: 'Obreiros', aberta: true }); }
    catch (err) { showModal('Erro', err.message); }
  };
  const closeMeeting = async () => {
    const reuniao = (data.reunioes || []).find(r => r.aberta);
    if (!reuniao) return;
    try { await updateRecord('reunioes', reuniao.id, { aberta: false }); }
    catch (err) { showModal('Erro', err.message); }
  };
  const registerPresence = async (membroId) => {
    const reuniao = (data.reunioes || []).find(r => r.aberta);
    if (!reuniao) return;
    try { await saveRecord('presencas', { reuniaoId: reuniao.id, membroId, timestamp: new Date().toISOString() }); }
    catch (err) { showModal('Erro', err.message); }
  };

  const titles = { dashboard: 'Painel da Secretaria', checkin: 'Recepção e Integração', frequencia_obreiros: 'Frequência de Obreiros', secretaria_lista: 'Cadastro de Membros', secretaria_form: 'Ficha de Membro', aprovacoes: 'Fila de Aprovações', base: 'Apoio / Tabelas', autocadastro: 'Autocadastro' };

  if (!userProfile) return <Login loginCreds={loginCreds} setLoginCreds={setLoginCreds} onLogin={handleLoginSubmit} onPublicAccess={handlePublicAccess} connected={Boolean(user && firebaseReady)} />;

  return (
    <div className="min-h-screen bg-stone-50 flex text-stone-900 font-sans relative">
      <Modal modal={modal} closeModal={closeModal} />
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} currentView={currentView} setCurrentView={setCurrentView} canAccess={canAccess} userProfile={userProfile} aprovacoesCount={(data.aprovacoes || []).length} logout={() => { setUserProfile(null); setLoginCreds({ username: '', password: '' }); }} />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#faf8f5] relative">
        <Header title={titles[currentView] || 'Plataforma AD'} userProfile={userProfile} connected={Boolean(user && firebaseReady)} />
        {(error || !firebaseReady) && <div className="mx-4 md:mx-8 mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-800 text-sm font-bold">{error || 'Firebase ainda não configurado. O layout abre, mas salvar dados exige as variáveis de ambiente.'}</div>}
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full pb-32">
          {currentView === 'dashboard' && <Dashboard data={data} />}
          {currentView === 'secretaria_lista' && <MembersList membros={data.membros || []} data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNew={() => { setMemberData(initialMemberState); setEditId(null); setCurrentView('secretaria_form'); }} onEdit={(m) => { setMemberData({ ...initialMemberState, ...m }); setEditId(m.id); setCurrentView('secretaria_form'); }} onDelete={handleDelete} />}
          {currentView === 'secretaria_form' && <MemberForm memberData={memberData} setMemberData={setMemberData} data={data} onSave={handleSaveMember} onBack={() => setCurrentView('secretaria_lista')} editId={editId} />}
          {currentView === 'aprovacoes' && <ApprovalQueue aprovacoes={data.aprovacoes || []} onApprove={handleApprove} onDelete={handleDelete} />}
          {currentView === 'base' && <BaseTables data={data} activeTab={activeTab} setActiveTab={setActiveTab} formData={formData} setFormData={setFormData} editId={editId} setEditId={setEditId} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSave={handleBaseSave} onDelete={handleDelete} onEdit={(item) => { setFormData(item); setEditId(item.id); }} />}
          {currentView === 'checkin' && <VisitorCheckin data={data} visitorData={visitorData} setVisitorData={setVisitorData} onSaveVisitor={handleSaveVisitor} onMarkPresented={(id) => updateRecord('visitantes', id, { status: 'Apresentado' })} onDelete={handleDelete} onConvert={handleConvertVisitor} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {currentView === 'frequencia_obreiros' && <WorkersAttendance data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenMeeting={openMeeting} onCloseMeeting={closeMeeting} onPresence={registerPresence} onRemovePresence={(id) => removeRecord('presencas', id)} />}
          {currentView === 'autocadastro' && <MemberForm memberData={memberData} setMemberData={setMemberData} data={data} editId={null} onBack={() => setCurrentView('dashboard')} onSave={async (e) => { e.preventDefault(); try { await saveRecord('aprovacoes', { ...memberData, origem: 'Autocadastro', status: 'Pendente' }); setMemberData(initialMemberState); showModal('Cadastro Enviado!', 'Seu cadastro foi enviado para aprovação.', 'success'); } catch (err) { showModal('Erro', err.message); } }} />}
        </div>
      </main>
    </div>
  );
}
