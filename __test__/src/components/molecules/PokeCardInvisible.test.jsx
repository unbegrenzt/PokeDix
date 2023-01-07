import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { inset } from '_utils/index';

const { PokeCardInvisible } = require('_components/molecules/index');

describe('<PokeCardInvisible />', () => {
  it('render correctly', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PokeCardInvisible />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
