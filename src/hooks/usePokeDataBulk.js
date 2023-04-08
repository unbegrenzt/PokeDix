import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

export default function usePokeDataBulk(currentPage) {
  const [nextPagePointer, setNextPagePointer] = useState(`${Constants.expoConfig.extra.apiUrl}/pokemon/`);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  const fetcher = async () => {
    setIsLoading(true);
    const fetchData = await fetch(nextPagePointer);
    const pokeListDataServer = await fetchData.json();
    setNextPagePointer(pokeListDataServer.next);
    setIsLoading(false);
    setPokemonList([...pokemonList, ...pokeListDataServer.results]);
  };

  useEffect(() => {
    fetcher();
  }, [currentPage]);

  return {
    isLoading,
    pokemonList,
  };
}
