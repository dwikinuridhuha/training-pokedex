import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import axios from "axios";
import styled from "styled-components";

export default function PokedexCard({ pokemon }) {
  const [imgPokemon, setImgPokemon] = useState("");
  const [imgError, setImgError] = useState(null);

  const showImgError =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((data) => {
        setImgPokemon(data.data.sprites.other.home.front_default);
      })
      .catch((error) => setImgError(error.message));
  }, []);

  return (
    <Col span={10}>
      <Card
        hoverable
        style={{
          width: 240,
          margin: 15,
        }}
        cover={
          <img alt={pokemon.name} src={imgError ? showImgError : imgPokemon} />
        }
      >
        <hr />
        <NameStylePokemon>{pokemon.name}</NameStylePokemon>
      </Card>
    </Col>
  );
}

const NameStylePokemon = styled.strong`
  display: flex;
  justify-content: center;
  font-size: 18px;
`;
