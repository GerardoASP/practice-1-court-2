import { StyleSheet, Text, View } from 'react-native';

import PhotosComponent from './src/screens/PhotosComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeSlide from './src/screens/WelcomeSlide';
import SwitchCheckbox from './src/screens/SwitchCheckbox';
import RegisterForm from './src/screens/RegisterForm';
import LoginForm from './src/screens/LoginForm';
import PresentationComponent from './src/screens/PresentationComponent';
import PathComponent from './src/screens/PathComponent';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PresentationComponent">
        <Stack.Screen name = "Welcome" component={WelcomeSlide}/>
        <Stack.Screen name = "PhotosComponent" component={PhotosComponent}/>
        <Stack.Screen name = "SwitchCheckbox" component={SwitchCheckbox}/>
        <Stack.Screen name = "RegisterForm" component={RegisterForm}/>
        <Stack.Screen name = "LoginForm" component={LoginForm}/>
        <Stack.Screen name = "PresentationComponent" component={PresentationComponent}/>
        <Stack.Screen name = "PathComponent" component={PathComponent}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
