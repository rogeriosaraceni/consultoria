const tableBodyParceria = $('#tableCloneParceria tbody')
let rowIndexParceria = 1

// Adicionar uma nova linha
function addRowParceria() {
    const firstRow = tableBodyParceria.find('tr:first')
    const newRow = firstRow.clone()

    newRow.find('input').each(function() {
        $(this).val('')
        const field = $(this);
        const name = field.attr("name")
        const id = field.attr("id")

        if (name) {
            const newName = name.replace(/_\d+$/, `_${rowIndexParceria}`)
            field.attr("name", newName)
        }
        if (id) {
            const newId = id.replace(/_\d+$/, `_${rowIndexParceria}`)
            field.attr("id", newId)
        }
    })

    tableBodyParceria.append(newRow)
    rowIndexParceria++
    updateButtonsVisibilityParceria()

    // Reativar plugins
    $('[data-bs-toggle="tooltip"]').tooltip()
    //$('.selectpicker').selectpicker()
    $('.jQueryMask-money').mask('#.##0,00', { reverse: true })

    var SPMaskBehavior = function(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options)
        }
    }
    $('.jQueryMask-br_celphones').mask(SPMaskBehavior, spOptions)
}

// Adicionar linha ao pressionar a tecla de seta para baixo
$(document).keydown(function(e) {
    if (e.key === 'ArrowDown') {
        addRowParceria()
        tableBodyParceria.find('tr:last input:first').focus()
    }
})

// Adicionar evento aos botões "Adicionar" e "Deletar"
tableBodyParceria.on('click', '[data-tb-btn]', function(e) {
    if ($(this).data('tb-btn') === 'add') {
        addRowParceria();
    }
    else if ($(this).data('tb-btn') === 'del') {
        const row = $(this).closest('tr');
        //destroy plugins
        row.find('[data-bs-toggle="tooltip"]').tooltip('dispose');
        row.remove()
        updateButtonsVisibilityParceria()
    }
})

// Atualizar a visibilidade dos botões "Adicionar" e "Deletar"
function updateButtonsVisibilityParceria() {
    const rows = tableBodyParceria.find('tr');
    const btnsDeleteRow = $('[data-tb-btn="del"]')

    rows.each(function(index) {
        const addButton = $(this).find('[data-tb-btn="add"]')
        if (addButton) {
            addButton.css('display', (index === rows.length - 1) ? 'inline-block' : 'none')
        }
    })
    btnsDeleteRow.each(function(index) {
        $(this).css('visibility', (index === 0) ? 'hidden' : 'visible')
    })
}
updateButtonsVisibilityParceria()
