import { React } from 'react';
import PropTypes from 'prop-types';
import { CardLayout } from '_components/atoms/index';

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
