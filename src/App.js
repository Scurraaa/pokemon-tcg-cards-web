import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setiIsLoading] = useState(false);
  const [searchValue, setSearchInput] = useState('');

  const getData = async (pokemon = null) => {
    if(pokemon === null) {
      setiIsLoading(true);
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:charizard`);
      const json = await response.json();
      setData(json.data);
      setiIsLoading(false);
    } else {
      setSearchInput('');
      setiIsLoading(true);
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon}`);
      const json = await response.json();
      setData(json.data);
      setiIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if(isLoading) {
    return <div className={`pageloading-container`}>
      <img src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' alt='...Loading'/>
    </div>
  } else {
    return (
      <div className="App">
        <div className='header'>
          <label className='title'>Pokémon TCG Cards</label>
          <div className='input-section'>
            <div className='search-input'>
              <input
                className='search-input-value'
                placeholder='Enter Pokemon name'
                value={searchValue}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
                onClick={() => getData(searchValue)}
                className={`search-btn`}>
                Search
            </button>
          </div>
        </div>
        <div className='body'>
          {data.map((card, index) => {
            return <div className='card' key={index}>
              <img src={card.images.small} alt='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'></img>
              <label className='card-label'>
                  {card.name} 
              </label>
              <label className='card-set'>
                {card.set.name}
              </label>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default App;
