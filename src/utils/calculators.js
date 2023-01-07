import { Dimensions } from 'react-native';

/*
 *
 * @param {*} factorScale is the 0 to 1 (percentage) you need to get
 * @returns the Height of the card in the FlatList, relative to the amount of columns.
 */
const getHeightFromRelativeToLayout = (columnsCount, factorScale) => (Dimensions.get('window').width / columnsCount) * factorScale;

//  The default scale is 75%, because creates a vertical margin between cards.
const defaultScale = 0.75;

const inset = {
  frame: {
    x: 0, y: 0, width: 0, height: 0,
  },
  insets: {
    top: 0, left: 0, right: 0, bottom: 0,
  },
};

export { getHeightFromRelativeToLayout, defaultScale, inset };
