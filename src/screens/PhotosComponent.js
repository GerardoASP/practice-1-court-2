import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Button } from 'react-native';
// import { Button } from 'react-native-paper';
import PhotoList from './PhotoList';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';



export default function PhotosComponent({setSelectedImageUri2}) {
  const navigation = useNavigation();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [button, setButton] = useState(false);
  const [savePhoto, setSavePhoto] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)



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


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  // if (savePhoto == true) {
  //   return (
  //     <View>
  //       <Image source={{ uri: capturedPhoto.uri }} style={{ width: 400, height: 600 }} />
  //     </View>
  //   );
  // }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }else{
    if (button === true){
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          {/* <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
                <Text style={styles.text}>🔁</Text>
              </TouchableOpacity>
              <View style={styles.captureContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
              </View>
            </View>
          </Camera> */}
          {isPreviewVisible ? (
            <View>
              <Image source={{ uri: capturedPhoto.uri }} style={styles.imageCamera} />
              {/* <Button style={styles.buttonTake} title="Guardar" onPress={() => handleSavePhoto(capturedPhoto.uri)}>Guardar</Button> */}
              <Button style={styles.buttonTake} title="Descartar" onPress={handleDiscardPhoto}>Descartar</Button>
            </View>
          ) : (
              <Modal 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
                animationType="slide">
                  <View style={styles.modalContainer}>
                    <Camera style={styles.camera} type={type} ref={cameraRef}>
                      <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
                        <Icon name="refresh" size={30} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.captureButton} title="Tomar Foto" onPress={handleTakePicture} />
                    </Camera>
                  </View>
              </Modal>
          )}
        </View>
      );
    }

    return (
      <View /* style={styles.containerAddPhoto} */>
        {/* <PhotoList /> */}
        <Button 
          style={styles.button} 
          onPress={() => {
            setButton(true)
            setModalVisible(true)
          }} 
          title="Añadir foto" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function handleTakePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
      setCapturedPhoto(photo);
      setPreviewVisible(true);

      setSelectedImageUri2(photo.uri);
    }
  }

  async function handleSavePhoto(photoUri) {
    const photosDirectory = `${FileSystem.documentDirectory}fotos`;
    const fileName = photoUri.split('/').pop();
    const destinationUri = `${photosDirectory}/${fileName}`;


    try {
      await FileSystem.makeDirectoryAsync(photosDirectory, { intermediates: true });
      await FileSystem.moveAsync({
        from: photoUri,
        to: destinationUri,
      });
      console.log('Foto guardada en:', destinationUri);


      //setCapturedPhoto(null);
      setButton(false);
      setSavePhoto(true);
      setPreviewVisible(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDiscardPhoto() {
    setCapturedPhoto(null);
    setPreviewVisible(false);
  }

}

const screenWidth = Dimensions.get('window').width; // Ancho del contenedor en píxeles (ajusta según tu diseño)
const screenHeight = Dimensions.get('window').height;
const leftValue = (screenWidth / 2) - 30; // Calcula el valor deseado

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerAddPhoto: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom:18
  },
  camera: {
    height: screenHeight+25,
    width: screenWidth
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },

  imageCamera: {
    height: 400,
    width: 300,
  },


  button: {
    marginBottom: 40,

  },
  buttonTake: {
    marginTop: 10,

  },
  flipButton: {
    position: 'absolute',
    top: screenHeight-90,
    left: leftValue/2,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  captureButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    width: 60,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: screenHeight-100,
    left: leftValue,
  },
  captureButtonShowCamera: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});