/**
 * Horários de funcionamento da loja
 */
const HORARIO_ABERTURA = { hora: 9, minuto: 50 };
const HORARIO_FECHAMENTO = { hora: 23, minuto: 30 };

/**
 * Verifica se a loja está aberta no momento atual
 * @returns true se a loja estiver aberta, false se estiver fechada
 */
export function isLojaAberta(): boolean {
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();

  // Converte tudo para minutos desde a meia-noite para facilitar comparação
  const minutosAtual = horaAtual * 60 + minutoAtual;
  const minutosAbertura = HORARIO_ABERTURA.hora * 60 + HORARIO_ABERTURA.minuto;
  const minutosFechamento = HORARIO_FECHAMENTO.hora * 60 + HORARIO_FECHAMENTO.minuto;

  return minutosAtual >= minutosAbertura && minutosAtual < minutosFechamento;
}

/**
 * Retorna o horário de abertura formatado (HH:MM)
 */
export function getHorarioAbertura(): string {
  return `${String(HORARIO_ABERTURA.hora).padStart(2, '0')}:${String(HORARIO_ABERTURA.minuto).padStart(2, '0')}`;
}

/**
 * Retorna o horário de fechamento formatado (HH:MM)
 */
export function getHorarioFechamento(): string {
  return `${String(HORARIO_FECHAMENTO.hora).padStart(2, '0')}:${String(HORARIO_FECHAMENTO.minuto).padStart(2, '0')}`;
}
