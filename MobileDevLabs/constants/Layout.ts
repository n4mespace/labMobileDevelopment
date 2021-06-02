import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.width <= dim.height;
};

export const window = {
    width,
    height
};
