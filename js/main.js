
function limpiarResultadoAnterior(idSection, idDiv){
  const section = document.getElementById(idSection)
  const div = document.getElementById(idDiv)
  if (div && (div.parentNode === section)) {
    section.removeChild(div)
  }  
}

class Inversion {
  constructor(nombre) {
    this.nombre = nombre
    this.capitalInicial = 0
    this.plazo = 0
    this.tasaNominalAnual = 0
    this.capitalFinal = 0
  }

  validarNombre(nombre){
    let nombreError=document.getElementById("nombreError")
    nombre !== "" ? (nombreError.innerHTML = "") : (nombreError.innerHTML = "Completa este campo")
    
    let inversionExistente = inversiones.find(inversion => inversion.nombre.toLowerCase() === nombre.toLowerCase())
    inversionExistente && (nombreError.innerHTML = "Favor de ingresar un nombre no ingresado anteriormente.") 

    if (nombre === "" || inversionExistente) {
      return false
    }
  }

  validarCapitalInicial(capitalInicial) {
    let montoError=document.getElementById("montoError")
    capitalInicial > 0 ? (montoError.innerHTML = "", this.capitalInicial = capitalInicial) : (montoError.innerHTML = "¡Ups! Monto inválido, ¿probamos de nuevo?")    
  }
  
  validarPlazo(plazo) {
    let plazoError=document.getElementById("plazoError")
    plazo > 0 ? (plazoError.innerHTML = "", this.plazo=parseInt(plazo)) : (plazoError.innerHTML = "¡Ups! Plazo inválido, ¿probamos de nuevo?")
  }

  determinarTasaNominalAnual() {
    if (this.capitalInicial > 0 && this.capitalInicial < 500000) {
      this.tasaNominalAnual = 97
    } else if (this.capitalInicial >= 500000 && this.capitalInicial < 1000000) {
      this.tasaNominalAnual = 107
    } else if (this.capitalInicial >= 1000000) {
      this.tasaNominalAnual = 117
    }
  }

  calcularInteresSimple() {
    const interesPeriodo = this.capitalInicial * (this.tasaNominalAnual / 100) * (this.plazo / 365);
    this.capitalFinal = parseFloat(this.capitalInicial + interesPeriodo)
  }

