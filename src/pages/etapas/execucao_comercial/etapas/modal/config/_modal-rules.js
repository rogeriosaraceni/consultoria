const form = document.getElementById('formEtapas');
const selectAllCheckbox = document.getElementById('etapas_All');
let checkboxes = document.querySelectorAll('[data-checkbox="etapas"]');


function verify() {
    return [].filter.call(checkboxes, (checkbox) => checkbox.checked).length;
}

function updateSelectAllCheckbox() {
    const allChecked = [].every.call(checkboxes, (checkbox) => checkbox.checked);
    selectAllCheckbox.checked = allChecked;
    localStorage.setItem('etapas_All', allChecked);
}

function addLocalStorage() {
    const checkboxIds = [
        "etapas_All",
        "etapa_swot",
        "etapa_equipe",
        "etapa_treinamentos",
        "etapa_wiz",
        "etapa_funil",
        "etapa_passos",
        "etapa_analise",
        "etapa_parcerias",
        "etapa_calendario",
        "etapa_metas",
        "etapa_redes",
        "etapa_gestao",
        "etapa_acoes",
        "etapa_comercial",
        "etapa_plano",
    ];

    function handleCheckboxChange(e) {
        localStorage.setItem(e.target.id, e.target.checked);
        updateSelectAllCheckbox();
    }

    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', handleCheckboxChange);
            checkbox.checked = localStorage.getItem(id) === "true";
        }
    });

    // Update the selectAllCheckbox state on initial load
    updateSelectAllCheckbox();
}

function handleSelectAllChange() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        localStorage.setItem(checkbox.id, selectAllCheckbox.checked);
    });
}

selectAllCheckbox.addEventListener('change', handleSelectAllChange);

addLocalStorage();

form.addEventListener('submit', function(event) {
    const valid = verify();
    if (!valid) {
        event.preventDefault();
        alert('Selecione ao menos uma opção das Etapas!');
    }
});
