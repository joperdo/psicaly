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
