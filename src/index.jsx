import React, { useState } from 'react';
import { SWRConfig } from 'swr';
import rollbar from '_utils/rollbar';
import {
  NativeBaseProvider,
  HStack,
  Spinner,
} from 'native-base';
import PokeCardView from '_components/molecules/PokeCardView';
import PokeCardInvisible from '_components/molecules/PokeCardInvisible';
import PokeCardListView from '_components/organisms/PokeCardListView';
import usePokeDataBulk from '_hooks/usePokeDataBulk';

const numColumns = 2;
const factorScale = 0.75;

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
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, pokemonList } = usePokeDataBulk(currentPage);

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
      <NativeBaseProvider>
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      </NativeBaseProvider>
    );
  }

  return (
    <SWRConfig value={{
      onError: (err, key) => {
        rollbar.error(err, key);
      },
    }}
    >
      <NativeBaseProvider>
        <PokeCardListView
          pokemonList={pokemonList}
          renderItem={renderItem}
          keyExtractorFn={keyExtractorFn}
          loadMoreItem={loadMoreItem}
          renderLoader={renderLoader}
          numColumns={numColumns}
        />
      </NativeBaseProvider>
    </SWRConfig>
  );
}
