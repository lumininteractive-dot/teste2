 function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const banner = document.getElementById('cookie-banner-container');
            if(banner) {
                banner.classList.toggle('dark-mode');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // --- Seletores de Elementos ---
            const banner = document.getElementById('cookie-banner-container');
            const acknowledgeBtn = document.getElementById('cookie-acknowledge-btn');

            const CONSENT_KEY = 'user_cookie_consent_v1';

            // --- Funções de Gerenciamento de Consentimento ---
            const getConsent = () => {
                const consent = localStorage.getItem(CONSENT_KEY);
                return consent ? JSON.parse(consent) : null;
            };

            const saveConsent = (consent) => {
                localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
            };

            // --- Funções de Interação com o Banner ---
            const showBanner = () => {
                if (!banner) return;
                if (document.body.classList.contains('dark-mode')) {
                    banner.classList.add('dark-mode');
                }
                banner.hidden = false;
                setTimeout(() => banner.classList.add('is-visible'), 20);
            };

            const hideBanner = () => {
                if (!banner) return;
                banner.classList.remove('is-visible');
                setTimeout(() => {
                    banner.hidden = true;
                }, 500);
            };

            const dispatchConsentUpdate = (consent) => {
                const event = new CustomEvent('consent-updated', { detail: consent });
                window.dispatchEvent(event);
            };

            // --- Lógica de Ação do Botão ---
            const handleAcknowledge = () => {
                // Ao clicar em "Entendi", o consentimento para analytics é concedido
                const consent = {
                    analytics: true,
                    timestamp: new Date().toISOString()
                };
                saveConsent(consent);
                hideBanner();
                dispatchConsentUpdate(consent);
            };

            // --- Inicialização ---
            const initialize = () => {
                if (!banner || !acknowledgeBtn) {
                    return;
                }
                
                if (getConsent() === null) {
                    setTimeout(showBanner, 1500);
                }

                acknowledgeBtn.addEventListener('click', handleAcknowledge);

                 const initialConsent = getConsent();
                 if (initialConsent) {
                     dispatchConsentUpdate(initialConsent);
                 }
            };

            window.hasCookieConsent = (type) => {
                const consent = getConsent();
                if (!consent) {
                    return false;
                }
                return consent[type] === true;
            };

            initialize();
        });