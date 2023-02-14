import axios from "axios";
import React, { useEffect, useState } from "react";

function PokemonCard({ data }) {
  const [pokemonImageURL, setPokemonImageURL] = useState();

  useEffect(() => {
    axios
      .get(data.url)
      .then((res) => setPokemonImageURL(res.data.sprites.front_default))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ border: "2px solid red", margin: "8px" }}>
      <p>{data.name}</p>
      <img src={pokemonImageURL} alt="pokemon image" />
    </div>
  );
}

export default PokemonCard;
