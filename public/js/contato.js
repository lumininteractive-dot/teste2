/**
 * contato.js
 * Este script contém funcionalidades específicas para a página de Contato.
 */
document.addEventListener('DOMContentLoaded', function() {
    // ============ ANIMAÇÃO DE SCROLL (FADE-IN) ============
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ============ NÚMERO DE WHATSAPP (CONFIGURÁVEL) ============
    const WHATSAPP_NUMBER = '5567996030671'; 

    /**
     * Gerencia a validação e o envio do formulário para o WhatsApp.
     */
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => el.classList.remove('error'));

            // Validações
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Por favor, insira seu nome';
                name.classList.add('error');
                isValid = false;
            }

            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                document.getElementById('email-error').textContent = 'Por favor, insira um e-mail válido';
                email.classList.add('error');
                isValid = false;
            }

            const subject = document.getElementById('subject');
            if (!subject.value) {
                document.getElementById('subject-error').textContent = 'Por favor, selecione um assunto';
                subject.classList.add('error');
                isValid = false;
            }

            const message = document.getElementById('message');
            if (message.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'A mensagem deve ter pelo menos 10 caracteres';
                message.classList.add('error');
                isValid = false;
            }

            const consent = document.getElementById('consent');
            if (!consent.checked) {
                document.getElementById('consent-error').textContent = 'Você deve concordar com os termos';
                isValid = false;
            }

            // Se for válido, envia para o WhatsApp
            if (isValid) {
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.classList.add('loading');
                
                const nameValue = name.value.trim();
                const emailValue = email.value.trim();
                const phoneValue = document.getElementById('phone').value.trim() || 'Não informado';
                const subjectValue = subject.options[subject.selectedIndex].text;
                const messageValue = message.value.trim();

                const formattedMessage = `
*-->> NOVO CONTATO VIA SITE <<--*

*Nome:*
${nameValue}

*E-mail:*
${emailValue}

*Telefone/WhatsApp:*
${phoneValue}

*Assunto:*
${subjectValue}

------------------------------------

*Mensagem:*
${messageValue}
                `.trim();

                const encodedMessage = encodeURIComponent(formattedMessage);
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
                
                window.open(whatsappUrl, '_blank');

                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    document.getElementById('formSuccess').classList.add('show'); 
                    contactForm.reset(); 

                    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
                }, 800);
            }
        });
    }

    /**
     * Controla a exibição do botão "Voltar ao Topo"
     */
    function setupBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Atualiza o ano no rodapé.
     */
    function updateYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // INICIALIZAÇÃO
    setupContactForm();
    setupBackToTop();
    updateYear(); 
});
