
let nombre=prompt("Ingrese su nombre")
alert ("Hola "+ nombre +"!" + " ¿Cómo estás?" +"\n \n" + "Hoy vamos a simular una inversión a plazo fijo para vos. Vamos a mostrarte cuanto obtendrías si realizaras la inversión en el plazo que tu indiques y la tasa de interés obtenida según el monto depositado. Para lo cual necesitamos solicitarte cierta información -->")

function ingreseCapitalInicial(){
    let capitalInicial=parseFloat(prompt("Comentanos, ¿cuanto dinero te gustaría invertir?"))
    while (capitalInicial <=0) {
        capitalInicial=parseFloat(prompt("Ups! ingresaste un monto inválido, probemos de nuevo. ¿Cuanto dinero te gustaría invertir?"))   
    }
    return capitalInicial
}

function ingresePlazo(){
    let plazo=parseInt(prompt("¿Cuantos días quisieras dejar el capital invertido?"))
    while (plazo <=0) {
        plazo=parseInt(prompt("Ups! ingresaste un carácter inválido, probemos de nuevo. ¿Cuantos días quisieras dejar el capital invertido?"))   
    }
    return plazo
}

const plazo=ingresePlazo()
const capitalInicial=ingreseCapitalInicial()

let tasaNominalAnual
if ((capitalInicial>0) && (capitalInicial<500000)) {
    tasaNominalAnual=90
} else if ((capitalInicial>=500000) && (capitalInicial<1000000)){
    tasaNominalAnual=100
} else if (capitalInicial>=1000000) {
    tasaNominalAnual=110
}

function interesSimple (capitalInicial,tasaNominalAnual,plazo){
    let interesPeriodo = capitalInicial * (tasaNominalAnual/100)*(plazo/365)
    let capitalFinal = parseFloat(capitalInicial + interesPeriodo)
    return capitalFinal
}

const capitalFinal = interesSimple(capitalInicial,tasaNominalAnual,plazo).toFixed(2)

alert(nombre + ", muchas gracias por la información brindada. A continuación los resultados: \n\n" + "Capital Invertido: $" + capitalInicial + "\n" + "Plazo: "+ plazo + " días" + "\n" +"Tasa Nominal Anual: "+ tasaNominalAnual + "%" + "\n" + "Capital final: $" + capitalFinal)
