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

    // Armazena a tab ativa no localStorage
    localStorage.setItem("tabPaneTargetCurrent", target);

    closePopovers();
    popovers = initPopovers();

    // Verifica se a aba já foi carregada
    if (!$(target).hasClass("loaded")) {
        $(target).load(url, function () {
            // Marca a aba como carregada
            $(target).addClass("loaded");
            // Inicializa a aba usando bootstrap.Tab
            let tabInstance = new bootstrap.Tab(target);
            tabInstance.show();
            initAllFunctions();
        });
    } else {
        // Inicializa a aba usando bootstrap.Tab
        let tabInstance = new bootstrap.Tab(this);
        tabInstance.show();
    }

    // https://datatables.net/examples/api/tabs_and_scrolling.html
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();

    // https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/
    // am4core.options.autoDispose = true
});

function loadActiveTabRefresh() {
    const tabPaneTargetCurrent = localStorage.getItem("tabPaneTargetCurrent");
    const tabCurrent = $(`[data-bs-target="${tabPaneTargetCurrent}"]`);
    const urlCurrent = tabCurrent.attr("href");

    $(tabPaneTargetCurrent).load(urlCurrent, function (resp, status, xhr) {
        if (status === "error") {
            console.error('Erro ao carregar a aba:', xhr.status, xhr.statusText);
        } else {
            $(tabPaneTargetCurrent).addClass('loaded');
            // Inicializa a aba usando bootstrap.Tab
            let tabInstance = new bootstrap.Tab(tabCurrent[0]);
            tabInstance.show();
            initAllFunctions();
        }
    })
}
loadActiveTabRefresh()
