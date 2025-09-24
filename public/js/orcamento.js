/**
 * orcamento.js
 * - Gerencia o formulário multi-etapas com validação.
 * - Adiciona animações de scroll.
 * - Popula a tela de revisão com os dados do formulário.
 * - Envia os dados do formulário formatados para o WhatsApp.
 */

document.addEventListener('DOMContentLoaded', function() {

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    // ============ ANIMAÇÃO DE SCROLL (FADE-IN) ============
    function setupScrollAnimations() {
        const fadeInElements = $$('.fade-in-element');
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
    }

    /**
     * LÓGICA PRINCIPAL DO FORMULÁRIO DE ORÇAMENTO
     */
    function setupBudgetForm() {
        const form = $('#budgetForm');
        if (!form) return;

        const formSteps = $$('.form-step');
        const nextButtons = $$('.btn-next');
        const prevButtons = $$('.btn-prev');
        const progressSteps = $$('.step');
        const editButtons = $$('.btn-edit');
        const backToReviewButtons = $$('.btn-back-review');
        const progressSection = $('.progress-steps');

        function showStep(stepNumber, isEditing = false) {
            formSteps.forEach(step => {
                step.classList.remove('active');
                const actions = step.querySelector('.form-actions');
                if (actions) {
                    const prevBtn = actions.querySelector('.btn-prev');
                    const nextBtn = actions.querySelector('.btn-next');
                    const backReviewBtn = actions.querySelector('.btn-back-review');
                    
                    if (prevBtn) prevBtn.style.display = 'inline-flex';
                    if (nextBtn) nextBtn.style.display = 'inline-flex';
                    if (backReviewBtn) backReviewBtn.style.display = 'none';
                }
            });
            
            const stepToShow = $(`#budgetForm .form-step[data-step="${stepNumber}"]`);
            if (stepToShow) {
                stepToShow.classList.add('active');
                if (isEditing) {
                    const actions = stepToShow.querySelector('.form-actions');
                    if (actions) {
                        const prevBtn = actions.querySelector('.btn-prev');
                        const nextBtn = actions.querySelector('.btn-next');
                        const backReviewBtn = actions.querySelector('.btn-back-review');
                        
                        if (prevBtn) prevBtn.style.display = 'none';
                        if (nextBtn) nextBtn.style.display = 'none';
                        if (backReviewBtn) backReviewBtn.style.display = 'inline-flex';
                    }
                }
            }
            
            progressSteps.forEach(step => {
                step.classList.toggle('active', parseInt(step.dataset.step) <= parseInt(stepNumber));
            });
        }

        function scrollToTop() {
            if (progressSection) {
                window.scrollTo({ top: progressSection.offsetTop - 80, behavior: 'smooth' });
            }
        }

        function validateStep(step) {
            let isValid = true;
            step.querySelectorAll('.error-message').forEach(msg => msg.remove());
            step.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
            
            const requiredFields = step.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                let hasError = false;
                if ((field.type === 'checkbox' && !field.checked) || (field.type !== 'checkbox' && field.value.trim() === '')) {
                    hasError = true;
                }
                if (hasError) {
                    isValid = false;
                    field.classList.add('error');
                    const formGroup = field.closest('.form-group');
                    if (formGroup) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Este campo é obrigatório.';
                        formGroup.appendChild(errorMsg);
                    }
                }
            });
            return isValid;
        }

        function updateReviewContent() {
            const formData = new FormData(form);
            const getFieldValue = (name, defaultValue = 'Não informado') => formData.get(name) || defaultValue;
            const getRadioValueText = (name) => {
                const checkedRadio = form.querySelector(`input[name="${name}"]:checked`);
                return checkedRadio ? checkedRadio.parentElement.textContent.trim() : 'Não informado';
            };
            const getSelectedOptionText = (name) => {
                const select = form.querySelector(`[name="${name}"]`);
                return select && select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : 'Não informado';
            };
            const createReviewItem = (label, value) => {
                const val = value || '<span class="empty-value">Não informado</span>';
                return `<div class="review-item"><strong>${label}</strong><span>${val}</span></div>`;
            };

            $('#review-contact-info').innerHTML = `
                ${createReviewItem('Nome Completo', getFieldValue('fullName'))}
                ${createReviewItem('E-mail', getFieldValue('email'))}
                ${createReviewItem('Telefone/WhatsApp', getFieldValue('phone'))}
                ${createReviewItem('Empresa', getFieldValue('company'))}
                ${createReviewItem('CNPJ', getFieldValue('cnpj'))}
            `;
            $('#review-project-info').innerHTML = `
                ${createReviewItem('Tipo de Projeto', getFieldValue('projectName'))}
                ${createReviewItem('Descrição', getFieldValue('projectDescription'))}
                ${createReviewItem('Ação Principal', getSelectedOptionText('mainAction'))}
            `;
            $('#review-details-info').innerHTML = `
                ${createReviewItem('Já possui site?', getRadioValueText('hasWebsite'))}
                ${getRadioValueText('hasWebsite') === 'Sim' ? createReviewItem('Link do site atual', getFieldValue('websiteUrl')) : ''}
                ${createReviewItem('Sites de referência', getFieldValue('likedSites'))}
                ${createReviewItem('Funcionalidades', getFieldValue('features'))}
                ${createReviewItem('Prazo de Entrega', getSelectedOptionText('deliveryDeadline'))}
                ${createReviewItem('Agendar reunião?', getRadioValueText('scheduleMeeting'))}
                ${createReviewItem('Orçamento estimado', getSelectedOptionText('estimatedBudget'))}
            `;
        }
        
        const radioGroups = $$('.radio-group');
        radioGroups.forEach(group => {
            const radios = group.querySelectorAll('input[type="radio"]');
            const handleRadioChange = () => {
                const checkedRadio = group.querySelector('input[type="radio"]:checked');
                if (!checkedRadio) return;
                radios.forEach(r => r.parentElement.classList.remove('checked'));
                checkedRadio.parentElement.classList.add('checked');
                const conditionName = checkedRadio.name;
                const selectedValue = checkedRadio.value;
                const conditionalElements = $$(`.conditional[data-condition="${conditionName}"]`);
                conditionalElements.forEach(element => {
                    element.classList.toggle('show', element.dataset.value === selectedValue);
                });
            };
            radios.forEach(radio => radio.addEventListener('change', handleRadioChange));
            handleRadioChange();
        });

        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = button.closest('.form-step');
                if (validateStep(currentStep)) {
                    const nextStepNum = button.getAttribute('data-next');
                    if (nextStepNum === '4') {
                        updateReviewContent();
                    }
                    showStep(nextStepNum);
                    scrollToTop();
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const prevStepNum = button.getAttribute('data-prev');
                showStep(prevStepNum);
                scrollToTop();
            });
        });
        
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetStep = button.getAttribute('data-goto');
                showStep(targetStep, true);
                scrollToTop();
            });
        });
        
        backToReviewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = button.closest('.form-step');
                if (validateStep(currentStep)) {
                    updateReviewContent();
                    showStep(4);
                    scrollToTop();
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const lastStep = $('.form-step.active');
            if (!validateStep(lastStep)) return;
            
            const termsCheckbox = form.querySelector('[name="terms"]');
            if (termsCheckbox && !termsCheckbox.checked) {
                const errorMessage = document.createElement('span');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Você precisa estar ciente dos termos para enviar.';
                termsCheckbox.closest('.terms-group').appendChild(errorMessage);
                return;
            }
            
            const getFieldValue = (name, defaultValue = 'Não informado') => form.querySelector(`[name="${name}"]`)?.value || defaultValue;
            const getRadioValueText = (name) => {
                const checkedRadio = form.querySelector(`input[name="${name}"]:checked`);
                return checkedRadio ? checkedRadio.parentElement.textContent.trim() : 'Não informado';
            };
            const getSelectedOptionText = (name) => {
                const select = form.querySelector(`[name="${name}"]`);
                return select && select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : 'Não informado';
            };

            const fullName = getFieldValue('fullName');
            const companyName = getFieldValue('company', 'Não informado');
            const cnpj = getFieldValue('cnpj', 'Não informado');
            const email = getFieldValue('email');
            const phone = getFieldValue('phone');
            const projectName = getFieldValue('projectName');
            const projectDescription = getFieldValue('projectDescription');
            const mainAction = getSelectedOptionText('mainAction');
            const likedSites = getFieldValue('likedSites', 'N/A');
            const features = getFieldValue('features', 'N/A');
            const deliveryDeadline = getSelectedOptionText('deliveryDeadline');
            const estimatedBudget = getSelectedOptionText('estimatedBudget');
            const scheduleMeeting = getRadioValueText('scheduleMeeting');
            const hasWebsite = getRadioValueText('hasWebsite');
            const websiteUrl = hasWebsite === 'Sim' ? getFieldValue('websiteUrl', 'N/A') : '';

            let message = `*SOLICITAÇÃO DE ORÇAMENTO*\n\n`;
            message += `Olá, Lumin! Meu nome é *${fullName}* e gostaria de um orçamento.\n\n`;
            message += `*Data:* ${new Date().toLocaleDateString('pt-BR')}\n`;
            message += `_(Enviado pelo formulário do site)_\n\n`;
            message += `-----------------------------------\n\n`;
            message += `*DADOS DO CLIENTE*\n`;
            message += `• *Empresa:* ${companyName}\n`;
            message += `• *CNPJ:* ${cnpj}\n`;
            message += `• *E-mail:* ${email}\n`;
            message += `• *Telefone:* ${phone}\n\n`;
            message += `*SOBRE O PROJETO*\n`;
            message += `• *Tipo:* ${projectName}\n`;
            message += `• *Objetivo Principal:* ${mainAction}\n`;
            message += `• *Descrição:* ${projectDescription}\n\n`;
            message += `*REFERÊNCIAS E REQUISITOS*\n`;
            message += `• *Sites de Referência:* ${likedSites}\n`;
            if (hasWebsite === 'Sim') {
                message += `• *Site Atual:* ${websiteUrl}\n`;
            }
            message += `• *Funcionalidades:* ${features}\n`;
            message += `• *Prazo de Entrega:* ${deliveryDeadline}\n`;
            message += `• *Orçamento Estimado:* ${estimatedBudget}\n\n`;
            message += `*PRÓXIMOS PASSOS*\n`;
            message += `• *Agendar Reunião:* ${scheduleMeeting}\n\n`;
            message += `-----------------------------------\n\n`;
            message += `Aguardo o contato. Obrigado!`;

            const luminPhone = '5567996030671';
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${luminPhone}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    /**
     * Controla o botão "Voltar ao Topo"
     */
    function setupBackToTop() {
        const backToTop = $('#backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('active', window.scrollY > 300);
            });
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    /**
     * Atualiza o ano no rodapé
     */
    function updateYear() {
        const currentYear = $('#current-year');
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }

    // --- INICIALIZAÇÃO DA PÁGINA ---
    setupScrollAnimations();
    setupBudgetForm();
    setupBackToTop();
    updateYear();
});
