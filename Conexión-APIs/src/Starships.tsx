import React, { useEffect, useState } from "react";
import StarshipCard, { type Nave } from "./StarshipCard";

async function fetchTodasLasNaves(signal?: AbortSignal): Promise<Nave[]> {
  let url = "https://swapi.dev/api/starships/?format=json";
  const acumulado: Nave[] = [];
  while (url) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} al consultar SWAPI`);
    const data = await res.json();
    acumulado.push(...data.results);
    url = data.next;
  }
  return acumulado;
}

export default function Starships() {
  const [naves, setNaves] = useState<Nave[] | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    const ac = new AbortController();
    try {
      const datos = await fetchTodasLasNaves(ac.signal);
      setNaves(datos);
    } catch (e) {
      setNaves(null);
      setError((e as Error)?.message ?? "Error desconocido al cargar datos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    cargar();
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading
  if (cargando) {
    return (
      <section className="container">
        <h2 className="title">Naves de Star Wars</h2>
        <div className="panel" aria-live="polite">Cargando naves…</div>
      </section>
    );
  }

  // Error (early return)
  if (error) {
    return (
      <section className="container">
        <h2 className="title">Naves de Star Wars</h2>
        <div className="panel" role="alert">
          <p><strong>Error al cargar los datos</strong></p>
          <p style={{ opacity: 0.9, fontSize: 14 }}>{error}</p>
          <button className="btn" onClick={cargar}>Reintentar</button>
        </div>
      </section>
    );
  }

  // Sin datos
  if (!naves || naves.length === 0) {
    return (
      <section className="container">
        <h2 className="title">Naves de Star Wars</h2>
        <div className="panel">No se encontraron naves.</div>
      </section>
    );
  }

  // Con datos
  return (
    <section className="container">
      <h2 className="title">Naves de Star Wars</h2>
      <div className="grid">
        {naves.map((n) => (
          <StarshipCard key={`${n.name}-${n.model}`} nave={n} />
        ))}
      </div>
    </section>
  );
}
