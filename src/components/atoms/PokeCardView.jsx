import { React } from 'react';
import {
  Box, HStack, Text, Image, Heading, Skeleton,
} from 'native-base';
import PropTypes from 'prop-types';
import { getHeightFromRelativeToLayout } from '_utils/calculators';
import { useAsync } from '_hooks/index';
import Constants from 'expo-constants';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <Box
      bg="trueGray.100"
      py="4"
      px="3"
      borderRadius="5"
      margin={2}
      rounded="md"
      flex={1}
      height={getHeightFromRelativeToLayout(2, 0.75)}
    >
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
    </Box>
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
      {/* {status === 'error' && <ErrorFallback error={error} />} */}
      {status === 'error' && <ErrorFallback error={error} />}
      {status === 'pending' && (
        <Box
          bg="trueGray.100"
          py="4"
          px="3"
          borderRadius="5"
          margin={2}
          rounded="md"
          flex={1}
          height={getHeightFromRelativeToLayout(columnsCount, factorScale)}
        >
          <HStack>
            <Skeleton.Text lines={1} isLoaded={status !== 'pending'}>
              <Heading color="darkText" size="md">{pokeName}</Heading>
              <Heading color="darkText" size="md">{pokeName}</Heading>
              <Text fontSize="md"> </Text>
              <Text color="gray.500" fontSize="md">{pokeNumber}</Text>
            </Skeleton.Text>
          </HStack>
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
        </Box>
      )}
      {status === 'success' && (
        <Box
          bg="trueGray.100"
          py="4"
          px="3"
          borderRadius="5"
          margin={2}
          rounded="md"
          flex={1}
          height={getHeightFromRelativeToLayout(columnsCount, factorScale)}
        >
          <HStack>
            <Skeleton.Text lines={1} isLoaded={status !== 'pending'}>
              <Heading color="darkText" size="md">{pokeName}</Heading>
              <Heading color="darkText" size="md">{pokeName}</Heading>
              <Text fontSize="md"> </Text>
              <Text color="gray.500" fontSize="md">{pokeNumber}</Text>
            </Skeleton.Text>
          </HStack>
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
        </Box>
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
