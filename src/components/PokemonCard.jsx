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
  }, [data.url]);

  return (
    <div className="border-2 border-red-300 ">
      <p>{data.name}</p>
      <img src={pokemonImageURL} alt="pokemon image" />
    </div>
  );
}

export default PokemonCard;
