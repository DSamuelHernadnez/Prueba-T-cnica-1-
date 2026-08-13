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

  const [errors, setErrors] = useState({});

  // Manejo de inputs sin limpiar errores en tiempo real
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función de validación (se ejecuta únicamente al hacer submit)
  const validateForm = () => {
    const newErrors = {};

    // 1. Validar campos obligatorios
    if (!formData.name) {
      newErrors.name = 'El nombre es obligatorio.';
    }

    if (!formData.ingredients) {
      newErrors.ingredients = 'Los ingredientes son obligatorios.';
    }

    if (formData.ingredients && !formData.ingredients.includes(',')) {
      newErrors.ingredients = 'Ingresa los ingredientes separados por comas (,).';
    }

    if (!formData.instructions) {
      newErrors.instructions = 'Las instrucciones son obligatorias.';
    }

    // 2. Validar tiempo de preparación
    if (!formData.prepTimeMinutes) {
      newErrors.prepTimeMinutes = 'El tiempo de preparación es obligatorio.';
    }
    if (formData.prepTimeMinutes && Number(formData.prepTimeMinutes) <= 0) {
      newErrors.prepTimeMinutes = 'El tiempo de preparación debe ser mayor a 0.';
    }

    // 3. Validar tiempo de cocción
    if (!formData.cookTimeMinutes) {
      newErrors.cookTimeMinutes = 'El tiempo de cocción es obligatorio.';
    }
    if (formData.cookTimeMinutes && Number(formData.cookTimeMinutes) <= 0) {
      newErrors.cookTimeMinutes = 'El tiempo de cocción debe ser mayor a 0.';
    }

    if (!formData.servings) {
      newErrors.servings = 'Las porciones son obligatorias.';
    }

    if (!formData.cuisine) {
      newErrors.cuisine = 'El tipo de cocina es obligatorio.';
    }

    if (!formData.image) {
      newErrors.image = 'La URL de la imagen es obligatoria.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Las validaciones se disparan aquí al hacer clic en "Guardar Receta"
    if (!validateForm()) {
      return;
    }

    const listaIngredientes = formData.ingredients.split(',');
    const listaInstrucciones = formData.instructions.split(',');

    const formattedData = {
      name: formData.name,
      ingredients: listaIngredientes,
      instructions: listaInstrucciones,
      prepTimeMinutes: Number(formData.prepTimeMinutes),
      cookTimeMinutes: Number(formData.cookTimeMinutes),
      servings: Number(formData.servings),
      difficulty: formData.difficulty,
      cuisine: formData.cuisine,
      image: formData.image,
      rating: 5.0,
    };

    dispatch(addRecipe(formattedData))
      .then((recetaCreada) => {
        if (recetaCreada) {
          alert('¡Receta creada con éxito!');
          navigate('/recipes/' + recetaCreada.id);
        }
      })
      .catch((error) => {
        console.error('Error al guardar la receta:', error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Crear Nueva Receta</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </label>

        <label>
          Ingredientes (separados por coma):
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} />
          {errors.ingredients && <span className={styles.errorMessage}>{errors.ingredients}</span>}
        </label>

        <label>
          Instrucciones (separadas por coma):
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
          {errors.instructions && <span className={styles.errorMessage}>{errors.instructions}</span>}
        </label>

        <div className={styles.row}>
          <label>
            Tiempo Prep. (min):
            <input type="number" name="prepTimeMinutes" value={formData.prepTimeMinutes} onChange={handleChange} />
            {errors.prepTimeMinutes && <span className={styles.errorMessage}>{errors.prepTimeMinutes}</span>}
          </label>

          <label>
            Tiempo Cocción (min):
            <input type="number" name="cookTimeMinutes" value={formData.cookTimeMinutes} onChange={handleChange} />
            {errors.cookTimeMinutes && <span className={styles.errorMessage}>{errors.cookTimeMinutes}</span>}
          </label>
        </div>

        <div className={styles.row}>
          <label>
            Porciones:
            <input type="number" name="servings" value={formData.servings} onChange={handleChange} />
            {errors.servings && <span className={styles.errorMessage}>{errors.servings}</span>}
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
          <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} />
          {errors.cuisine && <span className={styles.errorMessage}>{errors.cuisine}</span>}
        </label>

        <label>
          URL de la Imagen:
          <input type="url" name="image" value={formData.image} onChange={handleChange} />
          {errors.image && <span className={styles.errorMessage}>{errors.image}</span>}
        </label>

        <button type="submit" className={styles.submitBtn}>Guardar Receta</button>
      </form>
    </div>
  );
};