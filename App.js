import { StyleSheet, Text, View } from 'react-native';

import PhotosComponent from './src/screens/PhotosComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeSlide from './src/screens/WelcomeSlide';
import SwitchCheckbox from './src/screens/SwitchCheckbox';
import RegisterForm from './src/screens/RegisterForm';
import PresentationComponent from './src/screens/PresentationComponent';
import PathComponent from './src/screens/PathComponent';
import LoginForm from './src/screens/LoginForm';
import CustomHeader from './src/screens/CustomHeader';
import { Posts } from './src/screens/Posts';
import ImageComp from './src/screens/ImageComp';
import ImagesComp from './src/screens/ImagesComp';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PresentationComponent">
        <Stack.Screen name = "Welcome" component={WelcomeSlide} options={{ header: () => <CustomHeader /> }}/>
        <Stack.Screen name = "PhotosComponent" component={PhotosComponent}/>
        <Stack.Screen name = "SwitchCheckbox" component={SwitchCheckbox}/>
        <Stack.Screen name = "RegisterForm" component={RegisterForm} options={{ headerShown: false }}/>
        <Stack.Screen name = "LoginForm" component={LoginForm} options={{ headerShown: false }}/>
        <Stack.Screen name = "PresentationComponent" component={PresentationComponent} options={{ headerShown: false }}/>
        <Stack.Screen name = "PathComponent" component={PathComponent} options={{ headerShown: false }}/>
        <Stack.Screen name = "Posts" component={Posts} options={{ header: () => <CustomHeader /> }}/>
        <Stack.Screen name = "ImageComp" component={ImageComp}/>
        <Stack.Screen name = "ImagesComp" component={ImagesComp}/>
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
