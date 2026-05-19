export const formatPhone = (val = '') => {
  let v = String(val).replace(/\D/g, '');
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  else v = v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  return v.substring(0, 15);
};

export const formatCEP = (val = '') => String(val).replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').substring(0, 9);

export const formatCPF = (val = '') => {
  let v = String(val).replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v.substring(0, 14);
};

export const calcularIdade = (dataNasc) => {
  if (!dataNasc) return null;
  const hoje = new Date();
  const nasc = new Date(dataNasc);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
};

export const getHoje = () => new Date().toISOString().split('T')[0];
