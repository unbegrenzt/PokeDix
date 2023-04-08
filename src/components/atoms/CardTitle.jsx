import {
  Heading, HStack, Skeleton, Text,
} from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';

export default function CardTitle({
  pokeName = 'Mew',
  pokeNumber = '#151',
  isLoading = false,
}) {
  return (
    <HStack>
      <Choose>
        <When condition={isLoading}>
          <Skeleton.Text lines={1} />
        </When>
        <Otherwise>
          <Heading color="darkText" size="md">{pokeName}</Heading>
          <Text fontSize="md"> </Text>
          <Text color="gray.500" fontSize="md">{pokeNumber}</Text>
        </Otherwise>
      </Choose>
    </HStack>
  );
}

CardTitle.defaultProps = {
  pokeName: 'Mew',
  pokeNumber: '#151',
  isLoading: false,
};

CardTitle.propTypes = {
  pokeName: PropTypes.string,
  pokeNumber: PropTypes.string,
  isLoading: PropTypes.bool,
};
