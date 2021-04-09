import React from 'react';
import { NavLink } from "react-router-dom";

function product_form_create(props) {
    return (
        <div>
            <h1>Productos</h1>
            <form
        className="form-container" /* onSubmit={(e) => this.handleSubmit(e)} */
      >
        <div className="contenedor2">
          <label className="label">Nombre de la actividad:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Nombre..."
            onChange={(e) => handleName(e)}
          />
          <label className="label">Dificultad de la actividad:</label>
          <select onChange={(e) => handleDificultad(e)}>
            <option value="1">*</option>
            <option value="2">**</option>
            <option value="3">***</option>
            <option value="4">****</option>
            <option value="5">*****</option>
          </select>
          <label className="label">Duración de la actividad:</label>
          <input
            type="text"
            id="duracion"
            autoComplete="off"
            placeholder=" Duración..."
            onChange={(e) => handleDuracion(e)}
          />
          <label className="label">Temporada:</label>
          <select onChange={(e) => handleTemporada(e)}>
            <option value="verano">Verano</option>
            <option value="invierno">Invierno</option>
            <option value="otoño">Otoño</option>
            <option value="primavera">Primavera</option>
          </select>
          <label className="label">
            {'Pais o paises (Sin espacios, separados por coma: ",")'}:
          </label>
          <input
            type="text"
            id="pais"
            autoComplete="off"
            placeholder=" Agregar paises..."
            /* aca usar dsp split */
            onChange={(e) => handlePais(e)}
          />
        </div>
        <button
          onClick={() => {/*DESPACHAR LA ACCION CORRECTA*/}}
        >
          CREAR PRODUCTO
        </button>
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
    );
}

export default product_form_create;