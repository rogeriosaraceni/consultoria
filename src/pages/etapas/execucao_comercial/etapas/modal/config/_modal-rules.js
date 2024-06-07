const form = document.getElementById('formEtapas')
let checkboxes = document.querySelectorAll('[data-checkbox="etapas"]')

function verify() {
    return [].filter.call(checkboxes, (checkbox) => {
        return checkbox.checked
    }).length
}

function addLocalStorage() {
    document.querySelector('#etapa_swot').setAttribute('checked', 'true');
    document.querySelector('#etapa_swot').setAttribute('disabled', 'true');

    const checkboxes = [
        //"etapa_swot",
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
        localStorage.setItem(e.target.id, e.target.checked)
    }

    checkboxes.forEach(id => {
        const checkbox = document.getElementById(id)

        if(checkbox){
            checkbox.addEventListener('change', handleCheckboxChange)
            checkbox.checked = localStorage.getItem(id) === "true"
        }
    })
}

addLocalStorage()

form.addEventListener('submit', function(event) {
    const valid = verify();

    if (!valid) {
        event.preventDefault()
        alert('Selecione ao menos uma opção das Etapas!')
    }
})
