// * Elementos del DOM del admin de categorias
// obtener el boton para abrir el administrador de categorias
const btnAdminCategorias = document.getElementById(
    "btn-abrir-modal-admin-categorias"
);

// obtener el modal de administrador de categorias
const modalAdminCategorias = document.querySelector(
    ".modal-administrar-categorias-contenedor"
);

// obtener boton de cancelar cambios en el modal de administrador de categorias
const btnCancelarCambiosAdminCategorias = document.getElementById(
    "btn-cancelar-cambios-admin-categorias"
);

// obtener boton de crear una categoria
const btnCreacionCategoria = document.getElementById(
    "btn-crear-nueva-categoria"
);

// form de creacion de categorias desde el admin de categorias
const formularioCreacionCategoriaDesdeAdminCategorias = document.getElementById(
    "formulario-crear-categoria-admin-categorias"
);

// modal donde se crean las categorias que tiene el form de creacion de categorias (Desde el admin de categorias)
const modalContenedorDelFormCreacionCategorias = document.getElementById(
    "modal-crear-categoria-admin-categorias-contenedor"
);
// * Fin bloque de elementos

// * Bloque manejador de aparicion y ocultacion del modal admin categorias
// desplegar el modal de admin categorias la hacer clic en el boton de admin categorias
btnAdminCategorias.addEventListener("click", () => {
    modalAdminCategorias.classList.remove("oculto");
});
// ocultar el modal de admin categorias la hacer clic en el boton de cancelar
btnCancelarCambiosAdminCategorias.addEventListener("click", () => {
    modalAdminCategorias.classList.add("oculto");
});
// ocultar el modal al hacer clic fuera del formulario
window.addEventListener("click", (evento) => {
    if (evento.target === modalAdminCategorias) {
        modalAdminCategorias.classList.add("oculto");
    }
});

// cargar categorias desde el local storage en el select del modal
btnAdminCategorias.addEventListener("click", () => {
    cargarCategoriasHaciaSelect({ selectId: "categorias-existentes" });
});
// * Fin bloque manejador de aparicion y ocultacion del modal admin categorias

// * Bloque manejador del boton de accion de crear una categoria en el admin de categorias
// cuando se da clic al boton de crear categoria, se debe desplegar el modal de creacion de categoria y se esconde el modal actual
btnCreacionCategoria.addEventListener("click", () => {
    // se esconde el modal de admin categorias
    modalAdminCategorias.classList.add("oculto");

    // se muestra el modal de creacion de categorias
    const modalCreacionCategoriaDesdeAdminCategorias = document.querySelector(
        ".modal-crear-categoria-admin-categorias-contenedor"
    );
    modalCreacionCategoriaDesdeAdminCategorias.classList.remove("oculto");
});

// Crear categoria cuando se escuche el submit del formulario de creacion de categoria del admin de categorias
formularioCreacionCategoriaDesdeAdminCategorias.addEventListener(
    "submit",
    (evento) => {
        // previene el comportamiento por defecto del formulario de recargar la pagina
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

// cerrar modal de creacion de categoria si se da clic en cancelar o por fuera del formulario
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
// * Fin del bloque manejador del boton de accion de crear una categoria en el admin de categorias

// * Logica del boton de "Modificar una categoria" en el admin de categorias
// hacer que se muestre el modal de modificacion de categoria cuando se da clic en el boton de modificar categoria y cargar las categorias del local storage en el select.

// se obtiene el boton y el modal de modificacion de categoria
const btnModificarCategoria = document.getElementById(
    "btn-modificar-categoria"
);

// escuchar el evento de clic en el boton de modificar categoria y mostrar el modal de modificacion de categoria con las categorias cargadas desde el local storage
btnModificarCategoria.addEventListener("click", () => {
    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio: "modal-administrar-categorias-contenedor",
        IdModalNuevoParaMostrar:
            "modal-modificar-categoria-admin-categ-contenedor",
    });

    // cargar las categorias en el select de modificacion de categorias
    cargarCategoriasHaciaSelect({ selectId: "selector-categorias-existentes" });
});

