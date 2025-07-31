// * Elementos del DOM del admin de categorías
// Obtener el botón para abrir el administrador de categorías
const btnAdminCategorias = document.getElementById(
    "btn-abrir-modal-admin-categorias"
);

// Obtener el modal de administrador de categorías
const modalAdminCategorias = document.querySelector(
    ".modal-administrar-categorias-contenedor"
);

// Obtener botón de cancelar cambios en el modal de administrador de categorías
const btnCancelarCambiosAdminCategorias = document.getElementById(
    "btn-cancelar-cambios-admin-categorias"
);

// Obtener botón de crear una categoría
const btnCreacionCategoria = document.getElementById(
    "btn-crear-nueva-categoria"
);

// Formulario de creación de categorías desde el admin de categorías
const formularioCreacionCategoriaDesdeAdminCategorias = document.getElementById(
    "formulario-crear-categoria-admin-categorias"
);

// Modal donde se crean las categorías que tiene el formulario de creación de categorías (desde el admin de categorías)
const modalContenedorDelFormCreacionCategorias = document.getElementById(
    "modal-crear-categoria-admin-categorias-contenedor"
);
// * Fin bloque de elementos

// * Bloque manejador de aparición y ocultación del modal admin categorías
// Desplegar el modal de admin categorías al hacer clic en el botón de admin categorías
btnAdminCategorias.addEventListener("click", () => {
    modalAdminCategorias.classList.remove("oculto");
});
// Ocultar el modal de admin categorías al hacer clic en el botón de cancelar
btnCancelarCambiosAdminCategorias.addEventListener("click", () => {
    modalAdminCategorias.classList.add("oculto");
});
// Ocultar el modal al hacer clic fuera del formulario
window.addEventListener("click", (evento) => {
    if (evento.target === modalAdminCategorias) {
        modalAdminCategorias.classList.add("oculto");
    }
});

// Cargar categorías desde el local storage en el select del modal
btnAdminCategorias.addEventListener("click", () => {
    cargarCategoriasHaciaSelect({ selectId: "categorias-existentes" });
});
// * Fin bloque manejador de aparición y ocultación del modal admin categorías

// * Bloque manejador del botón de acción de crear una categoría en el admin de categorías
// Cuando se da clic al botón de crear categoría, se debe desplegar el modal de creación de categoría y se esconde el modal actual
btnCreacionCategoria.addEventListener("click", () => {
    // Se esconde el modal de admin categorías
    modalAdminCategorias.classList.add("oculto");

    // Se muestra el modal de creación de categorías
    const modalCreacionCategoriaDesdeAdminCategorias = document.querySelector(
        ".modal-crear-categoria-admin-categorias-contenedor"
    );
    modalCreacionCategoriaDesdeAdminCategorias.classList.remove("oculto");
});

// Crear categoría cuando se escuche el submit del formulario de creación de categoría del admin de categorías
formularioCreacionCategoriaDesdeAdminCategorias.addEventListener(
    "submit",
    (evento) => {
        // Previene el comportamiento por defecto del formulario de recargar la página
        evento.preventDefault();

        crearCategoria({
            inputNombreCategoriaId: "nombre-categoria-admin-categorias",
            formularioPrevio: modalAdminCategorias,
            selectformularioPrevioId: "categorias-existentes",
            formularioCreacionCategoria:
                formularioCreacionCategoriaDesdeAdminCategorias,
            modalFormularioCreacionCategoria:
                modalContenedorDelFormCreacionCategorias,
        });
    }
);

// Cerrar modal de creación de categoría si se da clic en cancelar o por fuera del formulario
const modalCreacionCategoriaDesdeAdminCategorias = document.querySelector(
    ".modal-crear-categoria-admin-categorias-contenedor"
);
const btnCerrarModalCreacionCategorias = document.querySelector(
    ".btn-cancelar-creacion-categoria-admin-categorias"
);

btnCerrarModalCreacionCategorias.addEventListener("click", () => {
    cerrarModalCreacionCategorias({
        IdModalCreacionCategoria:
            "modal-crear-categoria-admin-categorias-contenedor",
        IdModalFormularioPrevio: "modal-administrar-categorias-contenedor",
    });
});
// * Fin del bloque manejador del botón de acción de crear una categoría en el admin de categorías

// * Lógica del botón de "Modificar una categoría" en el admin de categorías
// Hacer que se muestre el modal de modificación de categoría cuando se da clic en el botón de modificar categoría y cargar las categorías del local storage en el select.

// Se obtiene el botón y el modal de modificación de categoría
const btnModificarCategoria = document.getElementById(
    "btn-modificar-categoria"
);

// Escuchar el evento de clic en el botón de modificar categoría y mostrar el modal de modificación de categoría con las categorías cargadas desde el local storage
btnModificarCategoria.addEventListener("click", () => {
    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio: "modal-administrar-categorias-contenedor",
        IdModalNuevoParaMostrar:
            "modal-modificar-categoria-admin-categ-contenedor",
    });

    // Cargar las categorías en el select de modificación de categorías
    cargarCategoriasHaciaSelect({ selectId: "selector-categorias-existentes" });
});

