import React, { useState, useEffect } from 'react';
import './MarvelCharacters.css';



const MarvelCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const publicKey = '7c15687c69114f9b8fe0c7387805c3d5';
    const privateKey = '86653b77b45bbc3c1e7e87d7956eabe46a46206e';
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div className="character-list">
        {characters.map((character) => (
          <div key={character.id} className="character">
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarvelCharacters;