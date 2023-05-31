// Seteo de Clase 

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

// Array de almacenamiento de objetos (inversiones), ejecución de los métodos y salida del array por consola 

const inversiones = []

function simularInversion(){ 
  let nombre = prompt("Ingrese su nombre")
  const inversion = new Inversion(nombre)
  inversion.ingresarCapitalInicial()
  inversion.ingresarPlazo()
  inversion.determinarTasaNominalAnual()
  inversion.calcularInteresSimple()
  inversion.mostrarResultados()
  inversiones.push(inversion)
}

console.log(inversiones)

// Funciones de filtro y búsqueda         ------------- VERIFICAR QUE ESTÉN BIEN -------------

function buscarPorNombre(nombre) {
  return inversiones.find((inversion) => inversion.nombre.toLowerCase() === nombre.toLowerCase())
}

function filtrarPorPlazo(plazo) {
  return inversiones.filter((inversion) => inversion.plazo === plazo)
}

// Menú

function Menu() {
  let opciones = parseInt(prompt("\n¿Qué acción desea realizar?: \n\n1. Simular una inversión\n2. Buscar inversiones por nombre\n3. Buscar inversiones por plazo\n4. Salir \n"));

  switch (opciones) {
    case 1:
      simularInversion()
      Menu()
      break
    case 2:
      let nombreBusqueda = prompt("Ingrese nombre para la búsqueda")
      let inversionEncontrada = buscarPorNombre(nombreBusqueda)
      if (inversionEncontrada.length > 0) {
        alert("Inversión encontrada:\n\n" + inversionEncontrada) // --> ¿COMO MOSTRAR EN EL ALERT EL ARRAY ENCONTRADO?
      } else {
        alert("No se encontraron inversiones con el nombre indicado.")
      }
      Menu()
      break
    case 3:
      let plazoBusqueda = parseInt(prompt("Ingrese el plazo para la búsqueda"))
      let inversionesFiltradas = filtrarPorPlazo(plazoBusqueda)
      if (inversionesFiltradas.length > 0) {
        alert("Inversión o inversiones encontradas:\n\n" + inversionesFiltradas) // --> ¿COMO MOSTRAR EN EL ALERT EL O LOS ARRAYS ENCONTRADOS?
      } else {
        alert("No se encontraron inversiones con el plazo indicado.")
      }
      Menu()
      break
    case 4:
      alert("\nGracias por elegirnos! \nTe esperamos nuevamente! :) \n\nSaludos!")
      break
    default:
      alert("Opción inválida :( \n\n¿Probamos de nuevo?")
      Menu()
  }
}

Menu()
