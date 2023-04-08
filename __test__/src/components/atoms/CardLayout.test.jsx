import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { inset } from '_utils/index';

const { CardLayout } = require('_components/atoms/index');

describe('<CardLayout />', () => {
  it('render correctly', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CardLayout />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
