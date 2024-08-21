// src/Navigation/RootNavigation.ts

import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object) {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
}
