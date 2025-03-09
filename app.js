//Se crea una varaiable y le asignamos un valor. Se agrega el nombre de la etiqueta. H1 es un objeto. Header
//let titulo = document.querySelector('h1');
//La funcion es para colacar el titulo al header que seleccionamos
// titulo.innerHTML = "Juego del numero secreto 2.0";
//Se agregara un segundo titulo en base al parrafo, en HTTM como P
//let parrafo = document.querySelector("p");
//parrafo.innerHTML = "Indica un numero del 1 al 10"
// La function se utiliza una vez que se creo el elemento en HTML, lo declaramos aqui para su uso

let intentos = 0;
let numeroSecreto = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function generarNumeroSecreto() {
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Deshabilita el botón
    return null; // Indica que ya no hay números disponibles
  }

  let numeroGenerado;
  do {
    numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  } while (listaNumerosSorteados.includes(numeroGenerado));

  listaNumerosSorteados.push(numeroGenerado);
  console.log(`Número generado: ${numeroGenerado}`);
  console.log(`Números sorteados: ${listaNumerosSorteados}`);
  
  return numeroGenerado;
}

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  if (elementoHTML) {
    elementoHTML.innerHTML = texto;
  }
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
  console.log(`Número Secreto: ${numeroSecreto}, Intentos: ${intentos}`);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      'p',
      `¡Acertaste el número secreto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`
    );
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    intentos++;

    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento('p', 'El número secreto es menor');
    } else {
      asignarTextoElemento('p', 'El número secreto es mayor');
    }

    limpiaCaja();
  }
}

function limpiaCaja() {
  document.querySelector('#valorUsuario').value = '';
}

function condicionesIniciales() {
  asignarTextoElemento('h1', 'Juego del número secreto 2.0');
  asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);

  numeroSecreto = generarNumeroSecreto();
  if (numeroSecreto === null) return; // Evita continuar si no hay más números disponibles

  intentos = 1;
  document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Asegura que el botón se deshabilite
}

function reiniciarJuego() {
  limpiaCaja();
  condicionesIniciales();
}

condicionesIniciales();