// Escuchar el evento de submit del formulario y modificar la categoría seleccionada en el local storage y cargarla en el select de categorías existentes
const btnSubmitFormularioModificarCategoria = document.getElementById(
    "btn-enviar-modificar-categoria"
);
btnSubmitFormularioModificarCategoria.addEventListener("click", (evento) => {
    evento.preventDefault();

    // Se obtiene el array actual de categorías que está guardado en el local storage
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // Obtener el valor de la categoría que se quiere modificar
    const categoriaParaModificar = document.getElementById(
        "selector-categorias-existentes"
    ).value;

    // Se obtiene el nuevo nombre de categoría
    const nuevoNombreCategoria = document.getElementById(
        "nuevo-nombre-categoria"
    ).value;

    // Verifica si ya existe una categoría en el array del local storage con el nuevo nombre que introdujo el usuario
    if (categorias.some((categ) => categ.nombre === nuevoNombreCategoria)) {
        alert(
            `Ya existe una categoria con el nombre "${nuevoNombreCategoria}" por favor ingresa otro nombre que no este registrado`
        );
    } else {
        // Se obtiene el índice del objeto en el array del local storage que coincida con el valor que el usuario puso en el select de selección de categoría
        const index = categorias.findIndex(
            (categoria) =>
                categoria.nombre.toLowerCase() ===
                categoriaParaModificar.toLowerCase()
        );

        // El navegador suelta este error si no se encuentra el índice de la categoría que se quiere modificar
        if (index === -1) {
            alert("No se encontro la categoria a modificar");
        }

        // Se hace el cambio del nombre de la categoría en el array
        categorias[index].nombre = nuevoNombreCategoria;

        // Se guarda de nuevo en el local storage el array con la categoría modificada
        localStorage.setItem("categorias", JSON.stringify(categorias));

        // Se carga la lista de categorías con el cambio realizado en el select
        cargarCategoriasHaciaSelect({
            selectId: "selector-categorias-existentes",
        });

        // Se muestra una alerta que indica que el cambio fue realizado con éxito
        alert("Cambios realizados con exito");
    }
});

// Cerrar el modal de modificación de categorías y abrir el admin de categorías cuando se dé clic al botón de cancelar
const btnCancelarModificacioCategoria = document.getElementById(
    "btn-cancelar-modificar-categoria"
);
btnCancelarModificacioCategoria.addEventListener("click", () => {
    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio:
            "modal-modificar-categoria-admin-categ-contenedor",
        IdModalNuevoParaMostrar: "modal-administrar-categorias-contenedor",
    });
});
// * Fin del bloque de lógica del botón de "Modificar una categoría" en el admin de categorías

// * Bloque de lógica del botón de "Eliminar categoría" en el admin de categorías
// Hacer que aparezca el modal para eliminar categorías
const btnEliminarCategorias = document.getElementById("btn-eliminar-categoria");
const modalEliminarCategorias = document.getElementById(
    "modal-eliminar-categoria-admin-categ-contenedor"
);

btnEliminarCategorias.addEventListener("click", () => {
    // Cargar las categorías en el select
    cargarCategoriasHaciaSelect({
        selectId: "selector-categorias-para-eliminar",
    });

    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio: "modal-administrar-categorias-contenedor",
        IdModalNuevoParaMostrar:
            "modal-eliminar-categoria-admin-categ-contenedor",
    });
});

// Lógica para eliminar una categoría

// Botón de aceptar eliminación de categoría
const btnAceptarEliminacionCategoria = document.getElementById(
    "btn-aceptar-eliminar-categoria"
);
btnAceptarEliminacionCategoria.addEventListener("click", () => {
    // Array de categorías guardado en el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // Categoría que seleccionó el usuario para eliminar (valor del select de categorías)
    const categoriaAEliminar = document.getElementById(
        "selector-categorias-para-eliminar"
    ).value;

    // Verifica que sí haya una categoría en el array de donde se quiere eliminar, donde su nombre sea igual a la que escogió el usuario en el selector
    if (
        categorias.some(
            (categ) =>
                categ.nombre.toLowerCase() === categoriaAEliminar.toLowerCase()
        )
    ) {
        // Se obtiene el índice de la categoría en el array con el mismo nombre de la categoría que escogió el usuario
        const index = categorias.findIndex(
            (categ) =>
                categ.nombre.toLowerCase() === categoriaAEliminar.toLowerCase()
        );

        // Se elimina la categoría específica usando su índice
        categorias.splice(index, 1);

        // Se cargan de nuevo las categorías en el local storage
        localStorage.setItem("categorias", JSON.stringify(categorias));

        // Se cargan de nuevo las categorías en el select
        cargarCategoriasHaciaSelect({
            selectId: "selector-categorias-para-eliminar",
        });

        // Se muestra un mensaje de éxito
        alert("Se eliminó con éxito la categoría");
    } else {
        alert("No se encontró la categoría que quieres eliminar, escoge otra.");
    }

    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio:
            "modal-eliminar-categoria-admin-categ-contenedor",
        IdModalNuevoParaMostrar: "modal-administrar-categorias-contenedor",
    });
});

// Cerrar el modal de eliminación de categorías y abrir el modal de admin de categorías
const btnCerrarModalEliminarCategorias = document.getElementById(
    "btn-cancelar-eliminar-categoria"
);
btnCerrarModalEliminarCategorias.addEventListener("click", () => {
    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio:
            "modal-eliminar-categoria-admin-categ-contenedor",
        IdModalNuevoParaMostrar: "modal-administrar-categorias-contenedor",
    });
});
