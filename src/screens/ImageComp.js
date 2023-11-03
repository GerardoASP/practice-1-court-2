import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

export default function ImageComp({ setSelectedImageUri }) {
  const [image, setImage] = useState(null);
  // const [firstname, setFirstname] = useState('');



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      setSelectedImageUri(result.assets[0].uri);
    }
  };

  // const uploadImage = async () => {
  //   if (image) {
  //     const formData = new FormData();
  //     formData.append('image', {
  //       uri: image,
  //       type: 'image/*', // Ajusta el tipo de archivo si es necesario
  //       name: 'image.jpg',
  //     });

  //     try {
  //       const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-image', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       console.log('Imagen guardada con éxito en el backend:', response.data);
  //     } catch (error) {
  //       console.error('Error al guardar la imagen en el backend:', error);
  //     }
  //   }
  // };

  return (
    <View /* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} */>
      {/* <Button title="Escoge una imagen de tu galería aquí" onPress={pickImage} /> */}

      <View>
        <TouchableOpacity
          onPress={pickImage}
          style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}
        >
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>ESCOGE UNA IMAGEN</Text>
        </TouchableOpacity>
      </View>

      {/* {image ? (  */}
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ padding: 0, margin: 0 }}
          style={{ padding: 0, margin: 0, width:300 }}
        >
          <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
          {/* <Button style={styles.buttonTake} title="Guardar" onPress={() => handleSavePhoto(capturedPhoto.uri)}>Guardar</Button> */}
          {/* <Button style={styles.buttonTake} title="Descartar" onPress={handleDiscardPhoto}>Descartar</Button> */}
        </ScrollView>
      {/* ):null}; */}

      
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      {/* {image && <Button title="Guardar en el backend" onPress={uploadImage} />} */}
    </View>
  );
}
