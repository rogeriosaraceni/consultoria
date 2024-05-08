"use strict";

/** ////////////////////////////////////////////////////////////////////
 *
 * - currentYear
 * - DOMPurif protect xss
 * - enable tooltips Bootstrap
 * - fancybox
 * - floatThead
 * - mainAppMarginTop
 * - navigationActive
 * -
 *
 * - Active Functions
 *
--------------------------------------------------------------------- */

/** --------------------------------------------------------------------
 * currentYear
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
 * enable tooltips Bootstrap
--------------------------------------------------------------------- */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

/** --------------------------------------------------------------------
 * fancybox
 * https://fancyapps.com/fancybox/plugins/html/#iframes
--------------------------------------------------------------------- */
Fancybox.bind("[data-fancybox]", {});

/** --------------------------------------------------------------------
 * floatThead
--------------------------------------------------------------------- */
const $table = $(".fixThead");
$table.floatThead({
    scrollContainer: function ($table) {
        return $table.closest(".table-responsive");
    },
});

/** --------------------------------------------------------------------
 * mainAppMarginTop
--------------------------------------------------------------------- */
const mainAppMarginTop = () => {
    const header = document.querySelector('[data-el="top-fixed"]')
    const mainApp = document.querySelector('[data-el="main-app"]')

    if(header){
        const headerHeight = header.clientHeight + 'px'
        if(mainApp){
            mainApp.style.marginTop = headerHeight
        }
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
 * Active Functions
--------------------------------------------------------------------- */
//mainAppMarginTop()
showCurrentYear()
navigationActive()
