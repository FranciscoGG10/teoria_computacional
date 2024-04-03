function validarAlfabeto() {
    // Obtener el valor del alfabeto ingresado por el usuario
    var alfabetoInput = document.getElementById("alfabetoInput").value.trim();
    // Si no se ingresa nada en el campo "Leer el alfabeto", asignar λ como alfabeto base
    var alfabeto = alfabetoInput === "" ? "λ" : alfabetoInput;
    // Expresión regular para validar el formato del alfabeto
    var regex = /^([a-zA-Z0-9]-[a-zA-Z0-9]|([a-zA-Z0-9],)+[a-zA-Z0-9])$/;

    // Verificar si el alfabeto cumple con el formato establecido por la expresión regular
    if (regex.test(alfabeto)) {
        alert("El alfabeto ingresado es válido.");
    } else {
        alert("El alfabeto ingresado no es válido. Por favor, ingrese valores separados por comas o un rango (n-m).");
    }
	
}

function mostrarAlfabeto(){
	var alfabeto = document.getElementById("alfabetoInput").value.trim().split(',');
	
    // Expandir los rangos en el alfabeto
    for (var i = 0; i < alfabeto.length; i++) {
        if (alfabeto[i].includes("-")) {
            var rangoExpandido = expandirRango(alfabeto[i]); // Expandir el rango en una cadena completa de caracteres
            alfabeto.splice(i, 1, ...rangoExpandido.split(',')); // Reemplazar el rango con la cadena expandida en el alfabeto
        }
    }
	
	var alfabetofull = "";
	
	alfabetofull += (alfabeto.join('')) + "<br>";
	document.getElementById("alfabetocompleto").innerHTML = alfabetofull;
	
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
    // Obtener los valores de las dos cadenas ingresadas por el usuario
    var cadena1 = document.getElementById("cadena1Input").value.trim();
    var cadena2 = document.getElementById("cadena2Input").value.trim();
    // Obtener el alfabeto ingresado por el usuario y dividirlo en un array utilizando comas como delimitador
    var alfabeto = document.getElementById("alfabetoInput").value.trim().split(',');

    // Expandir los rangos en el alfabeto
    for (var i = 0; i < alfabeto.length; i++) {
        if (alfabeto[i].includes("-")) {
            var rangoExpandido = expandirRango(alfabeto[i]); // Expandir el rango en una cadena completa de caracteres
            alfabeto.splice(i, 1, ...rangoExpandido.split(',')); // Reemplazar el rango con la cadena expandida en el alfabeto
        }
    }

    var esValido = true;
    var cadenas = [cadena1, cadena2];
    // Verificar si las cadenas están dentro del alfabeto ingresado
    for (var i = 0; i < cadenas.length; i++) {
        var caracteres = cadenas[i].split(',');
        for (var j = 0; j < caracteres.length; j++) {
            // Verificar si cada caracter de las cadenas está presente en el alfabeto
            if (!alfabeto.includes(caracteres[j])) {
                esValido = false;
                break;
            }
        }
    }

    if (esValido) {
        document.getElementById("resultado").innerHTML = "Las cadenas ingresadas están dentro del alfabeto proporcionado.";

        // Determinar si la cadena1 es prefijo, subfijo, subcadena o subsecuencia de cadena2
        var subfijo = cadena2.endsWith(cadena1);
        var prefijo = cadena2.startsWith(cadena1);
        var subcadena = cadena2.includes(cadena1);
        var subsecuencia = esSubsecuencia(cadena1, cadena2);

        var resultado = "";
        if (subfijo && prefijo) {
            resultado = "Cadena 1 es una subfijo y prefijo de Cadena 2.";
        } else if (subfijo) {
            resultado = "Cadena 1 es un subfijo de Cadena 2.";
        } else if (prefijo) {
            resultado = "Cadena 1 es un prefijo de Cadena 2.";
        } else if (subcadena) {
            resultado = "Cadena 1 es una subcadena de Cadena 2.";
        } else if (subsecuencia) {
            resultado = "Cadena 1 es una subsecuencia de Cadena 2.";
        } else {
            resultado = "Cadena 1 no es ni prefijo, subfijo, subcadena ni subsecuencia de Cadena 2.";
        }

        document.getElementById("resultado").innerHTML += "<br>" + resultado;
    } else {
        document.getElementById("resultado").innerHTML = "Una o ambas cadenas no están dentro del alfabeto proporcionado.";
    }
}

// Esta función verifica si cadena1 es una subsecuencia de cadena2.
function esSubsecuencia(cadena1, cadena2) {
    var index1 = 0;
    var index2 = 0;

    // Verificar si cadena1 es una subsecuencia de cadena2.
    while (index1 < cadena1.length && index2 < cadena2.length) {
        if (cadena1[index1] === cadena2[index2]) {
            index1++;
        }
        index2++;
    }

    // Devolver true si todos los caracteres de cadena1 se encuentran en cadena2 en el mismo orden.
    return index1 === cadena1.length;
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

