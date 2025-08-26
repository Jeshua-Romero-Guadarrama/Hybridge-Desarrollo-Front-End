import React from "react";

export type Nave = {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  hyperdrive_rating: string;
};

function Row({ t, v }: { t: string; v: React.ReactNode }) {
  return (
    <p className="kv">
      <span className="k">{t}: </span>
      <span className="v">{v}</span>
    </p>
  );
}

export default function StarshipCard({
  nave,
  className = "",
}: {
  nave: Nave;
  className?: string;
}) {
  return (
    <article className={`card ${className}`}>
      <h3>{nave.name}</h3>
      <p className="muted">{nave.model}</p>

      <div>
        <Row t="Fabricante" v={nave.manufacturer} />
        <Row t="Clase" v={nave.starship_class} />
        <Row t="Costo (créditos)" v={nave.cost_in_credits} />
        <Row t="Tripulación" v={nave.crew} />
        <Row t="Pasajeros" v={nave.passengers} />
        <Row t="Hyperdrive" v={nave.hyperdrive_rating} />
      </div>
    </article>
  );
}