  mostrarResultados() {
    limpiarResultadoAnterior("sectionSim","resultados")
    const sectionSim = document.getElementById("sectionSim")
    const divResultados = document.createElement("div")
    divResultados.id="resultados"
    divResultados.classList.add("cajaResultados")    
    sectionSim.appendChild(divResultados)
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


const inversiones = []

function guardarInversionesEnLS() {
  localStorage.setItem("inversiones", JSON.stringify(inversiones))  
}

function traerInversionesDelLS() {
  return JSON.parse(localStorage.getItem("inversiones"))
}

function simularInversion(nombre, capitalInicial, plazo){ 
  const inversion = new Inversion(nombre)
  inversion.validarNombre(nombre)
  inversion.validarCapitalInicial(capitalInicial)
  inversion.validarPlazo(plazo)
  inversion.determinarTasaNominalAnual()
  inversion.calcularInteresSimple()
  if (capitalInicial > 0 && plazo > 0 && inversion.validarNombre(nombre)!=false) {
    inversion.mostrarResultados() 
    inversiones.push(inversion) 
    guardarInversionesEnLS() 
  }
}

function traerInversionesDelLSalInicio() {
  const inversionesSesiónAnterior = traerInversionesDelLS()
  if (inversionesSesiónAnterior) {
    for (let i = 0; i < inversionesSesiónAnterior.length; i++) {
      inversiones.push(inversionesSesiónAnterior[i])
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  traerInversionesDelLSalInicio()
})

let btnSimularInversion=document.getElementById("simularInversion")
btnSimularInversion.addEventListener("click", (event) => {
  event.preventDefault()
  let nombre = document.getElementById("nombre").value
  let capitalInicial = parseFloat(document.getElementById("capitalInicial").value)
  let plazo = parseInt(document.getElementById("plazo").value)
  simularInversion(nombre, capitalInicial, plazo) 
})

let resetBtn=document.getElementById("resetBtn")
resetBtn.addEventListener("click", (event) => {
  event.preventDefault()
  localStorage.clear()
  document.getElementById("reseteoLS").innerHTML="Las simulaciones han sido eliminadas"
})


function mostrarResultadoBusqueda(resultado){
  limpiarResultadoAnterior("sectionBus","resultadosBus")
  const sectionBus=document.getElementById("sectionBus")
  const divResultadosBus = document.createElement("div")
  divResultadosBus.id="resultadosBus"
  divResultadosBus.classList.add("cajaResultadosBus")    
  sectionBus.appendChild(divResultadosBus)
  divResultadosBus.innerHTML = `
    <p class="text-center">Resultado de la búsqueda:</p>
    <ul class="listaResultados">
      <li>Nombre: ${resultado.nombre}</li>
      <li>Capital Inicial: $${resultado.capitalInicial}</li>
      <li>Plazo: ${resultado.plazo} días</li>
      <li>Tasa Nominal Anual: ${resultado.tasaNominalAnual}%</li>
      <li>Capital final: $${resultado.capitalFinal.toFixed(2)}</li>
    </ul>
    <button id="btnEliminarInversion" class="btn btn-primary mt-4">Eliminar inversión del registro</button>
    <div id="confirmacionEliminacion" class="form-text text-center"></div> 
    `
  let btnEliminacionRegistro=document.getElementById("btnEliminarInversion")
  btnEliminacionRegistro.addEventListener("click", eliminarInversion)
}

function validarNombreBus(buscarNombre){
  let busquedaNombreError = document.getElementById("busquedaNombreError")
  if (buscarNombre === "") {
    busquedaNombreError.innerHTML = "Completa este campo"
    return false
  } 
  
  let inversiones = traerInversionesDelLS()
  let verificarNombre = inversiones.find(inversion => inversion.nombre.toLowerCase() === buscarNombre.toLowerCase())
  if (!verificarNombre) {
    busquedaNombreError.innerHTML = "No contamos con inversiones bajo ese nombre."
    return false
  }

  busquedaNombreError.innerHTML = ""
  return true
}

function buscarPorNombre() {
  let buscarNombre = document.getElementById("buscarNombre").value
  if (validarNombreBus(buscarNombre)===true) {
    let resultado = traerInversionesDelLS().find(inversion => inversion.nombre.toLowerCase() === buscarNombre.toLowerCase())
    mostrarResultadoBusqueda(resultado)    
  }
}

let btnBusqueda=document.getElementById("btnBusquedaNombre")
btnBusqueda.addEventListener("click", buscarPorNombre)

function eliminarInversion(){ 
  let nombreInversion = document.getElementById("buscarNombre").value
  let inversion=inversiones.find(inversion => inversion.nombre.toLowerCase() === nombreInversion.toLowerCase())
  let index = inversiones.indexOf(inversion)
  inversiones.splice(index, 1)
  document.getElementById("confirmacionEliminacion").innerHTML="Registro eliminado correctamente"
  guardarInversionesEnLS()  
}


function resumenSimulaciones(){
  let inversionesResumen=traerInversionesDelLS()
  contenido=""
  inversionesResumen.forEach(inversion => {
    contenido+= `
        <div class="cajasSimulaciones">
          <p class="text-center">Simulación de ${inversion.nombre}</p>
          <ul class="listaResultados">
            <li>Capital Inicial: $${inversion.capitalInicial}</li>
            <li>Plazo: ${inversion.plazo} días</li>
            <li>Tasa Nominal Anual: ${inversion.tasaNominalAnual}%</li>
            <li>Capital final: $${inversion.capitalFinal.toFixed(2)}</li>
          </ul>
        </div>
       `
  })
  document.getElementById("resumenSimulaciones").classList.add("contenedorSimulaciones")
  document.getElementById("resumenSimulaciones").innerHTML=contenido
}

let btnResumen=document.getElementById("resumen")
btnResumen.addEventListener("click", resumenSimulaciones)
