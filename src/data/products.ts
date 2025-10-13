import { Product, Ingredient } from "@/types";

export const PRODUTOS: Product[] = [
  { id: 1, nome: "Açaí 300ml", volume: "300ml", preco: 8.99, categoria: "acai" },
  { id: 2, nome: "Açaí 400ml", volume: "400ml", preco: 12.99, categoria: "acai" },
  { id: 3, nome: "Açaí 500ml", volume: "500ml", preco: 18.99, categoria: "acai" },
  { id: 4, nome: "Barca de Açaí", volume: "1000ml", preco: 32.99, categoria: "acai" },
  { id: 10, nome: "Suco Natural 300ml", volume: "300ml", preco: 3.99, categoria: "bebida" },
  { id: 11, nome: "Suco Natural 500ml", volume: "500ml", preco: 6.99, categoria: "bebida" },
  { id: 12, nome: "Coca-Cola 350ml", volume: "Personalizável", preco: 4.99, categoria: "refrigerante" },
  { id: 13, nome: "Fanta 350ml", volume: "Personalizável", preco: 4.99, categoria: "refrigerante" },
  { id: 14, nome: "Água Mineral Cristal", volume: "500ml", preco: 2.99, categoria: "bebida" },
  { id: 15, nome: "Água com Gás Cristal", volume: "500ml", preco: 3.49, categoria: "bebida" },
  { id: 16, nome: "Vitamina de Frutas", volume: "500ml", preco: 12.99, categoria: "bebida" },
  { id: 17, nome: "Red Bull", volume: "250ml", preco: 8.99, categoria: "energetico" },
];

export const INGREDIENTES: Ingredient[] = [
  { nome: "Banana", preco: 1.00, categoria: "Frutas", regra: "Gratis" },
  { nome: "Morango", preco: 1.00, categoria: "Frutas", regra: "Gratis" },
  { nome: "Kiwi", preco: 1.00, categoria: "Frutas", regra: "Gratis" },
  { nome: "Granola", preco: 2.00, categoria: "Graos", regra: "Gratis" },
  { nome: "Amendoim", preco: 2.00, categoria: "Graos", regra: "Gratis" },
  { nome: "Leite em Pó", preco: 2.00, categoria: "Powders", regra: "Gratis" },
  { nome: "Ninho", preco: 2.00, categoria: "Powders", regra: "Gratis" },
  { nome: "Leite Condensado", preco: 2.00, categoria: "Toppings", regra: "Gratis" },
  { nome: "Mel", preco: 2.00, categoria: "Toppings", regra: "Gratis" },
  { nome: "Nutella", preco: 1.00, categoria: "Especiais", regra: "Pago" },
  { nome: "Bis", preco: 2.00, categoria: "Especiais", regra: "Pago" },
  { nome: "Ouro Branco", preco: 2.50, categoria: "Especiais", regra: "Pago" },
];

export const GRATIS_POR_CATEGORIA: Record<string, number> = {
  "Frutas": 1,
  "Graos": 1,
  "Powders": 1,
  "Toppings": 1,
  "Especiais": 0
};

export const NUMERO_WHATSAPP = '5551995764542';
