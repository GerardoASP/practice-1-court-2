import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = React.useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMenuClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    // Elimina el token de acceso y realiza cualquier otra lógica de cierre de sesión necesaria
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('PresentationComponent'); // Redirige al usuario a la pantalla de inicio de sesión
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 100, backgroundColor: 'lightgray', justifyContent: "space-between" , padding: 20}}>
        <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold'}}>EDU NATIVE</Text>
        </View>
        <View>
            <TouchableOpacity onPress={handleMenuClick}>
                <AntDesign name="menufold" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <Modal isVisible={isMenuVisible}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Menú</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{fontSize: 18, marginBottom: 10}}>Cerrar sesión</Text>
                </TouchableOpacity>
                {/* <Text style={{fontSize: 18, marginBottom: 10}}>Opción 2</Text>
                <Text style={{fontSize: 18, marginBottom: 10}}>Opción 3</Text> */}
                <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: 20}} onPress={handleMenuClick}>
                    <Text style={{fontSize: 18, color: 'red'}}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
  );
};

export default CustomHeader;


