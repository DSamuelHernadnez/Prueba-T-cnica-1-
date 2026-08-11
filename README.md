# 🍳 Proyecto Final: Aplicación de Recetas

Proyecto individual para el módulo M2 desarrollado con **React**, **Redux** y **CSS Modules**, consumiendo la API pública de [DummyJSON Recipes](https://dummyjson.com/docs/recipes).

---

## 🔗 Enlaces

* **Aplicación desplegada (Vercel):** [https://tu-app.vercel.app](https://tu-app.vercel.app)
* **Repositorio en GitHub:** [https://github.com/tu-usuario/recipe-app](https://github.com/tu-usuario/recipe-app)

---

## 🛠️ Tecnologías que utilicé

* **React**: Para crear los componentes de la interfaz.
* **Redux y React-Redux**: Para manejar el estado global de la aplicación.
* **Redux Thunk**: Para hacer las peticiones `fetch` asíncronas a la API.
* **React Router DOM**: Para navegar entre las diferentes páginas sin recargar la pantalla.
* **CSS Modules**: Para darle estilos a cada componente por separado sin que se mezclen.

---

## 🏗️ Estructura del Proyecto

Organicé las carpetas de la siguiente manera:

```text
src/
├── app/
│   └── store.js              # Configuración del store de Redux
├── features/
│   └── recipes/
│       ├── recipeActions.js  # Acciones y peticiones a la API (fetch)
│       └── recipeReducer.js  # Reducer para modificar el estado
├── components/
│   ├── Navbar.jsx            # Barra de navegación
│   └── RecipeCard.jsx        # Tarjeta para mostrar cada receta
├── pages/
│   ├── Home.jsx              # Vista principal con el listado y buscador
│   ├── RecipeDetail.jsx      # Vista de detalle de una receta
│   └── CreateRecipe.jsx      # Formulario para agregar receta
├── App.jsx                   # Configuración de las rutas
└── main.jsx                  # Punto de entrada de la app