import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Heading,
} from 'native-base';
import {
  StyleSheet,
  HStack,
  Spinner,
} from 'react-native';
import PokeCardView from '_components/molecules/PokeCardView';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';

export default function PokeCardListView() {
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

  return (
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
  );
}

const validatesPokemonList = (propValue, key, componentName, location, propFullName) => {
  if (!/matchme/.test(propValue[key])) {
    return new Error(
      `Invalid prop \`${propFullName}\` supplied to`
      + ` \`${componentName}\`. Validation failed.`,
    );
  }
};

PokeCardView.propTypes = {
  pokemonList: PropTypes.arrayOf(validatesPokemonList).isRequired,
  loadMoreItem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

PokeCardListView.defaultProps = {
  pokeNameId: 'Mew',
};
