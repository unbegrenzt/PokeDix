import { React, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react-native';
import rollbar from '_utils/rollbar';
import CardLayout from '../atoms/CardLayout';

const errorAnim = require('_assets/images/lottie/9195-error.json');

export default function PokeCardErrorView({ error }) {
  rollbar.error('The PokeCard can not load', error);

  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <CardLayout>
      <Lottie
        ref={animationRef}
        source={errorAnim}
      />
    </CardLayout>
  );
}
PokeCardErrorView.defaultProps = {
  error: { message: 'default error message' },
};

PokeCardErrorView.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.any,
  ]),
};
