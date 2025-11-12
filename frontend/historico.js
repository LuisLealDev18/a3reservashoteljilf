window.onload = function() {
  const historicoOptions = document.getElementById('historicoOptions');
  const historico = JSON.parse(localStorage.getItem('historico')) || [];

  // Limpar o histórico
  historicoOptions.innerHTML = '';

  historico.forEach((reserva) => {
    historicoOptions.innerHTML += `
      <div class="historico-item">
        <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto} - Data de Entrada: ${new Date(reserva.dataEntrada).toLocaleDateString()} - Data de Saída: ${new Date(reserva.dataSaida).toLocaleDateString()}
      </div>
    `;
  });
};

// Função de Voltar para a página de Reservas
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'dashboard.html';  // Redireciona para a página de reservas
});
