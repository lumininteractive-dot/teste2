/**
 * global.js
 * Controla as funcionalidades do cabeçalho: menu mobile, menu de opções e modo escuro.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seletores de elementos
    const settingsMenu = document.getElementById('settings-menu');
    const settingsToggle = document.getElementById('settings-toggle');
    
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
    
    const htmlElement = document.documentElement;

    /**
     * 1. CONTROLA O MENU DE OPÇÕES (DESKTOP)
     */
    if (settingsToggle && settingsMenu) {
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o evento de clique no documento feche o menu imediatamente
            settingsMenu.classList.toggle('active');
        });
    }

    /**
     * 2. CONTROLA O MENU DE NAVEGAÇÃO (MOBILE)
     */
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    /**
     * 3. CONTROLA O MODO ESCURO
     */
    const applyTheme = (theme) => {
        htmlElement.classList.toggle('dark-mode', theme === 'dark');
        
        // Atualiza o texto dos botões
        const isDark = theme === 'dark';
        const text = isDark ? 'Modo Claro' : 'Modo Escuro';
        const iconClass = isDark ? 'fa-sun' : 'fa-adjust';

        const darkModeTextSpan = document.getElementById('dark-mode-text');
        const mobileDarkModeTextSpan = document.getElementById('mobile-dark-mode-text');
        const darkModeIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;
        const mobileDarkModeIcon = mobileDarkModeToggle ? mobileDarkModeToggle.querySelector('i') : null;

        if (darkModeTextSpan) darkModeTextSpan.textContent = text;
        if (mobileDarkModeTextSpan) mobileDarkModeTextSpan.textContent = text;
        
        if (darkModeIcon) {
            darkModeIcon.className = `fas ${iconClass}`;
        }
        if (mobileDarkModeIcon) {
            mobileDarkModeIcon.className = `fas ${iconClass}`;
        }
    };

    const toggleTheme = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newTheme = htmlElement.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', toggleTheme);
    }
    
    // Aplica o tema salvo ao carregar a página
    applyTheme(localStorage.getItem('theme'));

    /**
     * 4. FECHA MENUS AO CLICAR FORA
     */
    document.addEventListener('click', (e) => {
        // Fecha menu de opções (desktop) se estiver aberto e o clique for fora dele
        if (settingsMenu && settingsMenu.classList.contains('active') && !settingsMenu.contains(e.target)) {
            settingsMenu.classList.remove('active');
        }
        
        // Fecha menu mobile se estiver aberto e o clique for fora dele
        if (mobileNav && mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
