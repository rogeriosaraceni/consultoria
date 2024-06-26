//Regra das estapas ativadas na localStorage
window.addEventListener('load', () => {
    const etapas = [
        { key: "etapa_swot",         tabSelector: '[data-tab="pageSwot"]',               contentSelector: '[data-content="pageSwot"]' },
        { key: "etapa_equipe",       tabSelector: '[data-tab="pageEquipe"]',             contentSelector: '[data-content="pageEquipe"]' },
        { key: "etapa_treinamentos", tabSelector: '[data-tab="pageTreinamentos"]',       contentSelector: '[data-content="pageTreinamentos"]' },
        { key: "etapa_wiz",          tabSelector: '[data-tab="pageWiz"]',                contentSelector: '[data-content="pageWiz"]' },
        { key: "etapa_funil",        tabSelector: '[data-tab="pageFunil"]',              contentSelector: '[data-content="pageFunil"]' },
        { key: "etapa_passos",       tabSelector: '[data-tab="pagePassos"]',             contentSelector: '[data-content="pagePassos"]' },
        { key: "etapa_analise",      tabSelector: '[data-tab="pageAnalise"]',            contentSelector: '[data-content="pageAnalise"]' },
        { key: "etapa_parcerias",    tabSelector: '[data-tab="pageParcerias"]',          contentSelector: '[data-content="pageParcerias"]' },
        { key: "etapa_calendario",   tabSelector: '[data-tab="pageCalendarioAcoes"]',    contentSelector: '[data-content="pageCalendarioAcoes"]' },
        { key: "etapa_metas",        tabSelector: '[data-tab="pageMetas"]',              contentSelector: '[data-content="pageMetas"]' },
        { key: "etapa_redes",        tabSelector: '[data-tab="pageRedesSocial"]',        contentSelector: '[data-content="pageRedesSocial"]' },
        { key: "etapa_gestao",       tabSelector: '[data-tab="pageGestaoVista"]',        contentSelector: '[data-content="pageGestaoVista"]' },
        { key: "etapa_acoes",        tabSelector: '[data-tab="pageControleAcao"]',       contentSelector: '[data-content="pageControleAcao"]' },
        { key: "etapa_plano",        tabSelector: '[data-tab="pagePlanoAcaoComercial"]', contentSelector: '[data-content="pagePlanoAcaoComercial"]' },
    ];

    etapas.forEach(etapa => {
        const tabPage = document.querySelector(etapa.tabSelector);
        const contentPage = document.querySelector(etapa.contentSelector);

        if(tabPage && contentPage){
            if (localStorage.getItem(etapa.key) === "true") {
                tabPage.style.display = "block";
            }
            else {
                tabPage.style.display = "none";
                contentPage.classList.remove('active', 'loaded', 'show');
            }
        }
        else {
            console.error(`Element not found for selectors: ${etapa.tabSelector} or ${etapa.contentSelector}`);
        }
    });
})
