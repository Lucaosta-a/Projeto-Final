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

  // ===== INÍCIO DA ALTERAÇÃO (BLOCO 1) =====
  // Bloco 1: Pergunta sobre Pessoas
  if (radioGroups.pessoas.length > 0) {
    formIdentificado = true;
    let valorFinal = "";
    radioGroups.pessoas.forEach(radio => {
      if (radio.checked) {
        selecionado = radio.value;
      }
    });

    if (selecionado === "") {
      alert("Por favor, selecione uma opção.");
      return;
    }

    if (selecionado === "custom") {
      const customValue = document.getElementById('pessoas_custom_input').value;
      if (!customValue || parseInt(customValue) < 1) {
        alert("Por favor, insira um número de pessoas válido.");
        return;
      }
      valorFinal = customValue + (parseInt(customValue) === 1 ? " pessoa" : " pessoas");
    } else {
      valorFinal = selecionado;
    }

    variavel = "pergunta1";
    valorSalvo = "Vivem " + valorFinal;
    proximaPagina = "02Pergunta.html";
  }
  // ===== FIM DA ALTERAÇÃO (BLOCO 1) =====

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

window.onload = function () {
  if (window.location.pathname.includes("resumo.html")) {
    const container = document.getElementById("resumoRespostas");

    // ===== INÍCIO DA ALTERAÇÃO (ÍCONES) =====
    // O valor "5+ pessoas" foi removido pois a nova opção editável o substitui.
    const icones = {
      pergunta1: { "1 a 2 pessoas": "bi-people", "3 pessoas": "bi-people-fill", "4 pessoas": "bi-people-fill" },
      pergunta2: { "Apartamento": "bi-building", "Casa": "bi-house" },
      pergunta3: { "Inferior a 5 anos": "bi-lightning-charge", "5 a 10 anos": "bi-lightning", "10 a 15 anos": "bi-exclamation-triangle", "Não sei": "bi-patch-question-fill" },
      pergunta4: { "menos de 1500": "bi-wallet", "1500 a 2500 R$": "bi-wallet2", "2500 a 3500 R$": "bi-piggy-bank", "3500 a 4500 R$": "bi-cash-coin", "Mais de 5000 R$": "bi-graph-up-arrow", "acima de 28000": "bi-rocket-takeoff" },
      pergunta5: { "Sim": "bi-patch-check-fill", "Não": "bi-patch-minus-fill", "Não sei": "bi-patch-question-fill" },
      pergunta6: { "Monofásico": "bi-1-circle-fill", "Bifásico": "bi-2-circle-fill", "Trifásico": "bi-3-circle-fill", "não sei informar": "bi-question-circle-fill" },
      pergunta7: { "Opção 1 a definir": "bi-question-circle", "Opção 2 a definir": "bi-question-circle" }
    };
    // ===== FIM DA ALTERAÇÃO (ÍCONES) =====

    const perguntas = {
      pergunta1: { prefixo: "Vivem ", label: "Moradores" },
      pergunta2: { prefixo: "Moro em um/a ", label: "Tipo de Imóvel" },
      pergunta3: { 
        prefixo: "Tempo de manutenção: ", 
        label: "Manutenção",
        mapa: { "Não sei": "Não sei informar" }
      },
      pergunta4: { 
        prefixo: "Renda familiar: ", 
        label: "Renda Familiar",
        mapa: {
          "menos de 1500": "até 1518,00 R$", "1500 a 2500 R$": "1518,00 a 2900,00 R$", "2500 a 3500 R$": "2900,00 a 4500,00 R$", "3500 a 4500 R$": "4500,00 a 7100,00 R$", "Mais de 5000 R$": "7100,00 a 28000,00 R$", "acima de 28000": "acima 28000,00 R$"
        }
      },
      pergunta5: { prefixo: "Beneficiário de programa social: ", label: "Programa Social" },
      pergunta6: { prefixo: "Tipo de medidor: ", label: "Medidor" },
     
    };

    for (let i = 1; i <= 7; i++) {
      const chavePergunta = "pergunta" + i;
      const textoCompleto = localStorage.getItem(chavePergunta);

      if (textoCompleto) {
        const config = perguntas[chavePergunta];
        const prefixo = config.prefixo;
        const chaveValor = textoCompleto.replace(prefixo, "");
        const textoDisplay = (config.mapa && config.mapa[chaveValor]) ? config.mapa[chaveValor] : chaveValor;
        
        let iconeClasse = icones[chavePergunta][chaveValor];

        // ===== INÍCIO DA ALTERAÇÃO (LÓGICA DO RESUMO) =====
        // Se um ícone não for encontrado para a pergunta 1 (o que acontecerá com valores customizados),
        // atribui um ícone padrão para pessoas.
        if (!iconeClasse && chavePergunta === 'pergunta1') {
          iconeClasse = 'bi-people-fill';
        }
        // ===== FIM DA ALTERAÇÃO (LÓGICA DO RESUMO) =====

        iconeClasse = iconeClasse || 'bi-question-circle'; // Fallback final

        container.innerHTML += `
          <div class="radio-label">
            <i class="bi ${iconeClasse} icon-40 me-2"></i> ${prefixo}${textoDisplay}
          </div>
        `;
      }
    }
  }
};

function confirmarEnvio() {
  // alert("Informações confirmadas com sucesso! Obrigado.");
  window.location.href = "../simulador/instrucoes.html";
}