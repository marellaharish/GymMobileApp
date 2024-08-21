import { SafeAreaView, StatusBar, StyleSheet, Text, TextProps, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from './src/store/store';
import { navigationRef } from './src/navigation/RootNavigation.tsx';
import Navigation from './src/navigation/Main';
import { ThemeProvider, useTheme } from "./src/context/ThemeContext.tsx"
const App = () => {

  const ThemedText: React.FC<TextProps> = (props) => {
    const { textColor } = useTheme();
    return <Text {...props} style={[{ color: textColor }, props.style]} />;
  };


  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <NavigationContainer ref={navigationRef}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    </>
  )
}
export default App
const styles = StyleSheet.create({})