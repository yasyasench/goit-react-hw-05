import React from 'react';
import css from "./Navigation.module.css";
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const createClassName = ({ isActive }) => {
  return clsx(css.link, { [css.isActive]: isActive });
}

const Navigation = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={createClassName}>Home</NavLink>
        <NavLink to="/movies" className={createClassName}>Movies</NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
