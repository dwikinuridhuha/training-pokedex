import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import axios from "axios";

export default function PokedexCard({ pokemon }) {
  const [imgPokemon, setImgPokemon] = useState("");
  const [imgError, setImgError] = useState(null);

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((data) => {
        setImgPokemon(data.data.sprites.other.home.front_default);
      })
      .catch((error) => setImgError(error.message));
  }, []);

  return (
    <div>
      <Col span={10}>
        <Card
          hoverable
          style={{
            width: 240,
            margin: 15,
          }}
          cover={<img alt={pokemon.name} src={imgPokemon} />}
        >
          <p>{pokemon.name}</p>
        </Card>
      </Col>
    </div>
  );
}
