import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {pokemonData.map((pokemon) => (
        <PokemonCard data={pokemon} />
      ))}
    </div>
  );
}

export default App;
