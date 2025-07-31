const formularioProducto = document.querySelector(".modalCreacionProducto");
const formularioMoficarProductos = document.querySelector(
    ".modalModificacionProducto"
);

// Buscar en localStorage si hay productos y renderizarlos
window.addEventListener("DOMContentLoaded", () => {
    const productosGuardados =
        JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.forEach((producto) => {
        renderizarNuevoProducto(producto);
    });
});

// Hacer que aparezca el formulario cuando se hace clic en el botón "Agregar producto"
const btnAgregarProducto = document.getElementById("btn-agregar-producto");
btnAgregarProducto.addEventListener("click", () => {
    // Se vacían los campos del formulario
    document.getElementById("nombre-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("cantidad-producto").value = "";
    document.getElementById("categoria-producto").value = "sin-categoria";

    // Se cargan las categorías ya existentes en el localStorage, en el campo de selección de categorías
    cargarCategoriasHaciaSelect({ selectId: "categoria-producto" });

    // Se muestra el formulario
    formularioProducto.classList.remove("oculto");
});

// Escuchar el evento submit del formulario y crear un nuevo producto
const formulario = document.getElementById("formulario-agregar-producto");
formulario.addEventListener("submit", (event) => {
    // Prevenir que se recargue la página al enviar el formulario
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre-producto").value;
    const precio = Number(document.getElementById("precio-producto").value);
    const cantidad = Number(document.getElementById("cantidad-producto").value);
    const categoria = document.getElementById("categoria-producto").value;

    // Se crea un nuevo objeto producto con los valores obtenidos
    const nuevoProducto = {
        id: Date.now(), // Generar un ID único basado en la fecha actual
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        categoria: categoria,
    };

    // Se renderiza el nuevo producto en la lista de productos
    renderizarNuevoProducto(nuevoProducto);

    // Colocar la categoría que se seleccionó en el select de la pantalla principal
    const selectorCategorias = document.getElementById("filtro-categorias");
    if (
        !Array.from(selectorCategorias.options).some(
            (opt) => opt.value === nuevoProducto.categoria
        )
    ) {
        let option = document.createElement("option");
        option.value = nuevoProducto.categoria;
        option.innerText = nuevoProducto.categoria;
        selectorCategorias.appendChild(option);
    }

    // Guardar en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    // Se limpia el formulario
    formulario.reset();

    // Se oculta el formulario
    formularioProducto.classList.add("oculto");
});

// Hacer que se cierre el formulario cuando se hace clic en el botón "Cancelar" o cuando se hace clic por fuera del formulario
const btnCerrarFormulario = document.querySelector(".btn-cancelar-producto");
btnCerrarFormulario.addEventListener("click", () => {
    formularioProducto.classList.add("oculto");
});
window.addEventListener("click", (event) => {
    if (event.target === formularioProducto) {
        formularioProducto.classList.add("oculto");
    }
});

// **** Bloque para modificar las propiedades de un producto existente ****
// Aparece el formulario cuando se hace clic en el botón "Modificar producto"
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-modificar-producto")) {
        // Obtener el id del producto que se quiere modificar
        const id = parseInt(event.target.getAttribute("data-id"));
        const producto = obtenerProductoPorId(id);

        // Hacer que se muestre el formulario
        formularioMoficarProductos.classList.remove("oculto");

        // Llenar los campos del formulario con los datos actuales del producto
        document.getElementById("modificar-nombre-producto").value =
            producto.nombre;
        document.getElementById("modificar-precio-producto").value =
            producto.precio;
        document.getElementById("modificar-cantidad-producto").value =
            producto.cantidad;

        // Se cargan las categorías ya existentes en el localStorage, en el campo de selección de categorías
        const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        const selectorCategorias = document.getElementById(
            "modificar-categoria-producto"
        );
        categorias.forEach((categoria) => {
            // Verifica si ya existe un option dentro del select con el valor (nombre) de cada una de las categorías guardadas en el localStorage
            if (
                !Array.from(selectorCategorias.options).some(
                    (opt) => opt.value === categoria.nombre
                )
            ) {
                let option = document.createElement("option");
                option.value = categoria.nombre;
                option.innerText = categoria.nombre;
                selectorCategorias.appendChild(option);
            }
        });
        // Pone la categoría actual del producto en su respectivo campo
        document.getElementById("modificar-categoria-producto").value =
            producto.categoria;

        // Poner el data-id correcto en el botón guardar cambios
        const btnGuardar = document.querySelector(".btn-guardar-cambios");
        btnGuardar.removeAttribute("hidden");
        btnGuardar.setAttribute("data-id", id);
    }
});

// Actualizar la información en el array/localStorage cuando el usuario guarde los cambios
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-guardar-cambios")) {
        // Obtener el id del producto a modificar
        const id = parseInt(event.target.getAttribute("data-id"));

        // Obtener el índice del producto (el array) usando su ID
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        const indice = productos.findIndex((producto) => producto.id === id);

        // Obtener de nuevo los valores del formulario
        const nombre = document.getElementById(
            "modificar-nombre-producto"
        ).value;
        const precio = document.getElementById(
            "modificar-precio-producto"
        ).value;
        const cantidad = document.getElementById(
            "modificar-cantidad-producto"
        ).value;
        const categoria = document.getElementById(
            "modificar-categoria-producto"
        ).value;

        // Actualizar valores en el array del producto
        if (indice !== -1) {
            productos[indice].nombre = nombre;
            productos[indice].precio = precio;
            productos[indice].cantidad = cantidad;
            productos[indice].categoria = categoria;
        }

        // Guardar los nuevos valores en el array del localStorage
        localStorage.setItem("productos", JSON.stringify(productos));

        // Borrar los productos mostrados y volver a renderizar todos
        const contenedor = document.getElementById("contenedor-tarjetas");
        contenedor.innerHTML = "";
        productos.forEach((producto) => {
            renderizarNuevoProducto(producto);
        });

        // Cerrar el modal y limpiar el formulario
        formularioMoficarProductos.classList.add("oculto");
        document.getElementById("formulario-modificar-producto").reset();
    }
});

// Hacer que se cierre el formulario de modificación de producto cuando se le dé clic al botón cancelar o por fuera del formulario
const btnCerrarFormularioModificacionProducto = document.querySelector(
    ".btn-cancelar-modificacion-producto"
);
btnCerrarFormularioModificacionProducto.addEventListener("click", () => {
    formularioMoficarProductos.classList.add("oculto");
});
window.addEventListener("click", (event) => {
    if (event.target === formularioMoficarProductos) {
        formularioMoficarProductos.classList.add("oculto");
    }
});
// **** Finalización del bloque para modificar las propiedades de un producto existente ****

// Escuchar el evento click en el botón de eliminar producto usando delegación de eventos
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar-producto")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        eliminarProducto(id);
    }
});
