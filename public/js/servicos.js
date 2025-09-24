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

    // ============ FUNÇÃO GENÉRICA DE ANIMAÇÃO DE NÚMEROS ============
    const animateValue = (element, start, end, duration, isCurrency) => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            let currentValue = easedProgress * (end - start) + start;

            if (isCurrency) {
                element.innerText = `R$ ${currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else if (end.toString().includes('.')) {
                const decimalPlaces = end.toString().split('.')[1].length;
                element.innerText = currentValue.toFixed(decimalPlaces).replace('.', ',');
            } else {
                element.innerText = Math.floor(currentValue);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                if (isCurrency) {
                    element.innerText = `R$ ${end.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                } else if (end.toString().includes('.')) {
                    element.innerText = end.toString().replace('.', ',');
                } else {
                    element.innerText = end;
                }
            }
        };
        window.requestAnimationFrame(step);
    };

    // ============ ANIMAÇÃO DE CONTAGEM DOS NÚMEROS DO HERO ============
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = statsContainer.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        animateValue(counter, 0, target, 2000, false);
                    });
                    observer.unobserve(statsContainer);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsContainer);
    }

    // ============ CORREÇÃO: ANIMAÇÃO DE PREÇOS INDIVIDUALMENTE ============
    // Observa cada card de preço individualmente para garantir que a animação
    // dispare corretamente em todas as telas, especialmente em layouts verticais (mobile).
    const priceCounters = document.querySelectorAll('.price-current[data-target]');
    if (priceCounters.length > 0) {
        const priceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));

                    if (!isNaN(target)) {
                        animateValue(counter, 0, target, 1500, true);
                        // Remove o atributo para não animar de novo e desvincula o observer.
                        counter.removeAttribute('data-target');
                        observer.unobserve(counter);
                    }
                }
            });
        }, {
            threshold: 0.5 // A animação começa quando 50% do elemento de preço está visível.
        });

        priceCounters.forEach(counter => {
            priceObserver.observe(counter);
        });
    }

    // ============ BOTÃO VOLTAR AO TOPO ============ 
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('active', window.pageYOffset > 300);
        });
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============ MODAL DE SERVIÇOS (PÁGINA DE SERVIÇOS) ============ 
    const serviceCards = document.querySelectorAll('.service-card');
    const modalOverlay = document.getElementById('service-modal-overlay');

    if (serviceCards.length > 0 && modalOverlay) {
        const serviceData = {
            'restructuring': {
                icon: 'fas fa-globe',
                title: 'Reestruturação de Site',
                description: 'Revitalizamos seu site existente, focando em design moderno, experiência do usuário (UX), responsividade para dispositivos móveis e otimização de velocidade. O objetivo é transformar sua presença online em uma ferramenta de negócios eficaz que atrai e converte visitantes.',
                includes: ['Análise completa do site atual (UI/UX, SEO, performance)', 'Proposta de novo design e arquitetura da informação', 'Desenvolvimento front-end responsivo', 'Otimização de imagens e scripts para carregamento rápido', 'Configuração de SEO on-page básico (títulos, metatags)', 'Treinamento para gerenciamento de conteúdo (se aplicável)'],
                idealFor: ['Empresas com sites desatualizados ou de baixo desempenho', 'Negócios que passaram por rebranding', 'Sites que não são amigáveis para dispositivos móveis', 'Quem busca melhorar a taxa de conversão e a experiência do usuário'],
                process: [
                    { step: 'Briefing e Análise', detail: 'Entendemos seus objetivos e analisamos profundamente seu site atual.' },
                    { step: 'Design e Prototipagem', detail: 'Criamos o novo visual e a estrutura, que são validados por você.' },
                    { step: 'Desenvolvimento', detail: 'Codificamos o novo site com as melhores práticas de mercado.' },
                    { step: 'Revisão e Lançamento', detail: 'Realizamos os testes finais e colocamos o novo site no ar.' }
                ],
                price: 'R$ 1.399,90',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Reestruturação de Site.'
            },
            'landing-page': {
                icon: 'fas fa-rocket',
                title: 'Landing Page Premium',
                description: 'Criamos páginas de destino de alta conversão, projetadas para capturar leads e impulsionar suas campanhas de marketing. Cada elemento é pensado para guiar o usuário à ação desejada.',
                includes: ['Design focado em conversão (CRO)', 'Copywriting persuasivo (opcional)', 'Formulários de captura de leads otimizados', 'Integração com ferramentas de e-mail marketing e CRM', 'Carregamento ultra-rápido', 'Testes A/B para otimização contínua'],
                idealFor: ['Lançamento de produtos ou serviços', 'Campanhas de tráfego pago (Google Ads, Social Ads)', 'Captura de leads para webinars ou eventos', 'Validação de uma nova ideia de negócio'],
                process: [
                    { step: 'Definição de Objetivo', detail: 'Entendemos a meta principal da sua landing page.' },
                    { step: 'Criação e Design', detail: 'Desenvolvemos o layout e o conteúdo visual focados na sua persona.' },
                    { step: 'Implementação', detail: 'Codificamos a página garantindo performance e responsividade.' },
                    { step: 'Publicação e Análise', detail: 'Colocamos no ar e monitoramos os resultados para otimizações.' }
                ],
                price: 'R$ 1039,20',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Landing Page Premium.'
            },
            'seo': {
                icon: 'fas fa-chart-line',
                title: 'Otimização SEO Express',
                description: 'Um pacote focado para melhorar rapidamente o posicionamento do seu site nos resultados de busca do Google. Realizamos uma análise técnica e de conteúdo para aplicar as otimizações mais impactantes.',
                includes: ['Auditoria técnica completa do site', 'Pesquisa de palavras-chave estratégicas', 'Otimização de títulos, metatags e cabeçalhos', 'Melhora da velocidade de carregamento (Core Web Vitals)', 'Configuração de Schema Markup para Rich Snippets', 'Relatório de posicionamento inicial e final'],
                idealFor: ['Sites com bom conteúdo mas baixa visibilidade no Google', 'Negócios locais que querem aparecer no mapa', 'Empresas que desejam aumentar o tráfego orgânico qualificado', 'Quem busca uma solução rápida para melhorias de SEO'],
                process: [
                    { step: 'Auditoria SEO', detail: 'Identificamos todos os pontos de melhoria técnica e de conteúdo.' },
                    { step: 'Planejamento', detail: 'Definimos as prioridades e a estratégia de otimização.' },
                    { step: 'Execução', detail: 'Aplicamos todas as otimizações planejadas diretamente no seu site.' },
                    { step: 'Monitoramento', detail: 'Acompanhamos os resultados iniciais e entregamos o relatório final.' }
                ],
                price: 'R$ 699,00',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Otimização SEO Express.'
            },
            'maintenance': {
                icon: 'fas fa-tools',
                title: 'Manutenção Preventiva',
                description: 'Garanta que seu site esteja sempre seguro, rápido e funcionando perfeitamente. Nossos planos de manutenção cuidam de toda a parte técnica para que você possa focar no seu negócio.',
                includes: ['Atualizações de segurança de plugins e temas', 'Backups diários ou semanais (nuvem)', 'Monitoramento de uptime 24/7', 'Verificação de links quebrados e erros 404', 'Otimização de banco de dados', 'Relatório mensal de atividades'],
                idealFor: ['Donos de negócios sem tempo para a parte técnica', 'Sites em WordPress ou outros CMS que precisam de atualizações', 'Quem busca tranquilidade e segurança para sua presença online', 'Empresas que não podem arriscar ter o site fora do ar'],
                process: [
                    { step: 'Check-up Inicial', detail: 'Fazemos uma varredura completa para garantir que tudo está em ordem.' },
                    { step: 'Configuração', detail: 'Implementamos nossas ferramentas de monitoramento e backup.' },
                    { step: 'Execução Contínua', detail: 'Realizamos as rotinas de manutenção conforme o plano contratado.' },
                    { step: 'Relatórios', detail: 'Você recebe um resumo mensal de todas as ações executadas.' }
                ],
                price: 'R$ 199,90/mês',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Manutenção Preventiva.'
            },
            'formatting': {
                icon: 'fas fa-laptop-code',
                title: 'Formatação e Otimização',
                description: 'Seu computador está lento, travando ou com comportamento estranho? Uma formatação limpa e profissional restaura o desempenho original e remove arquivos desnecessários e possíveis ameaças.',
                includes: ['Backup seguro dos seus arquivos importantes (fotos, documentos, etc.)', 'Formatação completa do disco rígido ou SSD', 'Instalação da versão mais recente do Windows ou macOS', 'Instalação de todos os drivers atualizados', 'Instalação de um pacote de softwares essenciais (navegador, leitor de PDF, etc.)', 'Otimização do sistema para máxima performance'],
                idealFor: ['Computadores e notebooks com lentidão excessiva', 'Sistemas operacionais corrompidos ou com erros constantes', 'Quem deseja vender o equipamento com um sistema limpo', 'Após uma infecção por vírus que comprometeu o sistema'],
                process: [
                    { step: 'Diagnóstico e Backup', detail: 'Avaliamos o estado do computador e realizamos o backup dos seus dados.' },
                    { step: 'Formatação', detail: 'Apagamos o sistema antigo e preparamos o disco para a nova instalação.' },
                    { step: 'Instalação e Configuração', detail: 'Instalamos o sistema operacional, drivers e softwares essenciais.' },
                    { step: 'Otimização e Entrega', detail: 'Fazemos os ajustes finais e devolvemos seu computador renovado.' }
                ],
                price: 'R$ 149,90',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Formatação e Otimização de Computador.'
            },
            'virus-removal': {
                icon: 'fas fa-shield-virus',
                title: 'Remoção de Vírus e Malware',
                description: 'Removemos vírus, spyware, adware e outras ameaças que comprometem a segurança dos seus dados e o desempenho do seu computador. Deixamos seu sistema limpo e protegido.',
                includes: ['Diagnóstico com ferramentas profissionais', 'Remoção manual e automatizada de malwares', 'Limpeza de arquivos temporários e registros infectados', 'Verificação e reparo de vulnerabilidades do sistema', 'Instalação e configuração de um antivírus gratuito ou premium (à sua escolha)', 'Recomendações para evitar futuras infecções'],
                idealFor: ['Computadores com pop-ups e propagandas indesejadas', 'Navegadores com comportamento estranho ou redirecionamentos', 'Lentidão súbita e alto consumo de processador/memória', 'Quem suspeita que seus dados possam estar em risco'],
                process: [
                    { step: 'Análise Inicial', detail: 'Identificamos os sintomas e o tipo de infecção presente no sistema.' },
                    { step: 'Desinfecção', detail: 'Utilizamos múltiplas ferramentas para remover completamente as ameaças.' },
                    { step: 'Imunização', detail: 'Atualizamos o sistema e instalamos softwares de proteção.' },
                    { step: 'Verificação Final', detail: 'Garantimos que o computador está 100% limpo antes da entrega.' }
                ],
                price: 'R$ 129,00',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Remoção de Vírus e Malware.'
            },
            'firewall': {
                icon: 'fas fa-network-wired',
                title: 'Configuração de Firewall e Rede',
                description: 'Proteja a rede da sua empresa contra acessos não autorizados e ataques cibernéticos. Implementamos e configuramos firewalls e políticas de segurança para garantir a integridade dos seus dados.',
                includes: ['Análise da topologia de rede atual', 'Recomendação do equipamento de firewall ideal (hardware ou software)', 'Instalação e configuração do firewall', 'Criação de regras de tráfego (entrada e saída)', 'Configuração de VPN para acesso remoto seguro', 'Segmentação da rede em VLANs para maior segurança'],
                idealFor: ['Empresas que lidam com dados sensíveis de clientes', 'Negócios que precisam cumprir normas de segurança (LGPD)', 'Redes com múltiplos dispositivos conectados', 'Quem busca controlar o acesso à internet e proteger a rede interna'],
                process: [
                    { step: 'Levantamento de Requisitos', detail: 'Entendemos as necessidades de segurança e operação da sua rede.' },
                    { step: 'Planejamento', detail: 'Desenhamos a solução de segurança e as regras a serem implementadas.' },
                    { step: 'Implementação', detail: 'Configuramos os equipamentos e softwares em sua empresa.' },
                    { step: 'Testes e Validação', detail: 'Verificamos se todas as políticas de segurança estão funcionando corretamente.' }
                ],
                price: 'R$ 699,00',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Configuração de Firewall e Rede.'
            },
            'server': {
                icon: 'fas fa-server',
                title: 'Gestão de Servidores (AD & Proxy)',
                description: 'Centralize o controle de sua rede corporativa com um servidor. Gerenciamos Active Directory (AD) para controle de usuários e permissões, e servidores Proxy para gestão do acesso à internet.',
                includes: ['Instalação e configuração do Windows Server', 'Implementação do Active Directory para gerenciamento centralizado', 'Criação de usuários, grupos e políticas de segurança (GPOs)', 'Configuração de servidor de arquivos com permissões de acesso', 'Implementação de servidor Proxy para filtro de conteúdo web', 'Relatórios de acesso e monitoramento de tráfego'],
                idealFor: ['Empresas com mais de 10 computadores', 'Negócios que precisam de controle sobre o que os funcionários acessam', 'Quem busca centralizar o login e o acesso a arquivos na rede', 'Ambientes que necessitam de maior organização e segurança interna'],
                process: [
                    { step: 'Planejamento', detail: 'Analisamos sua estrutura e planejamos a implementação do servidor.' },
                    { step: 'Instalação', detail: 'Instalamos o sistema operacional e as funções de servidor (AD, DNS, Proxy).' },
                    { step: 'Configuração', detail: 'Criamos as políticas, usuários e regras de acordo com sua necessidade.' },
                    { step: 'Treinamento e Suporte', detail: 'Orientamos sua equipe sobre o uso e oferecemos suporte contínuo.' }
                ],
                price: 'R$ 950,00',
                whatsappMessage: 'Olá! Tenho interesse no serviço de Gestão de Servidores.'
            },
            'consulting': {
                icon: 'fas fa-lightbulb',
                title: 'Consultoria de TI Estratégica',
                description: 'Nossa consultoria ajuda sua empresa a usar a tecnologia como uma vantagem competitiva. Analisamos seus processos e infraestrutura para recomendar as melhores soluções, otimizar custos e planejar o futuro.',
                includes: ['Diagnóstico completo da infraestrutura de TI', 'Análise de processos de negócio e fluxos de trabalho', 'Planejamento estratégico de TI alinhado aos objetivos da empresa', 'Recomendação de softwares e hardwares', 'Desenvolvimento de políticas de segurança da informação (PSI)', 'Planejamento de orçamento e roadmap de investimentos em tecnologia'],
                idealFor: ['Empresas em crescimento que precisam escalar sua tecnologia', 'Negócios que buscam otimizar custos com TI', 'Gestores que precisam de um parceiro especialista para tomar decisões', 'Quem deseja garantir que a tecnologia está impulsionando, e não limitando, o negócio'],
                process: [
                    { step: 'Imersão', detail: 'Conhecemos a fundo sua operação, desafios e metas.' },
                    { step: 'Diagnóstico', detail: 'Mapeamos todos os pontos fortes e fracos da sua TI atual.' },
                    { step: 'Plano de Ação', detail: 'Entregamos um documento detalhado com recomendações e um roadmap claro.' },
                    { step: 'Acompanhamento', detail: 'Auxiliamos na implementação das soluções propostas (opcional).' }
                ],
                price: 'Sob Consulta',
                whatsappMessage: 'Olá! Gostaria de saber mais sobre a Consultoria de TI Estratégica.'
            }
        };

        const modal = document.getElementById('service-modal');
        const closeBtn = document.getElementById('service-modal-close-btn');

        const modalIcon = document.getElementById('modal-service-icon');
        const modalTitle = document.getElementById('modal-service-title');
        const modalDescription = document.getElementById('modal-service-description');
        const modalIncludesList = document.getElementById('modal-service-includes');
        const modalIdealForList = document.getElementById('modal-service-ideal-for');
        const modalProcessList = document.getElementById('modal-service-process');
        const modalPriceContainer = document.getElementById('modal-price-container');
        const modalHireBtn = document.getElementById('modal-hire-btn');

        const populateModal = (data) => {
            modalIcon.className = data.icon;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;

            modalIncludesList.innerHTML = data.includes.map(item => `<li>${item}</li>`).join('');
            modalIdealForList.innerHTML = data.idealFor.map(item => `<li>${item}</li>`).join('');
            modalProcessList.innerHTML = data.process.map(p => `<li><strong>${p.step}</strong><div>${p.detail}</div></li>`).join('');

            if (modalPriceContainer) {
                if (data.price === 'Sob Consulta') {
                    modalPriceContainer.innerHTML = `<strong class="modal-price-consult">${data.price}</strong>`;
                } else {
                    const priceString = data.price.replace('R$', '').trim();
                    const priceParts = priceString.split('/');
                    const amount = priceParts[0].trim();
                    const period = priceParts.length > 1 ? `/${priceParts[1]}` : '';

                    modalPriceContainer.innerHTML = `
                        <span>A partir de</span>
                        <div class="modal-price-value-wrapper"><strong>R$ ${amount}</strong>${period ? `<span class="price-period">${period}</span>` : ''}</div>`;
                }
            }

            const whatsappBaseUrl = "https://wa.me/5567996030671?text=";
            modalHireBtn.href = whatsappBaseUrl + encodeURIComponent(data.whatsappMessage);
        };

        const openModal = (serviceId) => {
            const data = serviceData[serviceId];
            if (data) {
                populateModal(data);
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        serviceCards.forEach(card => {
            const button = card.querySelector('.service-request-btn');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const serviceId = card.dataset.serviceId;
                    openModal(serviceId);
                });
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Atualizar ano no rodapé 
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

