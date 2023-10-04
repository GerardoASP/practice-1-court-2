import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Card, IconButton, Icon, TextInput } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import axios from 'axios';


const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [current_password, setCurrentPassword] = useState('');
  const [email, setEmail] = useState('');
  const [estaActivo, setEstaActivo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

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
    //navigation.navigate('');
  };

  const handleSubmit = async () => {
    const data = {
      firstname,
      lastname,
      current_password,
      email
    };

    try {
      const response = await axios.post('http://mantenimientoandino.co:3000/api/v1/auth/register', data);
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
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.input}
          label="Apellidos"
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          label="Correo Electrónico"
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

        <View style={styles.switchContainer}>
          <Switch
            value={estaActivo}
            onValueChange={handleSwitchChange}
          />
          <Text style={styles.switchLabel}>Soy mayor de edad</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={handleCheckboxChange}
          />
          <Text style={styles.checkboxLabel}>Acepto términos y condiciones</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png' }} style={styles.gmailImage}/>
          <Image source={{ uri: 'https://1000marcas.net/wp-content/uploads/2021/08/Outlook-Logo.png' }} style={styles.gmailImage}/>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Aceptar" onPress={handleSubmit} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Cancelar" onPress={handleCancel} />
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
