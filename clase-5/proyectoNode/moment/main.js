const moment= require("moment");

let fechaActual= new Date();
fechaActual= moment(fechaActual);

const fechaCumple= moment("1991-05-12")

const añosResultado= fechaActual.diff(fechaCumple, "years");
const diasResultado= fechaActual.diff(fechaCumple, "days");

console.log(`Hoy es ${fechaActual}`)
console.log(`La fecha de mi cumpleaños es ${fechaCumple}`),
console.log(`Desde mi nacimiento han pasado ${añosResultado} años`);
console.log(`Desde mi nacimiento han pasado ${diasResultado} dias`);