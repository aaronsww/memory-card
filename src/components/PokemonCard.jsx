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
    <div className="transition hover:scale-105  m-2 rounded-xl shadow-xl bg-neutral-50 ">
      <p className="text-xl mt-2 font-semibold">{data.name}</p>
      <img className="h-40" src={pokemonImageURL} alt="pokemon image" />
    </div>
  );
}

export default PokemonCard;
