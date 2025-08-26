/*
  ============================================================
  🧠 Checkpoint 3 — Fundamentos de TypeScript
      Encontrar el número faltante en un arreglo con enteros únicos del 1 al N.
      npx tsc .\Checkpoint-Tres.ts --target ES2020 --module commonjs
      node .\Checkpoint-Tres.js
  ============================================================

  ✅ Condiciones del problema:
  - El arreglo contiene enteros únicos dentro del rango 1..N.
  - El arreglo NO está ordenado.
  - La longitud del arreglo es N - 1 (falta exactamente un número).

  🎯 Objetivo:
  - Escribir una función que devuelva el número faltante.

  💡 Ejemplo de uso:
      const nums = [3, 7, 1, 2, 8, 4, 5];
      const resultado = encontrarNumeroFaltante(nums);
      console.log(resultado); // Debería mostrar: 6
*/

/* ============================================================
   ✨ Enfoque 1: Fórmula de Gauss (suma esperada vs suma real)
   ------------------------------------------------------------
   Idea:
   - Si los números deberían ser 1..N y hay exactamente un faltante,
     entonces:
       suma_esperada = N * (N + 1) / 2
     y
       suma_real = suma de los elementos del arreglo
     El faltante es:
       faltante = suma_esperada - suma_real

   Ventajas:
   - Tiempo O(N).
   - Memoria O(1).
   Requisitos:
   - Todos los valores son únicos y pertenecen al rango [1..N].
   - Falta exactamente un número.
   ============================================================ */
export function encontrarNumeroFaltante(nums: number[]): number {
  // N debe ser (longitud del arreglo + 1) porque falta exactamente uno
  const n: number = nums.length + 1;

  // Suma esperada de 1..N usando la fórmula de Gauss
  const sumaEsperada: number = (n * (n + 1)) / 2;

  // Suma real de los valores presentes en el arreglo
  const sumaReal: number = nums.reduce((acum, valor) => acum + valor, 0);

  // La diferencia es el número faltante
  const faltante: number = sumaEsperada - sumaReal;
  return faltante;
}

/* ============================================================
   🔁 Enfoque 2: XOR bit a bit
   ------------------------------------------------------------
   Idea:
   - El XOR de 1..N con todos los elementos del arreglo deja como
     resultado el número faltante (porque a ⊕ a = 0 y 0 ⊕ b = b).

   Ventajas:
   - Tiempo O(N).
   - Memoria O(1).
   Nota:
   - Útil cuando se quiere evitar overflow de sumas.
   ============================================================ */
export function encontrarNumeroFaltanteXOR(nums: number[]): number {
  const n: number = nums.length + 1;

  // XOR de todos los números de 1..N
  let xorRango: number = 0;
  for (let i = 1; i <= n; i++) xorRango ^= i;

  // XOR de todos los elementos del arreglo
  let xorArreglo: number = 0;
  for (const num of nums) xorArreglo ^= num;

  // El faltante es el XOR de ambos
  return xorRango ^ xorArreglo;
}

/* ============================================================
   🧪 Pruebas rápidas
   ============================================================ */
(function probar() {
  // Ejemplo del enunciado
  const nums1: number[] = [3, 7, 1, 2, 8, 4, 5];
  console.log("Ejemplo (Gauss):", encontrarNumeroFaltante(nums1));      // 6
  console.log("Ejemplo (XOR):  ", encontrarNumeroFaltanteXOR(nums1));   // 6

  // Casos extra
  const nums2: number[] = [1, 2, 3, 5];         // Falta 4 (N=5)
  const nums3: number[] = [2, 3, 4, 5];         // Falta 1 (N=5)
  const nums4: number[] = [1, 3, 4, 5];         // Falta 2 (N=5)
  const nums5: number[] = [1, 2, 4, 5, 6, 7];   // Falta 3 (N=7)

  console.log("Extra 1 (Gauss):", encontrarNumeroFaltante(nums2));      // 4
  console.log("Extra 1 (XOR):  ", encontrarNumeroFaltanteXOR(nums2));   // 4
  console.log("Extra 2 (Gauss):", encontrarNumeroFaltante(nums3));      // 1
  console.log("Extra 2 (XOR):  ", encontrarNumeroFaltanteXOR(nums3));   // 1
  console.log("Extra 3 (Gauss):", encontrarNumeroFaltante(nums4));      // 2
  console.log("Extra 3 (XOR):  ", encontrarNumeroFaltanteXOR(nums4));   // 2
  console.log("Extra 4 (Gauss):", encontrarNumeroFaltante(nums5));      // 3
  console.log("Extra 4 (XOR):  ", encontrarNumeroFaltanteXOR(nums5));   // 3
})();
