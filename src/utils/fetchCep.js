import { formatCEP } from './formatters';

export async function fetchCepData(cepValue) {
  const maskedCep = formatCEP(cepValue);
  const cleanCep = String(cepValue).replace(/\D/g, '');
  if (cleanCep.length !== 8) return { maskedCep, address: null };
  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await res.json();
  if (data.erro) return { maskedCep, address: null };
  return {
    maskedCep,
    address: {
      rua: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      uf: data.uf || ''
    }
  };
}
