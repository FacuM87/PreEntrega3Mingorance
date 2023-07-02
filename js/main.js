
class Inversion {
  constructor(nombre) {
    this.nombre = nombre
    this.capitalInicial = 0
    this.plazo = 0
    this.tasaNominalAnual = 0
    this.capitalFinal = 0
  }

  validarNombre(nombre){
    const nombreError=document.getElementById("nombreError")
    nombre !== "" ? (nombreError.innerHTML = "") : (nombreError.innerHTML = "Completa este campo")    
    
    const inversionExistente = inversiones.find(inversion => inversion.nombre.toLowerCase() === nombre.toLowerCase())
    inversionExistente && (nombreError.innerHTML = "Favor de ingresar un nombre no ingresado anteriormente.") 

    if (nombre === "" || inversionExistente) {
      return false
    }
  }

  validarCapitalInicial(capitalInicial) {
    const montoError=document.getElementById("montoError")
    capitalInicial > 0 ? (montoError.innerHTML = "", this.capitalInicial = capitalInicial) : (montoError.innerHTML = "¡Ups! Monto inválido, ¿probamos de nuevo?")    
  }
  
  validarPlazo(plazo) {
    const plazoError=document.getElementById("plazoError")
    plazo > 0 ? (plazoError.innerHTML = "", this.plazo=parseInt(plazo)) : (plazoError.innerHTML = "¡Ups! Plazo inválido, ¿probamos de nuevo?")
  }

  determinarTasaNominalAnual() {
    if (this.capitalInicial > 0 && this.capitalInicial < 500000) {
      this.tasaNominalAnual = 97
    } else if (this.capitalInicial >= 500000 && this.capitalInicial < 1000000) {
      this.tasaNominalAnual = 102
    } else if (this.capitalInicial >= 1000000) {
      this.tasaNominalAnual = badlarReciente
    }
  }

  calcularInteresSimple() {
    const interesPeriodo = this.capitalInicial * (this.tasaNominalAnual / 100) * (this.plazo / 365)
    this.capitalFinal = parseFloat(this.capitalInicial + interesPeriodo)
  }

  mostrarResultados() {
    limpiarResultadoAnterior("sectionSim","resultados")
    const sectionSim = document.getElementById("sectionSim")
    const divResultados = document.createElement("div")
    divResultados.id="resultados"
    divResultados.classList.add("cajaResultados")    
    sectionSim.appendChild(divResultados)
    if (this.capitalInicial>= 1000000 && badlarReciente=="API error") {
      divResultados.innerHTML = `
      <div>
        <p class="text-center mb-2">Muchas gracias ${this.nombre}. <br> A continuación los resultados:</p>
        <ul class="listaResultados">
          <li>Capital Invertido: $${this.capitalInicial}</li>
          <li>Plazo: ${this.plazo} días</li>
          <li>Tasa Nominal Anual: ${this.tasaNominalAnual}</li>
          <li>Capital final: API error, no es posible obtener Capital Final</li>
        </ul>
      </div>
    `
    } else {
      divResultados.innerHTML = `
      <div>
        <p class="text-center mb-2">Muchas gracias ${this.nombre}. <br> A continuación los resultados:</p>
        <ul class="listaResultados">
          <li>Capital Invertido: $${this.capitalInicial}</li>
          <li>Plazo: ${this.plazo} días</li>
          <li>Tasa Nominal Anual: ${this.tasaNominalAnual}%</li>
          <li>Capital final: $${this.capitalFinal.toFixed(2)}</li>
        </ul>
      </div>
    `
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  traerInversionesDelLSalInicio()
  obtenerTasaBadlar()
})

let btnSimularInversion=document.getElementById("simularInversion")
btnSimularInversion.addEventListener("click", (event) => {
  event.preventDefault()
  const nombre = document.getElementById("nombre").value
  const capitalInicial = parseFloat(document.getElementById("capitalInicial").value)
  const plazo = parseInt(document.getElementById("plazo").value)
  simularInversion(nombre, capitalInicial, plazo) 
})

let resetBtn=document.getElementById("resetBtn")
resetBtn.addEventListener("click", (event) => {
  event.preventDefault()
  Swal.fire({
    title: '¿Desea eliminar las simulaciones almacenadas?',
    text: "Esta acción no podrá ser revertida",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0D6EFD',
    cancelButtonColor: '#2F4F4F',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear()
      document.getElementById("reseteoLS").innerHTML="Las simulaciones han sido eliminadas"
      Swal.fire(
        'Las simulaciones fueron eliminadas!','','success'
      )
      setTimeout(() => {location.reload()}, 1500)
    }
  })
})

let btnBusqueda=document.getElementById("btnBusquedaNombre")
btnBusqueda.addEventListener("click", buscarPorNombre)

let btnResumen=document.getElementById("resumen")
btnResumen.addEventListener("click", resumenSimulaciones)
