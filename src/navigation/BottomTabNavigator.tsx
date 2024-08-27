import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Payments from '../screens/Payments';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import MembersScreen from '../screens/MembersScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MembersStack = createNativeStackNavigator();


const BottomTabNavigator = () => {

  const HomeStackScreen = () => {
    return (
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <HomeStack.Navigator
            screenOptions={{
              animation: 'slide_from_right',
              headerBackTitle: '',
              headerTintColor: '#fff', // Set the text color of header titles
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: 'teal',
              },
            }}>
            <HomeStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <HomeStack.Screen
              name="Payments"
              component={Payments}
              options={{ headerShown: false }}
            />
            <HomeStack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
              options={{ headerShown: false }}
            />
          </HomeStack.Navigator>
        </GestureHandlerRootView>
      </>
    )
  }
  const MembersStackScreen = () => {
    return (
      <>
        <MembersStack.Navigator
          screenOptions={{
            animation: 'slide_from_right',
            headerBackTitle: '',
            headerTintColor: '#fff', // Set the text color of header titles
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: 'teal',
            },
          }}>
          <MembersStack.Screen
            name="MembersScreen"
            component={MembersScreen}
            options={{ headerShown: false }}
          />
        </MembersStack.Navigator>
      </>
    )
  }

  return (
    <View style={{ width: windowWidth, height: windowHeight }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Members" component={MembersStackScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
