// Configuração do Mercado Pago com SEU ACCESS TOKEN
const mp = new MercadoPago("TEST-eb52bc48-a1d5-4a58-b644-d546bdc3b9b1", {
    locale: "pt-BR",
});

// Variável global para o token de acesso (usado no backend simulado)
const ACCESS_TOKEN = "TEST-8508100998999897-042122-11409e81edce681643a0abb2c649c843-300560869";

// Inicializa o formulário de cartão
mp.cardForm({
    amount: "100.00",
    autoMount: true,
    form: {
        id: "payment-form",
        cardholderName: {
            id: "cardholderName",
            placeholder: "Nome no cartão",
        },
        cardholderEmail: {
            id: "cardholderEmail",
            placeholder: "E-mail",
        },
    },
    callbacks: {
        onFormMounted: (error) => {
            if (error) {
                console.error("Erro ao carregar formulário:", error);
                document.getElementById("paymentResult").textContent = "Erro ao carregar o formulário. Recarregue a página.";
                return;
            }
            console.log("Formulário pronto!");
        },
        onSubmit: async (event) => {
            event.preventDefault();
            const paymentResult = document.getElementById("paymentResult");
            paymentResult.textContent = "Processando assinatura...";
            paymentResult.style.color = "blue";

            try {
                // 1. Cria o token do cartão
                const { token, error } = await mp.createCardToken({
                    cardholderName: document.getElementById("cardholderName").value,
                    cardNumber: document.getElementById("cardNumber").value.replace(/\s/g, ""),
                    expirationDate: document.getElementById("expirationDate").value.replace(/\s/g, ""),
                    securityCode: document.getElementById("securityCode").value,
                });

                if (error) {
                    paymentResult.textContent = `Erro no cartão: ${error.message}`;
                    paymentResult.style.color = "red";
                    return;
                }

                // 2. Simula a criação da assinatura (requisição fictícia)
                paymentResult.textContent = "Criando assinatura...";
                const response = await criarAssinaturaSimulada(token);

                if (response.error) {
                    paymentResult.textContent = `Erro na assinatura: ${response.error}`;
                    paymentResult.style.color = "red";
                } else {
                    paymentResult.textContent = "✅ Assinatura criada com sucesso (Sandbox)!";
                    paymentResult.style.color = "green";
                    console.log("Resposta simulada:", response);
                }
            } catch (error) {
                paymentResult.textContent = `Erro: ${error.message}`;
                paymentResult.style.color = "red";
            }
        },
    },
});

// Função simulada para criar assinatura (substitua por uma chamada real à API)
async function criarAssinaturaSimulada(token) {
    // Dados fictícios do plano (substitua pelos seus)
    const planoDeTeste = {
        preapproval_plan_id: "SEU-ID-DO-PLANO", // Ex: "2c9380847c7b7a37017c7b7a3f7a0001"
        payer_email: document.getElementById("cardholderEmail").value,
        card_token_id: token,
    };

    // Simula uma requisição POST à API de Assinaturas
    console.log("Dados enviados (simulados):", planoDeTeste);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Math.random().toString(36).substring(7),
                status: "authorized",
                plan_id: planoDeTeste.preapproval_plan_id,
            });
        }, 1500);
    });
}