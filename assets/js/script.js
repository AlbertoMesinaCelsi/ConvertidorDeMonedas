const convertirBtn = document.getElementById('convertirBtn')
const montoInput = document.getElementById('monto')
const monedaSelect = document.getElementById('moneda')
const resultado = document.getElementById('resultado')

convertirBtn.addEventListener('click', async () => {
    const monto = parseFloat(montoInput.value)
    const moneda = monedaSelect.value

    if (isNaN(monto) || monto <= 0 || !moneda) {
        resultado.textContent = 'Por favor, ingrese un monto válido y seleccione una moneda.'
        return
    }

    try {
        const response = await fetch('https://mindicador.cl/api')
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API.')
        }

        const data = await response.json()

        // Obtiene el valor de la moneda seleccionada
        const rate = data[moneda]?.valor

        if (rate) {
            const convertirMonto = monto / rate
            resultado.textContent = `El valor de cambio es: ${convertirMonto.toFixed(2)} ${moneda.toUpperCase()}`
        } else {
            resultado.textContent = 'Error, no se encuentra disponible esa moneda'
        }
    } catch (error) {
        resultado.textContent = 'Error al obtener los datos. Intente nuevamente.'
        console.error(error)
    }
});

