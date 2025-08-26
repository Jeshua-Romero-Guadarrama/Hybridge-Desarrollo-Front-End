/*
  ============================================================
  🔐 Campo de contraseña con “mostrar/ocultar” (React + TS)
  ------------------------------------------------------------
  - Implementa la funcionalidad usando hooks: useState y useId
  - Botón para alternar entre texto y password
  - Accesible: aria-pressed, aria-label, label oculto (sr-only)
  - Tailwind para estilos (como en el código base)
  ============================================================
*/

import React, { useId, useState } from "react";

export default function PasswordField() {
  // id único para asociar el <label> con el <input>
  const inputId = useId();

  // Estado: ¿mostrar la contraseña en texto plano?
  const [mostrar, setMostrar] = useState<boolean>(false);

  // Alterna el estado al hacer clic
  const alternarVisibilidad = () => setMostrar((v) => !v);

  return (
    <div className="w-full max-w-md m-10">
      <div className="relative">
        {/* Etiqueta oculta para lectores de pantalla */}
        <label htmlFor={inputId} className="sr-only">
          Contraseña
        </label>

        <input
          id={inputId}
          type={mostrar ? "text" : "password"}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200 pr-36"
          placeholder="Contraseña"
          autoComplete="current-password"
        />

        {/* Botón para mostrar/ocultar */}
        <button
          type="button"
          onClick={alternarVisibilidad}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          aria-pressed={mostrar}
          aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {mostrar ? "Ocultar" : "Mostrar"} contraseña
        </button>
      </div>
    </div>
  );
}
