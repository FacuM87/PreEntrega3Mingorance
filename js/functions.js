const inversiones = []

let badlarReciente
async function obtenerTasaBadlar() {
  try {
    const respuesta = await fetch("https://api.estadisticasbcra.com/tasa_badlar",{
      headers:{ 
          Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk4NDk3NDMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJrampraEBnbWFpbC5jb20ifQ.E0gSRk3el-Qq2QpjYiS2qurzdGLk3aQUZMdTPPYvkw1Jpn1GEyqnWvO9PRPKLNf7GjYIs3aC5YTTBzVDc8z9pA."
        }
      })
    const datos = await respuesta.json()
    console.log(datos)
    badlarReciente=datos[datos.length-1].v
    console.log(badlarReciente)
  } catch (error) {
    badlarReciente="API error"
  }
} 

function limpiarResultadoAnterior(idSection, idDiv){
    const section = document.getElementById(idSection)
    const div = document.getElementById(idDiv)
    if (div && (div.parentNode === section)) {
      section.removeChild(div)
    }  
}

function guardarInversionesEnLS() {
    localStorage.setItem("inversiones", JSON.stringify(inversiones))  
}

function traerInversionesDelLS() {
    return JSON.parse(localStorage.getItem("inversiones"))
}
  
function traerInversionesDelLSalInicio() {
    const inversionesSesionAnterior = traerInversionesDelLS()
    if (inversionesSesionAnterior) {
      for (let i = 0; i < inversionesSesionAnterior.length; i++) {
        inversiones.push(inversionesSesionAnterior[i])
      }
    }
}
  
function simularInversion(nombre, capitalInicial, plazo){ 
    const inversion = new Inversion(nombre)
    inversion.validarNombre(nombre)
    inversion.validarCapitalInicial(capitalInicial)
    inversion.validarPlazo(plazo)
    inversion.determinarTasaNominalAnual()
    inversion.calcularInteresSimple()
    if (capitalInicial > 0 && capitalInicial<1000000 && plazo > 0 && inversion.validarNombre(nombre)!=false) { 
      inversiones.push(inversion) 
      guardarInversionesEnLS()
      inversion.mostrarResultados() 
    }
    if (capitalInicial>=1000000 && badlarReciente!="API error" && plazo > 0 && inversion.validarNombre(nombre)!=false) {
      inversiones.push(inversion) 
      guardarInversionesEnLS()
      inversion.mostrarResultados()
    }
    if (capitalInicial>=1000000 && badlarReciente=="API error" && plazo > 0 && inversion.validarNombre(nombre)!=false) {
      inversion.mostrarResultados()
    }
}

function eliminarInversion(){ 
    const nombreInversion = document.getElementById("buscarNombre").value
    const inversion=inversiones.find(inversion => inversion.nombre.toLowerCase() === nombreInversion.toLowerCase())
    const index = inversiones.indexOf(inversion)
    inversiones.splice(index, 1)
    document.getElementById("confirmacionEliminacion").innerHTML="Registro eliminado correctamente"
    guardarInversionesEnLS()  
}
  
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
    btnEliminacionRegistro.addEventListener("click", (event) => {
        event.preventDefault()
        Swal.fire({
          title: '¿Desea eliminar la simulación almacenada?',
          text: "Esta acción no podrá ser revertida",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0D6EFD',
          cancelButtonColor: '#2F4F4F',
          confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarInversion()
            Swal.fire(
              'Las simulación fue eliminada!','','success'
            )
          }
        })
    })
}

function validarNombreBus(buscarNombre){
    const busquedaNombreError = document.getElementById("busquedaNombreError")
    if (buscarNombre === "") {
        busquedaNombreError.innerHTML = "Completa este campo"
        return false
    } 
    
    const verificarNombre = inversiones.find(inversion => inversion.nombre.toLowerCase() === buscarNombre.toLowerCase())
    if (!verificarNombre || verificarNombre==undefined) {
        busquedaNombreError.innerHTML = "No contamos con inversiones bajo ese nombre."
        return false
    }
  
    busquedaNombreError.innerHTML = ""
    return true
}
  
function buscarPorNombre() {
    const buscarNombre = document.getElementById("buscarNombre").value
    if (validarNombreBus(buscarNombre)===true) {
      const resultado = traerInversionesDelLS().find(inversion => inversion.nombre.toLowerCase() === buscarNombre.toLowerCase())
      mostrarResultadoBusqueda(resultado)    
    }
}

function resumenSimulaciones(){
    const inversionesResumen=traerInversionesDelLS()
    let contenido=""
    if (inversionesResumen) {
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
            </div>`    
        })
        document.getElementById("simulacionesError").innerHTML=""
        document.getElementById("resumenSimulaciones").classList.add("contenedorSimulaciones")
        document.getElementById("resumenSimulaciones").innerHTML=contenido
        } else {document.getElementById("simulacionesError").innerHTML="No hay simulaciones almacenadas"}
}
