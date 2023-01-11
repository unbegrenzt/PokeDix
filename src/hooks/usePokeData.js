import Constants from 'expo-constants';
import useSWR from 'swr';
import { convertIdToPokeNumber } from '_utils/index';

const fetcherPokeData = async (...args) => {
  const fetchData = await fetch(...args);
  const pokeData = await fetchData.json();
  return {
    pokeName: pokeData?.species?.name,
    pokeNumber: convertIdToPokeNumber(pokeData?.id),
    pokePhoto: pokeData?.sprites?.other['official-artwork']?.front_default,
  };
};

export default function usePokeData(pokeNameId) {
  const { data, error, isLoading } = useSWR(
    `${Constants.expoConfig.extra.apiUrl}/pokemon/${pokeNameId}`,
    fetcherPokeData,
  );
  return {
    pokeData: data,
    isLoading,
    isError: error,
  };
}
