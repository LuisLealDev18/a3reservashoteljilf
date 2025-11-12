// ---------- Abrir Modal de Reserva ----------
document.querySelectorAll('.reserve-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const roomName = e.target.closest('.room-card').dataset.room;
    document.getElementById('quartoEscolhido').value = roomName;
    document.getElementById('modalTitle').textContent = `Nova reserva — ${roomName}`;
    openModal();
  });
});

// ---------- Mostrar Modal ----------
function openModal() {
  document.getElementById('reservationModal').classList.add('open');
}

// Fechar Modal
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelarReserva').addEventListener('click', closeModal);

// Fechar Modal ao clicar fora
window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('reservationModal')) {
    closeModal();
  }
});

function closeModal() {
  document.getElementById('reservationModal').classList.remove('open');
}

// ---------- Validação de CPF ----------
function validaCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = soma % 11;
  if (resto < 2) resto = 0;
  else resto = 11 - resto;
  if (parseInt(cpf[9]) !== resto) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = soma % 11;
  if (resto < 2) resto = 0;
  else resto = 11 - resto;
  if (parseInt(cpf[10]) !== resto) return false;

  return true;
}

// ---------- Submissão do Formulário de Reserva ----------
document.getElementById('reservationForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const nomeReserva = document.getElementById('nomeReserva').value;
  const cpfReserva = document.getElementById('cpfReserva').value;
  const dataEntrada = document.getElementById('dataEntrada').value;
  const dataSaida = document.getElementById('dataSaida').value;
  const valorReserva = parseFloat(document.getElementById('valorReserva').value);
  const desconto = parseFloat(document.getElementById('desconto').value);
  const acrescimo = parseFloat(document.getElementById('acrescimo').value);

  // Validação do CPF
  if (!validaCPF(cpfReserva)) {
    alert('CPF inválido. Por favor, insira um CPF válido.');
    return;
  }

  // Validação de Datas
  const entrada = new Date(dataEntrada);
  const saida = new Date(dataSaida);
  if (entrada >= saida) {
    alert('A data de entrada não pode ser posterior ou igual à data de saída.');
    return;
  }

  // Cálculo do valor final
  const valorFinal = valorReserva - desconto + acrescimo;

  // Criar a reserva
  const reserva = {
    nomeReserva,
    cpfReserva,
    dataEntrada,
    dataSaida,
    valorReserva,
    desconto,
    acrescimo,
    valorFinal,
    quartoEscolhido: document.getElementById('quartoEscolhido').value,
    status: 'confirmada',
  };

  // Salvar a reserva no localStorage
  let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  alert('Reserva confirmada com sucesso!');
  closeModal();
});
