const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <img 
              alt="The Best Açaí Logo" 
              className="w-16 h-16 rounded-full object-cover" 
              src="https://static.readdy.ai/image/0a1685e22902e5e8eea3f873bad279a5/7d0f4c389871664d6775fdba136f73a5.jpeg"
            />
            <h3 className="text-3xl font-bold font-pacifico">The Best Açaí</h3>
          </div>
          <p className="text-purple-200 text-lg">O melhor açaí da cidade, feito com amor! 💜</p>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://wa.me/5551995764542" className="text-purple-200 hover:text-white transition-colors cursor-pointer">
            <i className="ri-whatsapp-line text-3xl"></i>
          </a>
          <a href="#" className="text-purple-200 hover:text-white transition-colors cursor-pointer">
            <i className="ri-instagram-line text-3xl"></i>
          </a>
          <a href="#" className="text-purple-200 hover:text-white transition-colors cursor-pointer">
            <i className="ri-facebook-line text-2xl"></i>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
            <i className="ri-shield-check-line text-green-400 text-xl"></i>
            <span className="text-sm font-semibold">Site Confiável</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
            <i className="ri-star-line text-yellow-400 text-xl"></i>
            <span className="text-sm font-semibold">Produto de Qualidade</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
            <i className="ri-truck-line text-blue-400 text-xl"></i>
            <span className="text-sm font-semibold">Entrega Garantida</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
            <i className="ri-leaf-line text-green-400 text-xl"></i>
            <span className="text-sm font-semibold">100% Natural</span>
          </div>
        </div>

        <div className="border-t border-purple-700 pt-6 text-center">
          <p className="text-purple-200 text-sm mb-2">CNPJ: 28.967.949/0001-84</p>
          <p className="text-purple-200 text-sm">
            © 2024 The Best Açaí. Todos os direitos reservados. |
            <a href="https://readdy.ai/?origin=logo" className="text-purple-200 hover:text-white ml-1 cursor-pointer">
              Powered by Readdy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
