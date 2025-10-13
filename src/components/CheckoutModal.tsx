import { useState } from "react";
import { CartItem, Address } from "@/types";
import { NUMERO_WHATSAPP } from "@/data/products";

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
}

const CheckoutModal = ({ cart, onClose }: CheckoutModalProps) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [semNumero, setSemNumero] = useState(false);
  const [complemento, setComplemento] = useState('');
  const [endereco, setEndereco] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  const buscarCEP = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        alert('CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          cep: data.cep
        });
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  const finalizarPedido = () => {
    if (!nome || !telefone || !cep || !endereco) {
      alert('Por favor, preencha todos os campos obrigatórios e busque o endereço pelo CEP.');
      return;
    }

    if (!numero && !semNumero) {
      alert('Por favor, informe o número da casa ou marque "Sem número".');
      return;
    }

    let message = `🍇 *PEDIDO - THE BEST AÇAÍ* 🍇\n\n`;
    message += `👤 *Cliente:* ${nome}\n`;
    message += `📱 *Telefone:* ${telefone}\n\n`;
    message += `📍 *Endereço de Entrega:*\n`;
    message += `${endereco.logradouro}`;
    if (!semNumero && numero) {
      message += `, ${numero}`;
    } else if (semNumero) {
      message += ` (Sem número)`;
    }
    message += `\n${endereco.bairro} - ${endereco.localidade}/${endereco.uf}\n`;
    message += `CEP: ${endereco.cep}\n`;
    if (complemento) {
      message += `Complemento: ${complemento}\n`;
    }
    message += `\n🛒 *ITENS DO PEDIDO:*\n`;

    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.nome} (${item.quantidade}x) - ${formatPrice(item.preco * item.quantidade)}\n`;
      
      if (item.personalizacao) {
        Object.entries(item.personalizacao).forEach(([categoria, ingredientes]) => {
          if (ingredientes.length > 0) {
            const emojiMap: Record<string, string> = {
              "Frutas": "🍓",
              "Graos": "🌾",
              "Powders": "💪",
              "Toppings": "🥥",
              "Especiais": "💰"
            };
            const emoji = emojiMap[categoria] || "";
            message += `   ${emoji} ${categoria}: ${ingredientes.join(', ')}\n`;
          }
        });
      }
    });

    message += `\n💰 *TOTAL A PAGAR: ${formatPrice(total)}*\n\n`;
    message += `Obrigado pela preferência! 🙏`;

    const whatsappUrl = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-purple-800">Finalizar Pedido</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* Dados do Cliente */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-700">Seus Dados</h4>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <input 
                  type="tel" 
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Seu WhatsApp (11) 99999-9999" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-700">Endereço de Entrega</h4>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="CEP (apenas números)" 
                    maxLength={8}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <button 
                    onClick={buscarCEP}
                    disabled={loading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>

                {endereco && (
                  <div className="space-y-2 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
                    <p><strong>Bairro:</strong> {endereco.bairro}</p>
                    <p><strong>Cidade:</strong> {endereco.localidade}/{endereco.uf}</p>
                    <p><strong>CEP:</strong> {endereco.cep}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    disabled={semNumero}
                    placeholder="Número da casa" 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
                  />
                  <label className="flex items-center space-x-2 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={semNumero}
                      onChange={(e) => setSemNumero(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Sem número</span>
                  </label>
                </div>

                <input 
                  type="text" 
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Complemento (apartamento, bloco, etc.)" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-purple-700">Resumo do Pedido</h4>
              <div className="space-y-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.nome} ({item.quantidade}x)</span>
                    <span>{formatPrice(item.preco * item.quantidade)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              Voltar
            </button>
            <button 
              onClick={finalizarPedido}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-line mr-2"></i>
              Finalizar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
