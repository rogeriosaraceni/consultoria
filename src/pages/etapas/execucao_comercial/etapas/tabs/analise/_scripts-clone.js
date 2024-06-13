const tableBody = $('#tableCloneAnalise tbody')
let rowIndex = 1

// Adicionar uma nova linha
function addRow() {
    const firstRow = tableBody.find('tr:first')
    const newRow = firstRow.clone()

    newRow.find('input').each(function() {
        $(this).val('')
        const field = $(this);
        const name = field.attr("name")
        const id = field.attr("id")

        if (name) {
            const newName = name.replace(/_\d+$/, `_${rowIndex}`)
            field.attr("name", newName)
        }
        if (id) {
            const newId = id.replace(/_\d+$/, `_${rowIndex}`)
            field.attr("id", newId)
        }
    })

    tableBody.append(newRow)
    rowIndex++

    // Reativar tooltips
    newRow.find('[data-bs-toggle="tooltip"]').tooltip()
    // Reativar jQueryMask-money
    newRow.find('.jQueryMask-money').mask('#.##0,00', { reverse: true })
    // jQueryMask-br_celphones
    var SPMaskBehavior = function(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options)
        }
    }
    newRow.find('.jQueryMask-br_celphones').mask(SPMaskBehavior, spOptions)
}

// Adicionar linha ao pressionar a tecla de seta para baixo
$(document).keydown(function(e) {
    if (e.key === 'ArrowDown') {
        addRow()
        tableBody.find('tr:last input:first').focus()
    }
})

// Adicionar evento aos botões "Adicionar" e "Deletar"
tableBody.on('click', '[data-tb-btn]', function(e) {
    if ($(this).data('tb-btn') === 'add') {
        addRow();
    }
    else if ($(this).data('tb-btn') === 'del') {
        const row = $(this).closest('tr');
        //destroy plugins
        row.find('[data-bs-toggle="tooltip"]').tooltip('dispose');
        row.remove();
    }
})
