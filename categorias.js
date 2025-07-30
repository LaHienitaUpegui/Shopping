const modalCategoria = document.querySelector(
    ".modal-crear-categoria-contenedor"
);

// poner las categorias existentes en el local storage en el select de categorias de la pantalla principal
window.addEventListener("DOMContentLoaded", () => {
    cargarCategoriasHaciaSelect({ selectId: "filtro-categorias" });
});

// Abrir el modal de crear una categoria escuchando el click en el boton de crear categoria
const btnAgregarCategoria = document.getElementById("btn-agregar-categoria");
btnAgregarCategoria.addEventListener("click", () => {
    // Ocultar el formulario de producto
    formularioProducto.classList.add("oculto");

    // Mostrar el modal de crear categoria
    modalCategoria.classList.remove("oculto");
});

// Escuchar el evento de submit del formulario de creacion de categoria
const formularioCrearCategoria = document.getElementById(
    "formulario-crear-categoria"
);
// Llamada a la función crearCategoria al enviar el formulario
formularioCrearCategoria.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (evento.target.id === "formulario-crear-categoria") {
        // llamar la funcion de crear una categoria desde agregar producto
        crearCategoria({
            inputNombreCategoriaId: "nombre-categoria",
            formularioPrevio: formularioProducto,
            selectformularioPrevioId: "categoria-producto",
            formularioCreacionCategoria: formularioCrearCategoria,
            modalFormularioCreacionCategoria: modalCategoria,
        });
    }
});

const btnCancelarCreacionCategoria = document.querySelector(
    ".btn-cancelar-creacion-categoria"
);
btnCancelarCreacionCategoria.addEventListener("click", () => {
    cerrarModalCreacionCategorias({
        IdModalCreacionCategoria: "modal-crear-categoria-contenedor",
        IdModalFormularioPrevio: "modalCreacionProducto",
    });
});

// se escucha el evento de click en el boton de aplicar filtro de categoria
const btnAplicarFiltroCategoria = document.getElementById(
    "btn-aplicar-filtro-categoria"
);
btnAplicarFiltroCategoria.addEventListener("click", () => {
    // limpiar todos los elemetos que hayan en la pantalla
    const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
    contenedorTarjetas.innerHTML = "";

    // se obtiene el array de productos y el valor actual del selector de categorias
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const selectorCategorias = document.getElementById("filtro-categorias");

    if (selectorCategorias.value === "sin-categoria") {
        productos.forEach((producto) => {
            renderizarNuevoProducto(producto);
        });
    } else {
        productos
            .filter(
                (producto) => producto.categoria === selectorCategorias.value
            )
            .forEach((producto) => {
                renderizarNuevoProducto(producto);
            });
    }
});
