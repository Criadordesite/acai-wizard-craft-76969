const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          O Melhor Açaí da Cidade! 🍇
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Açaí fresquinho, personalizado do seu jeito, entregue na sua casa!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <i className="ri-truck-line text-2xl mb-2 block"></i>
            <span className="text-sm font-semibold">Entrega Rápida</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <i className="ri-leaf-line text-2xl mb-2 block"></i>
            <span className="text-sm font-semibold">100% Natural</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <i className="ri-heart-line text-2xl mb-2 block"></i>
            <span className="text-sm font-semibold">Feito com Amor</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
