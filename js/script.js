// const { captureRejectionSymbol } = require("http-proxy");

// const { json } = require("express");

// const { json } = require("express");

//funcion que se usa para habilitar la edad del conyuge  si es que el usuario esta casado
function habilitarInput() {
  var select = document.getElementById("estadoC");
  var input = document.getElementById("edadCon");
  var label = document.getElementById("lbl-estadoC");
  if (select.value === "soltero") {
    input.style = 'opacity: 0;';
    label.style = 'opacity: 0;'
  } else {
    input.style = 'opacity: 100;';
    label.style = 'opacity: 100;'
  }
}

var estimarIMSS = 0;

function habilitarInputIMSS() {
  var select = document.getElementById("montoIMSS");
  var msg = document.getElementById("msj-info-imss");
  var input_imss = document.getElementById("input-imss");
  var input_saldo = document.getElementById("saldoIMSS");
  if (select.value === "0") {
    msg.style.display = "block";
    input_imss.style.display = "none";
    input_saldo.value ="";
    input_saldo.required = false;
    // estimarIMSS=0;
  } else if (select.value === "1") {
    input_saldo.required = true;
    
    input_imss.style.display = "block";
    msg.style.display = "none";
    // estimarIMSS=1;
  }

}

var estimarRJP = 0;

function habilitarInputRJP() {
  var select = document.getElementById("montoRJP");
  var msg = document.getElementById("msj-info-rjp");
  var input_imss = document.getElementById("input-RJP");
  var input_saldo = document.getElementById("saldoRJP");
  if (select.value === "0") {
    msg.style.display = "block";
    input_imss.style.display = "none";
    input_saldo.value = "";
    input_saldo.required = "";
    // estimar_RJP=0;
  } else if (select.value === "1") {
    input_saldo.required= true;
    input_imss.style.display = "block";
    msg.style.display = "none";
    // estimar_RJP=1;
  }

}





//funcion en la ventana de resultados que me divide en 3 botones 

function mostrarResultado(divId) {



  // Oculta todos los resultados
  var resultados = document.getElementsByClassName('resultado');
  for (var i = 0; i < resultados.length; i++) {
    resultados[i].style.display = 'none';

  }

  // Muestra el resultado correspondiente al div seleccionado
  var resultado = document.getElementById(divId);
  resultado.style.display = 'block';
}

var semanasCotizadas;

//en el evento submit se cambia la url por la que se obtenga en el servidor  en la peticion POST

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
   
 
  // Obtiene los valores de los campos del formulario

  const semanasCot = document.getElementById("semanasCot").value
  const fechaIng = document.getElementById("fechaIng").value
  const edadActual = document.getElementById("edadActual").value
  const genero = document.getElementById("sexo").value
  const estadoCiv = document.getElementById("estadoC").value
  const edadCon = document.getElementById("edadCon").value
  const sueldoCot = document.getElementById("sueldoCot").value
  // const sueldoCot = sueldoCoti * 2;
  const saldoIMSSS = document.getElementById("saldoIMSS").value
  var saldoIMSS = saldoIMSSS;
  if (saldoIMSS === "") {
    saldoIMSS = "0";
    estimarIMSS = 1;
  } else {
    estimarIMSS = 0;
  }

  const saldoRJP_recibo = document.getElementById("saldoRJP").value
  var saldoRJP = saldoRJP_recibo;
  if (saldoRJP == "") {
    saldoRJP = "0";
    estimarRJP = 1;
  } else {
    estimarRJP = 0;
  }

  const infonavit = document.getElementById("comboInf").value
  const tasa = document.getElementById("comboTasa").value
  //construimos el objeto json el cual se va enviar a la API con post 

  const data = {
    semanasCot: semanasCot,
    fechaIng: fechaIng,
    edadActual: edadActual,
    genero: genero,
    estadoCiv: estadoCiv,
    edadCon: edadCon,
    sueldoCot: sueldoCot,
    saldoIMSS: saldoIMSS,
    estimarIMSS: estimarIMSS,
    saldoRJP: saldoRJP,
    estimarRJP: estimarRJP,
    infonavit: infonavit,
    tasa: tasa

  }
  
  console.log(data);

  // aqui se cambia esta url  por la url que tengan en donde este montada la app


  const url = 'http://192.168.1.235:8574/sntssrv.dll/api/rest/tsm/calcula_RentaVitalicia';


  axios.post(url, data)
    .then(function (response) {

      var results = response.data; // Resultados devueltos por el servidor

      var jsonResultados = JSON.stringify(results);

      var msg = JSON.parse(jsonResultados);
      // alert(msg);
      // alert(msg.Mensaje);
      // alert(msg.Mensaje);

      if (msg.Mensaje == "OK") {
        setTimeout(function () {
          var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
          var newTab = window.open('resultados.html', windowSize);
          newTab.onload = function () {
            // Envía los resultados a la nueva pestaña
            newTab.postMessage(results, '*');
          };
        }, 1500);

      } else {

        var alert = document.getElementById("alert-padre");
        var mensaje_alerta =document.getElementById("Mensaje-alerta");
        var Mensaje = msg.Mensaje;
        
        alert.innerHTML = `<div class="mb-3 inline-flex w-3/4 mx-auto items-center rounded-2xl rounded-lg bg-red-100 px-6 py-5 italic text-3xl text-red-700 border-3 border-red-700"

          role="alert" style="justify-content: center;">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-11 w-11">
              <path fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd" />
            </svg>
          </span>
          <div id="Mensaje-alerta" >${Mensaje}. Favor de revisar la información.</div> 
        </div>` 

        var rect = alert.getBoundingClientRect();
        var posY = rect.top;
        
        window.scrollTo({
          top: posY,
          behavior: "smooth" // Opcional: hace que el desplazamiento sea suave
        });
        // alert("Error en los datos ingresados favor de revisar." + msg.Mensaje);
      }


    })

    .catch(function (error) {

      console.log(error);
      // console.error('Error:', error);
    });

});

function generarArchivoImpresion() {

  var tablasOcultas = document.querySelectorAll('.pdf');
  for (var i = 0; i < tablasOcultas.length; i++) {
    tablasOcultas[i].style.display = 'table';
  }

  var buttons = document.getElementsByTagName("button");

  var botones = document.querySelectorAll('.boton-ocultar');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'none';
  }

  // Obtener el contenido del div
  var contenidoDiv = document.getElementById('container').innerHTML;

  // Opciones de configuración para html2pdf  
  var opciones = {
    filename: 'archivo_impresion.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Convertir el contenido a PDF 
  html2pdf().set(opciones).from(contenidoDiv).save();


  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "inline";
  }
}



function obtenerAnioActual() {
  var fecha = new Date();
  var anio = fecha.getFullYear();
  return anio;
}
