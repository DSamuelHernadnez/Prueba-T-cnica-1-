import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../features/recipes/recipeActions';
import styles from './CreateRecipe.module.css';

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: 'Easy',
    cuisine: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      instructions: formData.instructions.split(',').map((item) => item.trim()),
      prepTimeMinutes: Number(formData.prepTimeMinutes),
      cookTimeMinutes: Number(formData.cookTimeMinutes),
      servings: Number(formData.servings),
      rating: 5.0,
    };

    const success = await dispatch(addRecipe(formattedData));
    if (success) {
      alert('¡Receta creada con éxito!');
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Crear Nueva Receta</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombre:
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Ingredientes (separados por coma):
          <textarea name="ingredients" required value={formData.ingredients} onChange={handleChange} />
        </label>

        <label>
          Instrucciones (separadas por coma):
          <textarea name="instructions" required value={formData.instructions} onChange={handleChange} />
        </label>

        <div className={styles.row}>
          <label>
            Tiempo Prep. (min):
            <input type="number" name="prepTimeMinutes" required value={formData.prepTimeMinutes} onChange={handleChange} />
          </label>

          <label>
            Tiempo Cocción (min):
            <input type="number" name="cookTimeMinutes" required value={formData.cookTimeMinutes} onChange={handleChange} />
          </label>
        </div>

        <div className={styles.row}>
          <label>
            Porciones:
            <input type="number" name="servings" required value={formData.servings} onChange={handleChange} />
          </label>

          <label>
            Dificultad:
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>

        <label>
          Cocina (ej: Italiana, Mexicana):
          <input type="text" name="cuisine" required value={formData.cuisine} onChange={handleChange} />
        </label>

        <label>
          URL de la Imagen:
          <input type="url" name="image" required value={formData.image} onChange={handleChange} />
        </label>

        <button type="submit" className={styles.submitBtn}>Guardar Receta</button>
      </form>
    </div>
  );
};