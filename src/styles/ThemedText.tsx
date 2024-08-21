import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemedText: React.FC<TextProps> = (props) => {
    const { textColor } = useTheme();
    return <Text {...props} style={[{ color: textColor }, props.style]} />;
};

export default ThemedText;
