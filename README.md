# Catálogo de Productos - WebApp

## Descripción

Esta aplicación es un catálogo de productos interactivo desarrollado en JavaScript, HTML y CSS, que permite gestionar productos y categorías de manera sencilla y visual. Está orientada a la administración de inventarios pequeños o medianos, facilitando la creación, modificación, filtrado y eliminación de productos y categorías desde una interfaz amigable.

---

## Características principales

-   **Gestión de productos:**

    -   Agregar nuevos productos con nombre, precio, cantidad, imagen y categoría.
    -   Modificar productos existentes (nombre, precio, cantidad, imagen, categoría).
    -   Eliminar productos del catálogo.
    -   Visualización de productos en tarjetas con información relevante.

-   **Gestión de categorías:**

    -   Crear nuevas categorías desde diferentes secciones de la app.
    -   Modificar el nombre de categorías existentes.
    -   Eliminar categorías (con confirmación).
    -   Filtrar productos por categoría desde la barra de navegación.
    -   Sincronización automática de las categorías en todos los selectores de la app.

-   **Persistencia de datos:**

    -   Todos los productos y categorías se almacenan en el `localStorage` del navegador, permitiendo que la información se conserve entre sesiones.

-   **Interfaz de usuario:**

    -   Uso de modales para formularios de creación, modificación y eliminación.
    -   Botones de acción claros y accesibles para cada operación.
    -   Mensajes de alerta para confirmar acciones importantes o advertir sobre errores (por ejemplo, nombres duplicados).
    -   Diseño responsive y moderno.

-   **Validaciones y experiencia de usuario:**
    -   Prevención de duplicados en productos y categorías.
    -   Validación de campos obligatorios en formularios.
    -   Confirmaciones antes de eliminar elementos.
    -   Actualización dinámica de la interfaz tras cada operación.

---

## Estructura de archivos

-   `index.html`: Estructura principal de la webapp y modales.
-   `style.css`: Estilos visuales y responsive.
-   `script.js`: Lógica principal de productos y renderizado.
-   `categorias.js`: Lógica de gestión de categorías y filtrado.
-   `administrador_categorias.js`: Lógica de administración avanzada de categorías (crear, modificar, eliminar desde el panel de administración).
-   `funciones.js`: Funciones auxiliares reutilizables (crear, eliminar, renderizar, cargar datos, etc).
-   `README.md`: Documentación del proyecto.

---

## Cómo usar la aplicación

1. **Agregar productos:**

    - Haz clic en "Agregar producto" y completa el formulario.
    - Selecciona o crea una categoría si es necesario.
    - El producto aparecerá en el catálogo.

2. **Filtrar productos:**

    - Usa el selector de categorías en la barra de navegación para ver solo los productos de una categoría específica.

3. **Modificar o eliminar productos:**

    - Usa los botones de cada tarjeta de producto para modificar o eliminar.

4. **Administrar categorías:**
    - Accede al administrador de categorías para crear, modificar o eliminar categorías existentes.

---

## Tecnologías utilizadas

-   HTML5
-   CSS3
-   JavaScript (ES6+)

---

## Notas adicionales

-   La aplicación no requiere backend ni base de datos externa.
-   Todo el almacenamiento es local (localStorage).
-   El código está modularizado para facilitar el mantenimiento y la escalabilidad.

---

## Autoría

Desarrollado por LaHienitaUpegui y colaboradores.

---

¡Disfruta gestionando tu catálogo de productos!

# Shopping
