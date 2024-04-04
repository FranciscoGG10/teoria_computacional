// Variable global para el alfabeto
var alfabeto;

function validarAlfabeto() {
    if (validacion()) {
        alert("El alfabeto ingresado es válido.");
    } else {
        alert("El alfabeto ingresado no es válido. Por favor, ingrese 3 o más símbolos separados por comas o un rango.");
    }
}

function validacion() {
    // Obtener el valor del alfabeto ingresado por el usuario
    alfabetoInput = document.getElementById("alfabetoInput").value.trim(); // Asignación del valor a la variable global alfabeto

    // Si no se ingresa nada en el campo "Leer el alfabeto", asignar λ como alfabeto base
    alfabeto = alfabetoInput === "" ? "λ" : alfabetoInput;

    // Expresión regular para validar el formato del alfabeto
    var regex = /^(?!a-a|A-A|b-b|B-B|c-c|C-C|d-d|D-D|e-e|E-E|f-f|F-F|g-g|G-G|h-h|H-H|i-i|I-I|j-j|J-J|k-k|K-K|l-l|L-L|m-m|M-M|n-n|N-N|ñ-ñ|Ñ-Ñ|o-o|O-O|p-p|P-P|q-q|Q-Q|r-r|R-R|s-s|S-S|t-t|T-T|u-u|U-U|v-v|V-V|w-w|W-W|x-x|X-X|y-y|Y-Y|z-z|Z-Z|0-0|1-1|2-2|3-3|4-4|5-5|6-6|7-7|8-8|9-9|a-b|A-B|b-c|B-C|c-d|C-D|d-e|D-E|e-f|E-F|f-g|F-G|g-h|G-H|h-i|H-I|i-j|I-J|j-k|J-K|k-l|K-L|l-m|L-M|m-n|M-N|n-o|N-O|o-p|O-P|p-q|P-Q|q-r|Q-R|r-s|R-S|s-t|S-T|t-u|T-U|u-v|U-V|v-w|V-W|w-x|W-X|x-y|X-Y|y-z|Y-Z|1-2|2-3|3-4|4-5|5-6|6-7|7-8|8-9)([a-zA-Z0-9]-[a-zA-Z0-9]|([a-zA-Z0-9],)+([a-zA-Z0-9],)+[a-zA-Z0-9])$/;

    // Verificar si el alfabeto cumple con el formato establecido por la expresión regular
    return regex.test(alfabeto);
}

function mostrarAlfabeto() {
    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }

    var alfabetoSplit = alfabeto.split(',');

    // Expandir los rangos en el alfabeto
    for (var i = 0; i < alfabetoSplit.length; i++) {
        if (alfabetoSplit[i].includes("-")) {
            var rangoExpandido = expandirRango(alfabetoSplit[i]); // Expandir el rango en una cadena completa de caracteres
            alfabetoSplit.splice(i, 1, ...rangoExpandido.split(',')); // Reemplazar el rango con la cadena expandida en el alfabeto
        }
    }

    var alfabetoCompleto = "";
    alfabetoCompleto += ("Σ = " + alfabetoSplit.join(', ')); // Agregar coma y espacio como separadores
    document.getElementById("alfabetocompleto").innerHTML = alfabetoCompleto;
}

function expandirRango(rango) {
    // Función para expandir un rango en una cadena completa de caracteres
    var inicio = rango.charCodeAt(0); // Obtener el código ASCII del primer carácter del rango
    var fin = rango.charCodeAt(2); // Obtener el código ASCII del último carácter del rango
    var cadena = "";

    // Generar una cadena completa de caracteres incluyendo todos los caracteres dentro del rango
    for (var i = inicio; i <= fin; i++) {
        cadena += String.fromCharCode(i); // Convertir el código ASCII a carácter y agregarlo a la cadena
        if (i < fin) {
            cadena += ","; // Agregar coma como separador, excepto para el último carácter del rango
        }
    }
    return cadena;
}

function validarCadenas() {
    var cadena1 = document.getElementById("cadena1Input").value.trim();
    var cadena2 = document.getElementById("cadena2Input").value.trim();

    if (!validacion()) {
        alert("Corrija el alfabeto para poder realizar esta acción.");
        return;
    }

    if (cadena1 === "") {
        if (cadena2 !== "") {
            if (!validarCadena(cadena2)) {
                alert("Una o ambas cadenas contienen símbolos inválidos.");
                return;
            }
        }
    } else {
        if (!validarCadena(cadena1) || !validarCadena(cadena2)) {
            alert("Una o ambas cadenas contienen símbolos inválidos.");
            return;
        }
    }

    // Determinar la relación entre las cadenas
    var relacion = determinarRelacion(cadena1, cadena2);
    document.getElementById("relacionOutput").innerHTML = relacion;
}

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


function validarCadena(cadena) {
    convertirAlfabeto();

    for (var i = 0; i < cadena.length; i++) {
        if (!alfabeto.includes(cadena[i])) {
            return false;
        }
    }
    return true;
}

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

// Función para calcular y mostrar la potencia del alfabeto
function calcularPotencia() {
    var potencia = parseInt(document.getElementById("potenciaInput").value);
    var alfabeto = document.getElementById("alfabetoInput").value.trim().split(',');

    // Expandir los rangos en el alfabeto
    for (var i = 0; i < alfabeto.length; i++) {
        if (alfabeto[i].includes("-")) {
            var rangoExpandido = expandirRango(alfabeto[i]); // Expandir el rango en una cadena completa de caracteres
            alfabeto.splice(i, 1, ...rangoExpandido.split(',')); // Reemplazar el rango con la cadena expandida en el alfabeto
        }
    }

    var resultadop = "";
    if (potencia < 0) {
        // Manejar el caso de potencia negativa
        for (var i = potencia; i <= -1; i++) {
            var cadenaInvertida = alfabeto.join('').split('').reverse().join('');
			resultadop += "Σ^" + i + " = " + cadenaInvertida.repeat(-i) + "<br>";
        }
    } else if (potencia === 0) {
        // Manejar el caso de potencia igual a 0
        resultadop = "Σ^0 =  ";
    } else {
        // Calcular la potencia del alfabeto y formatear el resultado
        for (var i = 1; i <= potencia; i++) {
            resultadop += "Σ^" + i + " = " + (alfabeto.join('')).repeat(i) + "<br>";
        }
    }

    // Mostrar el resultado de la potencia del alfabeto en el HTML
    document.getElementById("potenciaOutput").innerHTML = resultadop;
}

