function validarAlfabeto() {
    // Obtener el valor del alfabeto ingresado por el usuario
    var alfabeto = document.getElementById("alfabetoInput").value.trim();
    // Expresión regular para validar el formato del alfabeto
    var regex = /^([a-zA-Z0-9]-[a-zA-Z0-9]|([a-zA-Z0-9],)+[a-zA-Z0-9])$/;

    // Verificar si el alfabeto cumple con el formato establecido por la expresión regular
    if (regex.test(alfabeto)) {
        alert("El alfabeto ingresado es válido.");
    } else {
        alert("El alfabeto ingresado no es válido. Por favor, ingrese valores separados por comas o un rango (n-m).");
    }
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

function esSubsecuencia(cadena1, cadena2) {
    // Verificar si cadena1 es una subsecuencia de cadena2
    var index = 0;
    for (var i = 0; i < cadena2.length && index < cadena1.length; i++) {
        if (cadena1[index] === cadena2[i]) {
            index++;
        }
    }
    return index === cadena1.length;
}



