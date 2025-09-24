document.addEventListener('DOMContentLoaded', () => {

    /**
     * DADOS DOS MODELOS DE SITE
     */
    const modelsData = {
        1: {
            id: 1,
            title: "Empresarial Pro",
            category: "business",
            price: "1.997",
            discountPercentage: 20,
            tags: "negócios corporativo empresa profissional agência empresarial pro",
            badge: { type: 'bestseller', text: 'Mais Vendido' },
            features_card: ["5 Páginas", "Design Sóbrio", "SEO Otimizado"],
            image_card: "imagens/modelos/empresarial-home.webp",
            description: "A solução definitiva para empresas que buscam credibilidade e profissionalismo. Este modelo foi desenhado para transformar visitantes em clientes, com seções estratégicas que destacam seus serviços e constroem confiança.",
            images: {
                desktop: ["imagens/modelos/empresarial-home.webp", "imagens/modelos/empresarial-sobre.webp", "imagens/modelos/empresarial-servicos.webp", "imagens/modelos/empresarial-feedback.webp", "imagens/modelos/empresarial-blog.webp", "imagens/modelos/empresarial-contato.webp"],
                mobile: ["imagens/modelos-mobile/empresarial-home.webp", "imagens/modelos-mobile/empresarial-servicos.webp", "imagens/modelos-mobile/empresarial-feedback.webp", "imagens/modelos-mobile/empresarial-blog.webp", "imagens/modelos-mobile/empresarial-contato.webp"]
            },
            features: [
                { icon: "fa-solid fa-layer-group", text: "5 Páginas estratégicas (Home, Sobre, Serviços, Blog, Contato)." },
                { icon: "fa-solid fa-bullhorn", text: "Seção de Notícias/Blog para marketing de conteúdo." },
                { icon: "fa-solid fa-star", text: "Área para depoimentos de clientes para prova social." },
                { icon: "fa-solid fa-chart-pie", text: "Design focado em conversão e captação de leads." },
                { icon: "fa-solid fa-mobile-alt", text: "Layout 100% responsivo para desktops, tablets e celulares." }
            ],
            specs: [
                { icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo (HTML, CSS, JS)." },
                { icon: "fa-solid fa-photo-film", text: "Personalização com seu conteúdo (textos, imagens e logo)." },
                { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar (hospedagem e domínio)." },
                { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico gratuito para ajustes e dúvidas." }
            ]
        },
        2: {
            id: 2,
            title: "Plataforma Executiva",
            category: "business",
            price: "2.497",
            discountPercentage: 15,
            tags: "negócios corporativo executivo finanças multinacional plataforma executiva",
            badge: { type: 'new', text: 'Novo' },
            features_card: ["7 Páginas", "Área de Imprensa", "SEO Avançado"],
            image_card: "imagens/modelos/plataforma-home.webp",
            description: "Posicione sua empresa como líder de mercado com este modelo corporativo sofisticado. Ideal para negócios que precisam de uma plataforma completa para comunicar com investidores, talentos e a imprensa.",
            images: {
                desktop: ["imagens/modelos/plataforma-home.webp", "imagens/modelos/plataforma-sobre.webp", "imagens/modelos/plataforma-servicos.webp", "imagens/modelos/plataforma-blog.webp", "imagens/modelos/plataforma-contato.webp"],
                mobile: ["imagens/modelos-mobile/plataforma-home.webp", "imagens/modelos-mobile/plataforma-historia.webp", "imagens/modelos-mobile/plataforma-equipe.webp", "imagens/modelos-mobile/plataforma-servicos.webp", "imagens/modelos-mobile/plataforma-blog.webp", "imagens/modelos-mobile/plataforma-contato.webp"]
            },
            features: [
                { icon: "fa-solid fa-layer-group", text: "7 Páginas completas (incluindo Carreiras e Relações com Investidores)." },
                { icon: "fa-solid fa-globe", text: "Estrutura pronta para suporte Multilingual." },
                { icon: "fa-solid fa-chart-line", text: "Otimização SEO Avançada para melhor ranking." },
                { icon: "fa-solid fa-newspaper", text: "Seção de comunicados à imprensa e notícias." },
                { icon: "fa-solid fa-landmark", text: "Design imponente que reflete autoridade no mercado." }
            ],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        3: {
            id: 3,
            title: "Vitrine Criativa",
            category: "portfolio",
            price: "1.497",
            discountPercentage: 25,
            tags: "portfólio criativo designer artista fotógrafo freelancer vitrine criativa",
            badge: null,
            features_card: ["Galeria Filtrável", "Animações Sutis", "Blog"],
            image_card: "imagens/modelos/vitrine-home.webp",
            description: "Sua vitrine digital para impressionar e conquistar novos clientes. Feito para criativos, este modelo valoriza cada detalhe do seu trabalho com um design de alto impacto visual e animações elegantes.",
            images: {
                desktop: ["imagens/modelos/vitrine-home.webp", "imagens/modelos/vitrine-sobre.webp", "imagens/modelos/vitrine-galeria.webp", "imagens/modelos/vitrine-blog.webp", "imagens/modelos/vitrine-contato.webp"],
                mobile: ["imagens/modelos-mobile/vitrine-home.webp", "imagens/modelos-mobile/vitrine-sobre.webp", "imagens/modelos-mobile/vitrine-galeria.webp", "imagens/modelos-mobile/vitrine-blog.webp", "imagens/modelos-mobile/vitrine-contato.webp"]
            },
            features: [{ icon: "fa-solid fa-image", text: "Galeria de projetos com filtros e visualização em tela cheia." }, { icon: "fa-solid fa-drafting-compass", text: "Animações sutis que destacam seu trabalho sem distrair." }, { icon: "fa-solid fa-blog", text: "Blog integrado para compartilhar seu processo criativo." }, { icon: "fa-solid fa-palette", text: "Design focado na imagem, ideal para fotógrafos e designers." }, { icon: "fa-solid fa-feather-alt", text: "Layout leve e rápido para uma experiência de usuário fluida." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        4: {
            id: 4,
            title: "Startup Vision",
            category: "startup",
            price: "1.397",
            discountPercentage: 30,
            tags: "startup pitch one-page tecnologia investidor startup vision",
            badge: null,
            features_card: ["Pitch Deck", "Seção de Time", "Roadmap"],
            image_card: "imagens/modelos/startup-home.webp",
            description: "Valide sua ideia e atraia investidores com uma página única, direta e moderna. Este modelo é perfeito para startups apresentarem seu pitch, time, produto e roadmap de forma clara e convincente.",
            images: {
                desktop: ["imagens/modelos/startup-home.webp", "imagens/modelos/startup-proposta.webp", "imagens/modelos/startup-equipe.webp", "imagens/modelos/startup-jornada.webp", "imagens/modelos/startup-contato.webp"],
                mobile: ["imagens/modelos-mobile/startup-home.webp", "imagens/modelos-mobile/startup-proposta.webp", "imagens/modelos-mobile/startup-equipe.webp", "imagens/modelos-mobile/startup-jornada.webp", "imagens/modelos-mobile/startup-contato.webp"]
            },
            features: [{ icon: "fa-solid fa-rocket", text: "Estrutura de Pitch Deck para apresentar sua solução." }, { icon: "fa-solid fa-users", text: "Seção de time para gerar credibilidade." }, { icon: "fa-solid fa-map-signs", text: "Roadmap visual para mostrar os próximos passos." }, { icon: "fa-solid fa-lightbulb", text: "Design inovador focado no ecossistema de tecnologia." }, { icon: "fa-solid fa-file-signature", text: "Formulário para captar interesse de investidores e parceiros." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        5: {
            id: 5,
            title: "E-commerce Pro",
            category: "ecommerce",
            price: "2.997",
            discountPercentage: 20,
            tags: "ecommerce loja venda produtos online varejo e-commerce pro",
            badge: { type: 'popular', text: 'Popular' },
            features_card: ["Carrinho Otimizado", "Checkout Simplificado", "Painel Admin"],
            image_card: "imagens/modelos/ecom-home.webp",
            description: "Uma solução de e-commerce completa e pronta para vender. Com um design limpo e focado na experiência de compra, este modelo tem tudo o que você precisa para transformar visitantes em clientes.",
            images: {
                desktop: ["imagens/modelos/ecom-home.webp", "imagens/modelos/ecom-categorias.webp", "imagens/modelos/ecom-novidades.webp", "imagens/modelos/ecom-vendidos.webp", "imagens/modelos/ecom-promocao.webp", "imagens/modelos/ecom.webp", "imagens/modelos/ecom-feedback.webp"],
                mobile: ["imagens/modelos-mobile/ecom-home.webp", "imagens/modelos-mobile/ecom-categorias.webp", "imagens/modelos-mobile/ecom-novidades.webp", "imagens/modelos-mobile/ecom-vendidos.webp", "imagens/modelos-mobile/ecom-promocao.webp", "imagens/modelos-mobile/ecom.webp", "imagens/modelos-mobile/ecom-feedback.webp", "imagens/modelos-mobile/ecom-instagram.webp"]
            },
            features: [{ icon: "fa-solid fa-shopping-cart", text: "Carrinho de compras e processo de checkout intuitivo." }, { icon: "fa-solid fa-credit-card", text: "Integração com os principais gateways de pagamento." }, { icon: "fa-solid fa-box-open", text: "Páginas de produto detalhadas com galeria de imagens e zoom." }, { icon: "fa-solid fa-search", text: "Sistema de busca e filtros avançados por categoria, preço, etc." }, { icon: "fa-solid fa-user-cog", text: "Painel de gerenciamento de produtos e pedidos." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        6: {
            id: 6,
            title: "Boutique Digital",
            category: "ecommerce",
            price: "3.497",
            discountPercentage: 15,
            tags: "moda loja roupas ecommerce vestuário boutique digital",
            badge: null,
            features_card: ["Lookbook", "Filtros Avançados", "Instagram Feed"],
            image_card: "imagens/modelos/boutique-home.webp",
            description: "Venda estilo com um site que entende de moda. Este modelo é visualmente deslumbrante, criado para marcas de vestuário e acessórios que desejam contar uma história e criar uma experiência de compra única.",
            images: {
                desktop: ["imagens/modelos/boutique-home.webp", "imagens/modelos/boutique-colecao.webp", "imagens/modelos/boutique-lookbook.webp", "imagens/modelos/boutique-sacola.webp"],
                mobile: ["imagens/modelos-mobile/boutique-home.webp", "imagens/modelos-mobile/boutique-colecao.webp", "imagens/modelos-mobile/boutique.webp", "imagens/modelos-mobile/boutique-lookbook.webp"]
            },
            features: [{ icon: "fa-solid fa-tshirt", text: "Seção 'Lookbook' para apresentar coleções de forma inspiradora." }, { icon: "fa-solid fa-heart", text: "Funcionalidade de 'Lista de Desejos' (Wishlist)." }, { icon: "fa-solid fa-tags", text: "Filtros específicos para moda (tamanho, cor, material)." }, { icon: "fab fa-instagram", text: "Integração com feed do Instagram para prova social." }, { icon: "fa-solid fa-expand-arrows-alt", text: "Visualização rápida de produtos sem sair da página de categoria." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        8: {
            id: 8,
            title: "App Launch",
            category: "startup",
            price: "997",
            discountPercentage: 40,
            tags: "aplicativo app landing page startup download mobile app launch",
            badge: { type: 'conversion', text: 'Downloads' },
            features_card: ["Download Direto", "Vídeo Demo", "Features Visuais"],
            image_card: "imagens/modelos/app-home.webp",
            description: "Transforme visitantes em usuários com uma Landing Page desenhada para conversão. Destaque as melhores features do seu aplicativo, mostre um vídeo de demonstração e facilite o download na App Store e Play Store.",
            images: {
                desktop: ["imagens/modelos/app-home.webp", "imagens/modelos/app-vantagens.webp", "imagens/modelos/app-task.webp", "imagens/modelos/app-ctafinal.webp"],
                mobile: ["imagens/modelos-mobile/app-home.webp", "imagens/modelos-mobile/app.webp", "imagens/modelos-mobile/app-dashboard.webp", "imagens/modelos-mobile/app-organize.webp", "imagens/modelos-mobile/app-feedback.webp"]
            },
            features: [{ icon: "fa-brands fa-google-play", text: "Botões de download para App Store e Google Play." }, { icon: "fa-solid fa-circle-play", text: "Espaço para vídeo de demonstração do app." }, { icon: "fa-solid fa-star", text: "Seção para avaliações e depoimentos de usuários." }, { icon: "fa-solid fa-mobile-screen-button", text: "Design visual que destaca as telas e funcionalidades." }, { icon: "fa-solid fa-gauge-high", text: "Otimizada para carregamento rápido em dispositivos móveis." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        9: {
            id: 9,
            title: "Menu Gastronômico",
            category: "restaurant",
            price: "1.597",
            discountPercentage: 20,
            tags: "restaurante comida delivery cardápio gourmet menu gastronômico",
            badge: null,
            features_card: ["Cardápio Online", "Reservas", "Pedidos via WhatsApp"],
            image_card: "imagens/modelos/cardapio-home.webp",
            description: "Desperte o apetite dos seus clientes antes mesmo de eles chegarem. Este modelo para restaurantes combina fotos de alta qualidade com um design elegante para apresentar seu cardápio, ambiente e facilitar reservas.",
            images: {
                desktop: ["imagens/modelos/cardapio-home.webp", "imagens/modelos/cardapio.webp", "imagens/modelos/cardapio-galeria.webp", "imagens/modelos/cardapio-reserva.webp"],
                mobile: ["imagens/modelos-mobile/cardapio-home.webp", "imagens/modelos-mobile/cardapio.webp", "imagens/modelos-mobile/cardapio-galeria.webp", "imagens/modelos-mobile/cardapio-reserva.webp", "imagens/modelos-mobile/cardapio-reserva2.webp"]
            },
            features: [{ icon: "fa-solid fa-utensils", text: "Cardápio digital interativo com fotos e descrições." }, { icon: "fa-solid fa-calendar-check", text: "Sistema de reservas online integrado." }, { icon: "fa-solid fa-camera", text: "Galeria de fotos para mostrar o ambiente e os pratos." }, { icon: "fa-solid fa-map-marker-alt", text: "Mapa de localização e informações de contato fáceis de achar." }, { icon: "fab fa-whatsapp", text: "Integração com WhatsApp para pedidos de delivery." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        10: {
            id: 10,
            title: "Clínica Moderna",
            category: "health",
            price: "1.897",
            discountPercentage: 25,
            tags: "médico saúde clínica consultório agendamento clínica moderna",
            badge: null,
            features_card: ["Agendamento Online", "Corpo Clínico", "Telemedicina"],
            image_card: "imagens/modelos/clinica-home.webp",
            description: "Transmita profissionalismo e confiança para seus pacientes. Este modelo para clínicas e consultórios é limpo, organizado e focado em facilitar o acesso à informação e o agendamento de consultas.",
            images: {
                desktop: ["imagens/modelos/clinica-home.webp", "imagens/modelos/clinica-especialidades.webp", "imagens/modelos/clinica-agendamento.webp", "imagens/modelos/clinica-localizacao.webp"],
                mobile: ["imagens/modelos-mobile/clinica-home.webp", "imagens/modelos-mobile/clinica-especialidades.webp", "imagens/modelos-mobile/clinica-doutores.webp", "imagens/modelos-mobile/clinica-agendamento.webp", "imagens/modelos-mobile/clinica-contato.webp"]
            },
            features: [{ icon: "fa-solid fa-calendar-alt", text: "Sistema de agendamento de consultas online." }, { icon: "fa-solid fa-user-md", text: "Páginas para corpo clínico com perfil de cada profissional." }, { icon: "fa-solid fa-notes-medical", text: "Seção detalhada para especialidades e tratamentos." }, { icon: "fa-solid fa-laptop-medical", text: "Estrutura para informações sobre telemedicina." }, { icon: "fa-solid fa-shield-virus", text: "Design que transmite segurança, higiene e credibilidade." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        11: {
            id: 11,
            title: "Imóveis Premium",
            category: "real-estate",
            price: "2.797",
            discountPercentage: 15,
            tags: "imobiliária imóveis venda aluguel corretor imóveis premium",
            badge: null,
            features_card: ["Busca Avançada", "Tour Virtual", "Mapa Interativo"],
            image_card: "imagens/modelos/imovel-home.webp",
            description: "Conecte clientes aos seus imóveis com um portal moderno e funcional. Ferramentas de busca avançada, galerias de fotos imersivas e mapa interativo facilitam a jornada do comprador.",
            images: {
                desktop: ["imagens/modelos/imovel-home.webp", "imagens/modelos/imovel.webp", "imagens/modelos/imovel-equipe.webp", "imagens/modelos/imovel-localizacao.webp", "imagens/modelos/imovel-contato.webp"],
                mobile: ["imagens/modelos-mobile/imovel-home.webp", "imagens/modelos-mobile/imovel-destaque.webp", "imagens/modelos-mobile/imovel-equipe.webp", "imagens/modelos-mobile/imovel-localizacao.webp", "imagens/modelos-mobile/imovel-contato.webp"]
            },
            features: [{ icon: "fa-solid fa-magnifying-glass-location", text: "Filtros de busca avançada (tipo, quartos, preço, localização)." }, { icon: "fa-solid fa-vr-cardboard", text: "Suporte para tour virtual 360° e vídeos do imóvel." }, { icon: "fa-solid fa-map-location-dot", text: "Mapa interativo para visualizar imóveis por região." }, { icon: "fa-solid fa-comments-dollar", text: "Calculadora de financiamento integrada." }, { icon: "fa-solid fa-user-tie", text: "Página de perfil para cada corretor associado." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        12: {
            id: 12,
            title: "Ticket Hub",
            category: "event",
            price: "1.697",
            discountPercentage: 20,
            tags: "eventos congresso festa show palestra ticket hub",
            badge: null,
            features_card: ["Venda de Ingressos", "Agenda/Cronograma", "Palestrantes"],
            image_card: "imagens/modelos/tiket-home.webp",
            description: "Crie uma experiência completa para o seu evento, de congressos a shows. Apresente a programação, os palestrantes e venda ingressos diretamente pela página, de forma segura e profissional.",
            images: {
                desktop: ["imagens/modelos/tiket-home.webp", "imagens/modelos/tiket.webp", "imagens/modelos/tiket-programacao.webp", "imagens/modelos/tiket-convidados.webp", "imagens/modelos/tiket-localizacao.webp", "imagens/modelos/tiket-ingresso.webp"],
                mobile: ["imagens/modelos-mobile/tiket-home.webp", "imagens/modelos-mobile/tiket.webp", "imagens/modelos-mobile/tiket-programacao.webp", "imagens/modelos-mobile/tiket-convidados.webp", "imagens/modelos-mobile/tiket-localizacao.webp", "imagens/modelos-mobile/tiket-ingresso.webp"]
            },
            features: [{ icon: "fa-solid fa-ticket", text: "Integração com plataformas de venda de ingressos." }, { icon: "fa-solid fa-calendar-days", text: "Agenda interativa do evento com trilhas e horários." }, { icon: "fa-solid fa-microphone-lines", text: "Seção para destacar palestrantes ou artistas." }, { icon: "fa-solid fa-map-pin", text: "Mapa do local e informações de como chegar." }, { icon: "fa-solid fa-hourglass-start", text: "Contador regressivo para gerar expectativa." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        13: {
            id: 13,
            title: "Portfólio de Obras",
            category: "services",
            price: "1.797",
            discountPercentage: 15,
            tags: "construtora engenharia obra serviço arquitetura portfólio de obras",
            badge: null,
            features_card: ["Portfólio de Obras", "Serviços Detalhados", "Orçamento Online"],
            image_card: "imagens/modelos/obras-home.webp",
            description: "Apresente a solidez e a qualidade da sua construtora ou escritório de engenharia. Este modelo é focado em exibir seu portfIO de obras, detalhar seus serviços e facilitar a solicitação de orçamentos.",
            images: {
                desktop: ["imagens/modelos/obras-home.webp", "imagens/modelos/obras-projetos.webp", "imagens/modelos/obras-servicos.webp", "imagens/modelos/obras-orcamento.webp"],
                mobile: ["imagens/modelos-mobile/obras-home.webp", "imagens/modelos-mobile/obras-servicos.webp", "imagens/modelos-mobile/obras-projetos.webp", "imagens/modelos-mobile/obras-orcamento.webp"]
            },
            features: [{ icon: "fa-solid fa-hard-hat", text: "Galeria de projetos e obras realizadas com antes/depois." }, { icon: "fa-solid fa-list-check", text: "Descrição detalhada das áreas de atuação e serviços." }, { icon: "fa-solid fa-calculator", text: "Formulário de orçamento detalhado e fácil de preencher." }, { icon: "fa-solid fa-award", text: "Área para certificações e prêmios da empresa." }, { icon: "fa-solid fa-users-gear", text: "Design robusto que inspira confiança e profissionalismo." }],
            specs: [{ icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." }, { icon: "fa-solid fa-photo-film", text: "Personalização com sua identidade visual." }, { icon: "fa-solid fa-upload", text: "Auxílio para colocar o site no ar." }, { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }]
        },
        15: {
            id: 15,
            title: "Site de Jogos RPG",
            category: "games",
            price: "1.497",
            discountPercentage: 20,
            tags: "mmorpg aruanã jogo online brasil medieval fantasia magia rpg",
            badge: null,
            features_card: ["Lore Épico", "Classes Jogáveis", "Mundo Interativo"],
            image_card: "imagens/modelos/mmo-home.webp",
            description: "Entre no universo de Aruanã, um MMORPG inspirado em um Brasil medieval alternativo. Explore facções, classes únicas, biomas deslumbrantes e mergulhe em uma narrativa épica onde magia e natureza se entrelaçam.",
            images: {
                desktop: [
                    "imagens/modelos/mmo-home.webp",
                    "imagens/modelos/mmo-legado.webp",
                    "imagens/modelos/mmo-classes.webp",
                    "imagens/modelos/mmo-mecanicas.webp",
                    "imagens/modelos/mmo-mundo.webp",
                    "imagens/modelos/mmo-faccoes.webp",
                    "imagens/modelos/mmo-personagens.webp",
                    "imagens/modelos/mmo-galeria.webp",
                    "imagens/modelos/mmo-blog.webp",
                    "imagens/modelos/mmo-requisitos.webp",
                    "imagens/modelos/mmo-loja.webp",
                ],
                mobile: [
                    "imagens/modelos-mobile/mmo-home.webp",
                    "imagens/modelos-mobile/mmo-legado.webp",
                    "imagens/modelos-mobile/mmo-classes.webp",
                    "imagens/modelos-mobile/mmo-mecanicas.webp",
                    "imagens/modelos-mobile/mmo-mundo.webp",
                    "imagens/modelos-mobile/mmo-faccoes.webp",
                    "imagens/modelos-mobile/mmo-personagens.webp",
                    "imagens/modelos-mobile/mmo-galeria.webp",
                    "imagens/modelos-mobile/mmo-noticias.webp"
                ]
            },
            features: [
                { icon: "fa-solid fa-book-open", text: "Lore original: O Legado da Esmeralda e o Xamã Negro." },
                { icon: "fa-solid fa-user-shield", text: "Classes jogáveis com estilos únicos e habilidades distintas." },
                { icon: "fa-solid fa-globe-americas", text: "Mapa interativo de Aruanã com biomas variados." },
                { icon: "fa-solid fa-flag", text: "Facções e alianças que moldam o destino do mundo." },
                { icon: "fa-solid fa-users", text: "Personagens icônicos: Ayla, Comandante Ferro, Kael e Morwen." },
                { icon: "fa-solid fa-newspaper", text: "Seção de notícias com eventos, atualizações e patches." },
                { icon: "fa-solid fa-store", text: "Loja integrada com cosméticos, pacotes e upgrades." }
            ],
            specs: [
                { icon: "fa-solid fa-file-zipper", text: "Entrega do Código-Fonte Completo." },
                { icon: "fa-solid fa-photo-film", text: "Personalização visual com identidade do jogo." },
                { icon: "fa-solid fa-upload", text: "Suporte para hospedar e configurar." },
                { icon: "fa-solid fa-shield-halved", text: "3 Meses de Suporte Técnico." }
            ]
        },
        16: {
            id: 16,
            title: "Site de Freelancer",
            category: "services",
            price: "997",
            discountPercentage: 30,
            tags: "freelancer portfolio design dev programador designer autônomo",
            badge: null,
            features_card: ["Portfólio Moderno", "Contato Fácil", "Serviços Listados"],
            image_card: "imagens/modelos/free-home.webp",
            description: "Mostre seu talento como freelancer com um site elegante. Apresente seu portfólio, depoimentos de clientes e facilite o contato para novos trabalhos.",
            images: {
                desktop: ["imagens/modelos/free-home.webp", "imagens/modelos/free-especialidades.webp", "imagens/modelos/free-portfolio.webp", "imagens/modelos/free-feedback.webp", "imagens/modelos/free-contato.webp"],
                mobile: ["imagens/modelos-mobile/free-home.webp", "imagens/modelos-mobile/free-especialidades.webp", "imagens/modelos-mobile/free-portfolio.webp", "imagens/modelos-mobile/free-feedback.webp", "imagens/modelos-mobile/free-contato.webp"]
            },
            features: [
                { icon: "fa-solid fa-briefcase", text: "Exibição clara de serviços e áreas de atuação." },
                { icon: "fa-solid fa-image", text: "Portfólio visual atrativo com filtros." },
                { icon: "fa-solid fa-comment-dots", text: "Depoimentos de clientes integrados." },
                { icon: "fa-solid fa-envelope", text: "Formulário de contato rápido." },
                { icon: "fa-solid fa-laptop-code", text: "Design minimalista e responsivo." }
            ],
            specs: [
                { icon: "fa-solid fa-file-zipper", text: "Entrega com Código-Fonte Completo." },
                { icon: "fa-solid fa-photo-film", text: "Customização visual com identidade própria." },
                { icon: "fa-solid fa-upload", text: "Auxílio na publicação do site." },
                { icon: "fa-solid fa-shield-halved", text: "Suporte Técnico por 3 meses." }
            ]
        },
    };

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    // OTIMIZAÇÃO: Função Debounce para evitar execuções excessivas de uma função
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    // FUNÇÃO PARA ANIMAÇÃO DE CONTAGEM DOS NÚMEROS (EFEITO START NUMBER)
    function startNumberAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.dataset.animated) return;
                    el.dataset.animated = "true";

                    const text = el.textContent.trim();
                    const endValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                    const suffix = text.replace(/[0-9.]/g, '');

                    if (isNaN(endValue)) return;

                    const duration = 2000;
                    const startTime = performance.now();

                    const step = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easedProgress * endValue);
                        el.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = text;
                        }
                    };
                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        $$('.stat-number').forEach(el => observer.observe(el));
    }

    // FUNÇÃO PARA ATUALIZAR ESTATÍSTICAS DINÂMICAS (DIAS DE ATIVIDADE)
    function updateDynamicStats() {
        const daysCounterElement = document.getElementById('days-active-counter');
        if (!daysCounterElement) return;

        const foundationDate = new Date('2025-09-07T00:00:00');
        const today = new Date();

        const diffTime = Math.abs(today - foundationDate);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) diffDays = 1;

        daysCounterElement.textContent = diffDays;
    }

    // FUNÇÃO PARA RENDERIZAR OS CARDS DOS MODELOS
    function renderModelCards() {
        const grid = $('#models-grid');
        if (!grid) return;

        grid.innerHTML = Object.values(modelsData).map(model => {
            const priceNum = parseFloat(model.price.replace(/\./g, ''));
            const originalPriceNum = priceNum / (1 - (model.discountPercentage / 100));

            const formatPrice = (num) => {
                return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num).replace('R$', '').trim();
            };

            const originalPriceFormatted = formatPrice(originalPriceNum);

            return `
                <div class="portfolio-item reveal-on-scroll" data-category="${model.category}" data-title="${model.title}" data-tags="${model.tags}" data-price="${priceNum}">
                    <div class="item-image">
                        <img src="${model.image_card}" alt="Modelo ${model.title}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x250/718096/ffffff?text=Imagem+Indisponível';">
                        ${model.badge ? `<div class="item-badge ${model.badge.type}">${model.badge.text}</div>` : ''}
                    </div>
                    <div class="item-content">
                        <h3>${model.title}</h3>
                        <span class="item-category">${model.category.charAt(0).toUpperCase() + model.category.slice(1).replace('-', ' ')}</span>
                        <div class="item-features">
                            ${model.features_card.map(feat => `<span><i class="fas fa-check"></i> ${feat}</span>`).join('')}
                        </div>
                        <div class="item-footer">
                            <div class="price-info">
                                <div class="price-line-1">
                                    <span class="price-original">R$ ${originalPriceFormatted}</span>
                                    <span class="promo-tag">${model.discountPercentage}% OFF</span>
                                </div>
                                <span class="item-price">R$ ${model.price}</span>
                                <span class="price-details">10% OFF no PIX ou em até 12x</span>
                            </div>
                            <button class="btn btn-primary view-model-btn" data-model-id="${model.id}">Visualizar</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // FUNÇÃO PARA CONFIGURAR E CONTROLAR O MODAL
    function setupModal() {
        const elements = {
            overlay: $('#model-modal-overlay'),
            modalContent: $('.modal-content'),
            closeBtn: $('#modal-close-btn'),
            mainImage: $('#modal-main-image'),
            thumbnails: $('#modal-thumbnails'),
            prevBtn: $('#gallery-prev'),
            nextBtn: $('#gallery-next'),
            viewport: $('#preview-viewport'),
            desktopBtn: $('#view-desktop-btn'),
            mobileBtn: $('#view-mobile-btn'),
            title: $('#modal-title'),
            category: $('#modal-category'),
            description: $('#modal-description'),
            price: $('#modal-price'),
            quoteBtn: $('#modal-quote-btn'),
            tabFeaturesList: $('#tab-features .modal-features-list'),
            tabSpecsList: $('#tab-specs .modal-features-list'),
            tabButtons: $$('.tab-btn'),
            tabPanes: $$('.tab-pane'),
            tabContent: $('.tab-content')
        };

        if (!elements.overlay) return;

        let currentModelData = null;
        let currentViewMode = 'desktop';
        let currentImageIndex = 0;

        const updateGallery = () => {
            if (!currentModelData) return;
            const imageSet = currentViewMode === 'mobile' && currentModelData.images.mobile.length > 0 ? currentModelData.images.mobile : currentModelData.images.desktop;
            if (!imageSet || imageSet.length === 0) return;
            currentImageIndex = Math.max(0, Math.min(currentImageIndex, imageSet.length - 1));
            elements.mainImage.style.opacity = 0;
            setTimeout(() => {
                elements.mainImage.src = imageSet[currentImageIndex];
                elements.mainImage.style.opacity = 1;
            }, 200);

            // OTIMIZAÇÃO: Adiciona loading="lazy" para as miniaturas (thumbnails)
            elements.thumbnails.innerHTML = imageSet.map((imgSrc, i) => `<img src="${imgSrc}" class="thumbnail-img ${i === currentImageIndex ? 'active' : ''}" data-index="${i}" alt="Thumbnail ${i + 1}" loading="lazy" onerror="this.style.display='none'">`).join('');
            
            const showNav = imageSet.length > 1;
            elements.prevBtn.style.display = showNav ? 'flex' : 'none';
            elements.nextBtn.style.display = showNav ? 'flex' : 'none';
        };

        const createListHTML = (items) => items.map(item => `<li><i class="${item.icon}"></i> ${item.text}</li>`).join('');

        const openModal = (modelId) => {
            const data = modelsData[modelId];
            if (!data) return;
            currentModelData = data;
            currentViewMode = 'desktop';
            currentImageIndex = 0;
            elements.title.textContent = data.title;
            elements.category.textContent = data.category.charAt(0).toUpperCase() + data.category.slice(1).replace('-', ' ');
            elements.description.textContent = data.description;
            elements.price.textContent = data.price;
            elements.quoteBtn.dataset.modelId = modelId;
            elements.tabFeaturesList.innerHTML = createListHTML(data.features);
            elements.tabSpecsList.innerHTML = createListHTML(data.specs);
            elements.viewport.classList.add('is-desktop');
            elements.viewport.classList.remove('is-mobile');
            elements.desktopBtn.classList.add('active');
            elements.mobileBtn.classList.remove('active');
            updateGallery();
            switchTab('features');
            elements.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            elements.overlay.classList.remove('active');
            document.body.style.overflow = '';
            currentModelData = null;
        };

        const switchTab = (tabName) => {
            const activePane = $(`#tab-${tabName}`);
            if (activePane) {
                elements.tabContent.style.height = `${activePane.scrollHeight}px`;
            }
            elements.tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
            elements.tabPanes.forEach(pane => pane.classList.toggle('active', pane.id === `tab-${tabName}`));
        };

        $('#models-grid').addEventListener('click', (e) => {
            const button = e.target.closest('.view-model-btn');
            if (button) {
                openModal(button.dataset.modelId);
            }
        });

        elements.closeBtn.addEventListener('click', closeModal);
        elements.overlay.addEventListener('click', (e) => { if (e.target === elements.overlay) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

        elements.quoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!currentModelData) return;
            const data = currentModelData;
            const WHATSAPP_NUMBER = "5567996030671";
            let message = `*Assunto: Interesse no Modelo de Site*\n\nOlá, equipe Lumin Interactive!\n\nGostaria de iniciar uma conversa sobre a aquisição de um dos seus modelos.\n\n*>> Modelo Selecionado:*\n${data.title}\n\n*>> Investimento:*\nA partir de R$ ${data.price}\n\nTenho interesse em entender as opções de personalização e os próximos passos para fecharmos negócio.\n\nAguardo o contato. Obrigado!`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        });

        elements.prevBtn.addEventListener('click', () => {
            if (!currentModelData) return;
            const imageSet = currentViewMode === 'mobile' && currentModelData.images.mobile.length > 0 ? currentModelData.images.mobile : currentModelData.images.desktop;
            currentImageIndex = (currentImageIndex - 1 + imageSet.length) % imageSet.length;
            updateGallery();
        });
        elements.nextBtn.addEventListener('click', () => {
            if (!currentModelData) return;
            const imageSet = currentViewMode === 'mobile' && currentModelData.images.mobile.length > 0 ? currentModelData.images.mobile : currentModelData.images.desktop;
            currentImageIndex = (currentImageIndex + 1) % imageSet.length;
            updateGallery();
        });
        elements.thumbnails.addEventListener('click', (e) => {
            if (e.target.matches('.thumbnail-img')) {
                currentImageIndex = parseInt(e.target.dataset.index, 10);
                updateGallery();
            }
        });
        
        elements.desktopBtn.addEventListener('click', () => {
            if (currentViewMode === 'desktop') return;
            currentViewMode = 'desktop';
            elements.viewport.classList.add('is-desktop');
            elements.viewport.classList.remove('is-mobile');
            elements.desktopBtn.classList.add('active');
            elements.mobileBtn.classList.remove('active');
            currentImageIndex = 0;
            updateGallery();
        });
        elements.mobileBtn.addEventListener('click', () => {
            if (currentViewMode === 'mobile') return;
            currentViewMode = 'mobile';
            elements.viewport.classList.remove('is-desktop');
            elements.viewport.classList.add('is-mobile');
            elements.mobileBtn.classList.add('active');
            elements.desktopBtn.classList.remove('active');
            currentImageIndex = 0;
            updateGallery();
        });

        elements.tabButtons.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
    }

    // FUNÇÃO PARA FILTRAR OS CARDS
    function setupFilters() {
        const searchInput = $('#search-input');
        const categoryFilter = $('#category-filter');
        const priceFilter = $('#price-filter');
        const resetFiltersBtn = $('#reset-filters');
        const gridContainer = $('#models-grid');
        const noResultsMessage = $('#no-results-message');

        if (!searchInput) return;

        const applyFilters = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedCategory = categoryFilter.value;
            const selectedPrice = priceFilter.value;
            let itemsFound = 0;

            gridContainer.querySelectorAll('.portfolio-item').forEach(item => {
                const { category, tags, title, price } = item.dataset;
                const priceValue = parseFloat(price);

                const searchMatch = searchTerm === '' || tags.toLowerCase().includes(searchTerm) || title.toLowerCase().includes(searchTerm);
                const categoryMatch = selectedCategory === 'all' || category === selectedCategory;

                let priceMatch = true;
                if (selectedPrice !== 'all') {
                    if (selectedPrice.includes('+')) {
                        priceMatch = priceValue >= parseFloat(selectedPrice.replace('+', ''));
                    } else {
                        const [min, max] = selectedPrice.split('-').map(Number);
                        priceMatch = priceValue >= min && (max ? priceValue <= max : true);
                    }
                }

                if (searchMatch && categoryMatch && priceMatch) {
                    item.style.display = 'flex';
                    itemsFound++;
                } else {
                    item.style.display = 'none';
                }
            });
            noResultsMessage.style.display = itemsFound === 0 ? 'block' : 'none';
        }

        // OTIMIZAÇÃO: Debounce para o campo de busca
        const debouncedSearch = debounce(applyFilters, 300);
        searchInput.addEventListener('input', debouncedSearch);
        categoryFilter.addEventListener('input', applyFilters);
        priceFilter.addEventListener('input', applyFilters);

        resetFiltersBtn.addEventListener('click', () => {
            searchInput.value = '';
            categoryFilter.value = 'all';
            priceFilter.value = 'all';
            applyFilters();
        });
    }
    
    // FUNÇÃO PARA BOTÃO VOLTAR AO TOPO
    function setupBackToTop() {
        const backToTopBtn = $('#back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => backToTopBtn.classList.toggle('active', window.scrollY > 300));
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // FUNÇÃO PARA O CARROSSEL DO HERO
    function setupHeroCarousel() {
        const carousel = $('.hero-image-carousel');
        if (!carousel) return;

        const images = [
            "imagens/modelos/imovel-home.webp",
            "imagens/modelos/ecom-home.webp",
            "imagens/modelos/startup-home.webp"
        ];

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Modelo de site ${index + 1}`;
            // OTIMIZAÇÃO: Carregamento 'lazy' para imagens do carrossel, exceto a primeira
            if (index > 0) {
                img.loading = 'lazy';
            }
            if (index === 0) img.classList.add('active');
            carousel.appendChild(img);
        });

        let currentIndex = 0;
        setInterval(() => {
            const slides = carousel.querySelectorAll('img');
            if (slides.length > 0) {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }
        }, 5000);
    }
    
    // FUNÇÃO PARA ANIMAÇÕES DE SCROLL
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('portfolio-item')) {
                        entry.target.style.setProperty('--i', index % 3);
                    }
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        $$('.reveal-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    function startPriceAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target; 
                    if (el.dataset.animated) return;
                    el.dataset.animated = "true";

                    const portfolioItem = el.closest('.portfolio-item');
                    if (!portfolioItem || !portfolioItem.dataset.price) return;

                    const endValue = parseFloat(portfolioItem.dataset.price);
                    
                    const finalPriceText = `R$ ${new Intl.NumberFormat('pt-BR').format(endValue)}`;

                    if (isNaN(endValue)) {
                       el.textContent = finalPriceText; 
                       return;
                    }

                    const duration = 1500;
                    const startTime = performance.now();

                    const step = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        let progress = elapsedTime / duration;
                        if (progress > 1) progress = 1;

                        const easedProgress = 1 - Math.pow(1 - progress, 3);
                        const currentVal = Math.floor(easedProgress * endValue);
                        
                        const formattedVal = new Intl.NumberFormat('pt-BR').format(currentVal);

                        el.textContent = `R$ ${formattedVal}`;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = finalPriceText;
                        }
                    };
                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        const grid = $('#models-grid');
        if(grid) {
             const prices = grid.querySelectorAll('.item-price');
             prices.forEach(el => observer.observe(el));
        }
    }

    // FUNÇÃO DE INICIALIZAÇÃO
    function init() {
        updateDynamicStats();
        renderModelCards(); 
        setupModal();
        setupFilters();
        setupBackToTop();
        startNumberAnimation();
        startPriceAnimation(); 
        setupHeroCarousel();
        setupScrollAnimations();

        const currentYear = $('#current-year');
        if (currentYear) currentYear.textContent = new Date().getFullYear();
    }

    init();
});
