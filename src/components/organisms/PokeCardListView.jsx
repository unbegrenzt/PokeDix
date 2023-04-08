import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  FlatList,
  Box,
  Heading,
} from 'native-base';
import PropTypes from 'prop-types';

export default function PokeCardListView({
  pokemonList,
  renderItem,
  keyExtractorFn,
  loadMoreItem,
  renderLoader,
  numColumns,
}) {
  const styles = StyleSheet.create({
    container: {
      marginLeft: 5,
      marginRight: 5,
    },
  });

  return (
    <Box
      flex={1}
      marginVertical={40}
    >
      <Heading size="xl" p="4" pb="5" bold>
        Pokedix
      </Heading>
      <Choose>
        <When condition={pokemonList?.length > 0}>
          <FlatList
            removeClippedSubviews
            data={pokemonList}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={keyExtractorFn}
            onEndReached={loadMoreItem}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0}
            initialNumToRender={5}
          />
        </When>
        <Otherwise>
          <Heading size="xl" p="4" pb="5" bold>
            Loading
          </Heading>
        </Otherwise>
      </Choose>
    </Box>
  );
}

// generates the validation props for the component
PokeCardListView.propTypes = {
  // defines the pokemonList prop as required and {}.name as required
  pokemonList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractorFn: PropTypes.func.isRequired,
  loadMoreItem: PropTypes.func.isRequired,
  renderLoader: PropTypes.func.isRequired,
  numColumns: PropTypes.number.isRequired,
};
