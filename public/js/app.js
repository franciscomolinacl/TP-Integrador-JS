console.log("Archivo JavaScript estático cargado.");

const btnEliminar = document.getElementById('btnConfirmarEliminar');
const formEliminar = document.getElementById('formEliminar');

if (btnEliminar && formEliminar) {
    btnEliminar.addEventListener('click', function() {
        formEliminar.submit();
    });
}