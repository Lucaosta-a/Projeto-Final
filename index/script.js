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

        function atualizarMensagem(valor) {
            if (valor <= 100) return "Entre R$ 0 e R$ 100";
            if (valor <= 300) return "Entre R$ 100 e R$ 300";
            if (valor <= 500) return "Entre R$ 300 e R$ 500";
            if (valor <= 800) return "Entre R$ 500 e R$ 800";
            if (valor <= 1200) return "Entre R$ 800 e R$ 1.200";
            return "Superior a R$ 1.200";
        }

        function atualizarSimulador() {
            const valor = parseInt(rangeInput.value, 10);
            valorTexto.textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
            mensagemFaixa.textContent = atualizarMensagem(valor);
        }

        rangeInput.addEventListener('input', atualizarSimulador);
        atualizarSimulador();
    }

});
