document.addEventListener("DOMContentLoaded", () => {
    const isIndex = window.location.pathname.includes("index.html") || window.location.pathname === "/";
    const isProfissionais = window.location.pathname.includes("profissionais.html");
    const isInfos = window.location.pathname.includes("infos.html");

    // === FUNCIONALIDADES DA index.html ===
    if (isIndex) {
        // Redireciona para profissionais.html ao focar na search bar
        const searchInput = document.querySelector(".search-bar input");
        if (searchInput) {
            searchInput.addEventListener("focus", () => {
                window.location.href = "profissionais.html";
            });
        }

        // Redireciona para profissionais.html ao clicar no botão "Buscar"
        const buscarBtn = document.getElementById("buscar-psicologos");
        if (buscarBtn) {
            buscarBtn.addEventListener("click", () => {
                window.location.href = "profissionais.html";
            });
        }
    }

    // === FUNCIONALIDADES DA profissionais.html ===
    if (isProfissionais) {
        // Voltar para index.html ao clicar no botão de voltar
        const voltarIcone = document.querySelector("nav .voltar-icone");
        if (voltarIcone) {
            voltarIcone.addEventListener("click", () => {
                window.location.href = "index.html";
            });
        }

        // Filtro de pesquisa dinâmica com base nos nomes dos profissionais
        const searchInput = document.querySelector(".search-bar input");
        const doctorCards = document.querySelectorAll(".card-doctors");

        if (searchInput && doctorCards.length > 0) {
            searchInput.addEventListener("input", () => {
                const termo = searchInput.value.toLowerCase();

                doctorCards.forEach(card => {
                    const nome = card.querySelector(".nome").textContent.toLowerCase();
                    card.style.display = nome.includes(termo) ? "flex" : "none";
                });
            });

            // Se vier de index.html com foco automático
            searchInput.focus();
        }
    }

    // === FUNCIONALIDADES DA infos.html ===
    if (isInfos) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id"); // Ex: 'gabriela', 'pedro', etc.

        // Esconde todas as sections
        const sections = document.querySelectorAll(".section-informacoes");
        sections.forEach(section => section.style.display = "none");

        // Mostra apenas a section correspondente
        if (id) {
            const targetSection = document.getElementById(`${id}-infos`);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        }

        // Voltar para profissionais.html ao clicar no botão de voltar
        const voltarIcone = document.querySelector("nav .voltar-icone");
        if (voltarIcone) {
            voltarIcone.addEventListener("click", () => {
                window.location.href = "profissionais.html";
            });
        }

        // Quando clicar no botão "Agendar encontro", vai para calendario.html
        const btnAgendar = document.querySelector(".btn-agendar");
        if (btnAgendar) {
            btnAgendar.addEventListener("click", () => {
                window.location.href = "calendario.html";
            });
        }
    }

    // === FUNCIONALIDADES DA calendario.html ===
    if (window.location.pathname.includes("calendario.html")) {
        // Voltar para infos.html
        const voltarIcone = document.querySelector("nav .voltar-icone");
        if (voltarIcone) {
            voltarIcone.addEventListener("click", () => {
                window.location.href = "infos.html";
            });
        }

        // Botão "Agendar agora" vai para sucesso.html
        const btnAgendarAgora = document.querySelector(".btn-agendar");
        if (btnAgendarAgora) {
            btnAgendarAgora.addEventListener("click", () => {
                window.location.href = "sucesso.html";
            });
        }

        // Inicializa o flatpickr no seletor de data
        flatpickr("#seletor-data", {
            inline: true,
            locale: "pt",
            minDate: "today"
        });

        // Ativação de classe nos botões de horário
        const botoesHorario = document.querySelectorAll(".horario-btn");
        botoesHorario.forEach(btn => {
            btn.addEventListener("click", () => {
                botoesHorario.forEach(b => b.classList.remove("ativo"));
                btn.classList.add("ativo");
            });
        });
    }

    // === FUNCIONALIDADES DA sucesso.html ===
    if (window.location.pathname.includes("sucesso.html")) {
        const btnVoltarInicio = document.querySelector(".btn-agendar");
        if (btnVoltarInicio) {
            btnVoltarInicio.addEventListener("click", () => {
                window.location.href = "index.html";
            });
        }
    }

    // Adicionando flatpickr para selecionar data (uso geral, fora da página de calendário)
    flatpickr("#seletor-data", {
        inline: true,
        locale: "pt",
        minDate: "today"
    });

    // Adicionando ativação de classe nos botões de horário (uso geral)
    const botoesHorario = document.querySelectorAll(".horario-btn");
    botoesHorario.forEach(btn => {
        btn.addEventListener("click", () => {
            botoesHorario.forEach(b => b.classList.remove("ativo"));
            btn.classList.add("ativo");
        });
    });
});

