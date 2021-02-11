import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.width <= dim.height;
};

export default {
    window: {
        width,
        height
    },
    isPortrait,
    isSmallDevice: width < 375
};
