// Función para crear una nueva categoría
function crearCategoria({
    inputNombreCategoriaId,
    formularioPrevio,
    selectformularioPrevioId,
    formularioCreacionCategoria,
    modalFormularioCreacionCategoria,
}) {
    // Obtener el nombre de la categoría desde su input
    const nombreCategoria = document.getElementById(
        inputNombreCategoriaId
    ).value;

    // Crear un objeto categoría
    const categoria = {
        nombre: nombreCategoria,
    };

    // Se obtienen las categorías desde el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    // Verificar si la categoría ya existe en el local storage
    if (categorias.some((cat) => cat.nombre === categoria.nombre)) {
        alert("La categoria ya existe");
        return;
    } else {
        // Agregar la categoría al array de categorías
        categorias.push(categoria);
        // Guardar la lista de categorías en el local storage
        localStorage.setItem("categorias", JSON.stringify(categorias));
        alert("Categoría creada exitosamente");
    }

    // Añadir la categoría al select del formulario, ya sea el de creación de producto o el de administración de categorías
    if (formularioPrevio) {
        const selectFormularioPrevio = document.getElementById(
            selectformularioPrevioId
        );

        if (
            !Array.from(selectFormularioPrevio.options).some(
                (opt) => opt.value === categoria.nombre
            )
        ) {
            const option = document.createElement("option");
            option.value = categoria.nombre;
            option.textContent = categoria.nombre;
            selectFormularioPrevio.appendChild(option);
        }
    }

    // Limpiar el formulario de creación de categoría y ocultar el modal
    formularioCreacionCategoria.reset();
    modalFormularioCreacionCategoria.classList.add("oculto");

    // Mostrar el formulario previo si estaba oculto
    if (formularioPrevio) {
        formularioPrevio.classList.remove("oculto");
    }
}

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
        <h3 class="nombre-producto">${nuevoProducto.nombre}</h3>
        <p class="propiedad-producto"><strong>Precio:</strong> $${nuevoProducto.precio}</p>
        <p class="propiedad-producto"><strong>Cantidad:</strong> ${nuevoProducto.cantidad}</p>
        <p class="propiedad-producto"><strong>Categoría:</strong> ${nuevoProducto.categoria}</p>
        <button class="btn-modificar-producto" data-id="${nuevoProducto.id}">Modificar producto</button>
        <button class="btn-eliminar-producto" data-id="${nuevoProducto.id}">Eliminar</button>
    `;
    contenedorTarjetas.appendChild(tarjetaDelNuevoProducto);
}

// Función para obtener el producto por medio del id
function obtenerProductoPorId(id) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    return productos.find((producto) => producto.id === id);
}

// Función para agregar categorías a un select específico
function cargarCategoriasHaciaSelect({ selectId }) {
    // Se obtiene el select
    const select = document.getElementById(selectId);
    // Se obtiene el array de categorías desde el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // Se valida si en el select ya existe una categoría con el mismo valor de cada una de las categorías en el local storage
    categorias.forEach((categoria) => {
        if (
            !Array.from(select.options).some(
                (opt) => opt.value === categoria.nombre
            )
        ) {
            const option = document.createElement("option");
            option.value = categoria.nombre;
            option.innerText = categoria.nombre;
            select.appendChild(option);
        }
    });
}

// Función que permite cerrar el modal de creación de categorías y que muestre luego el formulario que se le especifique
function cerrarModalCreacionCategorias({
    IdModalCreacionCategoria,
    IdModalFormularioPrevio,
}) {
    const modalCreacionCategoria = document.getElementById(
        IdModalCreacionCategoria
    );
    const formularioPrevioParaMostrar = document.getElementById(
        IdModalFormularioPrevio
    );

    modalCreacionCategoria.classList.add("oculto");
    formularioPrevioParaMostrar.classList.remove("oculto");
}

// Función que permite ocultar un modal que se le especifique y mostrar otro modal que también se le especifique
function mostrarModalYOcultarFormularioPrevio({
    IdModalFormularioPrevio,
    IdModalNuevoParaMostrar,
}) {
    const formularioPrevioParaOcultar = document.getElementById(
        IdModalFormularioPrevio
    );
    const modalNuevoParaMostrar = document.getElementById(
        IdModalNuevoParaMostrar
    );

    formularioPrevioParaOcultar.classList.add("oculto");
    modalNuevoParaMostrar.classList.remove("oculto");
}
