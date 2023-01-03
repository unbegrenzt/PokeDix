import React from 'react';
import {
  NativeBaseProvider, FlatList, Box, Heading,
} from 'native-base';
import PokeCardView from '_components/atoms/PokeCardView';
import {
  StyleSheet, Dimensions,
} from 'react-native';
import PokeCardInvisible from '_components/atoms/PokeCardInvisible';

const source = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' },
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
    <PokeCardView columnsCount={numColumns} factorScale={factorScale} />
  );
};

const keyExtractorFn = (item) => item.key;

export default function Index() {
  return (
    <NativeBaseProvider>
      <Box flex={1} marginVertical={40}>
        <Heading size="xl" p="4" pb="5" bold>
          Pokedix
        </Heading>
        <FlatList
          data={formatData(source, numColumns)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={numColumns}
          keyExtractor={keyExtractorFn}
        />
      </Box>
    </NativeBaseProvider>
  );
}
