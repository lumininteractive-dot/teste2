// ===============================================
// SEÇÃO: GOOGLE ANALYTICS (NOVA LÓGICA)
// ===============================================

// ID de rastreamento do Google Analytics
const GA_TRACKING_ID = 'G-43JY2MX5EN';
let googleAnalyticsInitialized = false;

/**
 * Carrega o script do Google Analytics e inicializa a tag.
 */
function initializeAnalytics() {
    if (googleAnalyticsInitialized) {
        return;
    }

    // Cria a tag de script para o gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    script.onload = () => {
        // Inicializa o dataLayer e a configuração do gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID);
        
        googleAnalyticsInitialized = true;
        console.log('✅ Google Analytics INICIADO - Consentimento dado.');

        // Dispara um evento para indicar que o GA está pronto
        window.dispatchEvent(new CustomEvent('ga-initialized'));
    };
}

/**
 * Envia um evento para o Google Analytics se estiver inicializado.
 * @param {string} action - A ação do evento (ex: 'click').
 * @param {string} category - A categoria do evento (ex: 'CTA').
 * @param {string} label - O rótulo do evento (ex: 'orcamento_header').
 */
function trackEvent(action, category, label) {
    if (googleAnalyticsInitialized) {
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label,
        });
    } else {
        console.warn(`GA não inicializado. Evento não rastreado: ${action}, ${category}, ${label}`);
    }
}

// Ouve o evento 'consent-updated' disparado pelo banner de cookies
window.addEventListener('consent-updated', (event) => {
    const consent = event.detail;
    if (consent && consent.analytics) {
        initializeAnalytics();
    } else {
        console.log('❌ Google Analytics NÃO INICIADO - Consentimento negado ou revogado.');
    }
});


