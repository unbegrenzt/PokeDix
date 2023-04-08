import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { inset } from '_utils/index';

const { PokeCardView } = require('_components/molecules/index');

describe('<PokeCardView />', () => {
  it('renders correctly', () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PokeCardView name="mew" />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('jumps error fallback', () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PokeCardView name="mewing" />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('retrieve the pokemon info', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PokeCardView name="mew" />
      </NativeBaseProvider>
    );
    render(component);

    const pokeNumber = await screen.findByText('151', { exact: false });
    const pokeHeader = await screen.findByText('Mew', { exact: false });

    expect(pokeNumber).toBeTruthy();
    expect(pokeHeader).toBeTruthy();
  });

  it('error fallback return a valid message', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PokeCardView name="mew" />
      </NativeBaseProvider>
    );
    render(component);

    const pokeName = await screen.findByText('Mew', { exact: false });
    const pokeError = await screen.findByText('tap to retry', { exact: false });

    expect(pokeName).toBeTruthy();
    expect(pokeError).toBeTruthy();
  });
});
