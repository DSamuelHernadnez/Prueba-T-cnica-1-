export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPE_DETAIL_SUCCESS = 'FETCH_RECIPE_DETAIL_SUCCESS';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

const BASE_URL = 'https://dummyjson.com/recipes';

// Cargar todas las recetas
export const fetchRecipes = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: data.recipes || [] });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Buscar recetas por nombre
export const searchRecipes = (query) => async (dispatch) => {
  const cleanQuery = (query || '').trim();

  // Si el campo de búsqueda está vacío, recargamos la lista completa
  if (!cleanQuery) {
    return dispatch(fetchRecipes());
  }

  dispatch({ type: SET_LOADING, payload: true });
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(cleanQuery)}`);
    const data = await res.json();
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: data.recipes || [] });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Obtener detalle por ID
export const fetchRecipeById = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    dispatch({ type: FETCH_RECIPE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Crear receta (Retorna el objeto creado con su ID)
export const addRecipe = (newRecipe) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    });
    const data = await res.json();
    
    // Generamos un ID único local
    const recipeToAdd = { ...data, id: Date.now() };
    
    dispatch({ type: ADD_RECIPE_SUCCESS, payload: recipeToAdd });
    return recipeToAdd; // Retorna la receta completa para redireccionar usando su ID
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    return null;
  }
};

// Eliminar receta (DELETE simulado)
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_RECIPE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};