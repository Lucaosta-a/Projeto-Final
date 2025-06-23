document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'AIzaSyBBRHEdl_dJP6DlPHni1jTNI4NkfGQ368s'; // Sua chave real da API
    const summaryTableContainer = document.getElementById('summaryTableContainer');
    const economizeBtn = document.getElementById('economizeBtn');
    // --- INÍCIO DA ALTERAÇÃO ---
    const reiniciarBtn = document.getElementById('reiniciarBtn'); // Pega a referência do novo botão

    // --- COLETA DE DADOS --- (sem alterações)
    const storedSelectedAppliances = localStorage.getItem('selectedAppliancesByRoom');
    const selectedAppliancesByRoom = storedSelectedAppliances ? JSON.parse(storedSelectedAppliances) : {};
    const storedCustomRooms = localStorage.getItem('customRoomAppliancesData');
    const customRoomAppliancesData = storedCustomRooms ? JSON.parse(storedCustomRooms) : {};
    const pergunta1 = localStorage.getItem('pergunta1');
    const pergunta2 = localStorage.getItem('pergunta2');
    const pergunta3 = localStorage.getItem('pergunta3');
    const pergunta4 = localStorage.getItem('pergunta4');
    const pergunta5 = localStorage.getItem('pergunta5');
    const pergunta6 = localStorage.getItem('pergunta6');

    // --- NOVA FUNÇÃO PARA REINICIAR TUDO ---
    function reiniciarSimulacaoCompleta() {
        if (confirm("Tem certeza de que deseja reiniciar a simulação? Todos os seus dados preenchidos serão permanentemente apagados.")) {
            // Limpa todas as chaves do localStorage usadas no projeto
            localStorage.removeItem('selectedAppliancesByRoom');
            localStorage.removeItem('customRoomAppliancesData');
            localStorage.removeItem('pergunta1');
            localStorage.removeItem('pergunta2');
            localStorage.removeItem('pergunta3');
            localStorage.removeItem('pergunta4');
            localStorage.removeItem('pergunta5');
            localStorage.removeItem('pergunta6');
            localStorage.removeItem('dicasGeradas');
            localStorage.removeItem('ultimoRelatorio');
            
            // Redireciona para a página inicial
            alert("Simulação reiniciada com sucesso!");
            window.location.href = '../index.html';
        }
    }

    // Função para transformar o botão (sem alterações)
    function transformarBotaoParaPremium() {
        const btn = document.getElementById('economizeBtn');
        if (btn) {
            btn.innerHTML = '<i class="bi bi-star-fill me-2"></i> Tornar-se Premium';
            btn.onclick = function() {
                window.location.href = '../index/premium.html';
            };
            btn.disabled = false;
        }
    }
    
    // Função para mostrar os botões pós-consulta
    function mostrarBotoesPosConsulta() {
        if(reiniciarBtn) {
            reiniciarBtn.style.display = 'inline-block';
        }
    }
    // --- FIM DAS NOVAS FUNÇÕES ---

    // Função para gerar o prompt (sem alterações)
    function generateGeminiPrompt() {
        let promptParts = [];
        promptParts.push("Com base no perfil do cliente e na lista de eletrodomésticos abaixo, forneça um relatório completo sobre como economizar energia. A resposta deve ser amigável, clara e bem estruturada.");
        promptParts.push("\n");

        promptParts.push("### Perfil do Cliente");
        if (pergunta1) promptParts.push(`- **Moradores na residência:** ${pergunta1.replace('Vivem ', '')}`);
        if (pergunta2) promptParts.push(`- **Tipo de imóvel:** ${pergunta2.replace('Moro em uma ', '')}`);
        if (pergunta3) promptParts.push(`- **Tempo da última manutenção elétrica:** ${pergunta3.replace('Tempo de manutenção: ', '')}`);
        if (pergunta4) promptParts.push(`- **Renda familiar mensal:** ${pergunta4.replace('Renda familiar: ', '')}`);
        if (pergunta5) promptParts.push(`- **Beneficiário de programa social:** ${pergunta5.replace('Beneficiário de programa social: ', '')}`);
        if (pergunta6) promptParts.push(`- **Tipo de medidor de energia:** ${pergunta6.replace('Tipo de medidor: ', '')}`);
        promptParts.push("\n");

        promptParts.push("### Instruções para a Análise");
        if (pergunta3 && (pergunta3.includes("10 a 15 anos"))) {
            promptParts.push("- **Atenção:** Como a rede elétrica não tem manutenção há mais de 10 anos, inclua uma **forte recomendação para uma revisão elétrica profissional**. Explique que fiação antiga causa fuga de energia e riscos de segurança.");
        }
        if (pergunta2 && (pergunta2.includes("Casa") || pergunta2.includes("Loja"))) {
            promptParts.push("- **Oportunidade:** Como o imóvel é uma casa ou loja, sugira o **investimento em energia solar fotovoltaica** como uma solução de longo prazo, mencionando a grande economia e sustentabilidade.");
        }
        if (pergunta5 && pergunta5.includes("Sim")) {
            promptParts.push("- **Foco Social:** O cliente é beneficiário de programa social. Portanto, as dicas devem ser de **baixo ou nenhum custo de implementação**. Priorize mudanças de hábitos e otimização de uso. Mencione a **Tarifa Social de Energia Elétrica** e como verificar se ele tem direito. **Atenção** caso o usuario seja beneficiario de programa social reforce o fato de que sem muito dinheiro para investir a mudança de habitos se torna crucial para reduzir gastos e ter um consumo mais consciente");
        }
        promptParts.push("- Dê dicas de economia organizadas por cômodo ou por tipo de aparelho.");
        promptParts.push("**De destaque a esta informação**- No inicio da sua resposta inclua uma estimativa de até quanto a pessoa pode economizar em R$ caso siga as dicas recomendadas. use isto como forma de encorajar o usurio a seguir as dicas propostas. ");

        promptParts.push("\n");

        promptParts.push("### Eletrodomésticos e Uso Diário");
        let hasAppliances = false;
        for (const roomKey in selectedAppliancesByRoom) {
            const appliances = selectedAppliancesByRoom[roomKey];
            let displayName = customRoomAppliancesData[roomKey]?.displayName || roomKey;

            if (appliances && appliances.length > 0) {
                hasAppliances = true;
                promptParts.push(`**Cômodo: ${displayName}**`);
                appliances.forEach(appliance => {
                    promptParts.push(`- ${appliance.name} (Quantidade: ${appliance.quantity}, Uso diário: ${appliance.dailyUsage} horas)`);
                });
            }
        }

        if (!hasAppliances) {
            promptParts.push("Nenhum eletrodoméstico foi cadastrado no simulador.");
        }
        
        return promptParts.join('\n');
    }
    
    // Função para exibir a tabela de resumo (sem alterações)
    function displaySummaryTable() {
        let tableHtml = '<div class="table-responsive d-none d-md-block">';
        tableHtml += '<table class="table table-striped table-hover">';
        tableHtml += '<thead class="table-primary">';
        tableHtml += '<tr><th scope="col">Cômodo</th><th scope="col">Eletrodoméstico</th><th scope="col">Quantidade</th><th scope="col">Uso Diário (horas)</th></tr>';
        tableHtml += '</thead><tbody>';

        let mobileCardsHtml = '<div class="summary-cards-mobile d-md-none">';
        mobileCardsHtml += '<h5 class="text-center text-primary mb-3">Resumo dos Eletrodomésticos</h5>';

        let hasApplianceData = false;
        const allRoomKeys = Object.keys(selectedAppliancesByRoom).sort((a, b) => {
            const isACustom = a.startsWith('custom-');
            const isBCustom = b.startsWith('custom-');
            if (isACustom && !isBCustom) return 1;
            if (!isACustom && isBCustom) return -1;
            const nameA = a.startsWith('custom-') ? customRoomAppliancesData[a]?.displayName || a : a;
            const nameB = b.startsWith('custom-') ? customRoomAppliancesData[b]?.displayName || b : b;
            return nameA.localeCompare(nameB);
        });

        allRoomKeys.forEach(roomKey => {
            const appliances = selectedAppliancesByRoom[roomKey];
            let displayName = customRoomAppliancesData[roomKey]?.displayName || roomKey;

            if (appliances && appliances.length > 0) {
                hasApplianceData = true;
                appliances.forEach((appliance, index) => {
                    tableHtml += `<tr>`;
                    if (index === 0) {
                        tableHtml += `<td rowspan="${appliances.length}" class="align-middle fw-bold">${displayName}</td>`;
                    }
                    tableHtml += `<td>${appliance.name}</td><td>${appliance.quantity || 1}</td><td>${(appliance.dailyUsage || 0).toFixed(1)}</td></tr>`;
                });

                mobileCardsHtml += `<div class="card mb-3 border-primary"><div class="card-header bg-primary text-white fw-bold">${displayName}</div><ul class="list-group list-group-flush">`;
                appliances.forEach(appliance => {
                    mobileCardsHtml += `<li class="list-group-item"><strong>${appliance.name}</strong><br>Quantidade: ${appliance.quantity || 1}<br>Uso Diário: ${(appliance.dailyUsage || 0).toFixed(1)} horas</li>`;
                });
                mobileCardsHtml += '</ul></div>';
            }
        });

        if (!hasApplianceData) {
            tableHtml += `<tr><td colspan="4" class="text-center text-muted">Nenhum eletrodoméstico selecionado.</td></tr>`;
            mobileCardsHtml = `<div class="text-center text-muted">Nenhum eletrodoméstico selecionado.</div>`;
        }
        tableHtml += '</tbody></table></div>';
        mobileCardsHtml += '</div>';

        let infoGeraisHtml = '';
        const hasQuizData = pergunta1 || pergunta2 || pergunta3 || pergunta4 || pergunta5 || pergunta6;

        if (hasQuizData) {
            infoGeraisHtml += '<h5 class="text-center text-secondary mb-3 mt-4">Suas Respostas</h5>';
            infoGeraisHtml += '<div class="card mb-3 border-secondary">';
            infoGeraisHtml += '<ul class="list-group list-group-flush">';
            if (pergunta1) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-people-fill me-2"></i>${pergunta1}</li>`;
            if (pergunta2) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-house-fill me-2"></i>${pergunta2}</li>`;
            if (pergunta3) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-tools me-2"></i>${pergunta3}</li>`;
            if (pergunta4) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-cash-coin me-2"></i>${pergunta4}</li>`;
            if (pergunta5) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-patch-check-fill me-2"></i>${pergunta5}</li>`;
            if (pergunta6) infoGeraisHtml += `<li class="list-group-item"><i class="bi bi-speedometer2 me-2"></i>${pergunta6}</li>`;
            infoGeraisHtml += '</ul></div>';
        }

        if (!hasApplianceData && !hasQuizData) {
            summaryTableContainer.innerHTML = `<div class="text-center text-muted p-4">Nenhum dado foi preenchido. Volte e preencha o questionário ou o simulador.</div>`;
        } else {
            summaryTableContainer.innerHTML = tableHtml + mobileCardsHtml + infoGeraisHtml;
        }
    }

    // Função para consultar a API (com a lógica de mostrar o novo botão)
    async function getEconomyTips() {
        const prompt = generateGeminiPrompt();
        
        summaryTableContainer.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <p class="mt-3 text-secondary">Analisando seus dados e gerando dicas personalizadas... Isso pode levar alguns segundos.</p>
            </div>`;
        
        economizeBtn.disabled = true;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const data = await response.json();
            const resultado = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                                 'Não foi possível obter uma resposta da API. Tente novamente mais tarde.';

            const formattedHtml = marked.parse(resultado);
            summaryTableContainer.innerHTML = `<div class="gemini-response-container p-3">${formattedHtml}</div>`; 

            localStorage.setItem('dicasGeradas', 'true');
            localStorage.setItem('ultimoRelatorio', formattedHtml);
            
            transformarBotaoParaPremium();
            // --- MOSTRA O BOTÃO DE REINICIAR ---
            mostrarBotoesPosConsulta();

        } catch (error) {
            summaryTableContainer.innerHTML = "<div class='alert alert-danger'>Erro ao consultar a API. Verifique sua chave de API ou conexão com a internet.</div>";
            console.error("Erro na consulta Gemini API:", error);
            economizeBtn.disabled = false;
        }
    }

    // --- LÓGICA PRINCIPAL MODIFICADA ---
    const dicasJaGeradas = localStorage.getItem('dicasGeradas') === 'true';

    if (dicasJaGeradas) {
        const relatorioSalvo = localStorage.getItem('ultimoRelatorio');
        if (relatorioSalvo) {
            summaryTableContainer.innerHTML = `<div class="gemini-response-container p-3">${relatorioSalvo}</div>`;
        } else {
            displaySummaryTable();
        }
        transformarBotaoParaPremium();
        // --- MOSTRA O BOTÃO DE REINICIAR AO RECARREGAR A PÁGINA ---
        mostrarBotoesPosConsulta();
    } else {
        displaySummaryTable();
        if (economizeBtn) {
            economizeBtn.addEventListener('click', getEconomyTips);
        }
    }
    
    // --- ADICIONA O EVENT LISTENER PARA O BOTÃO REINICIAR ---
    if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', reiniciarSimulacaoCompleta);
    }
});