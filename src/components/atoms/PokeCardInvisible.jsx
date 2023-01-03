import { React } from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Badge,
  Heading,
  ZStack,
} from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

// <Box
//      bg="transparent"
//      py="4"
//      px="3"
//      borderRadius="5"
//      margin={3}
//      rounded="md"
//      flex={1}
//      height={(Dimensions.get('window').width / columnsCount) * 0.75}
//    />

export default function PokeCardInvisible({ columnsCount }) {
  return (
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
      <HStack flex={1} justifyContent="space-between">
        <Heading color="white" size="md" bold>PokeName</Heading>
        <Heading color="white" size="md" bold>#001</Heading>
      </HStack>
      <HStack space={1} justifyContent="space-between">
        <VStack space={1} alignItems="center">
          <Box
            rounded="full"
            bgColor="white"
            px="2"
            py="1"
          >
            <Text fontSize="xs">
              PokeType 1
            </Text>
          </Box>
          <Badge rounded="full">PokeType 2</Badge>
          <Badge rounded="full">PokeType 3</Badge>
        </VStack>
        <VStack space={1} alignItems="center">
          <ZStack ml={-70}>
            <Box style={{ width: 50, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 50, height: 20, backgroundColor: 'red' }}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Square_dance_sign.svg/1200px-Square_dance_sign.svg.png',
                }}
                resizeMode="contain"
                alt="Pokemon image"
              />
            </Box>
          </ZStack>
          <Image
            size="md"
            resizeMode="cover"
            source={{
              uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
            }}
            alt="Pokemon image"
          />
        </VStack>
      </HStack>
    </Box>
  );
}
