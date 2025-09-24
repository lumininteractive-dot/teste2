document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do seletor de tema
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const lightThemeRadio = document.getElementById('theme-light');
    const darkThemeRadio = document.getElementById('theme-dark');
    const htmlElement = document.documentElement;

    /**
     * Aplica o tema com base no valor salvo no localStorage.
     */
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light'; // Padrão para 'light' se nada for salvo

        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark-mode');
            if (darkThemeRadio) {
                darkThemeRadio.checked = true;
            }
        } else {
            htmlElement.classList.remove('dark-mode');
            if (lightThemeRadio) {
                lightThemeRadio.checked = true;
            }
        }
    }

    /**
     * Salva o tema selecionado no localStorage e atualiza a classe no <html>.
     * @param {string} theme - O tema a ser salvo ('light' or 'dark').
     */
    function saveAndApplyTheme(theme) {
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
    }

    // Adiciona o event listener para cada botão de rádio
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            saveAndApplyTheme(event.target.value);
        });
    });

    /**
     * CONTROLA O MENU DE OPÇÕES DO HEADER (NOVO)
     */
    function setupOptionsMenu() {
        const menu = document.getElementById('options-menu');
        const toggle = document.getElementById('options-toggle');
        if (!menu || !toggle) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        // Fecha o menu se o usuário clicar fora dele
        document.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    }

    // --- INICIALIZAÇÃO ---
    applySavedTheme();
    setupOptionsMenu(); // Inicializa o novo menu do cabeçalho

});
