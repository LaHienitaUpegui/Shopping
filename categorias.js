const modalCategoria = document.querySelector(
    ".modal-crear-categoria-contenedor"
);

// Poner las categorías existentes en el local storage en el select de categorías de la pantalla principal
window.addEventListener("DOMContentLoaded", () => {
    cargarCategoriasHaciaSelect({ selectId: "filtro-categorias" });
});

// Abrir el modal de crear una categoría escuchando el click en el botón de crear categoría
const btnAgregarCategoria = document.getElementById("btn-agregar-categoria");
btnAgregarCategoria.addEventListener("click", () => {
    // Ocultar el formulario de producto
    formularioProducto.classList.add("oculto");

    // Mostrar el modal de crear categoría
    modalCategoria.classList.remove("oculto");
});

// Escuchar el evento de submit del formulario de creación de categoría
const formularioCrearCategoria = document.getElementById(
    "formulario-crear-categoria"
);
// Llamada a la función crearCategoria al enviar el formulario
formularioCrearCategoria.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (evento.target.id === "formulario-crear-categoria") {
        // Llamar la función de crear una categoría desde agregar producto
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

// Se escucha el evento de click en el botón de aplicar filtro de categoría
const btnAplicarFiltroCategoria = document.getElementById(
    "btn-aplicar-filtro-categoria"
);
btnAplicarFiltroCategoria.addEventListener("click", () => {
    // Limpiar todos los elementos que haya en la pantalla
    const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
    contenedorTarjetas.innerHTML = "";

    // Se obtiene el array de productos y el valor actual del selector de categorías
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
