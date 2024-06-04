let imaskPhoneInputs = document.querySelectorAll('input[data-imask="phoneBR"]')

imaskPhoneInputs.forEach(item => {
    IMask(item, {
        mask: "(00) 00000-0000"
    })
})
