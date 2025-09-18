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
  '/imagens/assinaturaimagem-removebg-preview - Copia.png',
  '/imagens/assinaturaimagem-removebg-preview.png',
  '/imagens/blogviagem.jpg',
  '/imagens/Captura de tela 2025-03-28 232755.png',
  '/imagens/ChatGPT Image 18 de jul. de 2025, 21_07_36.png',
  '/imagens/Colaboração Futurista com Interfaces Holográficas.png',
  '/imagens/contact (2).png',
  '/imagens/contact.png',
  '/imagens/imagehome.png',
  '/imagens/logobrancalumin.png',
  '/imagens/logolumiin.png',
  '/imagens/serv.png',
  '/imagens/serviçoimagesemfundo.png',
  '/imagens/sobreimagem.png',
  '/imagens/teste8.png',

  // Imagens de modelos (Desktop)
  '/imagens/modelos/imagem-index.png',
  '/imagens/modelos/free-contato.png',
  '/imagens/modelos/free-feedback.png',
  '/imagens/modelos/free-portfolio.png',
  '/imagens/modelos/free-especialidades.png',
  '/imagens/modelos/free-home.png',
  '/imagens/modelos/boutique-sacola.png',
  '/imagens/modelos/boutique-lookbook.png',
  '/imagens/modelos/boutique-colecao.png',
  '/imagens/modelos/ecom-feedback.png',
  '/imagens/modelos/ecom.png',
  '/imagens/modelos/ecom-promocao.png',
  '/imagens/modelos/ecom-vendidos.png',
  '/imagens/modelos/ecom-novidades.png',
  '/imagens/modelos/ecom-categorias.png',
  '/imagens/modelos/ecom-home.png',
  '/imagens/modelos/imovel-contato.png',
  '/imagens/modelos/imovel-localizacao.png',
  '/imagens/modelos/imovel-equipe.png',
  '/imagens/modelos/imovel.png',
  '/imagens/modelos/vitrine-contato.png',
  '/imagens/modelos/vitrine-blog.png',
  '/imagens/modelos/vitrine-galeria.png',
  '/imagens/modelos/vitrine-sobre.png',
  '/imagens/modelos/tiket-ingresso.png',
  '/imagens/modelos/tiket-localizacao.png',
  '/imagens/modelos/tiket-convidados.png',
  '/imagens/modelos/tiket-programacao.png',
  '/imagens/modelos/tiket.png',
  '/imagens/modelos/tiket-home.png',
  '/imagens/modelos/cardapio-reserva.png',
  '/imagens/modelos/cardapio-galeria.png',
  '/imagens/modelos/cardapio.png',
  '/imagens/modelos/cardapio-home.png',
  '/imagens/modelos/mmo-loja.png',
  '/imagens/modelos/mmo-requisitos.png',
  '/imagens/modelos/mmo-blog.png',
  '/imagens/modelos/mmo-galeria.png',
  '/imagens/modelos/mmo-personagens.png',
  '/imagens/modelos/mmo-faccoes.png',
  '/imagens/modelos/mmo-mundo.png',
  '/imagens/modelos/mmo-mecanicas.png',
  '/imagens/modelos/mmo-classes.png',
  '/imagens/modelos/mmo-legado.png',
  '/imagens/modelos/mmo-home.png',
  '/imagens/modelos/mecanico-agendamento.png',
  '/imagens/modelos/mecanico-avaliacao.png',
  '/imagens/modelos/mecanico-servicos.png',
  '/imagens/modelos/mecanico-home.png',
  '/imagens/modelos/obras-home.png',
  '/imagens/modelos/obras-orcamento.png',
  '/imagens/modelos/obras-projetos.png',
  '/imagens/modelos/obras-servicos.png',
  '/imagens/modelos/imovel-home.png',
  '/imagens/modelos/clinica-localizacao.png',
  '/imagens/modelos/clinica-agendamento.png',
  '/imagens/modelos/clinica-especialidades.png',
  '/imagens/modelos/clinica-home.png',
  '/imagens/modelos/app-home.png',
  '/imagens/modelos/app-ctafinal.png',
  '/imagens/modelos/app-task.png',
  '/imagens/modelos/app-vantagens.png',
  '/imagens/modelos/boutique-home.png',
  '/imagens/modelos/startup-contato.png',
  '/imagens/modelos/startup-jornada.png',
  '/imagens/modelos/startup-equipe.png',
  '/imagens/modelos/startup-proposta.png',
  '/imagens/modelos/startup-home.png',
  '/imagens/modelos/vitrine-home.png',
  '/imagens/modelos/plataforma-contato.png',
  '/imagens/modelos/plataforma-blog.png',
  '/imagens/modelos/plataforma-servicos.png',
  '/imagens/modelos/plataforma-sobre.png',
  '/imagens/modelos/plataforma-home.png',
  '/imagens/modelos/empresarial-contato.png',
  '/imagens/modelos/empresarial-blog.png',
  '/imagens/modelos/empresarial-feedback.png',
  '/imagens/modelos/empresarial-servicos.png',
  '/imagens/modelos/empresarial-sobre.png',
  '/imagens/modelos/empresarial-home.png',

  // Imagens de modelos (Mobile)
  '/imagens/modelos-mobile/free-contato.png',
  '/imagens/modelos-mobile/free-feedback.png',
  '/imagens/modelos-mobile/free-portfolio.png',
  '/imagens/modelos-mobile/free-especialidades.png',
  '/imagens/modelos-mobile/free-home.png',
  '/imagens/modelos-mobile/mmo-noticias.png',
  '/imagens/modelos-mobile/mmo-galeria.png',
  '/imagens/modelos-mobile/mmo-personagens.png',
  '/imagens/modelos-mobile/mmo-faccoes.png',
  '/imagens/modelos-mobile/mmo-mundo.png',
  '/imagens/modelos-mobile/mmo-mecanicas.png',
  '/imagens/modelos-mobile/mmo-classes.png',
  '/imagens/modelos-mobile/mmo-legado.png',
  '/imagens/modelos-mobile/mmo-home.png',
  '/imagens/modelos-mobile/obras-orcamento.png',
  '/imagens/modelos-mobile/obras-projetos.png',
  '/imagens/modelos-mobile/obras-servicos.png',
  '/imagens/modelos-mobile/obras-home.png',
  '/imagens/modelos-mobile/clinica-contato.png',
  '/imagens/modelos-mobile/clinica-agendamento.png',
  '/imagens/modelos-mobile/clinica-doutores.png',
  '/imagens/modelos-mobile/clinica-especialidades.png',
  '/imagens/modelos-mobile/clinica-home.png',
  '/imagens/modelos-mobile/cardapio-reserva2.png',
  '/imagens/modelos-mobile/cardapio-reserva.png',
  '/imagens/modelos-mobile/cardapio-galeria.png',
  '/imagens/modelos-mobile/cardapio.png',
  '/imagens/modelos-mobile/cardapio-home.png',
  '/imagens/modelos-mobile/app-feedback.png',
  '/imagens/modelos-mobile/app-organize.png',
  '/imagens/modelos-mobile/app-dashboard.png',
  '/imagens/modelos-mobile/app.png',
  '/imagens/modelos-mobile/app-home.png',
  '/imagens/modelos-mobile/boutique-lookbook.png',
  '/imagens/modelos-mobile/boutique.png',
  '/imagens/modelos-mobile/boutique-colecao.png',
  '/imagens/modelos-mobile/boutique-home.png',
  '/imagens/modelos-mobile/startup-contato.png',
  '/imagens/modelos-mobile/startup-jornada.png',
  '/imagens/modelos-mobile/startup-equipe.png',
  '/imagens/modelos-mobile/startup-proposta.png',
  '/imagens/modelos-mobile/startup-home.png',
  '/imagens/modelos-mobile/ecom-instagram.png',
  '/imagens/modelos-mobile/ecom-feedback.png',
  '/imagens/modelos-mobile/ecom.png',
  '/imagens/modelos-mobile/ecom-promocao.png',
  '/imagens/modelos-mobile/ecom-vendidos.png',
  '/imagens/modelos-mobile/ecom-novidades.png',
  '/imagens/modelos-mobile/ecom-categorias.png',
  '/imagens/modelos-mobile/ecom-home.png',
  '/imagens/modelos-mobile/plataforma-contato.png',
  '/imagens/modelos-mobile/plataforma-blog.png',
  '/imagens/modelos-mobile/plataforma-servicos.png',
  '/imagens/modelos-mobile/plataforma-equipe.png',
  '/imagens/modelos-mobile/plataforma-historia.png',
  '/imagens/modelos-mobile/plataforma-home.png',
  '/imagens/modelos-mobile/imovel-contato.png',
  '/imagens/modelos-mobile/imovel-localizacao.png',
  '/imagens/modelos-mobile/imovel-equipe.png',
  '/imagens/modelos-mobile/imovel-destaque.png',
  '/imagens/modelos-mobile/imovel-home.png',
  '/imagens/modelos-mobile/vitrine-contato.png',
  '/imagens/modelos-mobile/vitrine-blog.png',
  '/imagens/modelos-mobile/vitrine-galeria.png',
  '/imagens/modelos-mobile/vitrine-sobre.png',
  '/imagens/modelos-mobile/vitrine-home.png',
  '/imagens/modelos-mobile/tiket-ingresso.png',
  '/imagens/modelos-mobile/tiket-localizacao.png',
  '/imagens/modelos-mobile/tiket-convidados.png',
  '/imagens/modelos-mobile/tiket-programacao.png',
  '/imagens/modelos-mobile/tiket.png',
  '/imagens/modelos-mobile/tiket-home.png',
  '/imagens/modelos-mobile/empresarial-contato.png',
  '/imagens/modelos-mobile/empresarial-blog.png',
  '/imagens/modelos-mobile/empresarial-feedback.png',
  '/imagens/modelos-mobile/empresarial-servicos.png',
  '/imagens/modelos-mobile/empresarial-home.png',

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

