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

export default function PokeCardView({ columnsCount = 2 }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <Box
        bg="primary.600"
        py="4"
        px="3"
        borderRadius="5"
        margin={2}
        rounded="md"
        flex={1}
        height={(Dimensions.get('window').width / columnsCount) * 0.75}
      >
        <HStack>
          <Heading color="white" size="md">PokeName</Heading>
          <Heading color="white" size="md">#001</Heading>
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
    </ErrorBoundary>
  );
}

PokeCardView.propTypes = {
  columnsCount: PropTypes.number,
};

PokeCardView.defaultProps = {
  columnsCount: 2,
};
