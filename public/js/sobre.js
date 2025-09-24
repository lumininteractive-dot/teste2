/**
 * sobre.js
 * Este script contém funcionalidades específicas para a página "Sobre".
 * As funcionalidades globais como menu e modo escuro são gerenciadas pelo global.js.
 */
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // SELETORES (mantidos para independência do script)
    // ============================================
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    // ============================================
    // FUNCIONALIDADES ESPECÍFICAS DA PÁGINA
    // ============================================

    /**
     * Controla a exibição do botão "Voltar ao Topo"
     */
    function setupBackToTop() {
        const backToTop = $('#back-to-top');
        if (!backToTop) return; // Se o botão não existir na página, não faz nada.

        // Mostra o botão quando o usuário rolar a página
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Leva o usuário de volta ao topo quando o botão é clicado
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Animação de contagem para um elemento de número.
     * @param {HTMLElement} element O elemento que contém o número a ser animado.
     * @param {number} duration Duração da animação em milissegundos.
     */
    function animateCounter(element, duration = 2000) {
        const finalValueText = element.textContent.trim();
        // Extrai apenas o número do texto. Ex: "+360" -> 360, "100%" -> 100
        const target = parseInt(finalValueText.replace(/[^0-9]/g, ''), 10);

        // Se o texto não contiver um número válido, interrompe a função.
        if (isNaN(target)) {
            return;
        }

        // Guarda o prefixo (ex: "+") e o sufixo (ex: "%")
        const prefix = (finalValueText.match(/^[^0-9]*/) || [''])[0];
        const suffix = (finalValueText.match(/[^0-9]*$/) || [''])[0];
        
        let startTime = null;

        const animationStep = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function (easeOutQuad) para uma animação mais suave no final
            const easedProgress = progress * (2 - progress);
            const currentValue = Math.floor(easedProgress * target);

            element.textContent = `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(animationStep);
            } else {
                // Garante que o valor final seja exatamente o original
                element.textContent = finalValueText;
            }
        };
        
        // Inicia a animação com o valor 0
        element.textContent = `${prefix}0${suffix}`;
        
        // Inicia o loop da animação
        window.requestAnimationFrame(animationStep);
    }

    /**
     * Animações de "fade in" para elementos ao rolar a página.
     * Utiliza IntersectionObserver para melhor performance.
     */
    function setupScrollAnimations() {
        const elementsToAnimate = $$('.fade-in-element');
        if (elementsToAnimate.length === 0) return;

        // Atribui a variável --i para o delay escalonado nos cards da equipe
        $$('.team-founders-grid .founder-card').forEach((card, index) => {
            card.style.setProperty('--i', index);
        });

        // Atribui a variável --i para o delay escalonado nos itens de valores
        $$('.values-container .value-item').forEach((item, index) => {
            item.style.setProperty('--i', index);
        });

        const observerOptions = {
            root: null, // Observa em relação ao viewport
            rootMargin: '0px',
            threshold: 0.1 // A animação dispara quando 10% do elemento está visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Se o elemento está na tela
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Se o elemento visível for o contêiner de estatísticas, inicia os contadores
                    if (entry.target.classList.contains('hero-stats')) {
                        const statNumbers = entry.target.querySelectorAll('.stat-number');
                        statNumbers.forEach(numberElement => {
                            animateCounter(numberElement, 2000); // Chama a função de contagem
                        });
                    }
                    
                    // Para de observar o elemento após a animação ser iniciada
                    observer.unobserve(entry.target);
                }
            });
        };

        // Cria o observador
        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

        // Pede ao observador para observar cada elemento
        elementsToAnimate.forEach(element => {
            scrollObserver.observe(element);
        });
    }


    /**
     * Marca o link de navegação da página atual como ativo.
     */
    function setupActiveLinks() {
        // Pega o nome do arquivo da URL atual (ex: 'sobre.html')
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        $$('.nav-link, .mobile-link').forEach(link => {
            link.classList.remove('active');
            // Compara o href do link com a página atual
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Atualiza o ano no rodapé para o ano atual.
     */
    function updateYear() {
        const yearSpan = $('#current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // ============================================
    // FUNÇÃO DE INICIALIZAÇÃO DA PÁGINA
    // ============================================
    function initPageSpecificFeatures() {
        setupBackToTop();
        setupActiveLinks();
        updateYear();
        setupScrollAnimations(); // Adicionamos a chamada para a nova função
    }

    // Inicia todas as funções específicas desta página
    initPageSpecificFeatures();

});

