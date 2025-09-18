/**
 * auth.js
 * Lógica de Autenticação e UI para a página de login/cadastro.
 * O AuthService foi refatorado para se comunicar com um backend real via API REST.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // 1. CAMADA DE SERVIÇO (Lógica de Backend) - REFATORADO
    // ===================================================================
    const AuthService = {
        // Defina a URL base da sua API aqui
        API_BASE_URL: 'https://api.sua-aplicacao.com/auth', // <-- MUDA PARA API REAL, BRENO

        /**
         * Lida com a resposta da API, tratando sucessos e erros.
         * @param {Response} response - O objeto de resposta do fetch.
         * @returns {Promise<any>} - O corpo da resposta em JSON.
         * @throws {Error} - Lança um erro com uma mensagem amigável para a UI.
         */
        _handleResponse: async (response) => {
            if (response.ok) {
                return response.json();
            }

            // Tenta extrair uma mensagem de erro do corpo da resposta
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Ocorreu um erro inesperado.';

            switch (response.status) {
                case 400: // Bad Request
                    throw new Error(`Erro na requisição: ${errorMessage}`);
                case 401: // Unauthorized
                    throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
                case 409: // Conflict (ex: email já existe)
                     throw new Error(errorMessage);
                default:
                    throw new Error(errorMessage);
            }
        },

        /**
         * Autentica um usuário.
         * @param {string} email - O email do usuário.
         * @param {string} password - A senha do usuário.
         * @returns {Promise<Object>} - Os dados do usuário autenticado.
         */
        login: async (email, password) => {
            console.log('AuthService: Tentando login com API', { email });
            const response = await fetch(`${AuthService.API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const { token, user } = await AuthService._handleResponse(response);

            // Salva o token e os dados do usuário no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));

            return user;
        },

        /**
         * Cadastra um novo usuário.
         * @param {string} name - O nome do usuário.
         * @param {string} email - O email do usuário.
         * @param {string} password - A senha do usuário.
         * @returns {Promise<Object>} - Os dados do novo usuário.
         */
        signup: async (name, email, password) => {
            console.log('AuthService: Tentando cadastro com API', { name, email });
            const response = await fetch(`${AuthService.API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const { token, user } = await AuthService._handleResponse(response);

             // Salva o token e os dados do usuário no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));

            return user;
        },

        /**
         * Verifica se há um usuário logado validando o token com o backend.
         * @returns {Promise<Object|null>} - Os dados do usuário se o token for válido, caso contrário null.
         */
        checkLoggedInUser: async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return null;
            }

            try {
                console.log('AuthService: Validando token com a API.');
                const response = await fetch(`${AuthService.API_BASE_URL}/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const user = await AuthService._handleResponse(response);
                
                // Atualiza os dados do usuário no localStorage para manter sincronizado
                localStorage.setItem('userData', JSON.stringify(user));
                return user;

            } catch (error) {
                console.error('AuthService: Erro ao validar token.', error.message);
                // Limpa o localStorage se o token for inválido ou expirado
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                return null;
            }
        }
    };

    // ===================================================================
    // 2. CAMADA DE UI (Lógica de Interface)
    // ===================================================================
    const AuthUI = {
        elements: {
            container: document.getElementById('container'),
            signUpButton: document.getElementById('signUpButton'),
            signInButton: document.getElementById('signInButton'),
            signInForm: document.getElementById('signInForm'),
            signUpForm: document.getElementById('signUpForm'),
            signInMessage: document.getElementById('signInMessage'),
            signUpMessage: document.getElementById('signUpMessage'),
            togglePasswordButtons: document.querySelectorAll('.toggle-password'),
        },
        init() {
            this.elements.signUpButton?.addEventListener('click', () => {
                this.elements.container.classList.add("right-panel-active");
                this.clearMessages();
            });
            this.elements.signInButton?.addEventListener('click', () => {
                this.elements.container.classList.remove("right-panel-active");
                this.clearMessages();
            });
            this.elements.togglePasswordButtons.forEach(button => {
                button.addEventListener('click', () => this.togglePasswordVisibility(button));
            });
            this.elements.signInForm?.addEventListener('submit', (e) => AppController.handleLogin(e));
            this.elements.signUpForm?.addEventListener('submit', (e) => AppController.handleSignUp(e));
        },
        togglePasswordVisibility(button) {
            const input = button.previousElementSibling;
            const icon = button.querySelector('i');
            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = "password";
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        },
        showMessage(formType, message, isError = true) {
            const messageEl = this.elements[`${formType}Message`];
            if(messageEl) {
                messageEl.textContent = message;
                messageEl.style.color = isError ? 'rgb(239 68 68)' : 'rgb(34 197 94)';
            }
        },
        clearMessages() {
            if (this.elements.signInMessage) this.elements.signInMessage.textContent = '';
            if (this.elements.signUpMessage) this.elements.signUpMessage.textContent = '';
        },
        getSignInData() {
            const email = this.elements.signInForm.querySelector('#signInEmail').value;
            const password = this.elements.signInForm.querySelector('#signInPassword').value;
            return { email, password };
        },
        getSignUpData() {
            const name = this.elements.signUpForm.querySelector('#signUpName').value;
            const email = this.elements.signUpForm.querySelector('#signUpEmail').value;
            const password = this.elements.signUpForm.querySelector('#signUpPassword').value;
            const terms = this.elements.signUpForm.querySelector('#termsCheckbox').checked;
            return { name, email, password, terms };
        },
        setLoading(formType, isLoading) {
            const button = this.elements[`${formType}Form`].querySelector('button[type="submit"]');
            if (isLoading) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            } else {
                button.disabled = false;
                button.innerHTML = formType === 'signIn' ? 'Entrar' : 'Cadastrar';
            }
        }
    };

    // ===================================================================
    // 3. CONTROLE DO MODAL (NOVO)
    // ===================================================================
    const ServiceModalController = {
        elements: {
            overlay: document.getElementById('service-modal-overlay'),
            openTrigger: document.getElementById('openTermsModal'),
            closeTrigger: document.getElementById('service-modal-close-btn'),
        },
        init() {
            if (!this.elements.overlay) return; // Não faz nada se o modal não existir
            
            this.elements.openTrigger?.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
            this.elements.closeTrigger?.addEventListener('click', () => this.close());
            this.elements.overlay.addEventListener('click', (e) => {
                if (e.target === this.elements.overlay) this.close();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.elements.overlay.classList.contains('active')) {
                    this.close();
                }
            });
        },
        open() {
            this.elements.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        close() {
            this.elements.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ===================================================================
    // 4. CONTROLLER PRINCIPAL (Orquestrador)
    // ===================================================================
    const AppController = {
        init: async () => {
            // A verificação agora é assíncrona
            const user = await AuthService.checkLoggedInUser();
            if (user) {
                console.log(`Usuário ${user.fullName} já logado. Redirecionando...`);
                window.location.href = 'index.html';
                return; // Impede a inicialização da UI de login
            }
            
            // Se não houver usuário logado, inicializa a página de autenticação
            AuthUI.init();
            ServiceModalController.init();
            console.log('AppController: Aplicação iniciada na página de autenticação.');
        },
        handleLogin: async (event) => {
            event.preventDefault();
            AuthUI.clearMessages();
            const { email, password } = AuthUI.getSignInData();
            if (!email || !password) {
                AuthUI.showMessage('signIn', 'Por favor, preencha e-mail e senha.');
                return;
            }
            AuthUI.setLoading('signIn', true);
            try {
                const user = await AuthService.login(email, password);
                AuthUI.showMessage('signIn', `Bem-vindo, ${user.fullName}! Redirecionando...`, false);
                setTimeout(() => window.location.href = 'index.html', 1500);
            } catch (error) {
                AuthUI.showMessage('signIn', error.message);
            } finally {
                AuthUI.setLoading('signIn', false);
            }
        },
        handleSignUp: async (event) => {
            event.preventDefault();
            AuthUI.clearMessages();
            const { name, email, password, terms } = AuthUI.getSignUpData();
            if (!name || !email || !password) {
                AuthUI.showMessage('signUp', 'Todos os campos são obrigatórios.');
                return;
            }
            if (!terms) {
                AuthUI.showMessage('signUp', 'Você precisa aceitar os Termos de Serviço.');
                return;
            }
            AuthUI.setLoading('signUp', true);
            try {
                const newUser = await AuthService.signup(name, email, password);
                AuthUI.showMessage('signUp', 'Cadastro realizado com sucesso! Redirecionando...', false);
                setTimeout(() => window.location.href = 'index.html', 1500);
            } catch (error) {
                AuthUI.showMessage('signUp', error.message);
            } finally {
                AuthUI.setLoading('signUp', false);
            }
        }
    };

    // Inicia a aplicação
    AppController.init();
});
