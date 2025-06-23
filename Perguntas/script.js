function salvarResposta() {
  // Identifica todos os possíveis grupos de rádio
  const radioGroups = {
    pessoas: document.querySelectorAll('input[name="pessoas"]'),
    imovel: document.querySelectorAll('input[name="imovel"]'),
    manutencao: document.querySelectorAll('input[name="manutencao"]'),
    renda: document.querySelectorAll('input[name="renda"]'),
    social: document.querySelectorAll('input[name="social"]'),
    medidor: document.querySelectorAll('input[name="medidor"]'),
    definir7: document.querySelectorAll('input[name="definir7"]')
  };

  let selecionado = "";
  let proximaPagina = "";
  let variavel = "";
  let valorSalvo = "";
  let formIdentificado = false;

  // Bloco 1: Pergunta sobre Pessoas
  if (radioGroups.pessoas.length > 0) {
    formIdentificado = true;
    radioGroups.pessoas.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta1";
    valorSalvo = "Vivem " + selecionado;
    proximaPagina = "02Pergunta.html";
  }
  // Bloco 2: Pergunta sobre Imóvel
  else if (radioGroups.imovel.length > 0) {
    formIdentificado = true;
    radioGroups.imovel.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta2";
    valorSalvo = "Moro em um/a " + selecionado;
    proximaPagina = "03Pergunta.html";
  }
  // Bloco 3: Pergunta sobre Manutenção
  else if (radioGroups.manutencao.length > 0) {
    formIdentificado = true;
    radioGroups.manutencao.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta3";
    valorSalvo = "Tempo de manutenção: " + selecionado;
    proximaPagina = "04Pergunta.html";
  }
  // Bloco 4: Pergunta sobre Renda Familiar
  else if (radioGroups.renda.length > 0) {
    formIdentificado = true;
    radioGroups.renda.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta4";
    valorSalvo = "Renda familiar: " + selecionado;
    proximaPagina = "05Pergunta.html";
  }
  // Bloco 5: Pergunta sobre Programa Social
  else if (radioGroups.social.length > 0) {
    formIdentificado = true;
    radioGroups.social.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta5";
    valorSalvo = "Beneficiário de programa social: " + selecionado;
    proximaPagina = "06Pergunta.html";
  }
  // Bloco 6: Pergunta sobre Medidor de Energia
  else if (radioGroups.medidor.length > 0) {
    formIdentificado = true;
    radioGroups.medidor.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta6";
    valorSalvo = "Tipo de medidor: " + selecionado;
    // ===== CORREÇÃO APLICADA AQUI =====
    proximaPagina = "resumo.html"; 
  }
  // Bloco 7: Pergunta a Definir
  else if (radioGroups.definir7.length > 0) {
    formIdentificado = true;
    radioGroups.definir7.forEach(radio => { if (radio.checked) selecionado = radio.value; });
    if (selecionado === "") { alert("Selecione uma opção"); return; }
    variavel = "pergunta7";
    valorSalvo = "Resposta 7: " + selecionado;
    proximaPagina = "resumo.html";
  }

  // Se nenhum formulário foi encontrado, encerra a função
  if (!formIdentificado) {
    console.error("Nenhum grupo de rádio conhecido encontrado na página atual.");
    return;
  }

  localStorage.setItem(variavel, valorSalvo);
  window.location.href = proximaPagina;
}

function confirmarVolta() {
  const confirmar = confirm("Deseja voltar à página principal?");
  if (confirmar) {
    window.location.href = "../index.html";
  }
}

// Função executada ao carregar a página
window.onload = function () {
  // Executa apenas se estiver na página de resumo
  if (window.location.pathname.includes("resumo.html")) {
    const container = document.getElementById("resumoRespostas");

    // Mapeamento completo de ícones para todas as perguntas
    const icones = {
      pergunta1: { "1 a 2 pessoas": "bi-people", "3 pessoas": "bi-people-fill", "4 pessoas": "bi-people-fill", "5+ pessoas": "bi-people-fill" },
      pergunta2: { "Unidade Habitacional": "bi-building", "Casa": "bi-house", "Loja": "bi-shop" },
      pergunta3: { "Inferior a 5 anos": "bi-lightning-charge", "5 a 10 anos": "bi-lightning", "10 a 15 anos": "bi-exclamation-triangle" },
      pergunta4: { "menos de 1500": "bi-wallet", "1500 a 2500 R$": "bi-wallet2", "2500 a 3500 R$": "bi-piggy-bank", "3500 a 4500 R$": "bi-cash-coin", "Mais de 5000 R$": "bi-graph-up-arrow" },
      pergunta5: { "Sim": "bi-patch-check-fill", "Não": "bi-patch-minus-fill", "Não sei": "bi-patch-question-fill" },
      pergunta6: { "Monofásico": "bi-1-circle-fill", "Bifásico": "bi-2-circle-fill", "Trifásico": "bi-3-circle-fill", "não sei informar": "bi-question-circle-fill" },
      pergunta7: { "Opção 1 a definir": "bi-question-circle", "Opção 2 a definir": "bi-question-circle" }
    };

    // Objeto com todas as perguntas
    const perguntas = {
      pergunta1: { prefixo: "Vivem ", label: "Moradores" },
      pergunta2: { prefixo: "Moro em uma ", label: "Tipo de Imóvel" },
      pergunta3: { prefixo: "Tempo de manutenção: ", label: "Manutenção" },
      pergunta4: { prefixo: "Renda familiar: ", label: "Renda Familiar" },
      pergunta5: { prefixo: "Beneficiário de programa social: ", label: "Programa Social" },
      pergunta6: { prefixo: "Tipo de medidor: ", label: "Medidor" },
      pergunta7: { prefixo: "Resposta 7: ", label: "Pergunta 7" }
    };

    // Itera sobre todas as perguntas e exibe as que têm resposta
    for (let i = 1; i <= 7; i++) {
      const chavePergunta = "pergunta" + i;
      const textoCompleto = localStorage.getItem(chavePergunta);

      if (textoCompleto) {
        const prefixo = perguntas[chavePergunta].prefixo;
        const chaveIcone = textoCompleto.replace(prefixo, "");
        const iconeClasse = icones[chavePergunta][chaveIcone] || 'bi-question-circle';

        container.innerHTML += `
          <div class="radio-label">
            <i class="bi ${iconeClasse} icon-40 me-2"></i> ${textoCompleto}
          </div>
        `;
      }
    }
  }
};

// Confirmação final e redirecionamento
function confirmarEnvio() {
  // alert("Informações confirmadas com sucesso! Obrigado.");
  window.location.href = "../simulador/instrucoes.html";
}