// escuchar el evento de submit del formulario y modificar la categoria seleccionada en el local storage y cargarla en el select de categorias existentes
const btnSubmitFormularioModificarCategoria = document.getElementById(
    "btn-enviar-modificar-categoria"
);
btnSubmitFormularioModificarCategoria.addEventListener("click", (evento) => {
    evento.preventDefault();

    // se obtiene el array actual de categorias que esta guardado en el local storage
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // obtener el valor de la categoria que se quiere modificar
    const categoriaParaModificar = document.getElementById(
        "selector-categorias-existentes"
    ).value;

    // se obtiene el nuevo nombre de categoria
    const nuevoNombreCategoria = document.getElementById(
        "nuevo-nombre-categoria"
    ).value;

    // verifica si ya existe una categoria en el array del local storage con el nuevo nombre que introdujo el usuario
    if (categorias.some((categ) => categ.nombre === nuevoNombreCategoria)) {
        alert(
            `Ya existe una categoria con el nombre "${nuevoNombreCategoria}" por favor ingresa otro nombre que no este registrado`
        );
    } else {
        // se obtiene el indice del objeto en el array del local storage que coincida con el valor que el usuario puso en el select de seleccion de categoria
        const index = categorias.findIndex(
            (categoria) =>
                categoria.nombre.toLowerCase() ===
                categoriaParaModificar.toLowerCase()
        );

        // el navegador suelta este error si no se encuentra el indice de la categoria que se quiere modificar
        if (index === -1) {
            alert("No se encontro la categoria a modificar");
        }

        // se hace el cambio del nombre de la categoria en el array
        categorias[index].nombre = nuevoNombreCategoria;

        // se guarda de nuevo en el local storage el array con la categoria modificada
        localStorage.setItem("categorias", JSON.stringify(categorias));

        // se carga la lista de categorias con el cambio realizado en el select
        cargarCategoriasHaciaSelect({
            selectId: "selector-categorias-existentes",
        });

        // se muestra una alerta que indica que el cambio fue realizado con exito
        alert("Cambios realizados con exito");
    }
});

// cerrar el modal de modificacion de categorias y abrir el admin de categorias cuando se de clic al boton de cancelar
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
// * Fin del bloque de logica del boton de "Modificar una categoria" en el admin de categorias

// * Bloque de logica del boton de "Eliminar categoria" en el admin de categorias
// hacer que aparezca el modal para eliminar categorias
const btnEliminarCategorias = document.getElementById("btn-eliminar-categoria");
const modalEliminarCategorias = document.getElementById(
    "modal-eliminar-categoria-admin-categ-contenedor"
);

btnEliminarCategorias.addEventListener("click", () => {
    // cargar las categorias en el select
    cargarCategoriasHaciaSelect({
        selectId: "selector-categorias-para-eliminar",
    });

    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio: "modal-administrar-categorias-contenedor",
        IdModalNuevoParaMostrar:
            "modal-eliminar-categoria-admin-categ-contenedor",
    });
});

// logica para eliminar una categoria

// boton de aceptar eliminacion de categoria
const btnAceptarEliminacionCategoria = document.getElementById(
    "btn-aceptar-eliminar-categoria"
);
btnAceptarEliminacionCategoria.addEventListener("click", () => {
    // array de categorias guardado en el local storage
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    // categoria que selecciono el usuario para eliminar (valor del select de categorias)
    const categoriaAEliminar = document.getElementById(
        "selector-categorias-para-eliminar"
    ).value;

    // verifica que si haya una categoria en el array de donde se quiere eliminar, donde su nombre sea igual a la que escogio el usuario en el selector
    if (
        categorias.some(
            (categ) =>
                categ.nombre.toLowerCase() === categoriaAEliminar.toLowerCase()
        )
    ) {
        // se obtiene el indice de la categoria en el array con el mismo nombre de la categoria que escogio el usuario
        const index = categorias.findIndex(
            (categ) =>
                categ.nombre.toLowerCase() === categoriaAEliminar.toLowerCase()
        );

        // se elimina la categoria especifica usando su indice
        categorias.splice(index, 1);

        // se cargan de nuevo las categorias en el local storage
        localStorage.setItem("categorias", JSON.stringify(categorias));

        // se cargan de nuevo las categorias en el select
        cargarCategoriasHaciaSelect({
            selectId: "selector-categorias-para-eliminar",
        });

        // se muestra un mensaje de exito
        alert("Se elimino con exito la categoria");
    } else {
        alert("No se encontro la categoria que quieres eliminar, escoge otra.");
    }

    mostrarModalYOcultarFormularioPrevio({
        IdModalFormularioPrevio:
            "modal-eliminar-categoria-admin-categ-contenedor",
        IdModalNuevoParaMostrar: "modal-administrar-categorias-contenedor",
    });
});

// cerrar el modal de eliminacion de categorias y abrir el modal de admin de categorias
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
