/**
 * privacidade.js
 * Contém os scripts específicos para a página de Política de Privacidade.
 */
document.addEventListener('DOMContentLoaded', function () {
    
    /**
     * ATUALIZA O ANO DINAMICAMENTE NO RODAPÉ
     */
    function updateYear() {
        const currentYearEl = document.getElementById('current-year');
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * CONTROLA O BOTÃO "VOLTAR AO TOPO"
     */
    function setupBackToTopButton() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * CONTROLA A NAVEGAÇÃO LATERAL (SCROLLSPY)
     */
    function setupScrollSpy() {
        const sections = document.querySelectorAll('.privacy-section');
        const tocLinks = document.querySelectorAll('.toc-link');
        
        if (sections.length === 0 || tocLinks.length === 0) return;

        const observerOptions = {
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            let visibleSectionId = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!visibleSectionId) { // Pega o primeiro que estiver visível na janela
                        visibleSectionId = entry.target.getAttribute('id');
                    }
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${visibleSectionId}`) {
                    link.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    /**
     * ANIMAÇÃO DE ENTRADA DAS SEÇÕES
     */
    function setupScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-element').forEach(element => {
            animationObserver.observe(element);
        });
    }

    /**
     * CONTROLA O MENU DE OPÇÕES DO HEADER
     */
    function setupOptionsMenu() {
        const menu = document.getElementById('options-menu');
        const toggle = document.getElementById('options-toggle');
        if (!menu || !toggle) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    }

    /**
     * ADICIONA SCROLL SUAVE E DESTAQUE AO CLICAR NOS LINKS
     */
    function setupSmoothScrollAndHighlight() {
        const tocLinks = document.querySelectorAll('.toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Rola suavemente para o elemento
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Adiciona a classe de destaque e a remove após um tempo
                    targetElement.classList.add('section-highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('section-highlight');
                    }, 2000); // Duração do destaque: 2 segundos
                }
            });
        });
    }


    // --- INICIALIZAÇÃO DE TODAS AS FUNÇÕES ---
    updateYear();
    setupBackToTopButton();
    setupScrollSpy();
    setupScrollAnimations();
    setupOptionsMenu();
    setupSmoothScrollAndHighlight();
});

