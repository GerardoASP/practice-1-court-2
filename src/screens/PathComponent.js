import React from 'react'
import { Button } from 'react-native';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import logoU from '../../assets/personal_images/recurso_26logo.jpg'
import logoG from '../../assets/personal_images/281769.png'
import logoO from '../../assets/personal_images/Outlook_2013_23477.png'
const PathComponent = () => {
  return (
    <View>
        <Image style={styles.principal_image} source={logoU}/>
        <Text style={styles.simple_text}>¿Que deseas hacer?</Text>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.text_button}>
              <Text >Iniciar Sesión</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text_button}>Registrarme</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.touchablesContainer}>
          <TouchableOpacity onPress={() => console.log('Botón presionado')}>
            <Image
              source={logoG}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Botón presionado')}>
            <Image
              source={logoO}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  principal_image:{
    height:70,
    width:70,
    left:302,
    top:17,
    position: 'absolute',
    borderRadius:120
  },
  simple_text:{
    color:'#000000',
    textAlign:'center',
    fontSize:20,
    left:105,
    top:150,
    position:'absolute',
    width:179
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 300,
    marginBottom: 20,
    paddingLeft:50,
    paddingRight:50,
  },
  buttonContainer: {
    marginBottom: 10
  },
  text_button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    textAlign:'center',
  },
  touchablesContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:130,
    paddingRight:130,
  }

})

export default PathComponent
