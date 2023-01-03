import React from 'react';
import renderer from 'react-test-renderer';

const { default: Index } = require('../../src/index');

it('renders correctly', () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});
