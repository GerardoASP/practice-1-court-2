import { StyleSheet, Text, View } from 'react-native';

import PhotosComponent from './src/screens/PhotosComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeSlide from './src/screens/WelcomeSlide';
import SwitchCheckbox from './src/screens/SwitchCheckbox';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name = "Welcome" component={WelcomeSlide}/>
        <Stack.Screen name = "PhotosComponent" component={PhotosComponent}/>
        <Stack.Screen name = "SwitchCheckbox" component={SwitchCheckbox}/>
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
