window.onload = function() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const checkinOptions = document.getElementById('checkinOptions');

  // Limpar as opções de check-in
  checkinOptions.innerHTML = '';

  // Exibir as reservas em ordem de data de entrada
  reservas.sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));

  reservas.forEach((reserva, index) => {
    if (!reserva.checkin) { // Só exibe reservas para check-in
      checkinOptions.innerHTML += `
        <div class="checkin-option">
          <div>
            <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto}
            <p>Data de Entrada: ${new Date(reserva.dataEntrada).toLocaleDateString()}</p>
          </div>
          <button class="checkin-btn" onclick="confirmarCheckin(${index})">Confirmar Check-in</button>
        </div>
      `;
    }
  });
};

// Função de confirmar check-in
function confirmarCheckin(index) {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const reserva = reservas[index];

  // Marcar a reserva como check-in
  reserva.checkin = true;

  // Atualizando as reservas no localStorage
  localStorage.setItem('reservas', JSON.stringify(reservas));

  // Mover a reserva para o checkout
  const checkout = JSON.parse(localStorage.getItem('checkout')) || [];
  checkout.push(reserva);
  localStorage.setItem('checkout', JSON.stringify(checkout));

  // Atualizar a página
  window.location.reload();  // Atualiza a página para refletir as mudanças
}

// Função de Voltar para a página de Reservas
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'dashboard.html';  // Redireciona para a página de dashboard
});
