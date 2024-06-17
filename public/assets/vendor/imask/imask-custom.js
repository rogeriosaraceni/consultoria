function imaskInputs() {
    imaskPhoneBR()
    imaskMoneyBR()
    imaskMoneyUSD()
}

function imaskPhoneBR() {
    let inputs = document.querySelectorAll('input[data-imask="phoneBR"]')

    inputs.forEach(item => {
        IMask(item, {
            mask: "(00) 00000-0000"
        })

        // item.addEventListener('change', () => {
        //     console.log(item.value)
        // })
    })
}

function imaskMoneyBR() {
    let inputs = document.querySelectorAll('input[data-imask="moneyBR"]')

    inputs.forEach(item => {
        IMask(item, {
            mask: 'num',
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: '.',
                    radix: ',',
                    mapToRadix: ['.'], // allows dots input, but results will be mapped to comma
                    scale: 2, // number of digits after the decimal point
                    signed: false, // allow negative numbers
                    padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
                }
            }
        })

        // item.addEventListener('change', () => {
        //     console.log(item.value)
        // })
    })
}

function imaskMoneyUSD() {
    let inputs = document.querySelectorAll('input[data-imask="moneyUSD"]')

    inputs.forEach(item => {
        IMask(item, {
            mask: 'num',
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: ',',
                    radix: '.',
                    scale: 2, // number of digits after the decimal point
                    signed: false, // allow negative numbers
                    padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
                }
            }
        })

        // item.addEventListener('change', () => {
        //     console.log(item.value)
        // })
    })
}

imaskInputs()
