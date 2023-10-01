import React from 'react'
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import logoU from '../../assets/personal_images/recurso_26logo.jpg'
import logoArrow from '../../assets/personal_images/arrow-right-solid.png'

const PresentationComponent = () => {
  return (
    <View>
        <Text style={styles.principal_text}>EDU NATIVE </Text>
        <Image  style={styles.principal_image}
       source={logoU}/>  
        <TouchableOpacity>
          <Text style={styles.simple_text}>iniciar</Text>
        </TouchableOpacity>
        <Image source={logoArrow} style={styles.second_image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  principal_text: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 36,
    left: 76,
    top: 130,
    position: 'absolute',
    width: 262,
  },
  principal_image:{
    height:221,
    width:232,
    left:91,
    top:280,
    position: 'absolute',
    borderRadius:120
  },
  simple_text:{
    color: '#000000',
    textAlign: 'left',
    left: 76,
    top: 500,
    position: 'absolute',
    width: 262,
    marginTop:40
  },
  second_image:{
    height:10,
    width:10,
    left:120,
    top:547,
    position: 'absolute'
  }
});

export default PresentationComponent
