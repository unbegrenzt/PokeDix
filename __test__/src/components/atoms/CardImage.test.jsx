import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { inset } from '_utils/index';

const { CardImage } = require('_components/atoms/index');

describe('<CardImage />', () => {
  it('render correctly', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CardImage />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
