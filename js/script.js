//Right and left arrow
let rightArrow = document.querySelector("#carousel-1 .right-arrow");
let leftArrow = document.querySelector("#carousel-1 .left-arrow");
//List of all the screens in carousel
let screenStore = document.querySelectorAll("#carousel-1 .carousel-screen");
let numOfScreens = screenStore.length;

//List of all the circles
let circleStore = document.querySelectorAll("#carousel-1 .circle-container .circle");
//Number to target main screen
let currentScreen = 0;
//Currently in animation
let inAnim = false;
//Animation time
let animTime = 500;

//Sort out starting position
sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
highlightCircle(circleStore[0]);

//User clicks in left arrow
rightArrow.addEventListener("click", event =>{
    startAnim("right");
})

leftArrow.addEventListener("click", event =>{
    startAnim("left");
})

function startAnim(direction){
    if(!inAnim){
        inAnim = true;
        if(direction === "right"){
            moveRight();
            highlightCircle(circleStore[currentScreen + 1], "right")
        }else if(direction === "left"){
            moveLeft();
            highlightCircle(circleStore[currentScreen - 1], "left")
        }else{
            inAnim = false;
            return
        }
    }
}

//Move screens
function moveRight(){
    if(currentScreen < numOfScreens - 1){
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[currentScreen + 1]);
        setTimeout(()=>{
            inAnim = false;
            currentScreen++;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1],screenStore[currentScreen + 1]);
        }, animTime)
    }else{
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[0]);
        setTimeout(()=>{
            inAnim = false;
            currentScreen = 0;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1],screenStore[currentScreen + 1]);
        }, animTime)
    }
}

function moveLeft(){
    if(currentScreen > 0){
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[currentScreen - 1]);
        setTimeout(()=>{
            inAnim = false;
            currentScreen--;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1],screenStore[currentScreen + 1]);
        }, animTime)
    }else{
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[numOfScreens - 1]);
        setTimeout(()=>{
            inAnim = false;
            currentScreen = numOfScreens - 1;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1],screenStore[currentScreen + 1]);
        }, animTime)
    }
}

//Animation functions
function toLeft(screen){
    screen.style.animation = "toLeft 0.5s ease-in-out forwards";
    setTimeout(()=>{
        screen.style.animation = "";
    }, animTime)
}

function toRight(screen){
    screen.style.animation = "toRight 0.5s ease-in-out forwards";
    setTimeout(()=>{
        screen.style.animation = "";
    }, animTime)
}

function comeRight(screen){
    screen.style.animation = "comeRight 0.5s ease-in-out forwards";
    setTimeout(()=>{
        screen.style.animation = "";
    }, animTime)
}

function comeLeft(screen){
    screen.style.animation = "comeLeft 0.5s ease-in-out forwards";
    setTimeout(()=>{
        screen.style.animation = "";
    }, animTime)
}

//Sort positioning. Don't want images to overlap
function sortPositioning(mainScreen, leftScreen, rightScreen){
    //If right screen is undefined. We need to repeat first screen again
    if(rightScreen === undefined){
        rightScreen = screenStore[0];
    }
    //If the left screen is undefines we need to repeat last screeen again
    if(leftScreen === undefined){
        leftScreen = screenStore[numOfScreens - 1];
    }
    screenStore.forEach(screen => {
        if(screen === mainScreen){
            screen.style.display = "block";
            screen.style.left = "0px";
        }else if(screen === leftScreen){
            screen.style.display = "block";
            screen.style.left = "-100%";
        }else if(screen === rightScreen){
            screen.style.display = "block";
            screen.style.left = "100%";
        }else{
            screen.style.display = "none";
        }
    })
}

//User click on one of the circle
circleStore.forEach(circle => {
    circle.addEventListener("click", event => {
        if(!inAnim){
            //Convert NodeList in array to use "indexOf" method
            let circleStoreArray = Array.prototype.slice.call(circleStore);
            let circleIndex = circleStoreArray.indexOf(event.target);
            //Configure circle styling
            highlightCircle(event.target);
            //Ver hacia donde debe moverse
            if(circleIndex > currentScreen){
                changeScreenCircleClick(circleIndex, "right")
            }else if(circleIndex < currentScreen){
                changeScreenCircleClick(circleIndex, "left")
            }
        }
    })
})

function changeScreenCircleClick(circleIndex, direction){
    inAnim = true;
    if(direction === "right"){
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[circleIndex]);
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[circleIndex]);
    }else if(direction === "left"){
        sortPositioning(screenStore[currentScreen], screenStore[circleIndex], screenStore[currentScreen + 1]);
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[circleIndex]);
    }else{
        inAnim = false;
        return
    }
    setTimeout(() => {
        inAnim = false;
        currentScreen = circleIndex;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime);
}

function highlightCircle(circleSelect, direction){
    if(circleSelect === undefined && direction === "right"){
        circleSelect = circleStore[0];
    }else if (circleSelect === undefined && direction === "left"){
        circleSelect = circleStore[numOfScreens - 1];
    }
    
    circleStore.forEach(circle =>{
        if(circle === circleSelect){
            circle.classList.add("circle-fill");
        }else{
            circle.classList.remove("circle-fill");
        }
    })
}

