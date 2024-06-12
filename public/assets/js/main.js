"use strict";

/** ////////////////////////////////////////////////////////////////////
 *
 * - activeTooltips
 * - mainAppMarginTop
 * - showCurrentYear
 * - navigationActive
 * - initializeSpinnerButtons
 * - showToasts
 * - fancybox
 * - floatThead
 * - DOMPurif protect xss
 *
 * - Active Functions
 *
--------------------------------------------------------------------- */

/** --------------------------------------------------------------------
 * activeTooltips
--------------------------------------------------------------------- */
function activeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

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

/** --------------------------------------------------------------------
 * navigationActive
--------------------------------------------------------------------- */
const navigationActive = () => {
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll(`.navbar-nav .nav-item a[href$="${currentUrl}"]`)

    navLinks.forEach(function (link) {
        link.classList.add("active")

        const dropdownParent = link.closest(".nav-item.dropdown")
        dropdownParent?.classList.add("active")
    });
}

/** --------------------------------------------------------------------
 * formsSubmitSpinnerToasts
--------------------------------------------------------------------- */
function formsSubmitSpinnerToasts() {
    const forms = document.querySelectorAll('form[data-form="spinner-toast"]')

    for (const form of forms) {
        // Remove event listeners duplicados
        form.removeEventListener('submit', handleSpinnerButtonToast)
        // Adiciona o event listener
        form.addEventListener('submit', handleSpinnerButtonToast)
    }
}
function handleSpinnerButtonToast(event) {
    event.preventDefault()

    const btn = event.submitter
    btn.classList.add('btn-spinner-disabled');
    btn.querySelector('.btn-spinner').classList.remove('d-none')

    setTimeout(() => {
        btn.classList.remove('btn-spinner-disabled');
        btn.querySelector('.btn-spinner').classList.add('d-none')

        handleToastsDisplay(btn)
        closeModalIfInside(btn)
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
// Fecha o modal se o botão estiver dentro de um modal
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
 * fancybox
 * https://fancyapps.com/fancybox/plugins/html/#iframes
--------------------------------------------------------------------- */
const fancyboxElement = document.querySelector("[data-fancybox]")

if (fancyboxElement) {
    Fancybox.bind("[data-fancybox]", {});
}

/** --------------------------------------------------------------------
 * floatThead
--------------------------------------------------------------------- */
//const $table = $(".fixThead");

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
 * Active Functions
--------------------------------------------------------------------- */
activeTooltips()
mainAppMarginTop()
showCurrentYear()
navigationActive()
formsSubmitSpinnerToasts()
