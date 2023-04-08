import {
  HStack, Image, Skeleton,
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
          <Skeleton
            h={getHeightFromRelativeToLayout(columnsCount, factorScale)}
            mt={3}
          />
        </When>
        <Otherwise>
          <Image
            size="lg"
            resizeMode="cover"
            source={{
              uri: pokePhoto,
            }}
            alt="Pokemon image"
          />
        </Otherwise>
      </Choose>
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
  isLoading: PropTypes.bool,
  pokePhoto: PropTypes.string,
};
