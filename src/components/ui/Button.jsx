export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) {
  const variants = {
    primary: 'bg-amber-700 text-white hover:bg-amber-800 disabled:bg-amber-300 shadow-md',
    secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md',
    dark: 'bg-stone-800 text-amber-300 hover:bg-stone-900 shadow-md'
  };
  return <button disabled={disabled} type={type} onClick={onClick} className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${variants[variant]} ${className}`}>{children}</button>;
}
