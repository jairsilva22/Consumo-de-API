 // Obtener referencias a los elementos del DOM
 const buttonAntecedentes = document.getElementById("button-antecedentes");
 const buttonNormativa = document.getElementById("button-normativa");
 const textAntecedentes = document.getElementById("text-antecedentes");
 const textNormativa = document.getElementById("text-normativa");

 // Función para mostrar los antecedentes y ocultar la normativa
 function mostrarAntecedentes() {
   textAntecedentes.classList.remove("hidden");
   textAntecedentes.classList.add("block");
   textNormativa.classList.add("hidden");
   textNormativa.classList.remove("block");
   buttonAntecedentes.classList.remove("bg-yellow-200");
   buttonAntecedentes.classList.add("bg-yellow-500");
   buttonNormativa.classList.remove("bg-yellow-500");
    buttonNormativa.classList.add("bg-yellow-200");
 }




 // Función para mostrar la normativa y ocultar los antecedentes
 function mostrarNormativa() {
    textAntecedentes.classList.remove("block");
   textAntecedentes.classList.add("hidden");
   textNormativa.classList.add("block");
   textNormativa.classList.remove("hidden");
   buttonAntecedentes.classList.remove("bg-yellow-500")
    buttonAntecedentes.classList.add("bg-yellow-200");
   buttonNormativa.classList.add("bg-yellow-500");
   buttonNormativa.classList.remove("bg-yellow-200 ");
   
//    ;
//    buttonAntecedentes.classList.remove("bg-yellow-200");
 }


 


 //Funcion validar fecha entre  el 01/01/2008 y mañana
    function handleValidarSemanas(input) {
            
            
            input.max = 2600;
            input.min = 0;
            
            if (input.value <= parseInt(input.min) || input.value >= parseInt(input.max)) {
                input.classList.remove("border-gray-300") ;
                input.classList.remove("border-green-300") ;
                input.classList.add("border-red-500");
            }else{
                input.classList.remove("border-gray-300") ;
                input.classList.remove("border-red-500");
                input.classList.add("border-green-300") ;
            }
    }

    // funcion verificar
var semanasCot = document.getElementById("semanasCot").value
var fechaIng = document.getElementById("fechaIng").value
var edadActual = document.getElementById("edadActual").value
// document.onchange(e, verificar());


    function handleValidarFecha(input) {

        const fechaIngresada = input.value;

        const inputLimits = document.getElementById("fechaIng");
        inputLimits.max = new Date().toISOString().split("T")[0];
        inputLimits.min = "2008-01-01";
        
        if (fechaIngresada < inputLimits.min || fechaIngresada > inputLimits.max) {
            
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-green-300") ;
            input.classList.add("border-red-500");
        }else{
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-red-500");
            input.classList.add("border-green-300") ;
        }


        verificar();
    };
    
    function handleValidarEdad(input) {

        input.max = 100;
        input.min = 15;

        
        if(input.value <= parseInt(input.max)  && input.value >= parseInt(input.min)){
                input.classList.remove("border-gray-300") ;
                input.classList.remove("border-red-500") ;
                input.classList.add("border-green-500");
        }else{
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-green-500");
            input.classList.add("border-red-500") ;
        }
        
    } 


    function handleValidarSelected(input){
        if(input.value == "Selecciona una opción"){
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-green-300") ;
            input.classList.add("border-red-500");
        }else{
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-red-500");
            input.classList.add("border-green-300") ;
        }
    }

    function handleValidarFormat(input){
        if(input.value == ""){
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-green-300") ;
            input.classList.add("border-red-500");
        }else{
            input.classList.remove("border-gray-300") ;
            input.classList.remove("border-red-500");
            input.classList.add("border-green-300") ;
        }
        
        input.value=Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:0,maximumFractionDigits:0}).format(input.value);
        

    }


    