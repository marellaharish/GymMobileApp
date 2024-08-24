import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{ width: windowWidth, height: windowHeight }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
