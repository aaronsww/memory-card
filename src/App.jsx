import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickOnPokemon, setClickOnPokemon] = useState(new Set());

  const [cells, setCells] = useState([]);

  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(0);

  function clickedOnPokemon(name) {
    if (clickOnPokemon.has(name)) {
      clickOnPokemon.clear();
      setCurrent(0);
    } else {
      const temp = new Set(clickOnPokemon);
      temp.add(name);
      setClickOnPokemon(temp);
      setCurrent(current + 1);
      setBest(Math.max(current + 1, best));
      const shuffledCells = shuffle(cells);
      setCells(shuffledCells);
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        console.log(res.data);
        setPokemonData(res.data.results);

        let temp = [];

        for (let i = 0; i < 12; i++) {
          temp.push(res.data.results[i]);
        }
        setCells(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>your score: {current}</div>
      <div>best score: {best}</div>
      {cells &&
        cells.map((cell, i) => (
          <div className="text-3xl" onClick={() => clickedOnPokemon(cell.name)}>
            <PokemonCard key={i} data={cell} />
          </div>
        ))}
    </div>
  );
}

export default App;
