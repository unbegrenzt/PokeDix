import { React } from 'react';
import PropTypes from 'prop-types';
import { CardLayout, CardTitle, CardImage } from '_components/atoms/index';
import { usePokeData } from '_hooks/index';
import PokeCardErrorView from './PokeCardErrorView';

export default function PokeCardView({
  columnsCount = 2,
  factorScale = 0.75,
  pokeNameId = '4',
}) {
  const { pokeData, isLoading, isError } = usePokeData(pokeNameId);

  return (
    <>
      {(isError && !isLoading) && (
        <PokeCardErrorView error={isError} />
      )}
      {(isLoading || pokeData) && (
        <CardLayout
          columnsCount={columnsCount}
          factorScale={factorScale}
        >
          <CardTitle
            isLoading={isLoading && !pokeData}
            pokeName={pokeData?.pokeName}
            pokeNumber={pokeData?.pokeNumber}
          />
          <CardImage
            isLoading={isLoading && !pokeData}
            columnsCount={columnsCount}
            pokePhoto={pokeData?.pokePhoto}
          />
        </CardLayout>
      )}
    </>
  );
}

PokeCardView.propTypes = {
  columnsCount: PropTypes.number.isRequired,
  factorScale: PropTypes.number.isRequired,
  pokeNameId: PropTypes.string,
};

PokeCardView.defaultProps = {
  pokeNameId: 'Mew',
};
