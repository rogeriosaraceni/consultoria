/** -------------------------------------------------------------------
 * Tabs
--------------------------------------------------------------------- */
$('a[data-bs-toggle="tab"]').on('click', function (e) {
    e.preventDefault()

    const url = $(this).attr("href")
    const target = $(this).data("bs-target")

    clearPopovers()

    // Verifica se a aba já foi carregada
    if (!$(target).hasClass('loaded')) {
        $(target).load(url, function () {
            // Marca a aba como carregada
            $(target).addClass('loaded')
            $(this).tab('show')

            //--Inicializa functions quando a tab carrega no mode click
            $('.selectpicker').selectpicker()
            initTooltips()
            popovers = initPopovers();
            initFancybox()
            initDeleteRow()
            formsSubmitSpinnerToasts()
            imaskInputs()
            somenteNumero(e)
        });
    }
    else {
        // Mostra a aba se já estiver carregada
        $(this).tab('show')
    }

    //https://datatables.net/examples/api/tabs_and_scrolling.html
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust()

    //https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/
    //am4core.options.autoDispose = true
});

$('a[data-bs-toggle="tab"]').on('show.bs.tab', function () {
    //--Inicializa functions quando a tab vem ativada por default no mode show
    //$('.selectpicker').selectpicker()
    //initTooltips()
    //formsSubmitSpinnerToasts()
})

// Carrega e mostra a aba inicial
// const initialTagert = "#pageSwot" //só alterar aqui
// const initialTab    = $(`[data-bs-target="${initialTagert}"]`)
// const initialUrl    = initialTab.attr("href");

// $(initialTagert).load(initialUrl, function() {
//     $(initialTagert).addClass('loaded')
//     initialTab.tab('show')
// })
