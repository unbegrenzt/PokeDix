import { React } from 'react';
import {
  Box, HStack, Text, Image, Heading,
} from 'native-base';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <Text>Something went wrong:</Text>
      <Text>{error.message}</Text>
    </div>
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

export default function PokeCardView({
  columnsCount = 2,
  factorScale = 0.75,
  pokeName = 'Mew',
  pokeNumber = '#001',
  pokePhoto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <Box
        bg="trueGray.100"
        py="4"
        px="3"
        borderRadius="5"
        margin={2}
        rounded="md"
        flex={1}
        height={(Dimensions.get('window').width / columnsCount) * factorScale}
      >
        <HStack>
          <Heading color="darkText" size="md">{pokeName}</Heading>
          <Text fontSize="md"> </Text>
          <Text color="gray.500" fontSize="md">{pokeNumber}</Text>
        </HStack>
        <HStack justifyContent="center">
          <Image
            size="lg"
            resizeMode="cover"
            source={{
              uri: pokePhoto,
            }}
            alt="Pokemon image"
          />
        </HStack>
      </Box>
    </ErrorBoundary>
  );
}

PokeCardView.propTypes = {
  columnsCount: PropTypes.number.isRequired,
  factorScale: PropTypes.number.isRequired,
  pokeName: PropTypes.string.isRequired,
  pokeNumber: PropTypes.number.isRequired,
  pokePhoto: PropTypes.string.isRequired,
};
