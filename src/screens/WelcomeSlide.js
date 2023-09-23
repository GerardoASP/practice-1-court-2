import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper';
const WelcomeSlide = () => {
  const navigation = useNavigation()

  const goToSwitchCheckbox = () =>{
    navigation.navigate("SwitchCheckbox");
  }
  return (
    <Swiper>
      <View>
      <Button title="MirarSwitchCheckbox" onPress={goToSwitchCheckbox}/>
      </View>
    </Swiper>
  )
}

const styles = StyleSheet.create({
  imgBackground: {
    width:"100%",
    height:"90%",
  }
});

export default WelcomeSlide