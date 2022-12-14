import React from "react";
import { Row } from "antd";
import PokedexCard from "./PokedexCard";

export default function PokedexList({ pokedex }) {
  return (
    <Row>
      {pokedex &&
        pokedex.results.map((pokemon) => (
          <PokedexCard key={pokemon.name} pokemon={pokemon} />
        ))}
    </Row>
  );
}
