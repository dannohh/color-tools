import { Picker, InputColor, OutputColor, Slider, Switch } from './components'

// Convert from HSL to hexadecimal
import convert from 'color-convert'

function render () {
  document.querySelector('#root').innerHTML = `
  ${Picker()}
  ${Switch()}
  ${Slider()}
  ${InputColor()}
  ${OutputColor()}
`

  const HTMLRoot = document.querySelector(':root')
  const labels = document.querySelectorAll('.switchContainer label')
  const colorSlideValue = document.querySelector('#colorSlideLabel span')

  const toggleSwitch = document.querySelector('#switch')

  function adjustLightnessFromHex (hex, adjustment = 0) {
    // HSLValues is an Array with 3 values - H, S, L
    const HSLValues = convert.hex.hsl(hex)

    HSLValues[2] += adjustment

    const [hue, sat, light] = HSLValues

    return `hsl(${hue}, ${sat}%, ${light}%)`
  }

  function updateOutputColor () {
    const slideValue =
      toggleSwitch.parentNode.querySelector('.isActive').textContent ===
      'Lighten'
        ? Number(colorSlideValue.textContent)
        : -Number(colorSlideValue.textContent)

    HTMLRoot.style.setProperty(
      '--output-color',
      adjustLightnessFromHex(
        getComputedStyle(HTMLRoot).getPropertyValue('--input-color'),
        slideValue
      )
    )
  }

  document.querySelector('#color').addEventListener('input', function () {
    HTMLRoot.style.setProperty('--input-color', this.value)
    HTMLRoot.style.setProperty('--output-color', this.value)
  })

  toggleSwitch.addEventListener('change', function () {
    labels.forEach((label) => {
      label.classList.toggle('isActive')
    })

    updateOutputColor()
  })

  document.querySelector('#colorSlider').addEventListener('input', function () {
    colorSlideValue.textContent = this.value
    updateOutputColor()
  })
}

render()
