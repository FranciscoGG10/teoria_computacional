var alfabeto;

//Funcion que alerta si el alfabeto es valido o no
function validarAlfabeto() {
    if (validacion()) {
        alert("El alfabeto ingresado es válido.");
    } else {
        alert("El alfabeto ingresado no es válido. Por favor, ingrese 3 o más símbolos separados por comas o un rango.");
    }
}

//Funcion que verifica que el alfabeto sea valido
function validacion() {
    alfabetoInput = document.getElementById("alfabetoInput").value.trim();

    // Si no se ingresa nada en el alfabeto asignar λ como alfabeto
    alfabeto = alfabetoInput === "" ? "λ" : alfabetoInput;

    // Expresión regular para validar el formato del alfabeto
    var regex = /^(?!a-a|A-A|b-b|B-B|c-c|C-C|d-d|D-D|e-e|E-E|f-f|F-F|g-g|G-G|h-h|H-H|i-i|I-I|j-j|J-J|k-k|K-K|l-l|L-L|m-m|M-M|n-n|N-N|ñ-ñ|Ñ-Ñ|o-o|O-O|p-p|P-P|q-q|Q-Q|r-r|R-R|s-s|S-S|t-t|T-T|u-u|U-U|v-v|V-V|w-w|W-W|x-x|X-X|y-y|Y-Y|z-z|Z-Z|0-0|1-1|2-2|3-3|4-4|5-5|6-6|7-7|8-8|9-9|a-b|A-B|b-c|B-C|c-d|C-D|d-e|D-E|e-f|E-F|f-g|F-G|g-h|G-H|h-i|H-I|i-j|I-J|j-k|J-K|k-l|K-L|l-m|L-M|m-n|M-N|n-o|N-O|o-p|O-P|p-q|P-Q|q-r|Q-R|r-s|R-S|s-t|S-T|t-u|T-U|u-v|U-V|v-w|V-W|w-x|W-X|x-y|X-Y|y-z|Y-Z|1-2|2-3|3-4|4-5|5-6|6-7|7-8|8-9)([a-z]-[a-z]|[A-Z]-[A-Z]|[0-9]-[0-9]|([a-z],)+([a-z],)+[a-z]|([A-Z],)+([A-Z],)+[A-Z]|([0-9],)+([0-9],)+[0-9])$/;

    return regex.test(alfabeto);
}

//Funcion que imprime el alfabeto con formato
function mostrarAlfabeto() {
    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }
    var alfabetoSplit = enlistar();

    var alfabetoCompleto = "";
    alfabetoCompleto += ("Σ = {" + alfabetoSplit.join(', ') + "}");
    document.getElementById("alfabetocompleto").innerHTML = alfabetoCompleto;
}

//Funcion que agrega a un arreglo cada elemento del alfabeto
function enlistar(){
    // Expandir por comas
    var alfabetoSplit = alfabeto.split(',');

    // Expandir los rangos en el alfabeto
    for (var i = 0; i < alfabetoSplit.length; i++) {
        if (alfabetoSplit[i].includes("-")) {
            var rangoExpandido = expandirRango(alfabetoSplit[i]); 
            alfabetoSplit.splice(i, 1, ...rangoExpandido.split(','));
        }
    }
    return alfabetoSplit;
}

// Función para expandir un rango en una cadena completa de caracteres
function expandirRango(rango) {
    var inicio = rango.charCodeAt(0); // Obtener el código ASCII del primer carácter del rango
    var fin = rango.charCodeAt(2); // Obtener el código ASCII del último carácter del rango
    var cadena = "";

    // Generar una cadena completa de caracteres incluyendo todos los caracteres dentro del rango
    for (var i = inicio; i <= fin; i++) {
        cadena += String.fromCharCode(i); // Convertir el código ASCII a carácter y agregarlo a la cadena
        if (i < fin) {
            cadena += ",";
        }
    }
    return cadena;
}

//Funcion que vuelve el alfabeto a una cadena
function convertirAlfabeto() {
    var resultado = '';
    var partes = alfabeto.split(',');

    partes.forEach(function(part) {
        if (part.includes('-')) {
            // Si es un rango
            var inicio = part.charCodeAt(0);
            var fin = part.charCodeAt(2);
            for (var i = inicio; i <= fin; i++) {
                resultado += String.fromCharCode(i);
            }
        } else {
            // Si es un conjunto de caracteres
            resultado += part;
        }
    });
    alfabeto = resultado;
}

