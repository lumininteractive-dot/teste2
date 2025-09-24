/*
  Service Worker Otimizado
  Versão: 5
  Data: 2025-09-16
*/

// Nomes dos caches para organização e versionamento
const STATIC_CACHE_NAME = 'static-assets-v5';
const IMAGE_CACHE_NAME = 'image-assets-v5';
const FONT_CACHE_NAME = 'font-assets-v5';

// Limite de imagens no cache
const MAX_IMAGE_CACHE_ENTRIES = 50;

// Lista de assets essenciais para o App Shell
const CORE_ASSETS = [
    '/offline.html'
];

// Lista de URLs a serem cacheadas durante a instalação.
// O Service Worker tentará cachear tudo, mas não falhará se um item falhar.
const URLS_TO_PRECACHE = [
  // Páginas HTML
  '/',
  '/index.html',
  '/config.html',
  '/contato.html',
  '/orcamento.html',
  '/portfolio.html',
  '/privacidade.html',
  '/servicos.html',
  '/sobre.html',
  '/termos.html',

  // Arquivos CSS
  '/css/sobre.css',
  '/css/portfolio.css',
  '/css/servicos.css',
  '/css/privacidade.css',
  '/css/orcamento.css',
  '/css/contato.css',
  '/css/termos.css',
  '/css/style.css',
  '/css/footer.css',
  '/css/cart.css',
  '/css/config.css',
  '/css/header.css',

  // Arquivos JavaScript
  '/js/sobre.js',
  '/js/portfolio.js',
  '/js/servicos.js',
  '/js/main.js',
  '/js/privacidade.js',
  '/js/orcamento.js',
  '/js/contato.js',
  '/js/termos.js',
  '/js/config.js',
  '/js/global.js',
  '/js/login.js',
  '/js/script.js',

  // Imagens da pasta principal
  '/imagens/assinaturaimagem-removebg-preview - Copia.webp',
  '/imagens/assinaturaimagem-removebg-preview.webp',
  '/imagens/blogviagem.webp',
  '/imagens/Captura de tela 2025-03-28 232755.webp',
  '/imagens/ChatGPT Image 18 de jul. de 2025, 21_07_36.webp',
  '/imagens/Colaboração Futurista com Interfaces Holográficas.webp',
  '/imagens/contact (2).webp',
  '/imagens/contact.webp',
  '/imagens/imagehome.webp',
  '/imagens/logobrancalumin.webp',
  '/imagens/logolumiin.webp',
  '/imagens/serv.webp',
  '/imagens/serviçoimagesemfundo.webp',
  '/imagens/sobreimagem.webp',
  '/imagens/teste8.webp',

  // Imagens de modelos (Desktop)
  '/imagens/modelos/imagem-index.webp',
  '/imagens/modelos/free-contato.webp',
  '/imagens/modelos/free-feedback.webp',
  '/imagens/modelos/free-portfolio.webp',
  '/imagens/modelos/free-especialidades.webp',
  '/imagens/modelos/free-home.webp',
  '/imagens/modelos/boutique-sacola.webp',
  '/imagens/modelos/boutique-lookbook.webp',
  '/imagens/modelos/boutique-colecao.webp',
  '/imagens/modelos/ecom-feedback.webp',
  '/imagens/modelos/ecom.webp',
  '/imagens/modelos/ecom-promocao.webp',
  '/imagens/modelos/ecom-vendidos.webp',
  '/imagens/modelos/ecom-novidades.webp',
  '/imagens/modelos/ecom-categorias.webp',
  '/imagens/modelos/ecom-home.webp',
  '/imagens/modelos/imovel-contato.webp',
  '/imagens/modelos/imovel-localizacao.webp',
  '/imagens/modelos/imovel-equipe.webp',
  '/imagens/modelos/imovel.webp',
  '/imagens/modelos/vitrine-contato.webp',
  '/imagens/modelos/vitrine-blog.webp',
  '/imagens/modelos/vitrine-galeria.webp',
  '/imagens/modelos/vitrine-sobre.webp',
  '/imagens/modelos/tiket-ingresso.webp',
  '/imagens/modelos/tiket-localizacao.webp',
  '/imagens/modelos/tiket-convidados.webp',
  '/imagens/modelos/tiket-programacao.webp',
  '/imagens/modelos/tiket.webp',
  '/imagens/modelos/tiket-home.webp',
  '/imagens/modelos/cardapio-reserva.webp',
  '/imagens/modelos/cardapio-galeria.webp',
  '/imagens/modelos/cardapio.webp',
  '/imagens/modelos/cardapio-home.webp',
  '/imagens/modelos/mmo-loja.webp',
  '/imagens/modelos/mmo-requisitos.webp',
  '/imagens/modelos/mmo-blog.webp',
  '/imagens/modelos/mmo-galeria.webp',
  '/imagens/modelos/mmo-personagens.webp',
  '/imagens/modelos/mmo-faccoes.webp',
  '/imagens/modelos/mmo-mundo.webp',
  '/imagens/modelos/mmo-mecanicas.webp',
  '/imagens/modelos/mmo-classes.webp',
  '/imagens/modelos/mmo-legado.webp',
  '/imagens/modelos/mmo-home.webp',
  '/imagens/modelos/mecanico-agendamento.webp',
  '/imagens/modelos/mecanico-avaliacao.webp',
  '/imagens/modelos/mecanico-servicos.webp',
  '/imagens/modelos/mecanico-home.webp',
  '/imagens/modelos/obras-home.webp',
  '/imagens/modelos/obras-orcamento.webp',
  '/imagens/modelos/obras-projetos.webp',
  '/imagens/modelos/obras-servicos.webp',
  '/imagens/modelos/imovel-home.webp',
  '/imagens/modelos/clinica-localizacao.webp',
  '/imagens/modelos/clinica-agendamento.webp',
  '/imagens/modelos/clinica-especialidades.webp',
  '/imagens/modelos/clinica-home.webp',
  '/imagens/modelos/app-home.webp',
  '/imagens/modelos/app-ctafinal.webp',
  '/imagens/modelos/app-task.webp',
  '/imagens/modelos/app-vantagens.webp',
  '/imagens/modelos/boutique-home.webp',
  '/imagens/modelos/startup-contato.webp',
  '/imagens/modelos/startup-jornada.webp',
  '/imagens/modelos/startup-equipe.webp',
  '/imagens/modelos/startup-proposta.webp',
  '/imagens/modelos/startup-home.webp',
  '/imagens/modelos/vitrine-home.webp',
  '/imagens/modelos/plataforma-contato.webp',
  '/imagens/modelos/plataforma-blog.webp',
  '/imagens/modelos/plataforma-servicos.webp',
  '/imagens/modelos/plataforma-sobre.webp',
  '/imagens/modelos/plataforma-home.webp',
  '/imagens/modelos/empresarial-contato.webp',
  '/imagens/modelos/empresarial-blog.webp',
  '/imagens/modelos/empresarial-feedback.webp',
  '/imagens/modelos/empresarial-servicos.webp',
  '/imagens/modelos/empresarial-sobre.webp',
  '/imagens/modelos/empresarial-home.webp',

  // Imagens de modelos (Mobile)
  '/imagens/modelos-mobile/free-contato.webp',
  '/imagens/modelos-mobile/free-feedback.webp',
  '/imagens/modelos-mobile/free-portfolio.webp',
  '/imagens/modelos-mobile/free-especialidades.webp',
  '/imagens/modelos-mobile/free-home.webp',
  '/imagens/modelos-mobile/mmo-noticias.webp',
  '/imagens/modelos-mobile/mmo-galeria.webp',
  '/imagens/modelos-mobile/mmo-personagens.webp',
  '/imagens/modelos-mobile/mmo-faccoes.webp',
  '/imagens/modelos-mobile/mmo-mundo.webp',
  '/imagens/modelos-mobile/mmo-mecanicas.webp',
  '/imagens/modelos-mobile/mmo-classes.webp',
  '/imagens/modelos-mobile/mmo-legado.webp',
  '/imagens/modelos-mobile/mmo-home.webp',
  '/imagens/modelos-mobile/obras-orcamento.webp',
  '/imagens/modelos-mobile/obras-projetos.webp',
  '/imagens/modelos-mobile/obras-servicos.webp',
  '/imagens/modelos-mobile/obras-home.webp',
  '/imagens/modelos-mobile/clinica-contato.webp',
  '/imagens/modelos-mobile/clinica-agendamento.webp',
  '/imagens/modelos-mobile/clinica-doutores.webp',
  '/imagens/modelos-mobile/clinica-especialidades.webp',
  '/imagens/modelos-mobile/clinica-home.webp',
  '/imagens/modelos-mobile/cardapio-reserva2.webp',
  '/imagens/modelos-mobile/cardapio-reserva.webp',
  '/imagens/modelos-mobile/cardapio-galeria.webp',
  '/imagens/modelos-mobile/cardapio.webp',
  '/imagens/modelos-mobile/cardapio-home.webp',
  '/imagens/modelos-mobile/app-feedback.webp',
  '/imagens/modelos-mobile/app-organize.webp',
  '/imagens/modelos-mobile/app-dashboard.webp',
  '/imagens/modelos-mobile/app.webp',
  '/imagens/modelos-mobile/app-home.webp',
  '/imagens/modelos-mobile/boutique-lookbook.webp',
  '/imagens/modelos-mobile/boutique.webp',
  '/imagens/modelos-mobile/boutique-colecao.webp',
  '/imagens/modelos-mobile/boutique-home.webp',
  '/imagens/modelos-mobile/startup-contato.webp',
  '/imagens/modelos-mobile/startup-jornada.webp',
  '/imagens/modelos-mobile/startup-equipe.webp',
  '/imagens/modelos-mobile/startup-proposta.webp',
  '/imagens/modelos-mobile/startup-home.webp',
  '/imagens/modelos-mobile/ecom-instagram.webp',
  '/imagens/modelos-mobile/ecom-feedback.webp',
  '/imagens/modelos-mobile/ecom.webp',
  '/imagens/modelos-mobile/ecom-promocao.webp',
  '/imagens/modelos-mobile/ecom-vendidos.webp',
  '/imagens/modelos-mobile/ecom-novidades.webp',
  '/imagens/modelos-mobile/ecom-categorias.webp',
  '/imagens/modelos-mobile/ecom-home.webp',
  '/imagens/modelos-mobile/plataforma-contato.webp',
  '/imagens/modelos-mobile/plataforma-blog.webp',
  '/imagens/modelos-mobile/plataforma-servicos.webp',
  '/imagens/modelos-mobile/plataforma-equipe.webp',
  '/imagens/modelos-mobile/plataforma-historia.webp',
  '/imagens/modelos-mobile/plataforma-home.webp',
  '/imagens/modelos-mobile/imovel-contato.webp',
  '/imagens/modelos-mobile/imovel-localizacao.webp',
  '/imagens/modelos-mobile/imovel-equipe.webp',
  '/imagens/modelos-mobile/imovel-destaque.webp',
  '/imagens/modelos-mobile/imovel-home.webp',
  '/imagens/modelos-mobile/vitrine-contato.webp',
  '/imagens/modelos-mobile/vitrine-blog.webp',
  '/imagens/modelos-mobile/vitrine-galeria.webp',
  '/imagens/modelos-mobile/vitrine-sobre.webp',
  '/imagens/modelos-mobile/vitrine-home.webp',
  '/imagens/modelos-mobile/tiket-ingresso.webp',
  '/imagens/modelos-mobile/tiket-localizacao.webp',
  '/imagens/modelos-mobile/tiket-convidados.webp',
  '/imagens/modelos-mobile/tiket-programacao.webp',
  '/imagens/modelos-mobile/tiket.webp',
  '/imagens/modelos-mobile/tiket-home.webp',
  '/imagens/modelos-mobile/empresarial-contato.webp',
  '/imagens/modelos-mobile/empresarial-blog.webp',
  '/imagens/modelos-mobile/empresarial-feedback.webp',
  '/imagens/modelos-mobile/empresarial-servicos.webp',
  '/imagens/modelos-mobile/empresarial-home.webp',

  // Recursos Externos Essenciais
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];


