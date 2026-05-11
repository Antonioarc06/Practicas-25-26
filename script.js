let boton = document.getElementById("cambiarTema");

// cargar tema guardado
let temaGuardado = localStorage.getItem("tema");

if (temaGuardado == "oscuro") {
    document.body.classList.add("oscuro");
}

boton.addEventListener("click", function () {

    document.body.classList.toggle("oscuro");

    // guardar tema
    if (document.body.classList.contains("oscuro")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }

});