import { useState, useEffect } from "react";
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
    <div className="text-center flex flex-col items-center bg-sky-100">
      <img className="w-3/5" src="img\title.png" alt="" />
      <div className="text-2xl my-6 font-bold">
        <span className="bg-yellow-100 p-2 rounded-xl ">
          Your Score: {current}{" "}
        </span>
        <span className="ml-14 bg-red-500 p-2 rounded-xl ">
          Best Score: {best}
        </span>
      </div>
      <div className=" flex flex-wrap w-7/12">
        {cells &&
          cells.map((cell, i) => (
            <div className="" onClick={() => clickedOnPokemon(cell.name)}>
              <PokemonCard key={i} data={cell} />
            </div>
          ))}
      </div>
      <div className="flex my-3">
        Copyright &copy; 2022 &nbsp;
        <a className="flex" href="https://github.com/aaronsww">
          aaronsww
          <img className="ml-1 h-5" src="img\github.svg" alt="" />
        </a>
      </div>
    </div>
  );
}

export default App;
