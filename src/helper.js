
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

const convertHeight = (number) => {
  let meter = number / 10
  let feet = meter*3.2808
  let roundFeet = feet.toFixed(1)
  return `${meter} m / ${roundFeet} /ft` 
}

const genderRatio = (rate) => {
   let female = 12.5 * rate
   let male = 12.5 * (8 - rate)
    return `Male ${male}% / Female: ${female}%`
}
export {changeToTitleCase, convertToMeeter, convertToKilogram, convertHeight, genderRatio};