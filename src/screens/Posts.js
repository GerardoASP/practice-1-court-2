import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import { View, FlatList, Button, Image, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import ImageComp from './ImageComp';
import ImageUrl from './ImageUrl';
import PhotosComponent from './PhotosComponent';
import ImagesComp from './ImagesComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Paragraph, Title } from 'react-native-paper';



export const Posts = () => {
    const navigation = useNavigation();
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [selectedImageUris, setSelectedImageUris] = useState(null);
    const [selectedImageUri2, setSelectedImageUri2] = useState(null);
    const [showImageComp, setShowImageComp] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageUris2, setSelectedImageUris2] = useState([]);

    // const [isState, setIsState] = useState(false);

    const [imageData, setImageData] = useState('');


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


    // useEffect(() => {
    //     if (selectedImageUri) {
    //       setSelectedImageUri2(null);
    //     }
    // }, [selectedImageUri]);

    useEffect(() => {
        if (selectedImageUris) {
          setSelectedImageUri2(null);
        }
    }, [selectedImageUris]);

    useEffect(() => {
        if (selectedImageUri2) {
            setSelectedImageUris(null);
            setSelectedImageUri(null);
        }
    }, [selectedImageUri2]);

    const switchComponent = () => {
        setShowImageComp(!showImageComp);
    };


    const [postsList, setPostsLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [newPost, setNewPost] = useState({
        title: "",
        subtitle: "",
        description: "",
        avatar: "",
        active: false
    });
    

    const handleCreatePost = async () => {
        // const image = selectedImageUri;
        const images = selectedImageUris;
        const image2 = selectedImageUri2;
        console.log('Imagen2 que llegó---------->',image2);
        console.log('Images1 que llegó---------->',images);
        let imagen = [];
        let imageName = "";
        let formDataImages = [];
        let arrayImages = [];
        // let imageUrl = "";
      
        try {
          if (images) {

                    // for (const selectImage of images) {
                    //     console.log('ojitoooo----', selectImage)
            
                    //     const formData = new FormData();
                    //     const mime = require('mime');

                    //     const fileType = mime.getType(selectImage);
                    //     const fileNameParts = selectImage.split('/');
                    //     imageName = fileNameParts[fileNameParts.length - 1];

                    //     formData.append(`image`, {
                    //         uri: selectImage.uri,
                    //         type: fileType, // Ajusta el tipo de archivo si es necesario
                    //         name: imageName,
                    //     });
                    //     console.log('FormData----', formData)

                    

                    //     const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-image', formData, {
                    //         headers: {
                    //             'Content-Type': 'multipart/form-data',
                    //         },
                    //     });
                    //     console.log('Images uploaded successfully:', response.data);

                    //     arrayImages.push(response.data.fileDetails.name);

                    // }
                

                    // newPost.avatar = arrayImages;

                    // console.log(arrayImages)

                    // const postResponse = await axios.post("http://192.168.0.12:3000/api/v1/posts/new-post", newPost);
                    // console.log('Data new post', postResponse.data);
                    // setSelectedImageUris(null);
                    // setSelectedImageUri(null);
                    // setSelectedImageUri2(null);




                    let formData = new FormData();


                    for (let i = 0; i < images.length; i++) {

                        console.log('ojitoooo----', images[i])
        
                        const mime = require('mime');

                        const fileType = mime.getType(images[i]);
                        const fileNameParts = images[i].split('/');
                        imageName = fileNameParts[fileNameParts.length - 1];

                        // formDataImages.push({
                        //     uri: images[i],
                        //     type: fileType, 
                        //     name: imageName,
                        // })

                        formData.append('images', {
                            uri: images[i],
                            type: fileType, 
                            name: imageName,
                        });


                        // formData.append('images', files[i]);
                    }
                    // console.log(formDataImages);

                    // formData.append(`images`, formDataImages);
                    console.log('FormDataMULTIPLE----', formData)

                

                    const response = await axios.post('http://192.168.0.15:3000/api/v1/posts/upload-imageM', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }

                    });
                    console.log('Images uploaded successfully:', response.data);

                    
                    for (let i = 0; i < response.data.filesM.length/2; i++) {
                        arrayImages.push(response.data.filesM[i].filename);
                    }
                
                    // console.log(arrayImages);

                    newPost.avatar = arrayImages; // PASA NOMBRES ORIGINALES DE LAS FOTOS QUE ESTÁN GUARDADAS EN BACKEND
                    
                    // newPost.avatar = images; // PASA LAS URIS TEMPORALES DE LAS FOTOS EN EL CELULAR (NO ES LO IDEAL)
                    
                    // console.log(arrayImages)

                    const postResponse = await axios.post("http://192.168.0.15:3000/api/v1/posts/new-post", newPost);
                    console.log('Data new post', postResponse.data);
                    setSelectedImageUris(null);
                    setSelectedImageUri(null);
                    setSelectedImageUri2(null);



          } else if(image2){
            // console.log(image2)

            console.log('ojitoooo----', image2)
            let formData = new FormData();
            const mime = require('mime');

            const fileType = mime.getType(image2);
            const fileNameParts = image2.split('/');
            imageName = fileNameParts[fileNameParts.length - 1];

            formData.append('image', {
              uri: image2,
              type: fileType, // Ajusta el tipo de archivo si es necesario
              name: imageName,
            });

            console.log('FormDataINDIVIDUAL----', formData)

            const response = await axios.post('http://192.168.0.15:3000/api/v1/posts/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagen guardada con éxito en el backend:', response.data);

            imagen = response.data.fileDetails.name;

            console.log(imagen);


            // const response = await axios.get(`http://192.168.0.12:3000/images/${imagen}`);
            // const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // const imageUrl = URL.createObjectURL(blob);

            // const imagenBase64 = Buffer.from(response.data, 'binary').toString('base64');
            // const imagenDataUri = `data:image/jpeg;base64,${imagenBase64}`;

            newPost.avatar = imagen; //PASA LAS NOMBRES ORIGINALES DE LAS FOTOS

            // newPost.avatar = image2; // PASA LAS URIS TEMPORALES DE LAS FOTOS EN EL CELULAR
            console.log(newPost);


            const postResponse = await axios.post("http://192.168.0.15:3000/api/v1/posts/new-post", newPost);
            console.log('Data new post', postResponse.data);

            setSelectedImageUris(null);
            setSelectedImageUri(null);
            setSelectedImageUri2(null);
          }

        //  newPost.avatar = selectedImageUri;

        //   const postResponse = await axios.post("http://192.168.0.12:3000/api/v1/posts/new-post", newPost);
        //   console.log('Data new post', postResponse.data);

        } catch (error) {
          console.error('Error al crear la publicación o cargar la imagen en el backend:', error);

            setSelectedImageUris(null);
            setSelectedImageUri(null);
            setSelectedImageUri2(null);
        }
    };
      

    const handleDeletePost = (postId) =>{
        console.log("postId", postId);
        const updatedPosts = postsList.filter((post) => post._id !== postId);
        setPostsLists(updatedPosts);
        axios.delete(`http://192.168.0.15:3000/api/v1/posts/${postId}`)
        .then((response) => {
            console.log('Post deleted', response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const listsPosts = () => {

        axios.get(`http://192.168.0.15:3000/api/v1/posts`)
        .then((response) => {
            // console.log('Data posts: ', response.data)
            setPostsLists(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        listsPosts();
    }, [postsList])

    return (
        <View>
            <FlatList 
            data={postsList} 
            keyExtractor={(item) => item._id}
            renderItem = {({item})=>(
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", margin: 10}}>
                    <Card>
                        <Card.Content>
                            <ScrollView horizontal={true}>
                            {item.avatar.map((imageUrl, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: `http://192.168.0.15:3000/api/v1/uploads/${imageUrl}` }}
                                    style={{ width: 200, height: 150, margin: 5 }}
                                />
                            ))}
                            </ScrollView>
                        <Title>Title: {item.title}</Title>
                        <Paragraph>Subtitle: {item.subtitle}</Paragraph>
                        <Paragraph>Description: {item.description}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Button title="Delete" onPress={() => handleDeletePost(item._id)}></Button>
                </View>
            )}/>

            <Button title="New post" onPress={() => setModalVisible(true)}/>
            <Modal 
            visible={modalVisible} 
            onRequestClose={() => setModalVisible(false)}
            animationType="slide">
                <View style={styles.modalContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 100, marginTop: 10}}>Datos Post </Text>
                    <TextInput 
                        placeholder="Title post" 
                        style={styles.input} 
                        onChangeText={(title_text) =>{
                            // console.log("Título publicación",title_text);
                            setNewPost({...newPost, title: title_text});
                        }}
                    />

                    <TextInput 
                        placeholder="Subtitle post" 
                        style={styles.input} 
                        onChangeText={(subtitle_text) =>{
                            // console.log("Subtítulo publicación",subtitle_text);
                            setNewPost({...newPost, subtitle: subtitle_text});
                        }}
                    />

                    <TextInput 
                        placeholder="Description post" 
                        style={styles.input} 
                        onChangeText={(description_text) =>{
                            // console.log("Descripción publicación",description_text);
                            setNewPost({...newPost, description: description_text});
                        }}
                    />

                   


                    <>

                        
                        {showImageComp ? (
                            <ImagesComp setSelectedImageUris={setSelectedImageUris}/>
                        ) : (
                            <PhotosComponent setSelectedImageUri2={setSelectedImageUri2}/>
                        )}
                        
                        <Button title="Cambiar" onPress={switchComponent}/>
                    </>



                    <Button
                        title="Crear Post"
                        onPress={() => {
                            handleCreatePost();
                            setModalVisible(false);
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
    }
})