//Funcion para validar si las cadenas ingresadas son validas
function validarCadenas() {
    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }

    var cadena1 = document.getElementById("cadena1Input").value.trim();
    var cadena2 = document.getElementById("cadena2Input").value.trim();

    //Si la cadena 1 es vacia
    if (cadena1 === "") {
        // y la cadena 2 no lo es
        if (cadena2 !== "") {
            if (!validarCadena(cadena2)) {
                alert("Una o ambas cadenas contienen símbolos inválidos.");
                return;
            }
        }
    //o si ninguna es vacia
    } else {
        if (!validarCadena(cadena1) || !validarCadena(cadena2)) {
            alert("Una o ambas cadenas contienen símbolos inválidos.");
            return;
        }
    }

    var relacion = determinarRelacion(cadena1, cadena2);
    document.getElementById("relacionOutput").innerHTML = relacion;
}

//Funcion que verifica que la cadena sean validas para el alfabeto
function validarCadena(cadena) {
    convertirAlfabeto();

    for (var i = 0; i < cadena.length; i++) {
        if (!alfabeto.includes(cadena[i])) {
            return false;
        }
    }
    return true;
}

//Funcion que recorre los casos y devuelve el resultado
function determinarRelacion(cadena1, cadena2) {
    if (cadena1 === "") {
        if (cadena2 !== "") {
            return "Cadena 1 es sufijo, prefijo y subcadena impropia de Cadena 2.";
        } else {
            return "No se puede determinar la relación ya que ambas cadenas son vacías.";
        }
    }
    
    if (cadena1 === cadena2) {
        return "Ambas cadenas son iguales.";
    }

    if (cadena2 === "") {
        return "No se puede determinar la relación de la cadena 1 con la Cadena 2 ya que esta es vacía y Cadena 1 no lo es.";
    }

    if (cadena2.startsWith(cadena1)) {
        if (cadena2.endsWith(cadena1)) {
            return "Cadena 1 es tanto un prefijo como un sufijo de Cadena 2.";
        }
        return "Cadena 1 es un prefijo de Cadena 2.";
    }

    if (cadena2.endsWith(cadena1)) {
        return "Cadena 1 es un sufijo de Cadena 2.";
    }

    if (cadena2.includes(cadena1)) {
        return "Cadena 1 es una subcadena de Cadena 2.";
    }

    if (esSubsecuencia(cadena1, cadena2)) {
        return "Cadena 1 es una subsecuencia de Cadena 2.";
    }

    return "Cadena 1 no es prefijo, sufijo, subcadena ni subsecuencia de Cadena 2.";
}

//Funcion que verifica si la cadena 1 es subsecuencia de la cadena 2
function esSubsecuencia(cadena1, cadena2) {
    var i = 0;
    var j = 0;

    while (i < cadena1.length && j < cadena2.length) {
        if (cadena1[i] === cadena2[j]) {
            i++;
        }
        j++;
    }

    return i === cadena1.length;
}

//Funcion que genera 2 lenguajes apartir del alfabeto
function generarLenguajes() {
    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }
    convertirAlfabeto();

    var numPalabras = parseInt(document.getElementById('numElementosInput').value.trim());
    var longitud = parseInt(document.getElementById('longitudInput').value.trim());

    var lenguaje1 = [];
    var lenguaje2 = [];

    // Conjuntos para evitar palabras repetidas
    var conjunto1 = new Set();
    var conjunto2 = new Set();

    // Generar palabras para el lenguaje1
    for (var i = 0; i < numPalabras; i++) {
        var palabra = generarPalabra(longitud);
        while (conjunto1.has(palabra)) {
            palabra = generarPalabra(longitud);
        }
        lenguaje1.push(palabra);
        conjunto1.add(palabra);
    }

    // Generar palabras para el lenguaje2
    for (var i = 0; i < numPalabras; i++) {
        var palabra = generarPalabra(longitud);
        while (conjunto2.has(palabra)) {
            palabra = generarPalabra(longitud);
        }
        lenguaje2.push(palabra);
        conjunto2.add(palabra);
    }

    document.getElementById('lenguajesOutput').innerText = "Lenguaje L1: " + lenguaje1.join(", ") + "\nLenguaje L2: " + lenguaje2.join(", ");

    generarDiferencia(lenguaje1, lenguaje2);
}

// Función para generar una palabra aleatoria de longitud n
function generarPalabra(longitud) {
    var palabra = "";
    for (var j = 0; j < longitud; j++) {
        var iRand = Math.floor(Math.random() * alfabeto.length);
        palabra += alfabeto[iRand];
    }
    return palabra;
}

