import React, { useState } from 'react';
import PokeCardListView from '_components/organisms/PokeCardListView';
import PokeCardView from '_components/molecules/PokeCardView';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';
import usePokeDataBulk from '_hooks/usePokeDataBulk';
import {
  HStack,
  Spinner,
} from 'native-base';

export default function PokeListScene() {
  const numColumns = 2;
  const factorScale = 0.75;
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, pokemonList } = usePokeDataBulk(currentPage);

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

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  if (!pokemonList) {
    return (
      <HStack space={8} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </HStack>
    );
  }

  return (
    <PokeCardListView
      pokemonList={pokemonList}
      renderItem={renderItem}
      keyExtractorFn={keyExtractorFn}
      loadMoreItem={loadMoreItem}
      renderLoader={renderLoader}
      numColumns={numColumns}
    />
  );
}
