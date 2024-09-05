function initAllFunctions() {
    $(".selectpicker").selectpicker();
    initTooltips();
    popovers = initPopovers();
    initFancybox();
    initDeleteRow();
    formsSubmitSpinnerToasts();
    imaskInputs();
    //somenteNumero(e)
}

/** -------------------------------------------------------------------
 * Tabs
--------------------------------------------------------------------- */
$('a[data-bs-toggle="tab"]').on("click", function (e) {
    e.preventDefault();

    const url = $(this).attr("href");
    const target = $(this).data("bs-target");

    //Armazena a tab ativa no localStorage
    localStorage.setItem("tabPaneTargetCurrent", target);

    closePopovers();
    popovers = initPopovers();

    //Verifica se a aba já foi carregada
    if (!$(target).hasClass("loaded")) {
        $(target).load(url, function () {
            // Marca a aba como carregada
            $(target).addClass("loaded");
            $(this).tab("show");

            //--Inicializa functions quando a tab carrega no mode click
            initAllFunctions();
        });
    } else {
        // Mostra a aba se já estiver carregada
        $(this).tab("show");
    }

    //https://datatables.net/examples/api/tabs_and_scrolling.html
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();

    //https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/
    //am4core.options.autoDispose = true
});

//--Inicializa functions quando a tab vem ativada por default no mode show
$('a[data-bs-toggle="tab"]').on("show.bs.tab", function () {
});


function loadActiveTabRefresh() {
    //Carregar a tab-pane atual do localStorage
    const tabPaneTargetCurrent = localStorage.getItem("tabPaneTargetCurrent")
    console.log('tabPaneTargetCurrent:', tabPaneTargetCurrent)

    if (tabPaneTargetCurrent) {
        //Pega a aba atual conforme tabPaneTargetCurrent
        const tabCurrent = $(`[data-bs-target="${tabPaneTargetCurrent}"]`)
        console.log('tabCurrent:', tabCurrent)

        if (tabCurrent.length) {
            //url que tem que ser carregado no load
            const urlCurrent = tabCurrent.attr("href")
            console.log('urlCurrent:', urlCurrent)

            $(tabPaneTargetCurrent).load(urlCurrent, function (resp, status, xhr) {
                if (status === "error") {
                    console.error('Erro ao carregar a aba:', xhr.status, xhr.statusText)
                } else {
                    $(tabPaneTargetCurrent).addClass('loaded')
                    tabCurrent.tab('show');
                    initAllFunctions();
                }
            })
        } else {
            console.error('A aba não foi encontrada:', tabPaneTargetCurrent);
        }
    }
}

window.addEventListener('load', loadActiveTabRefresh)