//Funcion que genera el lenguaje resultantes del Lenguaje 1 - Lengueje 2
function generarDiferencia(lenguaje1, lenguaje2) {
    var diferencia = [];

    // Recorrer cada palabra del lenguaje1
    for (var i = 0; i < lenguaje1.length; i++) {
        var palabra = lenguaje1[i];
        var encontrada = false;

        // Verificar si la palabra está en el lenguaje2
        for (var j = 0; j < lenguaje2.length; j++) {
            if (lenguaje2[j] === palabra) {
                encontrada = true;
                break;
            }
        }

        // Si la palabra no se encuentra en el lenguaje2, agregarla a la diferencia
        if (!encontrada) {
            diferencia.push(palabra);
        }
    }

    // Mostrar la diferencia en el elemento diferenciaOutput
    document.getElementById('diferenciaOutput').innerText = "Diferencia entre L1 y L2: " + diferencia.join(", ");
}

// Función para calcular y mostrar la potencia del alfabeto
function calcularPotencia() {
    // Verificar si el alfabeto es válido
    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }
    var potencia = parseInt(document.getElementById("potenciaInput").value);
    var resultado = "";

    if (potencia === 0) {
        // Caso especial cuando la potencia es 0
        resultado = "|Σ^0| = 1<br>Σ^0 = {λ}";
    } else {
        var alfabetoCompleto = enlistar(); // Obtener el alfabeto completo
        var combinaciones = generarCombinaciones(alfabetoCompleto, Math.abs(potencia));
        var numeroElementos = combinaciones.length;

        if (potencia > 0) {
            // Potencia positiva: usar las combinaciones generadas tal como están
            resultado += "|Σ^" + potencia + "| = " + numeroElementos + "<br>Σ^" + potencia + " = {" + combinaciones.join(", ") + "}";
        } else {
            // Potencia negativa: invertir el orden de las combinaciones
            var combinacionesNegativas = combinaciones.slice().reverse(); // Copiar y revertir el arreglo
            resultado += "|Σ^" + potencia + "| = " + numeroElementos + "<br>Σ^" + potencia + " = {" + combinacionesNegativas.join(", ") + "}";
        }
    }

    // Mostrar el resultado en el HTML
    document.getElementById("potenciaOutput").innerHTML = resultado;
}

// Función para generar todas las combinaciones de longitud 'n' con los símbolos del alfabeto
function generarCombinaciones(alfabeto, longitud) {
    var combinaciones = [];

    function generarCombinacionesRecursivo(actual) {
        // Si la longitud de la combinación actual es igual a la longitud deseada, agregar la combinación actual al arreglo de combinaciones
        if (actual.length === longitud) {
            combinaciones.push(actual);
            return;
        }

        // Generar combinaciones recursivamente añadiendo cada símbolo del alfabeto a la combinación actual y llamando de nuevo a la función recursiva
        for (var i = 0; i < alfabeto.length; i++) {
            generarCombinacionesRecursivo(actual + alfabeto[i]);
        }
    }
    // Iniciar la generación de combinaciones con una cadena vacía como combinación actual
    generarCombinacionesRecursivo("");

    // Retornar el arreglo de combinaciones generado
    return combinaciones;
}


function validarPlaca() {
    var placa = document.getElementById('placaInput').value.trim().toUpperCase();

    // Expresiones regulares para validar las placas según cada demarcación
    var regexCDMX = /^[A-Z]{3}-[0-9]{3}$/; // Formato: Tres letras seguidas de un guion y tres números
    var regexEdoMex = /^[A-Z]{3}-[0-9]{2}-[0-9]{2}$/; // Formato: Tres letras seguidas de un guion, dos números, un guion y dos números
    var regexMorelos = /^[A-Z]{3}-[0-9]{3}-[A-Z]$/; // Formato: Tres letras seguidas de un guion, tres números y una letra

    // Validar la placa utilizando las expresiones regulares
    if (regexCDMX.test(placa)) {
        document.getElementById('placaOutput').innerText = "La placa " + placa + " es válida para Ciudad de México.";
    } else if (regexEdoMex.test(placa)) {
        document.getElementById('placaOutput').innerText = "La placa " + placa + " es válida para Estado de México.";
    } else if (regexMorelos.test(placa)) {
        document.getElementById('placaOutput').innerText = "La placa " + placa + " es válida para Morelos.";
    } else {
        document.getElementById('placaOutput').innerText = "La placa " + placa + " no es válida. Por favor, ingrese una placa en un formato válido.";
    }
}