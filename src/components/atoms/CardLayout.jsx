import { Box } from 'native-base';
import React from 'react';
import { getHeightFromRelativeToLayout } from '_utils/index';
import PropTypes from 'prop-types';

export default function CardLayout({
  children,
  bg = 'trueGray.100',
  columnsCount = 2,
  factorScale = 0.75,
}) {
  return (
    <Box
      bg={bg}
      py="4"
      px="3"
      borderRadius="5"
      margin={2}
      rounded="md"
      flex={1}
      height={getHeightFromRelativeToLayout(columnsCount, factorScale)}
    >
      {children}
    </Box>
  );
}

CardLayout.defaultProps = {
  bg: 'trueGray.100',
  columnsCount: 2,
  factorScale: 0.75,
  children: undefined,
};

CardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.any,
  ]),
  bg: PropTypes.string,
  columnsCount: PropTypes.number,
  factorScale: PropTypes.number,
};
