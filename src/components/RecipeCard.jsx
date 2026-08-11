import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../features/recipes/recipeActions';
import styles from './RecipeCard.module.css';

export const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`¿Seguro que deseas eliminar "${recipe.name}"?`)) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  return (
    <div className={styles.card}>
      <img src={recipe.image} alt={recipe.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.name}</h3>
        <div className={styles.info}>
          <span><strong>Dificultad:</strong> {recipe.difficulty}</span>
          <span><strong>Rating:</strong> ⭐ {recipe.rating}</span>
        </div>
        <div className={styles.actions}>
          <Link to={`/recipes/${recipe.id}`} className={styles.detailBtn}>
            Ver Detalle
          </Link>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};