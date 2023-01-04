import { Dimensions } from 'react-native';

/*
 *
 * @param {*} factorScale is the 0 to 1 (percentage) you need to get
 * @returns the Height of the card in the FlatList, relative to the amount of columns.
 */
const getHeightFromRelativeToLayout = (columnsCount, factorScale) => (Dimensions.get('window').width / columnsCount) * factorScale;

//  The default scale is 75%, because creates a vertical margin between cards.
const defaultScale = 0.75;

export { getHeightFromRelativeToLayout, defaultScale };
