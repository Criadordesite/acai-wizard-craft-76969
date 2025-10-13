import { Facebook, Instagram, Music2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-secondary mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Coluna 1 - Informações da Empresa */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-secondary">THE BEST açaí</h3>
            <p className="text-sm mb-2">CNPJ: 28.976.949/0001-84</p>
            <p className="text-sm">GRUPO A MELHOR FRANCHISING LTDA.</p>
          </div>

          {/* Coluna 2 - Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-secondary">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary/80 transition-colors">
                  Regulamento do Clube The Best
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary/80 transition-colors">
                  Privacidade de dados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary/80 transition-colors">
                  Tabela nutricional
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary/80 transition-colors">
                  Seja nosso fornecedor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary/80 transition-colors">
                  Canal de Denúncias
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Redes Sociais e Certificações */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-secondary">Siga-nos</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Music2 className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-xs">
              <p className="mb-2 font-semibold">Certificações e Associações:</p>
              <ul className="space-y-1">
                <li>🏆 Excelência em Franchising 2025</li>
                <li>🏢 ABF Associado</li>
                <li>⭐ Melhores Franquias 2024</li>
                <li>👶 Apoiador Pequeno Príncipe</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/20 pt-6 text-center text-xs">
          <p className="mb-2">
            Imagens meramente ilustrativas. Consulte os restaurantes participantes. Todos os direitos reservados 2025.
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://thebestacai.com.br/"
              className="font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              THE BEST AÇAÍ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
