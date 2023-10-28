import React, { useState } from 'react';
import { Button, Image, View, ScrollView, TouchableOpacity } from 'react-native';
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
      <View>
          {/* <Button title="Escoge imágenes de tu galería aquí" onPress={pickImages} /> */}

          <View>
            <TouchableOpacity
                onPress={pickImages}
                style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                <Text style={{color: '#FFF', fontWeight: 'bold'}}>ESCOGE LAS IMÁGENES</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
              horizontal={true}
              contentContainerStyle={{ padding: 0, margin: 0 }}
              style={{ padding: 0, margin: 0, width:300 }}
          >
              {selectedImages.map((image, index) => (
                  <Image
                      key={index}
                      source={{ uri: image.uri }}
                      style={{ width: 300, height: 200 }}
                  />
              ))}
          </ScrollView>
      </View>
    );
}