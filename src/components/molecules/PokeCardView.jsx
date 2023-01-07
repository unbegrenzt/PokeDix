import { React } from 'react';
import {
  Box, HStack, Text, Image, Heading, Skeleton, Card,
} from 'native-base';
import PropTypes from 'prop-types';
import { getHeightFromRelativeToLayout } from '_utils/calculators';
import { useAsync } from '_hooks/index';
import Constants from 'expo-constants';
import { ErrorBoundary } from 'react-error-boundary';
import { CardLayout, CardTitle } from '_components/atoms/index';

function ErrorFallback({ error }) {
  return (
    <CardLayout>
      <HStack>
        <Heading color="darkText" size="md">No se pudo cargar</Heading>
        <Text fontSize="md"> </Text>
        <Text color="gray.500" fontSize="md">#000</Text>
      </HStack>
      <HStack justifyContent="center">
        <Image
          size="lg"
          resizeMode="cover"
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
          }}
          alt="Pokemon image"
        />
      </HStack>
    </CardLayout>
  );
}
ErrorFallback.defaultProps = {
  error: { message: 'default error message' },
};

ErrorFallback.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.any,
  ]),
};

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
    execute, status, value, error,
  } = useAsync(myFunction);

  return (
    <>
      {status === 'error' && (
        <ErrorFallback error={error} />
      )}
      {status === 'pending' && (
        <CardLayout
          columnsCount={columnsCount}
          factorScale={factorScale}
        >
          <CardTitle isLoading />
          <HStack justifyContent="center">
            <Skeleton h={getHeightFromRelativeToLayout(columnsCount, 0.45)} mt={3} isLoaded={status !== 'pending'}>
              <Image
                size="lg"
                resizeMode="cover"
                source={{
                  uri: pokePhoto,
                }}
                alt="Pokemon image"
              />
            </Skeleton>
          </HStack>
        </CardLayout>
      )}
      {status === 'success' && (
        <CardLayout>
          <CardTitle
            pokeName={pokeName}
            pokeNumber={pokeNumber}
          />
          <HStack justifyContent="center">
            <Skeleton
              h={getHeightFromRelativeToLayout(columnsCount, 0.45)}
              mt={3}
              isLoaded={status !== 'pending'}
            >
              <Image
                size="lg"
                resizeMode="cover"
                source={{
                  uri: pokePhoto,
                }}
                alt="Pokemon image"
              />
            </Skeleton>
          </HStack>
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
