/**
 * termos.js
 * Contém os scripts específicos para a página de Termos de Serviço.
 */
document.addEventListener('DOMContentLoaded', function () {
    
    /**
     * CONTROLA O MENU DROPDOWN DE OPÇÕES NO CABEÇALHO
     */
    function setupOptionsMenu() {
        const optionsMenu = document.getElementById('options-menu');
        const optionsToggle = document.getElementById('options-toggle');

        if (optionsMenu && optionsToggle) {
            optionsToggle.addEventListener('click', (event) => {
                // Impede que o clique se propague para a janela, o que fecharia o menu imediatamente.
                event.stopPropagation();
                optionsMenu.classList.toggle('active');
            });

            // Fecha o menu se o usuário clicar em qualquer outro lugar da página.
            window.addEventListener('click', (event) => {
                if (optionsMenu.classList.contains('active') && !optionsMenu.contains(event.target)) {
                    optionsMenu.classList.remove('active');
                }
            });
        }
    }

    /**
     * ATUALIZA DATA E ANO DINAMICAMENTE
     */
    function updateDates() {
        const lastUpdatedEl = document.getElementById('last-updated');
        const currentYearEl = document.getElementById('current-year');
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        if(lastUpdatedEl) {
            lastUpdatedEl.textContent = `Última atualização: ${now.toLocaleDateString('pt-BR', options)}`;
        }
        if(currentYearEl) {
            currentYearEl.textContent = now.getFullYear();
        }
    }

    /**
     * CONTROLA O BOTÃO "VOLTAR AO TOPO"
     */
    function setupBackToTopButton() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * CONTROLA A NAVEGAÇÃO LATERAL (SCROLLSPY)
     * Destaca o link correspondente à seção visível na tela.
     */
    function setupScrollSpy() {
        const sections = document.querySelectorAll('.terms-section'); // Alterado para a classe correta
        const tocLinks = document.querySelectorAll('.toc-link');
        
        if (sections.length === 0 || tocLinks.length === 0) return;

        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    /**
     * ANIMAÇÃO DE ENTRADA DAS SEÇÕES
     * Adiciona um efeito de "fade in" conforme o usuário rola a página.
     */
    function setupSectionAnimations() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.terms-section').forEach(section => { // Alterado para a classe correta
            section.classList.add('section-animate');
            animationObserver.observe(section);
        });
    }

    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---
    setupOptionsMenu(); // Adicionada a chamada da nova função
    updateDates();
    setupBackToTopButton();
    setupScrollSpy();
    setupSectionAnimations();
});
