"use strict";

/** ////////////////////////////////////////////////////////////////////
 *
 * - initTooltips
 * - initPopovers
 * - mainAppMarginTop
 * - showCurrentYear
 * - initNavigationsActive
 * - fancybox
 * - floatThead
 * - DOMPurif protect xss
 * - data-row="delete"
 * - formsSubmitSpinnerToasts
 * - closeModalIfInside
 * - color charts
 * -
--------------------------------------------------------------------- */

/** --------------------------------------------------------------------
 * initTooltips
--------------------------------------------------------------------- */
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
initTooltips()

/** --------------------------------------------------------------------
 * initPopovers
--------------------------------------------------------------------- */
function initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}
initPopovers()

/** --------------------------------------------------------------------
 * mainAppMarginTop
--------------------------------------------------------------------- */
const mainAppMarginTop = () => {
    const header = document.querySelector('[data-el="top-fixed"]')
    const mainApp = document.querySelector('[data-el="main-app"]')

    if(header && mainApp){
        const headerHeight = header.clientHeight + 'px'
        if(mainApp){
            mainApp.style.marginTop = headerHeight
        }
    }
}
mainAppMarginTop()

/** --------------------------------------------------------------------
 * showCurrentYear
--------------------------------------------------------------------- */
const showCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const divCurrentYear = document.querySelectorAll('[data-js="currentYear"]')
    if (divCurrentYear) {
        divCurrentYear.forEach((item) => {
            item.textContent = currentYear
        })
    }
}
showCurrentYear()

/** --------------------------------------------------------------------
 * initNavigationsActive
--------------------------------------------------------------------- */
const initNavigationsActive = () => {
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll(`.navbar-nav .nav-item a[href$="${currentUrl}"]`)

    navLinks.forEach(function (link) {
        link.classList.add("active")

        const dropdownParent = link.closest(".nav-item.dropdown")
        dropdownParent?.classList.add("active")
    });
}
initNavigationsActive()

/** --------------------------------------------------------------------
 * fancybox
 * https://fancyapps.com/fancybox/plugins/html/#iframes
--------------------------------------------------------------------- */
function initFancybox() {
    const fancyboxElement = document.querySelector("[data-fancybox]")
    if (fancyboxElement) {
        Fancybox.bind("[data-fancybox]", {});
    }

    //console.log('ativado fancybox');
}
initFancybox()

/** --------------------------------------------------------------------
 * floatThead
--------------------------------------------------------------------- */
const floatTheadElement = document.querySelector(".fixThead");
if (floatTheadElement) {
    $table.floatThead({
        scrollContainer: function ($table) {
            return $table.closest(".table-responsive")
        },
    })
}

/** --------------------------------------------------------------------
 * DOMPurif protect xss
--------------------------------------------------------------------- */
const sanitize = (string) => DOMPurify.sanitize(string);
let inputsApp = document.querySelectorAll(".form-control");
inputsApp.forEach((item) => {
    item.addEventListener("change", (e) => {
        const result = sanitize(e.target.value);
        console.log(result);
    });
});

/** --------------------------------------------------------------------
 * data-row="delete"
--------------------------------------------------------------------- */
function initDeleteRow() {
    $('[data-row="delete"]').on('click', function () {
        if (!confirm("Você tem certeza que deseja excluir?")) {
            return false;
        }
    });
}
initDeleteRow()

/** --------------------------------------------------------------------
 * formsSubmitSpinnerToasts
--------------------------------------------------------------------- */
function formsSubmitSpinnerToasts() {
    const forms = document.querySelectorAll('form')

    for (const form of forms) {
        const submitButton = form.querySelector('button[type="submit"][data-btn="spinner-toast"]');

        if (submitButton) {
            // Remove event listeners duplicados
            form.removeEventListener('submit', handleSpinnerButtonToast);
            // Adiciona o event listener
            form.addEventListener('submit', handleSpinnerButtonToast);
        }
    }
}
function handleSpinnerButtonToast(event) {
    event.preventDefault()

    const btn = event.submitter
    const activeTab = document.querySelector('.nav-link.active');

    btn.classList.add('btn-spinner-disabled');
    btn.querySelector('.btn-spinner').classList.remove('d-none')

    setTimeout(() => {
        btn.classList.remove('btn-spinner-disabled');
        btn.querySelector('.btn-spinner').classList.add('d-none')

        handleToastsDisplay(btn)
        clearform(btn)
        closeModalIfInside(btn)

        //Caso o form esteja dentro de uma TAB, então após o submit vai reativar a mema
        if (activeTab) {
            const targetTab = document.querySelector(`[data-bs-target="${activeTab.getAttribute('data-bs-target')}"]`);
            if (targetTab) {
                const tab = new bootstrap.Tab(targetTab);
                tab.show();
            }
        }

    }, 3000);
}
function handleToastsDisplay(btn) {
    const target = btn.getAttribute('data-toast-target')
    const toastElement = document.querySelector(`[data-toast-type="${target}"]`)

    if (toastElement) {
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
    }
}

formsSubmitSpinnerToasts()

/** --------------------------------------------------------------------
 * closeModalIfInside
 * Fecha o modal se o botão estiver dentro de um modal
--------------------------------------------------------------------- */
function closeModalIfInside(btn) {
    if (btn.getAttribute('data-modal') !== 'close') {
        return;
    }

    const form = btn.closest('form')
    const modal = form.closest('.modal')
    if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal)
        if (modalInstance) {
            modalInstance.hide()
        }
    }
}

/** --------------------------------------------------------------------
 * clearForm
--------------------------------------------------------------------- */
function clearform(btn) {
    const form = btn.closest('form')
    console.log(form);
    form.reset()
}

/** --------------------------------------------------------------------
 * color charts
--------------------------------------------------------------------- */
const colorGreen = "#128c82"
const colorGrey  = "#dddddd"
