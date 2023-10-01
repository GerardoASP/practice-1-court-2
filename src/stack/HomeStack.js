import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import PhotosComponent from '../screens/PhotosComponent';
import SwitchCheckbox from '../screens/SwitchCheckbox';
import PresentationComponent from '../screens/PresentationComponent';
import PathComponent from '../screens/PathComponent';

const Stack =createStackNavigator();

const HomeStack = () => {
  const [orientation,setOrientation] = useState(null);

  const handleOrientationChange = ({window:{width,height}}) =>{
    const newOrientation = height>width ? "Portrait":"Landscape"
    setOrientation(newOrientation);
  };

  useEffect(()=>{
    Dimensions.addEventListener("change",handleOrientationChange);
    return () =>{

    }
  },[]);

  useEffect(()=>{
    console.log("Orientation: ",orientation);
  },[orientation]);

  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions=
    {{headerStyle: orientation === "Portrait" ? StyleSheet.headerStylePortrait:StyleSheet.headerStyleLandscape,headerTintColor:"#fff",}}>
        <Stack.Screen
            name="Welcome"
            component={WelcomeSlide}
            options={{ headerShown: false }} // Esto oculta el encabezado
        />
        <Stack.Screen
            name="PhotosComponent"
            component={PhotosComponent}
            options={{ title: "PhotosComponent" }} // Personaliza el título del encabezado
        />

        <Stack.Screen
            name="SwitchCheckbox"
            component={SwitchCheckbox}
            options={{ headerShown: false }} // Esto oculta el encabezado
        />
        <Stack.Screen
            name="PresentationComponent"
            component={PresentationComponent}
            options={{ headerShown: false }} // Esto oculta el encabezado
        />
        <Stack.Screen
            name="PathComponent"
            component={PathComponent}
            options={{ headerShown: false }} // Esto oculta el encabezado
        />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    headerStylePortrait:{
        backgroundColor:"#2181CD",
        height:100,
    },
    headerStyleLandscape:{
        backgroundColor:"#2181CD",
        height:100,
    }
})

export default HomeStack