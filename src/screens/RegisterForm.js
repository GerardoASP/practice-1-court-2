import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { Card, IconButton, Icon, TextInput } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterForm = () => {
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [current_password, setCurrentPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [estaActivo, setEstaActivo] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
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


  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    current_password: "",
    active: false
  });



  const goToLoginForm = () =>{
    navigation.navigate("LoginForm");
  }

  const handleSwitchChange = () => {
    setEstaActivo(!estaActivo);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCancel = () => {
    navigation.navigate('PathComponent');
  };

  const handleSubmit = async () => {
    // const data = {
    //   firstname,
    //   lastname,
    //   current_password,
    //   email
    // };

    try {
      const response = await axios.post('http://192.168.0.12:3000/api/v1/auth/register', newUser);
      console.log(response.data);
      navigation.navigate('LoginForm');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      <Card style={styles.card}>
        {/* Agrega el IconButton en la esquina superior derecha */}
        <IconButton
          icon="close"
          size={24}
          onPress={handleCancel}
          style={styles.closeButton}
        />

        <Text style={styles.header}>Registro</Text>
        <TextInput
          style={styles.input}
          label="Nombre(s)"
          // value={firstname}
          // onChangeText={setFirstname}
          onChangeText={(name_text) =>{
            console.log("Nombre ",name_text);
            setNewUser({...newUser, name: name_text});
          }}
        />
        <TextInput
          style={styles.input}
          label="Apellidos"
          // value={lastname}
          // onChangeText={setLastname}
          onChangeText={(lastName_text) =>{
            console.log("Apellidos ",lastName_text);
            setNewUser({...newUser, lastname: lastName_text});
          }}
        />
        <TextInput
          style={styles.input}
          label="Correo Electrónico"
          // value={email}
          // onChangeText={setEmail}
          onChangeText={(email_text) =>{
            console.log("Email ",email_text);
            setNewUser({...newUser, email: email_text});
          }}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          label="Contraseña"
          // value={current_password}
          // onChangeText={setCurrentPassword}
          onChangeText={(password_text) =>{
            console.log("Apellidos ",password_text);
            setNewUser({...newUser, current_password: password_text});
          }}
          secureTextEntry={true}
        />

        {/* <View style={styles.switchContainer}>
          <Switch
            value={estaActivo}
            onValueChange={handleSwitchChange}
          />
          <Text style={styles.switchLabel}>Soy mayor de edad</Text>
        </View> */}

        {/* <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={handleCheckboxChange}
          />
          <Text style={styles.checkboxLabel}>Acepto términos y condiciones</Text>
        </View> */}

        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png' }} style={styles.gmailImage}/>
          <Image source={{ uri: 'https://1000marcas.net/wp-content/uploads/2021/08/Outlook-Logo.png' }} style={styles.gmailImage}/>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleSubmit} style={styles.text_button}>
              <Text>Aceptar</Text>
            </TouchableOpacity>
            {/* <Button title="Aceptar" onPress={handleSubmit} /> */}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleCancel} style={styles.text_button}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text_button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    textAlign:'center',
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
    fontWeight: 'bold',
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
    paddingTop: 30,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row', // Alinea los botones en una fila horizontal
    justifyContent: 'space-between', // Espacio igual entre los botones
    marginVertical: 20, // Espacio vertical alrededor de los botones
  },
  buttonWrapper: {
    flex: 1, // Cada botón toma el mismo espacio
    marginHorizontal: 10, // Espacio horizontal entre los botones
  },
});

export default RegisterForm;