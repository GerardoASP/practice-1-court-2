import React from 'react'
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import logoU from '../../assets/personal_images/recurso_26logo.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';
import PathComponent from './PathComponent';
import { useNavigation } from '@react-navigation/native';

const PresentationComponent = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{justifyContent: "space-around"}}>
      <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 36, marginBottom: 100, marginTop: 100}}>EDU NATIVE </Text>
        <Image style={{alignItems: 'center', justifyContent: "center", borderRadius:120, height:200,
    width:200, marginBottom: 100}}
      source={logoU}/>
      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate("PathComponent");
      }}>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center", top:0}}>
          <Text style={{marginRight: 10, fontSize: 20}}>Iniciar</Text>
          <Icon name="arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>
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
    height:220,
    width:220,
    left:91,
    top:280,
    position: 'absolute',
    borderRadius:120
  },
  simple_text:{
    color: '#000000',
    justifyContent: 'center',
    width: 262,
  }
});

export default PresentationComponent
