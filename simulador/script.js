document.addEventListener('DOMContentLoaded', () => {
    const aiPromptPreviewElement = document.getElementById('aiPromptPreview');
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    const getReportBtn = document.getElementById('getReportBtn');
    const clearDataBtn = document.getElementById('clearDataBtn'); // Referência para o botão "Limpar Dados"
    

    const initialRoomAppliancesData = {
        'Sala': [
            { id: 'tv', name: 'TV', icon: 'assets/tv.svg', defaultQuantity: 1, dailyUsage: 5, custom: false },
            { id: 'ventilador', name: 'Ventilador', icon: 'assets/fan.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'ar-condicionado', name: 'Ar Condicionado', icon: 'assets/snowflake.svg', defaultQuantity: 1, dailyUsage: 6, custom: false },
            { id: 'videogame', name: 'Videogame', icon: 'assets/controller.svg', defaultQuantity: 1, dailyUsage: 4, custom: false },
            { id: 'roteador-wifi', name: 'Roteador Wi-Fi', icon: 'assets/wifi.svg', defaultQuantity: 1, dailyUsage: 24, custom: false },
            { id: 'lampada-sala', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 3, dailyUsage: 8, custom: false },
            
            { id: 'lampada-led-sala', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 3, dailyUsage: 8, custom: false },
            { id: 'lampada-fluorescente-sala', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 3, dailyUsage: 8, custom: false }
        ],
        'Cozinha': [
            { id: 'microondas', name: 'Micro-ondas', icon: 'assets/microwave.svg', defaultQuantity: 1, dailyUsage: 0.5, custom: false },
            { id: 'cafeteira', name: 'Cafeteira', icon: 'assets/coffeemaker.svg', defaultQuantity: 1, dailyUsage: 0.3, custom: false },
            { id: 'forno-eletrico', name: 'Forno Elétrico', icon: 'assets/oven.svg', defaultQuantity: 1, dailyUsage: 1, custom: false },
            { id: 'sanduicheira', name: 'Sanduicheira', icon: 'assets/sandwich.svg', defaultQuantity: 1, dailyUsage: 0.2, custom: false },
            { id: 'liquidificador', name: 'Liquidificador', icon: 'assets/blender.svg', defaultQuantity: 1, dailyUsage: 0.2, custom: false },
            { id: 'geladeira', name: 'Geladeira', icon: 'assets/fridge.svg', defaultQuantity: 1, dailyUsage: 24, custom: false },
            { id: 'exaustor', name: 'Exaustor', icon: 'assets/exhaust.svg', defaultQuantity: 1, dailyUsage: 0.5, custom: false },
            { id: 'lampada-cozinha', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 2, dailyUsage: 6, custom: false },
            
            { id: 'lampada-led-cozinha', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 2, dailyUsage: 6, custom: false },
            { id: 'lampada-fluorescente-cozinha', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 2, dailyUsage: 6, custom: false }
        ],
        'Quarto': [
            { id: 'ventilador-quarto', name: 'Ventilador', icon: 'assets/fan.svg', defaultQuantity: 1, dailyUsage: 7, custom: false },
            { id: 'tv-quarto', name: 'TV', icon: 'assets/tv.svg', defaultQuantity: 1, dailyUsage: 4, custom: false },
            { id: 'ar-condicionado-quarto', name: 'Ar Condicionado', icon: 'assets/snowflake.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'abajur', name: 'Abajur', icon: 'assets/lamp.svg', defaultQuantity: 1, dailyUsage: 3, custom: false },
            { id: 'lampada-quarto', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            
            { id: 'lampada-led-quarto', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'lampada-fluorescente-quarto', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false }
        ],
        'Banheiro': [
            { id: 'secador-cabelo', name: 'Secador de Cabelo', icon: 'assets/hairdryer.svg', defaultQuantity: 1, dailyUsage: 0.2, custom: false },
            { id: 'chuveiro-eletrico', name: 'Chuveiro Elétrico', icon: 'assets/shower.svg', defaultQuantity: 1, dailyUsage: 1, custom: false },
            { id: 'chapinha', name: 'Chapinha', icon: 'assets/straightener.svg', defaultQuantity: 1, dailyUsage: 0.2, custom: false },
            { id: 'lampada-banheiro', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 2, custom: false },
            
            { id: 'lampada-led-banheiro', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 2, custom: false },
            { id: 'lampada-fluorescente-banheiro', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 2, custom: false }
        ],
        'Lavanderia': [
            { id: 'maquina-lavar', name: 'Máquina de Lavar', icon: 'assets/washing-machine.svg', defaultQuantity: 1, dailyUsage: 1.5, custom: false },
            { id: 'ferro-passar', name: 'Ferro de Passar', icon: 'assets/iron.svg', defaultQuantity: 1, dailyUsage: 0.5, custom: false },
            { id: 'lampada-lavanderia', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 3, custom: false },
             
            { id: 'lampada-led-lavanderia', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 3, custom: false },
            { id: 'lampada-fluorescente-lavanderia', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 3, custom: false }
        ],
        'Escritório': [
            { id: 'ventilador-escritorio', name: 'Ventilador', icon: 'assets/fan.svg', defaultQuantity: 1, dailyUsage: 7, custom: false },
            { id: 'notebook', name: 'Notebook', icon: 'assets/laptop.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'computador', name: 'Computador', icon: 'assets/desktop.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'monitor', name: 'Monitor', icon: 'assets/monitor.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'impressora', name: 'Impressora', icon: 'assets/printer.svg', defaultQuantity: 1, dailyUsage: 0.1, custom: false },
            { id: 'ar-condicionado-escritorio', name: 'Ar Condicionado', icon: 'assets/snowflake.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'lampada-escritorio', name: 'Lâmpada', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
             
            { id: 'lampada-led-escritorio', name: 'Lâmpada Led', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false },
            { id: 'lampada-fluorescente-escritorio', name: 'Lâmpada Fluorescente', icon: 'assets/lightbulb.svg', defaultQuantity: 1, dailyUsage: 8, custom: false }
        ]
    };
    
    
    let roomAppliancesData = JSON.parse(JSON.stringify(initialRoomAppliancesData));

    let selectedAppliancesByRoom = {};
    let currentRoomKey = '';

    const roomCardsContainer = document.querySelector('.room-cards-container');
    const roomOverlay = document.getElementById('roomOverlay');
    const applianceSelectionTemplate = document.getElementById('applianceSelectionTemplate');
    const addRoomBtn = document.getElementById('addRoomBtn');

    const dailyUsageOverlay = document.getElementById('dailyUsageOverlay');
    const dailyUsageModalTemplate = document.getElementById('dailyUsageModalTemplate');
    let currentApplianceForDailyUsage = null;

    // Função para resetar os dados para o estado inicial
    function resetData() {
        if (!confirm('Tem certeza que deseja limpar todos os dados selecionados? Isso removerá todos os cômodos e eletrodomésticos configurados.')) {
            return;
        }

        // Limpa o localStorage
        localStorage.removeItem('selectedAppliancesByRoom');
        localStorage.removeItem('customRoomAppliancesData');

        // Reseta as variáveis em memória
        selectedAppliancesByRoom = {};
        // Recarrega roomAppliancesData para o estado inicial (sem cômodos customizados)
        roomAppliancesData = JSON.parse(JSON.stringify(initialRoomAppliancesData)); 

        // Atualiza a UI
        renderRoomCards();
        updateAiPromptPreview();
        alert('Todos os dados foram limpos e o simulador foi reiniciado.');
    }

    // Carrega dados do localStorage ao iniciar
    const storedSelectedAppliances = localStorage.getItem('selectedAppliancesByRoom');
    if (storedSelectedAppliances) {
        selectedAppliancesByRoom = JSON.parse(storedSelectedAppliances);
    }

    const storedCustomRooms = localStorage.getItem('customRoomAppliancesData');
    if (storedCustomRooms) {
        const parsedCustomRooms = JSON.parse(storedCustomRooms);
        for (const key in parsedCustomRooms) {
            if (Object.hasOwnProperty.call(parsedCustomRooms, key)) {
                roomAppliancesData[key] = parsedCustomRooms[key];
            }
        }
    }

    // Função para renderizar/re-renderizar os cards de cômodo
    function renderRoomCards() {
        roomCardsContainer.innerHTML = '';

        // Ordenar cômodos para que os padrão venham primeiro, depois os customizados por nome
        const sortedRoomKeys = Object.keys(roomAppliancesData).sort((a, b) => {
            const isACustom = a.startsWith('custom-');
            const isBCustom = b.startsWith('custom-');

            if (isACustom && !isBCustom) return 1; // Custom vai depois do padrão
            if (!isACustom && isBCustom) return -1; // Padrão vai antes do custom

            // Se ambos são custom ou ambos são padrão, ordene alfabeticamente pelo displayName
            const nameA = (roomAppliancesData[a]?.displayName || a).toString();
            const nameB = (roomAppliancesData[b]?.displayName || b).toString();
            return nameA.localeCompare(nameB);
        });


        sortedRoomKeys.forEach(roomKey => {
            let displayName = roomKey;
            let iconPath = `./assets/icons/${roomKey.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.svg`;
            let isCustomRoom = false;

            if (roomKey.startsWith('custom-')) {
                const roomObj = roomAppliancesData[roomKey];
                if (roomObj && roomObj.displayName && Array.isArray(roomObj.appliances)) {
                    isCustomRoom = true;
                    displayName = roomObj.displayName;
                    iconPath = './assets/icons/room.svg'; // Ícone padrão para cômodos customizados
                } else {
                    console.warn(`Dados de cômodo customizado inválidos para chave: ${roomKey}. Pulando renderização.`);
                    return;
                }
            } else {
                displayName = roomKey;
            }

            const card = document.createElement('div');
            card.className = `room-card ${isCustomRoom ? 'custom-room' : ''}`;
            card.dataset.room = roomKey;

            let headerBgClass = ''; 
            if (isCustomRoom) {
                headerBgClass = `bg-custom-room`;
            } else {
                const originalRoomNameNormalized = roomKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                headerBgClass = `bg-${originalRoomNameNormalized}`;
            }

            let deleteButtonHtml = '';
            if (isCustomRoom) {
                deleteButtonHtml = `
                    <button type="button" class="btn btn-sm btn-danger delete-room-btn" data-room-name="${roomKey}">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
            }

            card.innerHTML = `
                <div class="card-header ${headerBgClass} d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 text-white">${displayName}</h5> <div class="d-flex align-items-center">
                        <img src="${iconPath}" alt="Ícone ${displayName}" class="room-icon me-2">
                        ${deleteButtonHtml}
                    </div>
                </div>
                <div class="card-body bg-white">
                    <p class="card-text text-dark">Selecione os eletrodomésticos do(a) seu(sua) ${displayName}</p>
                </div>
            `;

            card.addEventListener('click', (event) => {
                if (!event.target.closest('.delete-room-btn')) {
                    openOverlay(roomKey);
                }
            });

            const deleteBtn = card.querySelector('.delete-room-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Tem certeza que deseja remover o cômodo "${displayName}" e todos os seus eletrodomésticos selecionados?`)) {
                        deleteRoom(roomKey);
                    }
                });
            }

            roomCardsContainer.appendChild(card);
        });
    }

    function deleteRoom(roomKey) {
        // Remove do roomAppliancesData (incluindo cômodos customizados)
        delete roomAppliancesData[roomKey];
        // Remove os eletrodomésticos selecionados para este cômodo
        delete selectedAppliancesByRoom[roomKey];

        // Salva as alterações no localStorage
        localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));
        localStorage.setItem('selectedAppliancesByRoom', JSON.stringify(selectedAppliancesByRoom));
        
        // Re-renderiza e atualiza o prompt
        renderRoomCards();
        updateAiPromptPreview();
    }

    function getCustomRoomsData() {
        const customRooms = {};
        for (const roomKey in roomAppliancesData) {
            // Se for um cômodo customizado, adicione-o ao objeto customRooms
            if (roomKey.startsWith('custom-')) {
                customRooms[roomKey] = roomAppliancesData[roomKey];
            }
        }
        return customRooms;
    }

    function generateApplianceSummary() {
        let summary = "Relatório de Eletrodomésticos e Uso Doméstico:\n\n";
        const allRoomKeys = Object.keys(selectedAppliancesByRoom);

        if (allRoomKeys.length === 0) {
            return "Nenhum eletrodoméstico foi selecionado ou configurado.";
        }

        allRoomKeys.forEach(roomKey => {
            const appliancesInRoom = selectedAppliancesByRoom[roomKey];
            let displayName = roomKey;

            // Tratamento para obter o displayName de cômodos padrão e customizados
            if (roomAppliancesData[roomKey] && roomAppliancesData[roomKey].displayName) {
                displayName = roomAppliancesData[roomKey].displayName;
            }

            if (appliancesInRoom && appliancesInRoom.length > 0) {
                summary += `*** ${displayName}: ***\n`;
                appliancesInRoom.forEach(appliance => {
                    summary += `- ${appliance.name} (Quantidade: ${appliance.quantity}, Uso diário: ${appliance.dailyUsage} horas)\n`;
                });
                summary += "\n";
            }
        });

        summary += "Estes são os eletrodomésticos e seus respectivos usos diários configurados na residência.\n";
        summary += "Por favor, com base nessas informações, forneça uma análise ou estimativa de consumo, dicas de economia de energia, ou qualquer insight relevante.";

        return summary;
    }


    function updateAiPromptPreview() {
        if (aiPromptPreviewElement) {
            aiPromptPreviewElement.textContent = generateApplianceSummary();
        }
    }

    function openOverlay(roomKey) {
        currentRoomKey = roomKey;
        const overlayContent = roomOverlay.querySelector('.overlay-content');
        if (!overlayContent) {
            console.error("Elemento '.overlay-content' não encontrado no overlay do cômodo.");
            return;
        }

        overlayContent.innerHTML = '';

        const templateContent = applianceSelectionTemplate.content.cloneNode(true);
        if (!templateContent) {
            console.error("Conteúdo do applianceSelectionTemplate não encontrado. Verifique o ID e o HTML do template.");
            return;
        }

        const roomNameSpan = templateContent.querySelector('.template-room-name');
        
        let displayRoomName = roomKey;
        if (roomAppliancesData[roomKey] && roomAppliancesData[roomKey].displayName) {
            displayRoomName = roomAppliancesData[roomKey].displayName;
        }

        if (roomNameSpan) {
            roomNameSpan.textContent = displayRoomName;
        }

        overlayContent.appendChild(templateContent);

        const applianceGrid = overlayContent.querySelector('.appliance-grid');

        if (!selectedAppliancesByRoom[currentRoomKey]) {
            selectedAppliancesByRoom[currentRoomKey] = [];
        }

        populateApplianceGrid(applianceGrid, currentRoomKey);

        const addCustomApplianceBtn = overlayContent.querySelector('#addCustomApplianceBtn');
        if (addCustomApplianceBtn) {
            addCustomApplianceBtn.removeEventListener('click', window.addCustomAppliance); 
            addCustomApplianceBtn.addEventListener('click', window.addCustomAppliance);
        }
        
        roomOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function populateApplianceGrid(applianceGridElement, roomKey) {
        applianceGridElement.innerHTML = '';

        let roomAppliances = [];
        if (roomKey.startsWith('custom-')) {
            const roomObj = roomAppliancesData[roomKey];
            if (roomObj && Array.isArray(roomObj.appliances)) {
                roomAppliances = roomObj.appliances;
            }
        } else {
            roomAppliances = roomAppliancesData[roomKey];
        }
        
        const selectedApplianceIds = new Set(
            (selectedAppliancesByRoom[roomKey] || []).map(app => app.id)
        );

        roomAppliances.forEach(appliance => {
            const isSelected = selectedApplianceIds.has(appliance.id);
            const card = document.createElement('div');
            card.className = `appliance-card col ${isSelected ? 'selected' : ''}`;
            card.dataset.applianceId = appliance.id;
            card.dataset.applianceName = appliance.name;
            card.dataset.applianceIcon = appliance.icon;
            card.dataset.defaultQuantity = appliance.defaultQuantity;
            const currentDailyUsage = isSelected 
                                    ? (selectedAppliancesByRoom[roomKey].find(a => a.id === appliance.id)?.dailyUsage ?? appliance.dailyUsage)
                                    : appliance.dailyUsage;
            card.dataset.dailyUsage = currentDailyUsage;
            card.dataset.isCustom = appliance.custom;

            let deleteButtonHtml = '';
            if (appliance.custom) {
                deleteButtonHtml = `<button type="button" class="delete-appliance-btn" data-appliance-id="${appliance.id}">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </button>`;
            }

            card.innerHTML = `
                ${deleteButtonHtml} 
                <img src="${appliance.icon}" alt="${appliance.name}" class="appliance-img-icon">
                <span class="fw-bold">${appliance.name}</span>
                <i class="bi bi-check-circle-fill check-icon"></i>
                <i class="bi bi-clock-fill daily-usage-icon" data-appliance-id="${appliance.id}" data-appliance-name="${appliance.name}"></i>
                <div class="appliance-quantity-controls ${isSelected ? '' : 'd-none'}">
                    <button class="btn btn-sm btn-outline-primary decrease-quantity" type="button">-</button>
                    <span class="quantity-display">
                        ${isSelected ? (selectedAppliancesByRoom[roomKey].find(a => a.id === appliance.id)?.quantity || appliance.defaultQuantity) : appliance.defaultQuantity}
                    </span>
                    <button class="btn btn-sm btn-outline-primary increase-quantity" type="button">+</button>
                </div>
            `;
            
            card.addEventListener('click', handleApplianceCardClick);

            const dailyUsageIcon = card.querySelector('.daily-usage-icon');
            if (dailyUsageIcon) {
                dailyUsageIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openDailyUsageModal(appliance.id, appliance.name, currentDailyUsage);
                });
            }


            const quantityControls = card.querySelector('.appliance-quantity-controls');
            if (quantityControls) {
                const btnMinus = quantityControls.querySelector('.decrease-quantity');
                const btnPlus = quantityControls.querySelector('.increase-quantity');
                const quantityDisplay = quantityControls.querySelector('.quantity-display');

                btnMinus.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let currentQty = parseInt(quantityDisplay.textContent);
                    if (currentQty > 1) {
                        currentQty--;
                        quantityDisplay.textContent = currentQty;
                        updateApplianceQuantity(appliance.id, currentQty);
                    } else if (currentQty === 1) {
                        handleApplianceCardClick.call(card, e); 
                    }
                });

                btnPlus.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let currentQty = parseInt(quantityDisplay.textContent);
                    currentQty++;
                    quantityDisplay.textContent = currentQty;
                    updateApplianceQuantity(appliance.id, currentQty);
                    if (!card.classList.contains('selected')) {
                        handleApplianceCardClick.call(card, e); 
                    }
                });
            }

            const deleteBtn = card.querySelector('.delete-appliance-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Tem certeza que deseja remover este eletrodoméstico customizado?')) {
                        card.remove(); 
                        if (roomKey.startsWith('custom-') && roomAppliancesData[roomKey]) {
                            roomAppliancesData[roomKey].appliances = roomAppliancesData[roomKey].appliances.filter(a => a.id !== appliance.id);
                        } else {
                            roomAppliancesData[roomKey] = roomAppliancesData[roomKey].filter(a => a.id !== appliance.id);
                        }
                        
                        removeApplianceFromSelection(appliance.id);
                        
                        localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));
                    }
                });
            }

            applianceGridElement.appendChild(card);
        });
    }

    function handleApplianceCardClick(event) {
        if (event.target.closest('.daily-usage-icon') || event.target.closest('.appliance-quantity-controls') || event.target.closest('.delete-appliance-btn')) {
            return;
        }

        const card = this;
        const applianceId = card.dataset.applianceId;
        const applianceName = card.dataset.applianceName;
        const applianceIcon = card.dataset.applianceIcon;
        const defaultQuantity = parseInt(card.dataset.defaultQuantity || 1);
        const dailyUsage = parseFloat(card.dataset.dailyUsage || 0);
        const isCustom = card.dataset.isCustom === 'true';

        const isSelected = card.classList.contains('selected');
        const quantityControls = card.querySelector('.appliance-quantity-controls');
        const quantityDisplay = card.querySelector('.quantity-display');

        if (isSelected) {
            card.classList.remove('selected');
            if (quantityControls) quantityControls.classList.add('d-none');
            if (quantityDisplay) quantityDisplay.textContent = defaultQuantity; 
            removeApplianceFromSelection(applianceId);
        } else {
            card.classList.add('selected');
            if (quantityControls) quantityControls.classList.remove('d-none');
            const existingAppliance = selectedAppliancesByRoom[currentRoomKey]?.find(a => a.id === applianceId);
            const qtyToSet = existingAppliance ? existingAppliance.quantity : defaultQuantity;
            if (quantityDisplay) quantityDisplay.textContent = qtyToSet;

            addApplianceToSelection({
                id: applianceId,
                name: applianceName,
                icon: applianceIcon,
                quantity: qtyToSet,
                dailyUsage: dailyUsage,
                custom: isCustom
            });
        }
    }

    function addApplianceToSelection(appliance) {
        if (!selectedAppliancesByRoom[currentRoomKey]) {
            selectedAppliancesByRoom[currentRoomKey] = [];
        }

        const existingIndex = selectedAppliancesByRoom[currentRoomKey].findIndex(a => a.id === appliance.id);
        if (existingIndex === -1) {
            selectedAppliancesByRoom[currentRoomKey].push(appliance);
        } else {
            selectedAppliancesByRoom[currentRoomKey][existingIndex].quantity = appliance.quantity;
            selectedAppliancesByRoom[currentRoomKey][existingIndex].dailyUsage = appliance.dailyUsage;
        }
    }

    function removeApplianceFromSelection(applianceId) {
        if (selectedAppliancesByRoom[currentRoomKey]) {
            selectedAppliancesByRoom[currentRoomKey] = selectedAppliancesByRoom[currentRoomKey].filter(
                app => app.id !== applianceId
            );
        }
    }

    function updateApplianceQuantity(applianceId, newQuantity) {
        if (selectedAppliancesByRoom[currentRoomKey]) {
            const appliance = selectedAppliancesByRoom[currentRoomKey].find(app => app.id === applianceId);
            if (appliance) {
                appliance.quantity = newQuantity;
            }
        }
    }

    function updateApplianceDailyUsage(applianceId, newDailyUsage) {
        // Atualiza no objeto de eletrodomésticos selecionados
        if (selectedAppliancesByRoom[currentRoomKey]) {
            const applianceInSelection = selectedAppliancesByRoom[currentRoomKey].find(app => app.id === applianceId);
            if (applianceInSelection) {
                applianceInSelection.dailyUsage = newDailyUsage;
            }
        }

        // Atualiza também na fonte de dados principal para consistência ao reabrir
        let allAppliances = roomAppliancesData[currentRoomKey];
        if (currentRoomKey.startsWith('custom-')) {
            allAppliances = roomAppliancesData[currentRoomKey].appliances;
        }
        
        const applianceInSource = allAppliances.find(app => app.id === applianceId);
        if (applianceInSource) {
            applianceInSource.dailyUsage = newDailyUsage;
        }
    }

  // Cria e seleciona o eletrodomestico personalizado
    window.addCustomAppliance = function() {
        const applianceGrid = roomOverlay.querySelector('.appliance-grid');

        const name = prompt("Nome do novo eletrodoméstico:");
        if (!name || name.trim() === '') return;

        let dailyUsageInput = prompt(`Quantas horas por dia o(a) "${name}" é usado(a)? (Deixe em branco para o padrão de 1 hora)`);
        let dailyUsage = parseFloat(dailyUsageInput);

        if (!dailyUsageInput || isNaN(dailyUsage) || dailyUsage < 0) {
            dailyUsage = 1;
        }

        let quantityInput = prompt(`Quantas unidades de "${name}" você possui? (Padrão: 1)`);
        let quantity = parseInt(quantityInput);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        const newApplianceId = `custom-appliance-${Date.now()}`;
        const newAppliance = {
            id: newApplianceId,
            name: name,
            icon: 'assets/plug.svg',
            defaultQuantity: quantity,
            dailyUsage: dailyUsage,
            custom: true
        };
        
        if (currentRoomKey.startsWith('custom-')) {
            if (!roomAppliancesData[currentRoomKey] || !Array.isArray(roomAppliancesData[currentRoomKey].appliances)) {
                roomAppliancesData[currentRoomKey] = { displayName: roomAppliancesData[currentRoomKey]?.displayName || 'Novo Cômodo', appliances: [] };
            }
            roomAppliancesData[currentRoomKey].appliances.push(newAppliance);
        } else {
            if (!roomAppliancesData[currentRoomKey]) {
                roomAppliancesData[currentRoomKey] = [];
            }
            roomAppliancesData[currentRoomKey].push(newAppliance);
        }

        // --- INÍCIO DA ALTERAÇÃO ---
        // Adiciona diretamente o novo eletrodoméstico à lista de selecionados
        addApplianceToSelection(newAppliance);

        // Agora, ao renderizar o grid, o novo item já aparecerá como selecionado,
        // pois a função populateApplianceGrid verifica a lista de selecionados.
        populateApplianceGrid(applianceGrid, currentRoomKey);
        
        localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));
    };

   
    window.openDailyUsageModal = function(applianceId, applianceName, currentUsage) {
        currentApplianceForDailyUsage = { id: applianceId, name: applianceName, currentUsage: parseFloat(currentUsage) };

        const overlayContent = dailyUsageOverlay.querySelector('.overlay-content');
        if (!overlayContent) {
            console.error("Erro: .overlay-content não encontrado dentro de #dailyUsageOverlay");
            return;
        }
        overlayContent.innerHTML = ''; // Limpa o conteúdo anterior

        const templateContent = dailyUsageModalTemplate.content.cloneNode(true);
        if (!templateContent) {
            console.error("Erro: dailyUsageModalTemplate não tem conteúdo.");
            return;
        }

        // Popula o nome do eletrodoméstico
        const applianceNamePlaceholder = templateContent.querySelector('.appliance-name-placeholder');
        if (applianceNamePlaceholder) {
            applianceNamePlaceholder.textContent = applianceName;
        }
        
        // Adiciona os event listeners aos novos botões de opção
        const buttonsContainer = templateContent.querySelector('#dailyUsageButtonsContainer');
        buttonsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('daily-usage-option')) {
                // Remove a seleção de todos os botões
                buttonsContainer.querySelectorAll('.daily-usage-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Adiciona a seleção ao botão clicado
                e.target.classList.add('active');
            }
        });

        // Marca o botão ativo com base no uso atual
        const buttons = templateContent.querySelectorAll('.daily-usage-option');
        buttons.forEach(btn => {
            if (parseFloat(btn.dataset.hours) === currentApplianceForDailyUsage.currentUsage) {
                btn.classList.add('active');
            }
        });

        overlayContent.appendChild(templateContent);

        // Configura o botão de salvar
        const saveBtn = overlayContent.querySelector('#saveDailyUsageBtn');
        if (saveBtn) {
            saveBtn.removeEventListener('click', saveDailyUsage);
            saveBtn.addEventListener('click', saveDailyUsage);
        }

        dailyUsageOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.saveDailyUsage = function() {
        // Encontra o botão que está ativo
        const activeButton = dailyUsageOverlay.querySelector('.daily-usage-option.active');

        if (currentApplianceForDailyUsage && activeButton) {
            // Pega o valor do atributo 'data-hours'
            const newDailyUsage = parseFloat(activeButton.dataset.hours);
            
            updateApplianceDailyUsage(currentApplianceForDailyUsage.id, newDailyUsage);
            
            // Atualiza o grid de eletrodomésticos para refletir a mudança
            const applianceGrid = roomOverlay.querySelector('.appliance-grid');
            populateApplianceGrid(applianceGrid, currentRoomKey);
            
            closeDailyUsageModal();
        } else {
            alert('Por favor, selecione uma das opções de uso.');
        }
    };

    window.closeDailyUsageModal = function() {
        dailyUsageOverlay.classList.remove('show');
        // Não reativar o overflow do body aqui, pois o overlay principal ainda pode estar aberto
    };

    window.closeOverlay = function() {
        // Salva os dados no localStorage sempre que o modal é fechado
        localStorage.setItem('selectedAppliancesByRoom', JSON.stringify(selectedAppliancesByRoom));
        localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));

        roomOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
        updateAiPromptPreview();
    };

   // Substitua o seu addEventListener existente por este
    addRoomBtn.addEventListener('click', () => {
        const roomName = prompt("Qual o nome do novo cômodo?");
        if (roomName && roomName.trim() !== '') {
            const newRoomKey = `custom-${Date.now()}`;

            // --- INÍCIO DA ALTERAÇÃO ---
            // Cria uma lista de lâmpadas padrão para o novo cômodo
            const defaultLamps = [
                {
                    id: `lampada-generica-${newRoomKey}`, // ID único para a lâmpada neste cômodo
                    name: 'Lâmpada',
                    icon: 'assets/lightbulb.svg',
                    defaultQuantity: 1,
                    dailyUsage: 4, // Um valor padrão de 4 horas
                    custom: false
                },
                {
                    id: `lampada-led-${newRoomKey}`,
                    name: 'Lâmpada Led',
                    icon: 'assets/lightbulb.svg',
                    defaultQuantity: 1,
                    dailyUsage: 4,
                    custom: false
                },
                {
                    id: `lampada-fluorescente-${newRoomKey}`,
                    name: 'Lâmpada Fluorescente',
                    icon: 'assets/lightbulb.svg',
                    defaultQuantity: 1,
                    dailyUsage: 4,
                    custom: false
                }
            ];

            // Atribui o novo cômodo com as lâmpadas padrão
            roomAppliancesData[newRoomKey] = {
                displayName: roomName,
                appliances: defaultLamps // A lista de aparelhos não está mais vazia
            };
            // --- FIM DA ALTERAÇÃO ---
            
            localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));
            renderRoomCards();
        }
    });

    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', () => {
            if (aiPromptPreviewElement) {
                const textToCopy = aiPromptPreviewElement.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('Prompt copiado para a área de transferência!');
                }).catch(err => {
                    console.error('Erro ao copiar o prompt: ', err);
                });
            }
        });
    }

    if (getReportBtn) {
        getReportBtn.addEventListener('click', () => {
            // Garante que os dados mais recentes sejam salvos antes de navegar
            localStorage.setItem('selectedAppliancesByRoom', JSON.stringify(selectedAppliancesByRoom));
            localStorage.setItem('customRoomAppliancesData', JSON.stringify(getCustomRoomsData()));
            window.location.href = 'confirmacao.html';
        });
    }
    
    // NOVO EVENT LISTENER PARA O BOTÃO "Limpar Dados"
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', resetData);
    }

    renderRoomCards();
    updateAiPromptPreview();
    
})
function confirmarvolta() {
    // Exibe uma caixa de diálogo para o usuário confirmar a ação.
    const querVoltar = confirm("Tem certeza de que deseja voltar para a página inicial? Todos os dados inseridos no simulador serão perdidos.");

    // Se o usuário clicar em "OK", ele será redirecionado.
    if (querVoltar) {
        // ATENÇÃO: Ajuste o caminho para 'index.html' se necessário, dependendo da sua estrutura de pastas.
        window.location.href = '../Perguntas/01Pergunta.html'; 
    }
    // Se o usuário clicar em "Cancelar", nada acontece.
};
//fim