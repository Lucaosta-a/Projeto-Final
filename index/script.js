// Aguarda o carregamento completo do HTML antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DO MENU LATERAL E SUBMENU ---
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    const closeBtn = document.getElementById('closeBtn');
    const parceirosBtn = document.getElementById('parceirosBtn');
    const submenuBackBtn = document.getElementById('submenuBackBtn');

    if (menuIcon && navMenu && closeBtn && parceirosBtn && submenuBackBtn) {

        menuIcon.addEventListener('click', () => {
            navMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navMenu.classList.remove('submenu-active');
        });

        parceirosBtn.addEventListener('click', () => {
            navMenu.classList.add('submenu-active');
        });

        submenuBackBtn.addEventListener('click', () => {
            navMenu.classList.remove('submenu-active');
        });
    }

    // --- CÓDIGO DO SIMULADOR (Executa APENAS na index.html) ---
    const rangeInput = document.getElementById('customRange1');

    if (rangeInput) {
        const valorTexto = document.getElementById('valorSelecionado');
        const mensagemFaixa = document.getElementById('mensagemFaixa');

        function atualizarSimulador() {
            const valor = parseInt(rangeInput.value, 10);
            valorTexto.textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
            mensagemFaixa.textContent = atualizarMensagem(valor);
        }

        rangeInput.addEventListener('input', atualizarSimulador);
        atualizarSimulador();
    }

});
