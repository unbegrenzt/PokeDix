import { React } from 'react';
import {
  Box, Text,
} from 'native-base';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { CardLayout } from '_components/atoms/index';

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
    <CardLayout
      bg="transparent"
      columnsCount={columnsCount}
      factorScale={factorScale}
    />
  );
}

PokeCardInvisible.propTypes = {
  columnsCount: PropTypes.number.isRequired,
  factorScale: PropTypes.number.isRequired,
};