// Função auxiliar para limitar o tamanho de um cache
const limitCacheSize = (cacheName, size) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                // Deleta o item mais antigo
                cache.delete(keys[0]).then(() => limitCacheSize(cacheName, size));
            }
        });
    });
};

// --- EVENT LISTENERS ---

// 1. Instalação (install)
self.addEventListener('install', event => {
    console.log('[Service Worker] Instalando...');
    self.skipWaiting(); // Força a ativação imediata do novo SW

    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Cache estático aberto.');
                // Cacheia os assets principais do App Shell. A falha aqui é crítica.
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => {
                // Tenta cachear todos os outros assets de forma não-crítica.
                return caches.open(STATIC_CACHE_NAME).then(cache => {
                    console.log('[Service Worker] Pré-cacheando URLs opcionais...');
                    return Promise.all(
                        URLS_TO_PRECACHE.map(url => {
                            return cache.add(url).catch(error => {
                                console.warn(`[Service Worker] Falha ao cachear ${url}:`, error);
                            });
                        })
                    );
                });
            })
            .catch(error => {
                console.error('[Service Worker] Falha na instalação:', error);
            })
    );
});

// 2. Ativação (activate)
self.addEventListener('activate', event => {
    console.log('[Service Worker] Ativando...');
    const currentCaches = [STATIC_CACHE_NAME, IMAGE_CACHE_NAME, FONT_CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!currentCaches.includes(cacheName)) {
                        console.log('[Service Worker] Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Torna o SW o controlador da página imediatamente
    );
});

// 3. Interceptação de Requisições (fetch)
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignora requisições não-GET e de extensões do Chrome
    if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
        return;
    }

    // Estratégia para fontes externas (Google Fonts, FontAwesome)
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com' || url.hostname === 'cdnjs.cloudflare.com') {
        event.respondWith(
            caches.open(FONT_CACHE_NAME).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    // Stale-While-Revalidate
                    const fetchPromise = fetch(request).then(networkResponse => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // Estratégia para imagens (Cache First, sem fallback)
    if (request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    // Se estiver no cache, retorna
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Se não, busca na rede
                    return fetch(request).then(networkResponse => {
                        // Clona a resposta para colocar no cache
                        const responseToCache = networkResponse.clone();
                        cache.put(request, responseToCache);
                        // Limita o tamanho do cache de imagens
                        limitCacheSize(IMAGE_CACHE_NAME, MAX_IMAGE_CACHE_ENTRIES);
                        return networkResponse;
                    }).catch(() => {
                        // Se a rede falhar, retorna um erro. O navegador mostrará a imagem quebrada.
                        return new Response('', { status: 404, statusText: 'Not Found' });
                    });
                });
            })
        );
        return;
    }

    // Estratégia para CSS e JS (Cache First)
    if (request.destination === 'style' || request.destination === 'script') {
        event.respondWith(
            caches.open(STATIC_CACHE_NAME).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    return cachedResponse || fetch(request).then(networkResponse => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // Estratégia para HTML (Network First com fallback)
    if (request.destination === 'document') {
        event.respondWith(
            fetch(request)
                .then(networkResponse => {
                    // Se a rede funcionar, clona para o cache e retorna a resposta
                    const responseToCache = networkResponse.clone();
                    caches.open(STATIC_CACHE_NAME).then(cache => {
                        cache.put(request, responseToCache);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    // Se a rede falhar, tenta pegar do cache
                    return caches.match(request).then(cachedResponse => {
                        // Se não estiver no cache, mostra a página offline
                        return cachedResponse || caches.match('/offline.html');
                    });
                })
        );
        return;
    }
});

