import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokedexList from "./PokedexList";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState({});
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const getPokedexWithApi = async () => {
    try {
      const getDataPokedex = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/"
      );
      if (getDataPokedex.data.next) setNextPage(getDataPokedex.data.next);
      if (getDataPokedex.data.previous)
        setPrevPage(getDataPokedex.data.previous);

      setPokedex(getDataPokedex.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const getPokedexWithApiNext = async () => {
    try {
      const getDataPokedex = await axios.get(nextPage);
      if (getDataPokedex.data.next) setNextPage(getDataPokedex.data.next);
      if (getDataPokedex.data.previous)
        setPrevPage(getDataPokedex.data.previous);

      setPokedex(getDataPokedex.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const getPokedexWithApiPrev = async () => {
    try {
      const getDataPokedex = await axios.get(prevPage);
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
    getPokedexWithApiNext();
  };

  const handlePrev = (e) => {
    e.preventDefault();
    getPokedexWithApiPrev();
  };

  useEffect(() => {
    getPokedexWithApi();
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
  margin: 0 auto !important;
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
