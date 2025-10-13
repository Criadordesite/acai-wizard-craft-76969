import { useEffect, useState } from "react";
import { isLojaAberta, getHorarioAbertura, getHorarioFechamento } from "@/lib/storeHours";

const StoreStatus = () => {
  const [aberta, setAberta] = useState(isLojaAberta());

  useEffect(() => {
    // Atualiza o status imediatamente
    setAberta(isLojaAberta());

    // Atualiza o status a cada 30 segundos
    const interval = setInterval(() => {
      setAberta(isLojaAberta());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="status-loja"
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
        aberta
          ? "bg-success/10 text-success border border-success/30"
          : "bg-destructive/10 text-destructive border border-destructive/30"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          aberta ? "bg-success animate-pulse" : "bg-destructive"
        }`}
      />
      <span>
        {aberta ? "LOJA ABERTA" : "LOJA FECHADA"}
      </span>
      <span className="text-xs opacity-70">
        ({getHorarioAbertura()} - {getHorarioFechamento()})
      </span>
    </div>
  );
};

export default StoreStatus;