// Aguarda o DOM ser completamente carregado para executar o resto do script.
document.addEventListener('DOMContentLoaded', () => {
    // --- VERIFICAÇÃO INICIAL DE CONSENTIMENTO PARA ANALYTICS ---
    if (window.hasCookieConsent && window.hasCookieConsent('analytics')) {
        initializeAnalytics();
    }

    // --- CONFIGURAÇÕES GLOBAIS ---
    const WHATSAPP_NUMBER = "5567996030671"; 

    // ===============================================
    // SEÇÃO: EVENTOS DE TRACKING DO GOOGLE ANALYTICS
    // ===============================================

    function setupAnalyticsTrackers() {
        // Botões do Header e Hero
        document.getElementById('track-orcamento-header')?.addEventListener('click', () => {
            trackEvent('click', 'CTA', 'orcamento_header');
        });
        document.getElementById('track-servicos-hero')?.addEventListener('click', () => {
            trackEvent('click', 'Navigation', 'servicos_hero');
        });
        document.getElementById('track-contato-hero')?.addEventListener('click', () => {
            trackEvent('click', 'Navigation', 'contato_hero');
        });

        // Botões de "Quero esse serviço"
        document.querySelectorAll('.track-service-click').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.service-card');
                const serviceTitle = card.querySelector('h3').textContent.trim();
                trackEvent('click', 'Service Card', serviceTitle);
            });
        });

        // Botões de "Ver Detalhes" do Portfólio
        document.querySelectorAll('.track-portfolio-click').forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.portfolio-item');
                const portfolioTitle = item.dataset.title.trim();
                trackEvent('click', 'Portfolio Card', portfolioTitle);
            });
        });
        
        // Botões de WhatsApp nos Modais
        document.querySelector('.track-whatsapp-service-modal')?.addEventListener('click', (e) => {
            const modal = e.target.closest('#service-modal');
            const serviceTitle = modal.querySelector('#modal-title').textContent.trim();
             trackEvent('click', 'WhatsApp', `service_modal_${serviceTitle}`);
        });

        document.querySelector('.track-whatsapp-portfolio-modal')?.addEventListener('click', (e) => {
            const modal = e.target.closest('#portfolio-modal');
            const portfolioTitle = modal.querySelector('#modal-portfolio-title').textContent.trim();
            trackEvent('click', 'WhatsApp', `portfolio_modal_${portfolioTitle}`);
        });
    }

    // Se o GA já estiver inicializado, configura os trackers. Senão, espera o evento.
    if (googleAnalyticsInitialized) {
        setupAnalyticsTrackers();
    } else {
        window.addEventListener('ga-initialized', setupAnalyticsTrackers, { once: true });
    }


    // ===============================================
    // SEÇÃO: FUNCIONALIDADES GERAIS DA PÁGINA (CÓDIGO EXISTENTE)
    // ===============================================

    // --- Lógica do Botão "Voltar ao Topo" ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('active', window.scrollY > 300);
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Fechar Modais com a Tecla 'Escape' ---
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===============================================
    // SEÇÃO: ANIMAÇÕES VISUAIS (CÓDIGO EXISTENTE)
    // ===============================================

    const animateValue = (element, start, end, duration) => {
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = start + progress * (end - start);
            element.textContent = `R$ ${currentValue.toFixed(2).replace('.', ',')}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = `R$ ${end.toFixed(2).replace('.', ',')}`;
            }
        };
        window.requestAnimationFrame(step);
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const priceElement = entry.target.querySelector('.animated-price');
                if (priceElement && !priceElement.dataset.animated) {
                    const finalPrice = parseFloat(priceElement.dataset.finalPrice);
                    priceElement.dataset.animated = 'true';
                    animateValue(priceElement, 0, finalPrice, 1500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ===============================================
    // SEÇÃO: MODAL DE SERVIÇOS (CÓDIGO EXISTENTE)
    // ===============================================
    const serviceModal = document.getElementById('service-modal');
    if (serviceModal) {
        const openServiceModalBtns = document.querySelectorAll('.service-card .btn');
        const closeServiceModalBtn = serviceModal.querySelector('.modal-close-btn');

        const openServiceModal = (card) => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const featuresHTML = card.querySelector('.service-features').innerHTML;
            const priceHTML = card.querySelector('.service-price').innerHTML;
            
            serviceModal.querySelector('#modal-title').textContent = title;
            serviceModal.querySelector('#modal-description').textContent = description;
            serviceModal.querySelector('#modal-features').innerHTML = featuresHTML;
            serviceModal.querySelector('#modal-price').innerHTML = priceHTML;

            const message = `Olá! Tenho interesse no serviço de "${title}". Poderiam me passar mais informações?`;
            const whatsappBtn = serviceModal.querySelector('.modal-contact-btn');
            whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeServiceModal = () => {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        openServiceModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openServiceModal(btn.closest('.service-card'));
            });
        });
        
        closeServiceModalBtn.addEventListener('click', closeServiceModal);
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeServiceModal();
        });
    }

    // ===============================================
    // SEÇÃO: MODAL DE PORTFÓLIO (CÓDIGO EXISTENTE)
    // ===============================================
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioModal && portfolioItems.length > 0) {
        const imageCache = new Set();

        const modalElements = {
            mainImage: portfolioModal.querySelector('#modal-portfolio-img'),
            prevBtn: portfolioModal.querySelector('#gallery-prev'),
            nextBtn: portfolioModal.querySelector('#gallery-next')
        };
        
        let currentImages = [];
        let currentImageIndex = 0;

        portfolioItems.forEach(item => {
            const summaryElement = item.querySelector('.portfolio-summary');
            const features = item.dataset.features;
            if (summaryElement && features) {
                summaryElement.textContent = features.split(',').slice(0, 3).join(', ').trim() + '...';
            }
        });

        const closePortfolioModal = () => {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        const updateGallery = () => {
            if (!currentImages || currentImages.length === 0) return;

            currentImageIndex = Math.max(0, Math.min(currentImageIndex, currentImages.length - 1));

            modalElements.mainImage.style.opacity = 0;
            setTimeout(() => {
                modalElements.mainImage.src = currentImages[currentImageIndex];
                modalElements.mainImage.style.opacity = 1;
            }, 200);

            const showNav = currentImages.length > 1;
            modalElements.prevBtn.style.display = showNav ? 'flex' : 'none';
            modalElements.nextBtn.style.display = showNav ? 'flex' : 'none';
        };

        const openPortfolioModal = (item) => {
            const data = item.dataset;
            
            portfolioModal.querySelector('#modal-portfolio-title').textContent = data.title;
            portfolioModal.querySelector('#modal-portfolio-description').textContent = data.description;
            
            const finalPrice = parseFloat(data.price);
            portfolioModal.querySelector('#modal-old-price').textContent = data.oldPrice;
            portfolioModal.querySelector('#modal-price-value').textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
            portfolioModal.querySelector('#modal-price-installments').textContent = data.installments;
            portfolioModal.querySelector('#modal-pix-discount').innerHTML = `<i class="fas fa-tag"></i> ${data.pixDiscount}`;
            portfolioModal.querySelector('#modal-discount-badge').textContent = data.discount;
            
            const featuresList = portfolioModal.querySelector('#modal-portfolio-features');
            featuresList.innerHTML = '';
            if (data.features) {
                data.features.split(',').forEach(featureText => {
                    const li = document.createElement('li');
                    li.textContent = featureText.trim();
                    featuresList.appendChild(li);
                });
            }

            const message = `Olá! Tenho interesse no modelo "${data.title}" que vi no site.`;
            portfolioModal.querySelector('.modal-cta-btn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            currentImages = data.images ? data.images.split(',') : [data.img];
            currentImageIndex = 0;
            updateGallery();

            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => openPortfolioModal(item));

            const highResImageSrc = item.dataset.img;
            if (highResImageSrc) {
                item.addEventListener('mouseenter', () => {
                    if (!imageCache.has(highResImageSrc)) {
                        const img = new Image();
                        img.src = highResImageSrc;
                        imageCache.add(highResImageSrc);
                    }
                }, { once: true });
            }
        });
        
        portfolioModal.querySelector('.modal-close-btn').addEventListener('click', closePortfolioModal);
        portfolioModal.addEventListener('click', (event) => {
            if (event.target === portfolioModal) closePortfolioModal();
        });

        modalElements.prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            updateGallery();
        });

        modalElements.nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            updateGallery();
        });
    }

    // ===============================================
    // SEÇÃO: FORMULÁRIO DE CONTATO (CÓDIGO EXISTENTE)
    // ===============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const message = document.getElementById('message').value;

            const whatsappMessage = `
Olá! Gostaria de solicitar um orçamento.

*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone || 'Não informado'}
*Serviço de Interesse:* ${service}

*Mensagem:*
${message}
            `.trim();

            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            contactForm.reset();
        });
    }
});