// === FUNCIONALIDADES DO CHAT (chat.html) ===
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const container = document.getElementById("chat-container");

let primeiraMensagem = true; // controla a primeira resposta da doutora

if (form && input && container) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (texto === "") return;

        adicionarMensagem(texto, "usuario");
        input.value = "";

        setTimeout(() => {
            let resposta;
            if (primeiraMensagem) {
                resposta = "Olá, tudo bem? Sobre o que você quer conversar?";
                primeiraMensagem = false;
            } else {
                const respostasFicticias = [
                    "Entendi, continue me contando.",
                    "E como você se sentiu com isso?",
                    "Vamos conversar mais sobre"
                ];
                resposta = respostasFicticias[Math.floor(Math.random() * respostasFicticias.length)];
            }

            adicionarMensagem(resposta, "doutora");
        }, 1000);
    });

    function adicionarMensagem(texto, autor) {
        const div = document.createElement("div");
        div.classList.add("mensagem");
        div.classList.add(`mensagem-${autor}`);
        div.textContent = texto;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
}

// === FUNCIONALIDADE DA COMUNIDADE (comunidade.html) ===
const comunidadeForm = document.getElementById("comunidade-form");
const comunidadeInput = document.getElementById("comunidade-input");
const comunidadeContainer = document.getElementById("comunidade-container");

if (comunidadeForm && comunidadeInput && comunidadeContainer) {
    comunidadeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = comunidadeInput.value.trim();
        if (texto === "") return;

        adicionarPostagem(texto, "usuario");
        comunidadeInput.value = "";

        setTimeout(() => {
            const respostasDaComunidade = [
                "Poxa, me identifiquei muito com o que você disse.",
                "Fico feliz que você compartilhou isso com a gente!",
                "Estamos aqui para apoiar uns aos outros 💙",
                "Isso é mais comum do que parece, força aí!"
            ];
            const resposta = respostasDaComunidade[Math.floor(Math.random() * respostasDaComunidade.length)];
            adicionarPostagem(resposta, "doutora");
        }, 1000);
    });

    function adicionarPostagem(texto, autor) {
        const div = document.createElement("div");
        div.classList.add("mensagem", `mensagem-${autor}`);
        div.textContent = texto;
        comunidadeContainer.appendChild(div);
        comunidadeContainer.scrollTop = comunidadeContainer.scrollHeight;
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const doutor = params.get("doutor");

  // Só executa essa parte se estivermos na página chat.html
  const navGabriela = document.getElementById("gabriela-chat");
  const navMaria = document.getElementById("maria-chat");
  const navMarcos = document.getElementById("marcos-chat");

  if (navGabriela || navMaria || navMarcos) {
    // Oculta todas as navs do chat
    [navGabriela, navMaria, navMarcos].forEach(nav => {
      if (nav) nav.style.display = "none";
    });

    // Mostra apenas a nav do doutor escolhido
    if (doutor) {
      const navSelecionado = document.getElementById(`${doutor}-chat`);
      if (navSelecionado) navSelecionado.style.display = "flex";
    }
  }

  // Tab inferior: Home e Atendimento
  const tabItems = document.querySelectorAll("tab .tab-item");
  tabItems[0]?.addEventListener("click", () => window.location.href = "index.html");
  tabItems[2]?.addEventListener("click", () => window.location.href = "conversas.html");
});

