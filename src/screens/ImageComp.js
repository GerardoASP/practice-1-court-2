import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

export default function ImageComp({ setSelectedImageUri }) {
  const [image, setImage] = useState(null);


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

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/*', // Ajusta el tipo de archivo si es necesario
        name: 'image.jpg',
      });

      try {
        const response = await axios.post('http://192.168.0.15:3000/api/v1/posts/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Imagen guardada con éxito en el backend:', response.data);
      } catch (error) {
        console.error('Error al guardar la imagen en el backend:', error);
      }
    }
  };

  return (
    <View /* style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} */>
      <Button title="Escoge una imagen de tu galería aquí" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {/* {image && <Button title="Guardar en el backend" onPress={uploadImage} />} */}
    </View>
  );
}
