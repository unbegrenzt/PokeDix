import {
  Heading, HStack, Skeleton, Text,
} from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import { getHeightFromRelativeToLayout } from '_utils/index';

export default function CardImage({
  columnsCount = 2,
  factorScale = 0.45,
  isLoading = false,
  pokePhoto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
}) {
  return (
    <HStack justifyContent="center">
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
      <Skeleton
        h={getHeightFromRelativeToLayout(columnsCount, factorScale)}
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
  );
}

CardImage.defaultProps = {
  columnsCount: 2,
  factorScale: 0.45,
  isLoading: false,
  pokePhoto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
};

CardImage.propTypes = {
  columnsCount: PropTypes.number,
  factorScale: PropTypes.number,
  isLoading: false,
  pokePhoto: PropTypes.string,
};