//Auto Scroll
let carousel = document.getElementById("carousel-1");
let scrollTime = Number(carousel.getAttribute("auto-scroll"));

//Only implement the feature if auto-scroll is implemented
if(scrollTime) {
    let autoWipe = setInterval(() =>{
        startAnim("right");
    }, scrollTime)
    //Clear timer
    carousel.addEventListener("mouseenter", () =>{
        clearInterval(autoWipe);
    });
    carousel.addEventListener("mouseleave", () =>{
        autoWipe = setInterval(() =>{
            startAnim("right");
        }, scrollTime)
    })
}


/* ----------------------------- Scripts MAPA ----------------------------- */

let map1;
let map2;
let map3;
let marker1;
let marker2;
let marker3;
const sede1LatLong = { lat: -34.56760130428712, lng: -58.40867286049254 };
const sede2LatLong = { lat: -34.56038193991989, lng: -58.483801728514585 };
const sede3LatLong = { lat: -34.64651177439561, lng: -58.376591997153874 };
let sede1 = document.getElementById("sedeBosques");
let sede2 = document.getElementById("sedeVilla");
let sede3 = document.getElementById("sedeBarracas");

let sedeElegida = document.querySelectorAll("#sedeElegida");

function initMap() {
  map = new google.maps.Map(document.getElementById("sede1"), {
    center: { lat: -34.60294212711319, lng: -58.436618272478746 },
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] }
    ],
    disableDefaultUI: true
  });
  marker1 = new google.maps.Marker({
    position: sede1LatLong,
    title: "Sede Bosques",
    map: map,
    icon: {
        url: "img/Identidad Padel Point/Logo_negro.svg", // url
        scaledSize: new google.maps.Size(50, 50), 
    }
  });
  marker2 = new google.maps.Marker({
    position: sede2LatLong,
    title: "Sede Villa Urquiza",
    map: map,
    icon: {
        url: "img/Identidad Padel Point/Logo_negro.svg", // url
        scaledSize: new google.maps.Size(50, 50), 
    }
  });
  marker3 = new google.maps.Marker({
    position: sede3LatLong,
    title: "Sede Barracas",
    map: map,
    icon: {
        url: "img/Identidad Padel Point/Logo_negro.svg", // url
        scaledSize: new google.maps.Size(50, 50), 
    }
  });

  marker1.addListener("click", () => {
    sede1.style.backgroundColor = '#e9e9e9';
    sede2.style.backgroundColor = 'transparent';
    sede3.style.backgroundColor = 'transparent';
  });
  marker2.addListener("click", () => {
    sede1.style.backgroundColor = 'transparent';
    sede2.style.backgroundColor = '#e9e9e9';
    sede3.style.backgroundColor = 'transparent';
  });
  marker3.addListener("click", () => {
    sede1.style.backgroundColor = 'transparent';
    sede2.style.backgroundColor = 'transparent';
    sede3.style.backgroundColor = '#e9e9e9';
  });

}

window.initMap = initMap;

/* ----------------------------- Scripts Formulario ----------------------------- */

var formulario = document.getElementsByName('formulario')[0],  //[0] Primer elemento, el formulario en si mismo.
        boton = document.getElementById('btn') // El botón

        // --------------------------------------------------------
        // Validamos Nombre
        // --------------------------------------------------------
        var validarNombre = function (e) {
            if (formulario.nombre.value == 0) { // Si el campo id="nombre" del form está vacio...
                alert("Necesitamos conocer tu nombre")
                e.preventDefault() // Evita el comportamiento por defecto
            }
        }
        var validarApellido = function (e) {
          if (formulario.apellido.value == 0) { // Si el campo id="nombre" del form está vacio...
              alert("Necesitamos conocer tu apellido")
              e.preventDefault() // Evita el comportamiento por defecto
          }
        }
        var validarEmail = function (e) {
          if (formulario.email.value == 0) { // Si el campo id="nombre" del form está vacio...
              alert("Por favor ingresá un e-mail")
              e.preventDefault() // Evita el comportamiento por defecto
          }
        }
        var validarTexto = function (e) {
          if (formulario.texto.value == 0) { // Si el campo id="nombre" del form está vacio...
              alert("¡No olvides escribir tu mensaje!")
              e.preventDefault() // Evita el comportamiento por defecto
          }
        }

        // --------------------------------------------------------
        // Validamos Términos y Condiciones
        // --------------------------------------------------------
        var validarCheckbox = function (e) {
            if (formulario.terminos.checked == false) {
                alert("Aceptá los términos y condiciones")
                e.preventDefault()
            }
        };

        // --------------------------------------------------------
        // Se ejecuta al presionar submit e invoca a las tres validaciones
        // --------------------------------------------------------
        var validar = function (e) {  // "e" es el evento recibido del form (https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault)
            validarNombre(e)
            validarApellido(e)
            validarEmail(e)
            validarTexto(e)
            validarCheckbox(e)
        }

        // --------------------------------------------------------
        // Espera que se presione "enviar" y llama a "validar"
        // submit es un evento DEL FORM, no del botón!
        formulario.addEventListener("submit", validar)