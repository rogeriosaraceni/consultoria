const tableBodyEquipe = $('#tableCloneEquipe tbody')
let rowIndexEquipe = 1

// Adicionar uma nova linha
function addRowEquipe() {
    const firstRow = tableBodyEquipe.find('tr:first')
    const newRow = firstRow.clone()

    newRow.find('input').each(function() {
        $(this).val('')
        const field = $(this);
        const name = field.attr("name")
        const id = field.attr("id")

        if (name) {
            const newName = name.replace(/_\d+$/, `_${rowIndexEquipe}`)
            field.attr("name", newName)
        }
        if (id) {
            const newId = id.replace(/_\d+$/, `_${rowIndexEquipe}`)
            field.attr("id", newId)
        }
    })

    tableBodyEquipe.append(newRow)
    rowIndexEquipe++
    updateButtonsVisibilityEquipe()

    // Reativar tooltips
    newRow.find('[data-bs-toggle="tooltip"]').tooltip()
}

// Adicionar linha ao pressionar a tecla de seta para baixo
$(document).keydown(function(e) {
    if (e.key === 'ArrowDown') {
        addRowEquipe()
        tableBodyEquipe.find('tr:last input:first').focus()
    }
})

// Adicionar evento aos botões "Adicionar" e "Deletar"
tableBodyEquipe.on('click', '[data-tb-btn]', function(e) {
    if ($(this).data('tb-btn') === 'add') {
        addRowEquipe();
    }
    else if ($(this).data('tb-btn') === 'del') {
        const row = $(this).closest('tr');
        //destroy plugins
        row.find('[data-bs-toggle="tooltip"]').tooltip('dispose');
        row.remove()
        updateButtonsVisibilityEquipe()
    }
})

// Atualizar a visibilidade dos botões "Adicionar" e "Deletar"
function updateButtonsVisibilityEquipe() {
    const rows = tableBodyEquipe.find('tr');
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
updateButtonsVisibilityEquipe()
