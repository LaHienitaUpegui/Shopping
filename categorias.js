const modalCategoria = document.querySelector(
    ".modal-crear-categoria-contenedor"
);

window.addEventListener("DOMContentLoaded", () => {
    // se selecciona el select donde van a ir las categorias
    const selectorCategorias = document.getElementById("filtro-categorias");

    // se trae la lista de categorias desde el locas storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // se recorre cada categoria y se agrega solo las que no esten ya en el select
    categorias.forEach((categoria) => {
        if (
            !Array.from(selectorCategorias.options).some(
                (opt) => opt.value === categoria.nombre
            )
        ) {
            const option = document.createElement("option");
            option.value = categoria.nombre;
            option.innerText = categoria.nombre;
            selectorCategorias.appendChild(option);
        }
    });
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
formularioCrearCategoria.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Obtener el nombre de la nueva categoria
    const nuevoNombreCategoria =
        document.getElementById("nombre-categoria").value;

    // Crear un nuevo objeto categoria
    const categoria = {
        nombre: nuevoNombreCategoria,
    };

    // Agregar la nueva categoria al select de categoria del formulario de creacion de producto
    const selectCategoriaEnFormularioProducto =
        document.getElementById("categoria-producto");
    const option = document.createElement("option");
    option.value = categoria.nombre;
    option.innerText = categoria.nombre;
    selectCategoriaEnFormularioProducto.appendChild(option);

    // guardar la nueva categoria en el localStorage
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    categorias.push(categoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));

    // Limpiar el formulario de creacion de categoria y ocultar el modal
    formularioCrearCategoria.reset();
    modalCategoria.classList.add("oculto");

    // Mostrar el formulario de producto
    formularioProducto.classList.remove("oculto");
});

const btnCancelarCreacionCategoria = document.querySelector(
    ".btn-cancelar-creacion-categoria"
);
btnCancelarCreacionCategoria.addEventListener("click", () => {
    modalCategoria.classList.add("oculto");
    formularioProducto.classList.remove("oculto");
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
