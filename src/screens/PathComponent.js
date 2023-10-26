import React, { useEffect } from 'react'
import { Button } from 'react-native';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import logoU from '../../assets/personal_images/recurso_26logo.jpg'
import logoG from '../../assets/personal_images/281769.png'
import logoO from '../../assets/personal_images/Outlook_2013_23477.png'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PathComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const checkAuthentication = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        // Si hay un token de acceso, redirigir al usuario al componente "Welcome"
        navigation.navigate('Welcome');
      }
    };

    checkAuthentication();
  }, []);

  return (
    <View>
        <Image style={styles.principal_image} source={logoU}/>
        <View style={styles.container}>
          <Text style={styles.simple_text}>¿Que deseas hacer?</Text>
          <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.text_button}>
                  <Text >Recorrido en la App</Text>
                </TouchableOpacity>
                {/* <Button title="Iniciar Sesión" onPress={login} /> */}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate("LoginForm");}} style={styles.text_button}>
                  <Text >Iniciar sesión</Text>
                </TouchableOpacity>
                {/* <Button title="Iniciar Sesión" onPress={login} /> */}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate("RegisterForm");}} style={styles.button}>
                  <Text style={styles.text_button}>Registrarme</Text>
                </TouchableOpacity>
                {/* <Button title="Registrarme" onPress={register} /> */}
              </View>
          </View>
          <View style={styles.touchablesContainer}>
            <TouchableOpacity onPress={() => console.log('Iniciando sesión con Gmail...')}>
              <Image
                source={{uri: "https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"}}
                style={{ width: 70, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Iniciando sesión con Outlook...')}>
              <Image
                source={{uri: "https://1000marcas.net/wp-content/uploads/2021/08/Outlook-Logo.png"}}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
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
    width:179,
    fontWeight: 'bold',
    fontSize: 30
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
    paddingTop:70,
  },
  container:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    justifyContent: 'center'
  },
  gmailImage: {
    width: 70,
    height: 50,
    marginBottom: 20,
  }

})

export default PathComponent
