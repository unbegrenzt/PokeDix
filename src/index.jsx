import React from 'react';
import { SWRConfig } from 'swr';
import logger from '_utils/logger';
import {
  NativeBaseProvider,
} from 'native-base';
import PokeListScene from '_scenes/PokeListScene';

export default function Index() {
  return (
    <SWRConfig value={{
      onError: (err, key) => {
        logger.captureException(new Error(err, key));
      },
    }}
    >
      <NativeBaseProvider>
        <PokeListScene />
      </NativeBaseProvider>
    </SWRConfig>
  );
}
