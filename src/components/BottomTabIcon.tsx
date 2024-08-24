import React from 'react';
import { View, Image } from 'react-native';

interface Props {
    route: string;
    isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
    const renderIcon = (route: string, isFocused: boolean) => {
        let height = 34;
        let width = 34;
        let tintColor = isFocused ? '#0067FF' : '#ffffff';
        let source;

        switch (route) {
            case 'Home':
                source = require('../assets/images/google.png');
                break;
            case 'Search':
                source = require('../assets/images/google.png');
                break;
            case 'Setting':
                source = require('../assets/images/google.png');
                break;
            case 'Profile':
                source = require('../assets/images/google.png');
                break;
            default:
                return null;
        }

        return <Image source={source} style={{ width, height, tintColor }} />;
    };

    return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
