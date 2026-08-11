import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Redirige al inicio haciendo clic en el logo/título */}
      <Link to="/" className={styles.logoLink}>
        <h1 className={styles.logo}>RecipeApp</h1>
      </Link>

      <div className={styles.links}>
        {/* Redirige al inicio con un botón/enlace explícito */}
        <Link to="/" className={styles.link}>
          Inicio
        </Link>
        <Link to="/create" className={styles.button}>
          + Crear Receta
        </Link>
      </div>
    </nav>
  );
};