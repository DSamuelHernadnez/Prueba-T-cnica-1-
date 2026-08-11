import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, searchRecipes } from '../features/recipes/recipeActions';
import { RecipeCard } from '../components/RecipeCard';
import styles from './Home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchRecipes(searchTerm));
  };

  const handleReset = () => {
    setSearchTerm('');
    dispatch(fetchRecipes());
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Buscar receta por nombre o ingrediente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>Buscar</button>
        {searchTerm && (
          <button type="button" onClick={handleReset} className={styles.resetBtn}>
            Limpiar
          </button>
        )}
      </form>

      {loading && <p className={styles.message}>Cargando recetas...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Mensaje y Botón cuando no hay resultados de búsqueda */}
      {!loading && !error && list.length === 0 && (
        <div className={styles.notFoundContainer}>
          <p className={styles.message}>
            No se encontraron recetas para "{searchTerm}".
          </p>
          <button onClick={handleReset} className={styles.backHomeBtn}>
            ← Volver al inicio
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {list.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};