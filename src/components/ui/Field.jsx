export default function Field({ label, value, onChange, type = 'text', placeholder = '', required = false, disabled = false, maxLength, max, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[11px] font-black text-stone-500 uppercase tracking-wider flex items-center gap-1.5">{Icon && <Icon size={12} />} {label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} value={value || ''} onChange={onChange} placeholder={placeholder} disabled={disabled} maxLength={maxLength} max={max} className={`w-full px-4 py-3.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-600 outline-none transition-all text-sm font-medium shadow-sm ${disabled ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : 'bg-stone-50 focus:bg-white'}`} required={required} />
    </div>
  );
}
