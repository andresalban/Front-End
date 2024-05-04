const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar =document.querySelector('#start-pause')
const textoIniciarPausar =document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTrasncurridoEnSegundos=1500
let idIntervalo=null

musica.loop = true;
inputEnfoqueMusica.addEventListener('change',()=>{
    if (musica.paused){
        musica.play()
    }else {
        musica.pause()
    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoTrasncurridoEnSegundos = 1500
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonCorto.addEventListener('click', () => {
    
    tiempoTrasncurridoEnSegundos = 300
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTrasncurridoEnSegundos = 900
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {
    mostrarTiempo()
    botones.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Que tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong> `
            break
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong> `
    }
}

const cuentaRegresiva = () =>{
    if(tiempoTrasncurridoEnSegundos<=0){
        audioTiempoFinalizado.play()
        alert('tiempo final');
        reiniciar()
        return 
    }
    textoIniciarPausar.textContent="Pausar"
    tiempoTrasncurridoEnSegundos-= 1
    console.log(tiempoTrasncurridoEnSegundos)
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click',iniciarPausar)

function iniciarPausar(){
    if (idIntervalo){
        audioPausa.play();
        reiniciar()
        return
    }
    audioPlay.play()
    idIntervalo=setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo=null
    textoIniciarPausar.textContent="Comenzar"
}

function mostrarTiempo(){
    const tiempo= new Date(tiempoTrasncurridoEnSegundos*1000);
    const tiempoFormateado= tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML=`${tiempoFormateado}`
}

mostrarTiempo()