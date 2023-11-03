import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import logoPost from '../../assets/personal_images/656455.png'
import { Image } from 'react-native';

const WelcomeSlide = () => {
  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState('lightblue');


  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const checkAuthentication = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        navigation.navigate('PresentationComponent');
      }
    };

    checkAuthentication();
  }, []);



  const goToPhotosComponent = () =>{
    navigation.navigate("PhotosComponent");
  }
  
  const goToSwitchCheckbox = () =>{
    navigation.navigate("SwitchCheckbox");
  }

  const goToRegisterForm = () =>{
    navigation.navigate("RegisterForm");
  }

  const goToLoginForm = () =>{
    navigation.navigate("LoginForm");
  }
    
  const goToPresentationComponent = () =>{
    navigation.navigate("PresentationComponent");
  }

  const goToPathComponent = () =>{
    navigation.navigate("PathComponent");
  }

  const goToPosts = () =>{
    navigation.navigate("Posts");
  }

  const goToAllies = () =>{
    navigation.navigate("AllyForm");
  }

  // return (
  //   <View>
  //     {/* <Button title="PhotosComponent" onPress={goToPhotosComponent}/>
  //     <Button title="MirarSwitchCheckbox" onPress={goToSwitchCheckbox}/> */}
  //   </View>
  // )

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Image style={styles.imgPresentation}
      source={logoPost}/>
      <TouchableOpacity 
        style={styles.buttonPost}
        onPress={goToPosts}
      >
        <Text  style={styles.textPrincipal}>Haz un post</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonPost}
        onPress={goToAllies}
      >
        <Text  style={styles.textPrincipal}>Haz un aliado</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity 
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen'}}
        onPress={goToSwitchCheckbox}
      >
        <Text>MirarSwitchCheckbox</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width:"100%",
    height:"90%",
  },
  imgPresentation:{
    alignItems: 'center', 
    justifyContent: "center",
    height:200,
    width:200,
    marginBottom: 20, 
    marginLeft:10
  },
  buttonPost:{
    height:70,
    width:150,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#4A90E2', // Cambia el color de fondo a un azul brillante
    borderRadius: 10, // Agrega bordes redondeados
    shadowColor: '#000', // Agrega sombras para dar un efecto 3D
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
    marginBottom: 100, 
    marginLeft:10
  },
  textPrincipal:{
    color: '#FFF', // Cambia el color del texto a blanco
    fontSize: 20, // Aumenta el tamaño del texto
    fontWeight: 'bold', // Hace que el texto sea negrita
  }
});

export default WelcomeSlide