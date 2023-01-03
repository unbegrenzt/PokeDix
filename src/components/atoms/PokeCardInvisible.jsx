import { React } from 'react';
import {
  Box, Text,
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

export default function PokeCardInvisible({
  columnsCount = 2,
  factorScale = 0.75,
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <Box
        bg="transparent"
        py="4"
        px="3"
        borderRadius="5"
        margin={2}
        rounded="md"
        flex={1}
        height={(Dimensions.get('window').width / columnsCount) * factorScale}
      />
    </ErrorBoundary>
  );
}

PokeCardInvisible.propTypes = {
  columnsCount: PropTypes.number.isRequired,
  factorScale: PropTypes.number.isRequired,
};
