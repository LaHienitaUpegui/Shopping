const formularioProducto = document.querySelector(".modal");

// Buscar en localStorage si hay productos y renderizarlos
window.addEventListener("DOMContentLoaded", () => {
    const productosGuardados =
        JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.forEach((producto) => {
        renderizarNuevoProducto(producto);
    });
});

// Hacer que aparezca el formulario cuando se hace clic en el botón "Agregar Producto"
const btnAgregarProducto = document.getElementById("btn-agregar-producto");
btnAgregarProducto.addEventListener("click", () => {
    // se pone el titulo correcto, el de "Agregar producto"
    document.querySelector(".titulo-modal").textContent =
        "Agregar un nuevo producto";

    // se vacian los campos del formulario
    document.getElementById("nombre-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("cantidad-producto").value = "";

    // se usa el boton adecuado para agregar producto
    document
        .querySelector(".btn-guardar-cambios")
        .setAttribute("hidden", "true");
    document.querySelector(".btn-agregar-producto").removeAttribute("hidden");

    // se muestra el formulario
    formularioProducto.classList.remove("oculto");
});

// Hacer que aparezca el formulario de nuevo cuando se haga clic en el boton de "Modificar producto"
const btnModificarProducto = document.querySelector(".btn-modificar-producto");
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-modificar-producto")) {
        // Obtener el id del producto que se quiere modificar
        const id = parseInt(event.target.getAttribute("data-id"));
        const producto = obtenerProductoPorId(id);

        // Hacer que se muestre el formulario
        formularioProducto.classList.remove("oculto");

        // Llenar los campos del formulario con los datos actual del producto
        document.getElementById("nombre-producto").value = producto.nombre;
        document.getElementById("precio-producto").value = producto.precio;
        document.getElementById("cantidad-producto").value = producto.cantidad;

        // Cambiar el titulo del formulario
        const tituloTarjeta = document.querySelector(".titulo-modal");
        tituloTarjeta.textContent = "Modificar producto";

        // Cambiar el boton de agregar producto por uno que dice "Guardar cambios"
        document
            .querySelector(".btn-agregar-producto")
            .setAttribute("hidden", "true");
        const btnGuardar = document.querySelector(".btn-guardar-cambios");
        btnGuardar.removeAttribute("hidden");
        // Paso 3: poner el data-id correcto en el botón guardar cambios
        btnGuardar.setAttribute("data-id", id);
    }
});

// Actualizar la informacion en el array/localStorage cuando el usuario guarde los cambios
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-guardar-cambios")) {
        // obtener el id del producto a modificar
        const id = parseInt(event.target.getAttribute("data-id"));

        // obtener el indice del producto (El array) usando su ID
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        const indice = productos.findIndex((producto) => producto.id === id);

        // obtener de nuevo los valores del formulario
        const imagenProducto = document.getElementById("imagen-producto").value
            ? document.getElementById("imagen-producto").value
            : null;
        const nombre = document.getElementById("nombre-producto").value;
        const precio = document.getElementById("precio-producto").value;
        const cantidad = document.getElementById("cantidad-producto").value;

        // actualizar valores en el array del producto
        if (indice !== -1) {
            productos[indice].imagen = imagenProducto;
            productos[indice].nombre = nombre;
            productos[indice].precio = precio;
            productos[indice].cantidad = cantidad;
        }

        // guardar los nuevos valores en el array del localStorage
        localStorage.setItem("productos", JSON.stringify(productos));

        // Paso 1: borrar los productos mostrados y volver a renderizar todos
        const contenedor = document.getElementById("contenedor-tarjetas");
        contenedor.innerHTML = "";
        productos.forEach((producto) => {
            renderizarNuevoProducto(producto);
        });

        // Paso 2: cerrar el modal y limpiar el formulario
        formularioProducto.classList.add("oculto");
        document.getElementById("formulario-agregar-producto").reset();
    }
});

// Hacer que se cierre el formulario cuando se hace clic en el botón "Cerrar" o cuando se hace clic por fuera del formulario
const btnCerrarFormulario = document.querySelector(".btn-cancelar-producto");
btnCerrarFormulario.addEventListener("click", () => {
    formularioProducto.classList.add("oculto");
});

// Hacer que se cierre el formulario cuando se hace clic por fuera de él
window.addEventListener("click", (event) => {
    if (event.target === formularioProducto) {
        formularioProducto.classList.add("oculto");
    }
});

// Escuchar el evento submit del formulario y crear un nuevo producto
const formulario = document.getElementById("formulario-agregar-producto");
formulario.addEventListener("submit", (event) => {
    // Prevenir que se recargue la página al enviar el formulario
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const imagenProducto = document.getElementById("imagen-producto").value
        ? document.getElementById("imagen-producto").value
        : null;
    const nombre = document.getElementById("nombre-producto").value;
    const precio = document.getElementById("precio-producto").value;
    const cantidad = document.getElementById("cantidad-producto").value;

    // Se crea un nuevo objeto producto con los valores obtenidos
    const nuevoProducto = {
        id: Date.now(), // Generar un ID único basado en la fecha actual
        imagen: imagenProducto,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
    };

    // Se renderiza el nuevo producto en la lista de productos
    renderizarNuevoProducto(nuevoProducto);

    // Guardar en localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    // Se limpia el formulario
    formulario.reset();

    // Se oculta el formulario
    formularioProducto.classList.add("oculto");
});

// Escuchar el evento click en el botón de eliminar producto usando delegación de eventos
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar-producto")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        eliminarProducto(id);
    }
});

// Función para eliminar producto
function eliminarProducto(id) {
    // Eliminar del DOM
    const tarjetaAEliminar = document.querySelector(
        `.tarjeta-producto[data-id="${id}"]`
    );
    if (tarjetaAEliminar) {
        tarjetaAEliminar.remove();
    }

    // Eliminar del localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos = productos.filter((producto) => producto.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para renderizar un nuevo producto en la lista de productos
function renderizarNuevoProducto(nuevoProducto) {
    const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
    const tarjetaDelNuevoProducto = document.createElement("div");
    tarjetaDelNuevoProducto.classList.add("tarjeta-producto");
    tarjetaDelNuevoProducto.setAttribute("data-id", nuevoProducto.id);
    tarjetaDelNuevoProducto.innerHTML = `
        ${
            nuevoProducto.imagen
                ? `<img src="${nuevoProducto.imagen}" alt="${nuevoProducto.nombre}" />`
                : ""
        }
        <h3 class="nombre-producto">${nuevoProducto.nombre}</h3>
        <p><strong>Precio:</strong> $${nuevoProducto.precio}</p>
        <p><strong>Cantidad:</strong> ${nuevoProducto.cantidad}</p>
        <button class="btn-modificar-producto" data-id="${
            nuevoProducto.id
        }">Modificar producto</button>
        <button class="btn-eliminar-producto" data-id="${
            nuevoProducto.id
        }">Eliminar</button>
    `;
    contenedorTarjetas.appendChild(tarjetaDelNuevoProducto);
}

// Funcion para obtener el producto por medio del id
function obtenerProductoPorId(id) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    return productos.find((producto) => producto.id === id);
}
