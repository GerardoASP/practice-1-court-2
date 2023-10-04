import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, Switch, View} from 'react-native';
import { Image } from 'react-native';
import { Card, IconButton, Icon, TextInput} from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { Alert } from 'react-native';



const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [current_password, setCurrentPassword] = useState('');
  const [email, setEmail] = useState('');
  const [estaActivo, setEstaActivo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

    const goToRegisterForm = () =>{
        navigation.navigate("RegisterForm");
    }

  const handleCancel = () => {
    //navigation.navigate('');
  };

  const handleLogin = async () => {
    try {
        // Realiza la solicitud de inicio de sesión al servidor
        const response = await axios.post('http://mantenimientoandino.co:3000/api/v1/auth/login', {
            email: email,
            password: current_password,
        });
  
            // Si la solicitud fue exitosa, verifica la respuesta del servidor
        if (response.data) {
            // Guarda el token de autenticación en AsyncStorage o en el estado global de la aplicación
            // AsyncStorage.setItem('token', response.data.token);
          
            // También puedes redirigir a la siguiente pantalla o realizar otras acciones según tus necesidades
            Alert.alert('Inicio de sesión exitoso', '¡Bienvenido!');
            navigation.navigate('Welcome');
        } else {
            Alert.alert('Inicio de sesión fallido', 'Credenciales inválidas');
        }
    } catch (error) {
        console.error(error);
  
        // Maneja los errores aquí, muestra un mensaje de error al usuario
        Alert.alert('Error', 'Ha ocurrido un error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>

      <Card style={styles.card}>
        {/* Agrega el IconButton en la esquina superior derecha */}
        <IconButton
          icon="close"
          size={24}
          onPress={goToRegisterForm}
          style={styles.closeButton}
        />

        <Text style={styles.header}>Iniciar sesión</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/57/56/40/575640d6-e8ca-a2c0-93d1-f64393498ae4/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg' }} style={styles.circularImage}/>
        </View>
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.input}
                label="Correo Electronico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                label="Contraseña"
                value={current_password}
                onChangeText={setCurrentPassword}
                secureTextEntry={true} 
            />

            <View style={styles.buttonContainer}>
                <Button title="Iniciar sesión" onPress={handleLogin} style={styles.button} />
                <View style={styles.space}></View>
                <Button title="Regresar" onPress={handleCancel} style={styles.button} />
            </View>

            
        </View>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center', // Alinea los botones al centro horizontalmente
    },
    button: {
        marginBottom: 10, // Espacio entre los botones
    },
    space: {
        height: 10, // Altura del espacio entre los botones
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        marginHorizontal: 10,
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: -25,
        right: -25,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'center'
    },
    switchLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    phoneNumberContainer: {
        marginLeft: 30,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    gmailImage: {
        width: 70,
        height: 50,
        marginBottom: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    circularImage: {
        width: 100,
        height: 100, 
        borderRadius: 50, 
    },
    buttonContainer: {
        flexDirection: 'column', 
        justifyContent: 'space-evenly', // Espacio igual entre los botones
        marginVertical: 20, // Espacio vertical alrededor de los botones
    },
    buttonWrapper: {
        flex: 1, // Cada botón toma el mismo espacio
        marginHorizontal: 10, // Espacio horizontal entre los botones
    },
    textInputContainer: {
        paddingTop: 20
    },
});

export default RegisterForm;