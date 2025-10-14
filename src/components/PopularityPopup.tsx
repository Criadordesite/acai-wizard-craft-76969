import { useEffect, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";

interface ProofData {
  viewers: number;
  dailySales: number;
  weeklyOrders: number;
  lastReset: string;
}

const getInitialData = (): ProofData => {
  const stored = localStorage.getItem("proofData");
  const now = new Date();
  
  if (stored) {
    const data = JSON.parse(stored);
    const lastReset = new Date(data.lastReset);
    
    // Reset às 23:30
    if (
      (now.getHours() === 23 && now.getMinutes() >= 30) ||
      now.getHours() < 9 ||
      (now.getHours() === 9 && now.getMinutes() < 50)
    ) {
      // Se está após 23:30 ou antes de 09:50, resetar
      const newData = {
        viewers: Math.floor(Math.random() * 21) + 40,
        dailySales: Math.floor(Math.random() * 8) + 3,
        weeklyOrders: Math.floor(Math.random() * 50) + 20,
        lastReset: now.toISOString(),
      };
      localStorage.setItem("proofData", JSON.stringify(newData));
      return newData;
    }
    
    return data;
  }
  
  // Primeira vez
  const initialData = {
    viewers: Math.floor(Math.random() * 21) + 40,
    dailySales: Math.floor(Math.random() * 8) + 3,
    weeklyOrders: Math.floor(Math.random() * 50) + 20,
    lastReset: now.toISOString(),
  };
  localStorage.setItem("proofData", JSON.stringify(initialData));
  return initialData;
};

export const PopularityPopup = () => {
  const [proofData, setProofData] = useState<ProofData>(getInitialData);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Verificar reset a cada minuto
    const resetInterval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      // Resetar às 23:30
      if (hour === 23 && minute === 30) {
        const newData = {
          viewers: Math.floor(Math.random() * 21) + 40,
          dailySales: Math.floor(Math.random() * 8) + 3,
          weeklyOrders: Math.floor(Math.random() * 50) + 20,
          lastReset: now.toISOString(),
        };
        setProofData(newData);
        localStorage.setItem("proofData", JSON.stringify(newData));
      }
    }, 60000); // Verificar a cada 1 minuto

    return () => clearInterval(resetInterval);
  }, []);

  useEffect(() => {
    // Incrementar dados aleatoriamente
    const incrementInterval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute;
      const openTime = 9 * 60 + 50;
      const closeTime = 23 * 60 + 30;
      
      // Só incrementar se a loja estiver aberta
      if (currentTime >= openTime && currentTime < closeTime) {
        setProofData((prev) => {
          const updated = {
            ...prev,
            viewers: prev.viewers + Math.floor(Math.random() * 3),
            dailySales: Math.random() > 0.7 ? prev.dailySales + 1 : prev.dailySales,
            weeklyOrders: Math.random() > 0.8 ? prev.weeklyOrders + 1 : prev.weeklyOrders,
          };
          localStorage.setItem("proofData", JSON.stringify(updated));
          return updated;
        });
      }
    }, 30000); // A cada 30 segundos

    return () => clearInterval(incrementInterval);
  }, []);

  useEffect(() => {
    // Alternar mensagens
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % 2);
    }, 5000); // Alternar a cada 5 segundos

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    // Animação de piscar
    const blinkInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500);

    const stopBlinkTimeout = setTimeout(() => {
      clearInterval(blinkInterval);
      setIsVisible(true);
    }, 2000);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(stopBlinkTimeout);
    };
  }, [currentMessage]);

  if (!showPopup) return null;

  const messages = [
    {
      icon: <Eye className="w-5 h-5" />,
      text: `${proofData.viewers} pessoas estão vendo o cardápio neste momento!`,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: `${proofData.dailySales} pessoas compraram a Barca de Açaí hoje!`,
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const current = messages[currentMessage];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-70 scale-95"
      }`}
    >
      <div
        className={`bg-gradient-to-r ${current.gradient} text-white px-6 py-3 rounded-full shadow-elegant flex items-center gap-3 max-w-md`}
      >
        {current.icon}
        <span className="font-semibold text-sm">{current.text}</span>
        <button
          onClick={() => setShowPopup(false)}
          className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
};
