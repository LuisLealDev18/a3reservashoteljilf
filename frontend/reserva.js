window.onload = function() {
  const calendarContainer = document.getElementById('calendar');
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const hoje = new Date();
  const diasDoMes = gerarDiasDoMes(hoje.getFullYear(), hoje.getMonth());

  // Limpar o calendário
  calendarContainer.innerHTML = '';

  // Gerar os dias do calendário
  diasDoMes.forEach((dia, index) => {
    const diaReserva = reservas.find(reserva => new Date(reserva.dataEntrada).toLocaleDateString() === dia.toLocaleDateString());
    const diaCheckOut = reservas.find(reserva => new Date(reserva.dataSaida).toLocaleDateString() === dia.toLocaleDateString());
    
    const isAvailable = !diaReserva && !diaCheckOut; // Verifica se o dia está disponível
    const isOccupied = diaReserva || diaCheckOut;

    const diaElement = document.createElement('div');
    diaElement.classList.add('calendar-day');
    
    // Se o dia estiver disponível
    if (isAvailable) {
      diaElement.classList.add('available');
      diaElement.innerHTML = `${dia.getDate()}<br>Disponível`;
    }
    // Se o dia estiver ocupado
    if (isOccupied) {
      diaElement.classList.add('occupied');
      diaElement.innerHTML = `${dia.getDate()}<br>Ocupado`;
    }

    // Exibir o dia no calendário
    calendarContainer.appendChild(diaElement);
  });

  // Adicionar evento de clique para o botão "Voltar"
  document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = 'dashboard.html';  // Redireciona para o dashboard
  });
};

// Função para gerar os dias do mês
function gerarDiasDoMes(ano, mes) {
  const dias = [];
  const primeiroDiaDoMes = new Date(ano, mes, 1);
  const ultimoDiaDoMes = new Date(ano, mes + 1, 0);

  for (let dia = primeiroDiaDoMes; dia <= ultimoDiaDoMes; dia.setDate(dia.getDate() + 1)) {
    dias.push(new Date(dia));
  }

  return dias;
}
