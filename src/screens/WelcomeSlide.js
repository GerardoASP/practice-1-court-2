import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
const WelcomeSlide = () => {
  const navigation = useNavigation()


  const goToPhotosComponent = () =>{
    navigation.navigate("PhotosComponent");
  }

  return (
    <View>
      <Button title="PhotosComponent" onPress={goToPhotosComponent}/>
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