const apiKey = 'API_KEY'; // Chave real da API

// Evento de envio do formulário de consumo
const form = document.getElementById('consumo');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const qt = document.getElementById('qt').value.trim(); // quantidade
    const tp = document.getElementById('tp').value.trim(); // tipo
    const tempo = document.getElementById('tempo').value.trim(); // horas por dia
    const qtp = document.getElementById('qtp').value.trim(); // número de pessoas
    const regiao = document.getElementById('regiao').value.trim(); // localização

    // Verifica se todos os campos estão preenchidos
    if (!qt || !tp || !tempo || !qtp || !regiao) {
      document.getElementById('resul').innerHTML = "<div class='alert alert-warning'>Preencha todos os campos antes de enviar.</div>";
      return;
    }

    const eletros = obterTodosOsEletrodomesticos();
    const resumoEletros = eletros.map(e => `${e.quantidade}x ${e.aparelho} no ${e.comodo}`).join(', ');

    const prompt = `Veja a média de consumo de energia da casa. Os eletrodomésticos registrados são: ${resumoEletros}.
O tempo médio de uso diário é ${tempo} horas, há ${qtp} pessoas na casa e a região é ${regiao}.
Auxilie com dicas de como diminuir o consumo em javascript.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      const resultado = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Não foi possível obter uma resposta da API.';

      document.getElementById('resul').innerHTML = `<div class='alert alert-success'><strong>Resultado:</strong><br>${resultado}</div>`;

    } catch (error) {
      document.getElementById('resul').innerHTML = "<div class='alert alert-danger'>Erro ao consultar a API de consumo de energia.</div>";
      console.error(error);
    }
  });
}

// Função utilitária - usada também em outros scripts
function obterTodosOsEletrodomesticos() {
  const dados = JSON.parse(localStorage.getItem('comodos')) || {};
  const resultado = [];
  for (const comodo in dados) {
    for (const aparelho in dados[comodo]) {
      resultado.push({ comodo, aparelho, quantidade: dados[comodo][aparelho] });
    }
  }
  return resultado;
}