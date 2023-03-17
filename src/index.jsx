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
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';
import Lottie from 'lottie-react-native';
import { element } from 'prop-types';

const formatData = (data, numColumns) => {
  const pokeData = data[0];
  const numberOfFullRows = Math.floor(pokeData.length / numColumns);

  let numberOfElementsLastRow = pokeData.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    pokeData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow += 1;
  }
  return pokeData;
};

const numColumns = 2;
const factorScale = 0.75;

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
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

    console.log(`pokeListData: ${JSON.stringify(pokeListData)}`);

    setNextPagePointer(pokeListData.next);
    setIsLoading(false);
    setPokemonList([...pokemonList, ...pokeListData.results]);
  };

  const getKey = (pageIndex, previousPageData) => {
    console.log(`nextPagePointer: ${JSON.stringify(nextPagePointer)}`);
    // reached the end
    if (previousPageData && !nextPagePointer) return null;

    if (pageIndex === 0) return 'https://pokeapi.co/api/v2/pokemon/';

    return nextPagePointer;
  };

  // <View style={styles.loaderStyle}>
  /* <ActivityIndicator size="large" color="#adef" /> */
  /* </View> */

  const renderLoader = () => (
    isLoading
      ? (
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      ) : null
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
