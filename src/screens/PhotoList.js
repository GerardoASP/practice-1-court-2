import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-paper'; // Importa los componentes de react-native-paper
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function PhotoList() {
    const [photos, setPhotos] = React.useState([]);
    const navigation = useNavigation();

  // Ruta al directorio que contiene las fotos
  const photosDirectory = `${FileSystem.documentDirectory}fotos`;

    React.useEffect(() => {
        // Lee el contenido del directorio y establece la lista de fotos
        const readDirectory = async () => {
        try {
            const dirContents = await FileSystem.readDirectoryAsync(photosDirectory);
            setPhotos(dirContents);
        } catch (error) {
            console.error('Error al leer el directorio:', error);
        }
        };

        // Llama a la función para leer el contenido del directorio cuando se carga el componente
        readDirectory();
    }, []);


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

    // Función para eliminar una foto por su nombre de archivo
    const deletePhoto = async (fileName) => {
        try {
            const photoUri = `${photosDirectory}/${fileName}`;
            await FileSystem.deleteAsync(photoUri);
            // Vuelve a cargar la lista de fotos después de eliminar
            const updatedPhotos = photos.filter((photo) => photo !== fileName);
            setPhotos(updatedPhotos);
        console.log(`Foto ${fileName} eliminada.`);
        } catch (error) {
            console.error('Error al eliminar la foto:', error);
        }
    };

    async function requestWritePermission() {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Permiso de escritura',
                message: 'La aplicación necesita permisos de escritura para guardar archivos en su dispositivo.',
                buttonNeutral: 'Preguntar después',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.error('Error al solicitar permiso de escritura:', err);
            return false;
          }
        }
        return true; // Para iOS no se necesita permiso adicional
      }
  
    return (
        <View>
            {photos.length === 0 ? (
                <Card style={styles.card}>
                    <Text>No hay fotos disponibles.</Text>
                </Card>
            ) : (
            <FlatList
                data={photos}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Image
                            source={{ uri: `file://${FileSystem.documentDirectory}fotos/${item}` }}
                            style={styles.photo}
                        />
                        <Button
                            mode="contained"
                            color="red"
                            onPress={() => deletePhoto(item)}
                            style={{ ...styles.deleteButton, backgroundColor: 'red'}}
                        >
                            Eliminar
                        </Button>
                    </Card>
                )}
            />
          )}
        </View>
    );
  }

const screenWidth = Dimensions.get('window').width; // Ancho del contenedor en píxeles (ajusta según tu diseño)
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        justifyContent:'center', 
        alignContent:'center'
    },
    photo: {
        width: '100%',
        height: 600,
    },
    deleteButton: {
        marginTop: 10,
        // marginBottom: 10,
    },
    photoContainer: {
        // marginTop: 10,
        // marginBottom: 10,
    },
});
  
  export default PhotoList;