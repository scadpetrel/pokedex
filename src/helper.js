
// make first letter toUpperCase
const changeToTitleCase = (name) => {
return name.charAt(0).toUpperCase() + name.slice(1);
}

// convert decemeter to meeter
const convertToMeeter = (number) => {
  return number / 10
}

const convertToKilogram = number => {
  return number / 10
}

const convertMeter = (number) => {
  let meter = number / 10
  // let feet = meter*3.2808
  // let roundFeet = feet.toFixed(1)
  // return `${meter} m / ${roundFeet} /ft` 
  return `${meter} m`
}

const convertFeetInches = (number) => {
  let feet = Math.floor(number / 10 * 3.28)
  let inches = Math.round(((number / 10 * 3.28) % 1) * 12)
  return `${feet}' ${inches}"`
}

const genderRatio = (rate) => {
   let female = 12.5 * rate
   let male = 12.5 * (8 - rate)
    return `Male ${male}% / Female: ${female}%`
}

// Math.floor(props.height / 10 * 3.28)}'${Math.round(((props.height / 10 * 3.28) % 1) * 12)}"

export {changeToTitleCase, convertToMeeter, convertToKilogram, convertMeter, genderRatio, convertFeetInches};