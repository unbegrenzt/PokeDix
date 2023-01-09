import { React } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from '_hooks/index';
import { CardLayout, CardTitle, CardImage } from '_components/atoms/index';
import rollbar from '_utils/rollbar';
import { convertIdToPokeNumber } from '_utils/index';
import PokeCardErrorView from './PokeCardErrorView';

// An async function for testing our hook.
// Will be successful 50% of the time.
const getPokemonData = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/3');
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const pokeData = await response.json();
    return {
      pokeName: pokeData?.species?.name,
      pokeNumber: convertIdToPokeNumber(pokeData?.id),
      pokePhoto: pokeData?.sprites?.other['official-artwork']?.front_default,
    };
  } catch (error) {
    rollbar.error(error, error);
  }
  return {};
};

export default function PokeCardView({
  columnsCount = 2,
  factorScale = 0.75,
  pokeNameId = 'Mew',
}) {
  const {
    status,
    value,
    error,
  } = useAsync(getPokemonData);

  return (
    <>
      {status === 'error' && (
        <PokeCardErrorView error={error} />
      )}
      {status === 'pending' && (
        <CardLayout
          columnsCount={columnsCount}
          factorScale={factorScale}
        >
          <CardTitle
            isLoading
          />
          <CardImage
            isLoading
          />
        </CardLayout>
      )}
      {status === 'success' && (
        <CardLayout
          columnsCount={columnsCount}
          factorScale={factorScale}
        >
          <CardTitle
            pokeName={value.pokeName}
            pokeNumber={value.pokeNumber}
          />
          <CardImage
            columnsCount={columnsCount}
            factorScale={factorScale}
            pokePhoto={value.pokePhoto}
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
