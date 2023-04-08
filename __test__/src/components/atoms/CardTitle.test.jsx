import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { inset } from '_utils/index';

const { CardTitle } = require('_components/atoms/index');

describe('<CardTitle />', () => {
  it('render correctly', async () => {
    const component = (
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CardTitle />
      </NativeBaseProvider>
    );
    render(component);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
