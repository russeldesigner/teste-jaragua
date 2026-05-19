import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import Button from './Button';

export default function Modal({ modal, closeModal }) {
  if (!modal?.isOpen) return null;
  const Icon = modal.type === 'success' ? CheckCircle2 : modal.type === 'confirm' ? AlertCircle : Info;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-stone-200">
        <div className="p-6 border-b flex items-center gap-3 bg-stone-50"><Icon size={24} className="text-amber-600" /><h3 className="text-lg font-black">{modal.title}</h3></div>
        <div className="p-6"><p className="text-stone-600 text-sm font-medium leading-relaxed">{modal.message}</p></div>
        <div className="p-4 bg-[#faf8f5] border-t border-stone-100 flex justify-end gap-3">
          {modal.type === 'confirm' ? <><Button variant="secondary" onClick={closeModal}>Cancelar</Button><Button onClick={modal.onConfirm}>Confirmar</Button></> : <Button onClick={closeModal}>Entendi</Button>}
        </div>
      </div>
    </div>
  );
}
