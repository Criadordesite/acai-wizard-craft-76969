export interface Product {
  id: number;
  nome: string;
  volume: string;
  preco: number;
  categoria: 'acai' | 'bebida' | 'refrigerante' | 'energetico';
}

export interface Ingredient {
  nome: string;
  preco: number;
  categoria: string;
  regra: 'Gratis' | 'Pago';
}

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  personalizacao?: Record<string, string[]>;
}

export interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
}
