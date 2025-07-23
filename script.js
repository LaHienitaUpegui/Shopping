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
    formularioProducto.classList.remove("oculto");
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
    const listaProductos = document.querySelector(".products");
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
        <button class="btn-eliminar-producto" data-id="${
            nuevoProducto.id
        }">Eliminar</button>
    `;
    listaProductos.appendChild(tarjetaDelNuevoProducto);
}
