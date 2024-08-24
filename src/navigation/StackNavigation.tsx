import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Payments from '../screens/Payments';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Payments"
                component={Payments}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;
