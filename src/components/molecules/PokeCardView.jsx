import { React } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from '_hooks/index';
import { CardLayout, CardTitle, CardImage } from '_components/atoms/index';
import PokeCardErrorView from './PokeCardErrorView';

// An async function for testing our hook.
// Will be successful 50% of the time.
const myFunction = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    const rnd = Math.random() * 10;
    rnd <= 5
      ? resolve('Submitted successfully 🙌')
      : reject('Oh no there was an error 😞');
  }, 2000);
});

const pokeName = 'Mew';
const pokeNumber = '#151';
const pokePhoto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png';
export default function PokeCardView({
  columnsCount = 2,
  factorScale = 0.75,
  pokeNameId = 'Mew',
}) {
  const {
    status, value, error,
  } = useAsync(myFunction);

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
            pokeName={pokeName}
            pokeNumber={pokeNumber}
          />
          <CardImage
            columnsCount={columnsCount}
            factorScale={factorScale}
            pokePhoto={pokePhoto}
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
