import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokedexList from "./PokedexList";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState({});
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const defaultAPI = "https://pokeapi.co/api/v2/pokemon/";

  const getPokedexWithApi = async (api) => {
    try {
      const getDataPokedex = await axios.get(api);
      if (getDataPokedex.data.next) setNextPage(getDataPokedex.data.next);
      if (getDataPokedex.data.previous)
        setPrevPage(getDataPokedex.data.previous);

      setPokedex(getDataPokedex.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    getPokedexWithApi(nextPage);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    getPokedexWithApi(prevPage);
  };

  useEffect(() => {
    getPokedexWithApi(defaultAPI);
  }, []);

  return (
    <React.Fragment>
      <ContainerLayout>
        <ButtonCenter>
          {prevPage && <Button onClick={handlePrev}>Previous</Button>}
          {nextPage && <Button onClick={handleNext}>Next</Button>}
        </ButtonCenter>

        {error ? <h1>{error}</h1> : <PokedexList pokedex={pokedex} />}
      </ContainerLayout>
    </React.Fragment>
  );
}

const ContainerLayout = styled.div`
  padding: 5px 15px;
`;

const Button = styled.button`
  border-radius: 15px;
  padding: 15px 20px;
  margin: 15px;
  cursor: pointer;
`;

const ButtonCenter = styled.div`
  margin: auto;
`;
