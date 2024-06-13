const formEtapasConfig  = document.getElementById('formEtapas')
const checkboxEtapasAll = document.getElementById('etapas_All')
let   checkboxesEtapas  = document.querySelectorAll('[data-checkbox="etapas"]')


function updateCheckboxEtapasAll() {
    const allChecked = [].every.call(checkboxesEtapas, (checkbox) => checkbox.checked)
    checkboxEtapasAll.checked = allChecked
    localStorage.setItem('etapas_All', allChecked)
}

function handleChangeCheckboxesEtapasAll() {
    checkboxesEtapas.forEach(checkbox => {
        checkbox.checked = checkboxEtapasAll.checked
        localStorage.setItem(checkbox.id, checkboxEtapasAll.checked)
    })
}

checkboxEtapasAll.addEventListener('change', handleChangeCheckboxesEtapasAll)


function addEtapasLocalStorage() {
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

    function handleCheckboxsChange(e) {
        localStorage.setItem(e.target.id, e.target.checked)
        updateCheckboxEtapasAll()
    }

    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id)
        if (checkbox) {
            checkbox.addEventListener('change', handleCheckboxsChange)
            checkbox.checked = localStorage.getItem(id) === "true"
        }
    })

    // Update the checkboxEtapasAll state on initial load
    updateCheckboxEtapasAll()
}


addEtapasLocalStorage()

//validar o form, para selecionar ao menos 1
function verifyCheckboxesEtapasConfig() {
    return [].filter.call(checkboxesEtapas, (checkbox) => checkbox.checked).length
}
formEtapasConfig.addEventListener('submit', function(event) {
    const valid = verifyCheckboxesEtapasConfig()
    if (!valid) {
        event.preventDefault();
        alert('Selecione ao menos uma opção das Etapas!')
    }
})
