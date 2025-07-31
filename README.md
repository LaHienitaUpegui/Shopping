# Catálogo de Productos - WebApp

## Descripción

Aplicación web interactiva para la gestión de productos y categorías, desarrollada con JavaScript, HTML y CSS. Permite administrar inventarios pequeños o medianos de forma visual, ágil y segura, con una interfaz moderna y adaptable. Todas las operaciones se realizan desde el navegador, sin necesidad de backend.

---

## Características principales

-   **Gestión de productos:**

    -   Agregar productos con nombre, precio (soporta decimales), cantidad y categoría.
    -   Modificar productos existentes (nombre, precio, cantidad, categoría).
    -   Eliminar productos del catálogo.
    -   Visualización en tarjetas con información relevante y botones de acción.

-   **Gestión de categorías:**

    -   Crear nuevas categorías desde cualquier sección (formulario de producto o panel de administración).
    -   Modificar el nombre de categorías existentes.
    -   Eliminar categorías desde el panel de administración (con confirmación).
    -   Filtrar productos por categoría desde la barra de acciones.
    -   Sincronización automática de las categorías en todos los selectores de la app.

-   **Persistencia de datos:**

    -   Todos los productos y categorías se almacenan en el `localStorage` del navegador, conservando la información entre sesiones.

-   **Interfaz de usuario:**

    -   Uso de modales para formularios de creación, modificación y eliminación.
    -   Botones de acción claros y accesibles.
    -   Mensajes de alerta para confirmar acciones importantes o advertir sobre errores (por ejemplo, nombres duplicados).
    -   Diseño responsive, moderno y accesible.
    -   Estilos personalizados para selects, inputs y botones, con transiciones y separadores visuales.

-   **Validaciones y experiencia de usuario:**
    -   Prevención de duplicados en productos y categorías.
    -   Validación de campos obligatorios y tipos de datos (precio decimal, cantidad numérica).
    -   Confirmaciones antes de eliminar elementos.
    -   Actualización dinámica de la interfaz tras cada operación.
    -   Manejo robusto de errores y mensajes informativos.

---

## Estructura de archivos

-   `index.html`: Estructura principal de la webapp y modales.
-   `style.css`: Estilos visuales, responsive y personalizados.
-   `script.js`: Lógica principal de productos y renderizado.
-   `categorias.js`: Lógica de gestión y filtrado de categorías.
-   `administrador_categorias.js`: Administración avanzada de categorías (crear, modificar, eliminar desde el panel).
-   `funciones.js`: Funciones auxiliares reutilizables (crear, eliminar, renderizar, cargar datos, etc).
-   `README.md`: Documentación del proyecto.

---

## Cómo usar la aplicación

1. **Agregar productos:**

    - Haz clic en "Agregar producto" y completa el formulario.
    - Selecciona o crea una categoría si es necesario.
    - El producto aparecerá en el catálogo.

2. **Filtrar productos:**

    - Usa el selector de categorías en la barra de acciones para ver solo los productos de una categoría específica.

3. **Modificar o eliminar productos:**

    - Usa los botones de cada tarjeta de producto para modificar o eliminar.

4. **Administrar categorías:**
    - Accede al administrador de categorías para crear, modificar o eliminar categorías existentes.

---

## Tecnologías utilizadas

-   HTML5
-   CSS3 (con variables y transiciones)
-   JavaScript (ES6+)

---

## Notas adicionales

-   No requiere backend ni base de datos externa.
-   Todo el almacenamiento es local (`localStorage`).
-   El código está modularizado y documentado para facilitar el mantenimiento y la escalabilidad.
-   Todos los textos visibles y comentarios están corregidos ortográficamente.
-   El diseño es adaptable y accesible para distintos dispositivos y usuarios.

---

## Autoría

Desarrollado por LaHienitaUpegui y colaboradores.

---

¡Disfruta gestionando tu catálogo de productos!
