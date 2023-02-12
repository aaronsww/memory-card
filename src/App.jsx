import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [cards, setCards] = useState([])

  useEffect (() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
    .then(res => {
      console.log(res.data)
      setCards(res.data.results);
    })
    .catch(err => {
      console.log(err)
    })
  } , []
  )

  return (
    <div >
      <ul>
        {
          cards.map( result => <li>{result.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App
