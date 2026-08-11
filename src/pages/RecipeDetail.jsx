import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../features/recipes/recipeActions';
import styles from './RecipeDetail.module.css';

export const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedRecipe, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (loading) return <p className={styles.message}>Cargando detalle...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!selectedRecipe) return null;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backBtn}>← Volver</Link>
      <div className={styles.detailCard}>
        <img src={selectedRecipe.image} alt={selectedRecipe.name} className={styles.image} />
        <div className={styles.content}>
          <h2>{selectedRecipe.name}</h2>
          <div className={styles.metrics}>
            <span><strong>Cocina:</strong> {selectedRecipe.cuisine}</span>
            <span><strong>Dificultad:</strong> {selectedRecipe.difficulty}</span>
            <span><strong>Rating:</strong> ⭐ {selectedRecipe.rating}</span>
            <span><strong>Calorías:</strong> {selectedRecipe.caloriesPerServing} kcal/porción</span>
            <span><strong>Tiempo prep:</strong> {selectedRecipe.prepTimeMinutes} min</span>
            <span><strong>Tiempo cocción:</strong> {selectedRecipe.cookTimeMinutes} min</span>
            <span><strong>Porciones:</strong> {selectedRecipe.servings}</span>
          </div>

          <h3>Ingredientes</h3>
          <ul>
            {selectedRecipe.ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <h3>Instrucciones</h3>
          <ol>
            {selectedRecipe.instructions?.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};