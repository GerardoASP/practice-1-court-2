import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
const WelcomeSlide = () => {
  const navigation = useNavigation()



  const goToPhotosComponent = () =>{
    navigation.navigate("PhotosComponent");
  }
  
  const goToSwitchCheckbox = () =>{
    navigation.navigate("SwitchCheckbox");
  }

  const goToRegisterForm = () =>{
    navigation.navigate("RegisterForm");
  }

  return (
    <View>
      <Button title="PhotosComponent" onPress={goToPhotosComponent}/>
      <Button title="MirarSwitchCheckbox" onPress={goToSwitchCheckbox}/>
      <Button title="RegisterForm" onPress={goToRegisterForm}/>
    </View>
  )
}

const styles = StyleSheet.create({
  imgBackground: {
    width:"100%",
    height:"90%",
  }
});

export default WelcomeSlide