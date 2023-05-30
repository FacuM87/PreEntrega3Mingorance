
class Inversion {
    constructor(nombre) {
      this.nombre = nombre
      this.capitalInicial = 0
      this.plazo = 0
      this.tasaNominalAnual = 0
      this.capitalFinal = 0
    }
  
    ingresarCapitalInicial() {
      let capitalInicial = parseFloat(prompt("Comentanos, ¿cuánto dinero te gustaría invertir?"))
      while (capitalInicial <= 0 || isNaN(capitalInicial)) {
        capitalInicial = parseFloat(prompt("¡Ups! Ingresaste un monto inválido, probemos de nuevo. ¿Cuánto dinero te gustaría invertir?"))
      }
      this.capitalInicial = capitalInicial
    }
  
    ingresarPlazo() {
      let plazo = parseInt(prompt("¿Cuántos días quisieras dejar el capital invertido?"));
      while (plazo <= 0 || isNaN(plazo)) {
        plazo = parseInt(prompt("¡Ups! Ingresaste un carácter inválido, probemos de nuevo. ¿Cuántos días quisieras dejar el capital invertido?"))
      }
      this.plazo = plazo
    }
  
    determinarTasaNominalAnual() {
      if (this.capitalInicial > 0 && this.capitalInicial < 500000) {
        this.tasaNominalAnual = 90
      } else if (this.capitalInicial >= 500000 && this.capitalInicial < 1000000) {
        this.tasaNominalAnual = 100
      } else if (this.capitalInicial >= 1000000) {
        this.tasaNominalAnual = 110
      }
    }
  
    calcularInteresSimple() {
      let interesPeriodo = this.capitalInicial * (this.tasaNominalAnual / 100) * (this.plazo / 365);
      this.capitalFinal = parseFloat(this.capitalInicial + interesPeriodo)
    }
  
    mostrarResultados() {
      alert(this.nombre + ", muchas gracias por la información brindada. A continuación los resultados: \n\n" +"Capital Invertido: $" + this.capitalInicial + "\n" + "Plazo: " + this.plazo + " días" + "\n" + "Tasa Nominal Anual: " + this.tasaNominalAnual + "%" + "\n" + "Capital final: $" + this.capitalFinal.toFixed(2))
    }
  }
  
const inversiones = []

    let nombre = prompt("Ingrese su nombre")
    const inversion = new Inversion(nombre)
    inversion.ingresarCapitalInicial()
    inversion.ingresarPlazo()
    inversion.determinarTasaNominalAnual()
    inversion.calcularInteresSimple()
    inversion.mostrarResultados()
    inversiones.push(inversion)

console.log(inversiones)