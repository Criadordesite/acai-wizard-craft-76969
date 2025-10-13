import { useState, useEffect } from "react";
import { Users, TrendingUp, Award } from "lucide-react";

interface ProofData {
  viewers: number;
  dailySales: number;
  weeklyOrders: number;
  lastReset: string;
}

const getInitialData = (): ProofData => {
  const stored = localStorage.getItem('social-proof-data');
  const today = new Date().toDateString();
  
  if (stored) {
    const data = JSON.parse(stored);
    // Reset if it's after 23h and we haven't reset today
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 23 && data.lastReset !== today) {
      const newData = {
        viewers: Math.floor(Math.random() * 10) + 1,
        dailySales: Math.floor(Math.random() * 10) + 1,
        weeklyOrders: Math.floor(Math.random() * 10) + 1,
        lastReset: today
      };
      localStorage.setItem('social-proof-data', JSON.stringify(newData));
      return newData;
    }
    return data;
  }
  
  // Initial values
  const newData = {
    viewers: Math.floor(Math.random() * 20) + 15,
    dailySales: Math.floor(Math.random() * 10) + 5,
    weeklyOrders: Math.floor(Math.random() * 30) + 20,
    lastReset: today
  };
  localStorage.setItem('social-proof-data', JSON.stringify(newData));
  return newData;
};

const PopularityPopup = () => {
  const [proofData, setProofData] = useState<ProofData>(getInitialData);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  const messages = [
    {
      icon: Users,
      label: "🔥 Em alta agora!",
      text: `${proofData.viewers} pessoas estão vendo o catálogo agora`,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: TrendingUp,
      label: "🎯 Produto mais vendido!",
      text: `${proofData.dailySales} clientes compraram a Barca de Açaí HOJE!`,
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: Award,
      label: "⭐ Destaque da semana!",
      text: `A Barca de Açaí é o item mais popular com +${proofData.weeklyOrders} pedidos na semana!`,
      gradient: "from-orange-600 to-red-600"
    }
  ];

  // Check if it's after 23h
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      setShouldShow(hour < 23);
      
      // Check for reset at 23h
      if (hour >= 23) {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('social-proof-data');
        if (stored) {
          const data = JSON.parse(stored);
          if (data.lastReset !== today) {
            const newData = {
              viewers: Math.floor(Math.random() * 10) + 1,
              dailySales: Math.floor(Math.random() * 10) + 1,
              weeklyOrders: Math.floor(Math.random() * 10) + 1,
              lastReset: today
            };
            localStorage.setItem('social-proof-data', JSON.stringify(newData));
            setProofData(newData);
          }
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Increment counters every 20 seconds
  useEffect(() => {
    const incrementInterval = setInterval(() => {
      setProofData(prev => {
        const newData = {
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 4) + 1,
          dailySales: prev.dailySales + Math.floor(Math.random() * 2) + 1,
          weeklyOrders: prev.weeklyOrders + Math.floor(Math.random() * 3) + 1
        };
        localStorage.setItem('social-proof-data', JSON.stringify(newData));
        return newData;
      });
    }, 20000);

    return () => clearInterval(incrementInterval);
  }, []);

  // Rotate messages every 12 seconds
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 12000);

    return () => clearInterval(rotateInterval);
  }, [messages.length]);

  // Blinking animation: 10s visible, 2s hidden
  useEffect(() => {
    if (!shouldShow) return;

    const blinkCycle = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Hide after 10s
    };

    blinkCycle();
    const blinkInterval = setInterval(blinkCycle, 12000); // Total cycle: 12s (10s + 2s)

    return () => clearInterval(blinkInterval);
  }, [shouldShow]);

  if (!shouldShow) return null;

  const CurrentIcon = messages[currentMessage].icon;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className={`bg-gradient-to-r ${messages[currentMessage].gradient} text-white rounded-lg shadow-2xl p-4 flex items-center gap-3 animate-fade-in`}>
        <div className="bg-white/20 rounded-full p-2 animate-pulse">
          <CurrentIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold opacity-90">{messages[currentMessage].label}</span>
          <span className="text-sm font-bold">
            {messages[currentMessage].text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularityPopup;
