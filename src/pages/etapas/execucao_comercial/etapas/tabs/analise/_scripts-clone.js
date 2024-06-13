const tableBody = $('#tableCloneAnalise tbody');
let rowIndex = 1;

// Adicionar uma nova linha
function addRowAnalise() {
    const firstRow = tableBody.find('tr:first');
    const newRow = firstRow.clone();

    newRow.find('input').each(function(index) {
        $(this).val('');
        const baseId = $(this).attr('id').split('-')[0];
        const newId = `${baseId}-${rowIndex}`;
        const baseName = $(this).attr('name').split('[')[0];
        const newName = `${baseName}[${rowIndex}]`;
        $(this).attr('id', newId);
        $(this).attr('name', newName);
    });

    newRow.find('[data-tb-btn="del"]').css('visibility', 'visible');

    tableBody.append(newRow);
    rowIndex++;

    // Reativar outros plugins, se necessário
    $('[data-bs-toggle="tooltip"]').tooltip();

    updateButtonsVisibilityAnalise();
}

// Adicionar linha ao pressionar a tecla de seta para baixo
$(document).keydown(function(e) {
    if (e.key === 'ArrowDown') {
        addRowAnalise();
        tableBody.find('tr:last input:first').focus();
    }
});

// Adicionar evento aos botões "Adicionar" e "Deletar"
tableBody.on('click', '[data-tb-btn]', function(e) {
    if ($(this).data('tb-btn') === 'add') {
        addRowAnalise();
    }
    else if ($(this).data('tb-btn') === 'del') {
        const row = $(this).closest('tr');
        row.find('[data-bs-toggle="tooltip"]').tooltip('dispose');
        row.remove();
        updateButtonsVisibilityAnalise();
    }
});

// Atualizar a visibilidade dos botões "Adicionar" e "Deletar"
function updateButtonsVisibilityAnalise() {
    const rows = tableBody.find('tr');
    const btnsDeleteRow = $('[data-tb-btn="del"]');

    rows.each(function(index) {
        const addButton = $(this).find('[data-tb-btn="add"]');
        if (addButton) {
            addButton.css('display', (index === rows.length - 1) ? 'inline-block' : 'none');
        }
    });

    btnsDeleteRow.each(function(index) {
        $(this).css('visibility', (index === 0) ? 'hidden' : 'visible');
    });
}

updateButtonsVisibilityAnalise();
