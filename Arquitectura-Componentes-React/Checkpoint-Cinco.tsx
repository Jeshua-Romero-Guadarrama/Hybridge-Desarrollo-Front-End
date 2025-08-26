// src/components/Button.tsx
/*
  ============================================================
  🔘 Componente <Button /> en React + TypeScript (Tailwind CSS)
  ============================================================

  📌 Requisitos:
    - Este componente asume Tailwind CSS ya configurado en el proyecto.

  🧪 Ejemplos de uso:
    <Button>Botón normal</Button>
    <Button rounded>Este es un botón redondeado</Button>
    <Button rounded onClick={() => alert('Hola')}>Click</Button>
    <Button disabled className="opacity-60">Deshabilitado</Button>
*/

import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Si es true, el botón se muestra con borde completamente redondeado (píldora). */
  rounded?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  rounded = false, // ← valor por defecto: false
  className = "",
  type = "button",
  ...rest
}) => {
  // Clases base de estilo (colores, tipografía, espaciado, efectos)
  const clasesBase =
    "inline-flex items-center justify-center px-6 py-3 font-semibold text-white " +
    "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 " +
    "shadow-md shadow-indigo-600/20 transition focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-indigo-400";

  // Radio del borde según la prop `rounded`
  const clasesRadio = rounded ? "rounded-full" : "rounded-lg";

  // Ensamble final de clases (permitimos extender con `className`)
  const clases = `${clasesBase} ${clasesRadio} ${className}`.trim();

  return (
    <button type={type} className={clases} {...rest}>
      {children}
    </button>
  );
};

export default Button;
