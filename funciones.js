// Función para crear una nueva categoría
function crearCategoria({
    inputNombreCategoriaId,
    formularioPrevio,
    selectformularioPrevioId,
    formularioCreacionCategoria,
    modalFormularioCreacionCategoria,
}) {
    // obtener el nombre de la categoria desde su input
    const nombreCategoria = document.getElementById(
        inputNombreCategoriaId
    ).value;

    // crear un objeto categoria
    const categoria = {
        nombre: nombreCategoria,
    };

    // se obtiene las categorias desde el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    // Verificar si la categoria ya existe en el local storage
    if (categorias.some((cat) => cat.nombre === categoria.nombre)) {
        alert("La categoria ya existe");
        return;
    } else {
        // agregar la categoria al array de categorias
        categorias.push(categoria);
        // guardar la lista de categorias en el local storage
        localStorage.setItem("categorias", JSON.stringify(categorias));
        alert("Categoria creada exitosamente");
    }

    // anadir la categoria al select del formulario, ya sea el de creacion de producto o el de administracion de categorias
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

    // Limpiar el formulario de creacion de categoria y ocultar el modal
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
        ${
            nuevoProducto.imagen
                ? `<img src="${nuevoProducto.imagen}" alt="${nuevoProducto.nombre}" />`
                : ""
        }
        <h3 class="nombre-producto">${nuevoProducto.nombre}</h3>
        <p><strong>Precio:</strong> $${nuevoProducto.precio}</p>
        <p><strong>Cantidad:</strong> ${nuevoProducto.cantidad}</p>
        <p><strong>Categoria:</strong> ${nuevoProducto.categoria}</p>
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

// Funcion para agregar categorias a un select especifico
function cargarCategoriasHaciaSelect({ selectId }) {
    // se obtiene el select
    const select = document.getElementById(selectId);
    // se obtiene el array de categorias desde el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // se valida si en el select ya existe una categoria con el mismo valor de cada una de las categorias en el local storage
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

// Funcion que permite cerrar el modal de creacion de categorias y que muestre luego el formulario que se le especifique
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

// Funcion que permite ocultar un modal que se le especifique y mostrar otro modal que tambien se le especifique
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
