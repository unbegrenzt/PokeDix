import React from 'react';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import rollbar from '_utils/rollbar';
import {
  NativeBaseProvider, FlatList, Box, Heading,
} from 'native-base';
import PokeCardView from '_components/molecules/PokeCardView';
import {
  StyleSheet, Dimensions,
} from 'react-native';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';

const source = [
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '4' },
  { key: '5' },
  { key: '6' },
  { key: '7' },
  { key: '8' },
  { key: '9' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow += 1;
  }

  return data;
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
});

const renderItem = ({ item }) => {
  if (item.empty === true) {
    return <PokeCardInvisible columnsCount={numColumns} factorScale={factorScale} />;
  }
  return (
    <PokeCardView columnsCount={numColumns} factorScale={factorScale} pokeNameId={item.key} />
  );
};

const keyExtractorFn = (item) => item.key;

export default function Index() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.next) return null;

    if (pageIndex === 0) return 'https://pokeapi.co/api/v2/pokemon/';

    return previousPageData.next;
  };

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

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
          <FlatList
            data={formatData(source, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={keyExtractorFn}
            onEndReachedThreshold={50}
          />
        </Box>
      </NativeBaseProvider>
    </SWRConfig>
  );
}
