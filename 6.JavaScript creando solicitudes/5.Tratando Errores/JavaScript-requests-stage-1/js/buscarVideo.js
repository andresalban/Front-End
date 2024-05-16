import { conectaAPI } from "./conectaAPI.js";
import construyeCard from "./mostrarVideos.js";

//validaciones

async function buscarVideo(evento){
    evento.preventDefault();
    const datosDeBusqueda=document.querySelector("[data-busqueda]").value;
    const buscar= await conectaAPI.buscarVideo(datosDeBusqueda);

    const listaDeBusqueda=document.querySelector("[data-lista]");

    /* while(listaDeBusqueda.firstChild){
        console.log(listaDeBusqueda.firstChild)
        listaDeBusqueda.removeChild(listaDeBusqueda.firstChild)
    } */
    listaDeBusqueda.replaceChildren();

    buscar.forEach(elemento => listaDeBusqueda.
        appendChild(construyeCard(elemento.titulo,elemento.descripcion,elemento.url,elemento.imagen)));
    if (buscar.length===0){
        listaDeBusqueda.innerHTML=`<h2 class="mensaje__titulo">No fueron encontrados datos para ${datosDeBusqueda}</h2>`
    }
}


const botonBusqueda=document.querySelector("[data-boton-busqueda]");
botonBusqueda.addEventListener("click",evento=>buscarVideo(evento))

const inputEle = document.getElementById('buscar');
inputEle.addEventListener('keyup', function(e){
    var key = e.which || e.keyCode;
    if (key === 13) {
        buscarVideo(e)
    }
});