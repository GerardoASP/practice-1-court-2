import React, { useState } from 'react';
import { Button, Image, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Text } from 'react-native';

export default function ImagesComp({ setSelectedImageUris }) {
    const [selectedImages, setSelectedImages] = useState([]);
    // const [images, setImages] = useState(null);

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (status !== 'granted') {
          console.log('Permission to access media library denied');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsEditing: true,
          allowsMultipleSelection: true,
          aspect: [4, 3],
          quality: 1,
          multiple: true, // Permitir selección múltiple
        });
      
        if (!result.canceled) {
          // 'result' contiene información sobre las imágenes seleccionadas
          setSelectedImages(result.assets);
          setSelectedImageUris(result.assets.map((images) => images.uri));
        }
    };

    return (
        <View style={{ flex: 1, maxHeight: 200 ,marginTop:100}}>
            <Button title="Escoge imágenes de tu galería aquí" onPress={pickImages} />

            <ScrollView
                horizontal={true}
                contentContainerStyle={{ padding: 0, margin: 0 }}
                style={{ padding: 0, margin: 0 }}
            >
                {selectedImages.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                ))}
            </ScrollView>
        </View>
    );
}