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
    <div className="border-2 border-red-300 m-5 rounded-xl">
      <p className="text-xl mt-2 font-semibold">{data.name}</p>
      <img className="h-40" src={pokemonImageURL} alt="pokemon image" />
    </div>
  );
  // add new image on hover
}

export default PokemonCard;
