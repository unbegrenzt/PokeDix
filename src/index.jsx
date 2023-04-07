import React, { useState, useEffect } from 'react';
import { SWRConfig } from 'swr';
import rollbar from '_utils/rollbar';
import {
  NativeBaseProvider,
  FlatList,
  Box,
  Heading,
  HStack,
  Spinner,
} from 'native-base';
import PokeCardView from '_components/molecules/PokeCardView';
import {
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';

const numColumns = 2;
const factorScale = 0.75;

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
});

const renderItem = ({ item }) => {
  if (item.empty === true) {
    return <PokeCardInvisible columnsCount={numColumns} factorScale={factorScale} />;
  }
  return (
    <PokeCardView columnsCount={numColumns} factorScale={factorScale} pokeNameId={item.name} />
  );
};

const keyExtractorFn = (item) => item.name;

export default function Index() {
  const [nextPagePointer, setNextPagePointer] = useState(`${Constants.expoConfig.extra.apiUrl}/pokemon/`);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = async () => {
    setIsLoading(true);
    const fetchData = await fetch(nextPagePointer);
    const pokeListData = await fetchData.json();

    setNextPagePointer(pokeListData.next);
    setIsLoading(false);
    setPokemonList([...pokemonList, ...pokeListData.results]);
  };

  const renderLoader = () => (
    <Choose>
      <When condition={isLoading}>
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      </When>
      <Otherwise>
        {null}
      </Otherwise>
    </Choose>
  );

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetcher();
  }, [currentPage]);

  return (
    <SWRConfig value={{
      onError: (err, key) => {
        rollbar.error(err, key);
      },
    }}
    >
      <NativeBaseProvider>
        <Box
          flex={1}
          marginVertical={40}
        >
          <Heading size="xl" p="4" pb="5" bold>
            Pokedix
          </Heading>
          <Choose>
            <When condition={pokemonList.length > 0}>
              <FlatList
                data={pokemonList}
                style={styles.container}
                renderItem={renderItem}
                numColumns={numColumns}
                keyExtractor={keyExtractorFn}
                onEndReached={loadMoreItem}
                ListFooterComponent={renderLoader}
                onEndReachedThreshold={0}
              />
            </When>
            <Otherwise>
              <Heading size="xl" p="4" pb="5" bold>
                Loading
              </Heading>
            </Otherwise>
          </Choose>
        </Box>
      </NativeBaseProvider>
    </SWRConfig>
  );
}
