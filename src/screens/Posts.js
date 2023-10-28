import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { TextInput } from 'react-native';
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
import { Card, Paragraph, Title, TextInput, IconButton, Icon, } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';



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

                        console.log("Uri---",images[i]);
                        console.log("Type---",fileType);
                        console.log("Name---",imageName);


                        // formData.append('images', files[i]);
                    }
                    // console.log(formDataImages);

                    // formData.append(`images`, formDataImages);
                    console.log('FormDataMULTIPLE----', formData)

                

                    const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-imageM', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }

                    });
                    console.log('Images uploaded successfully:', response.data);


                    let miArray = response.data.filesM;

                    console.log("Mi array antes", miArray);

                    function mantenerPosicionesImpares(array) {
                        return array.filter((element, index) => index % 2 === 0);
                    }

                    miArray = mantenerPosicionesImpares(miArray);

                    console.log("-------------------------------------------------------------");
                    console.log("-------------------------------------------------------------");

                    console.log("Mi array después", miArray);

                    const arrayImages = miArray.map(item => item.filename);
                    console.log(arrayImages);

                    // let miArray = response.data.filesM;


                    // console.log("Mi array antes", miArray);


                    // function mantenerPosicionesImpares(array) {
                    //     return array.filter((element, index) => index % 2 === 0);
                    // }
                      
                    // const arrayPosicionesImpares = mantenerPosicionesImpares(miArray);
                      



                    // console.log("-------------------------------------------------------------")
                    // console.log("-------------------------------------------------------------")

                    // console.log("Mi array después", miArray);
                    // console.log(arrayPosicionesImpares);

                    
                    // for (let i = 0; i < miArray.length; i++) {
                    //     arrayImages.push(miArray[i].filename);
                    // }

                
                    // console.log(arrayImages);

                    newPost.avatar = arrayImages; // PASA NOMBRES ORIGINALES DE LAS FOTOS QUE ESTÁN GUARDADAS EN BACKEND
                    
                    // newPost.avatar = images; // PASA LAS URIS TEMPORALES DE LAS FOTOS EN EL CELULAR (NO ES LO IDEAL)
                    
                    // console.log(arrayImages)

                    const postResponse = await axios.post("http://192.168.0.12:3000/api/v1/posts/new-post", newPost);
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

            const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-image', formData, {
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


            const postResponse = await axios.post("http://192.168.0.12:3000/api/v1/posts/new-post", newPost);
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
        axios.delete(`http://192.168.0.12:3000/api/v1/posts/${postId}`)
        .then((response) => {
            console.log('Post deleted', response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const listsPosts = () => {

        axios.get(`http://192.168.0.12:3000/api/v1/posts`)
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
        <View style={{ flex: 1 }}>
            <FlatList 
            data={postsList} 
            keyExtractor={(item) => item._id}
            renderItem = {({item})=>(
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", margin: 10}}>
                    <Card>
                        <Card.Content>

                            <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                                <Title>{item.title}</Title>
                            </View>
                            <View style={{flex:0, justifyContent:"center", alignItems:"center"}}>
                                <ScrollView horizontal={true} style={{width:200}}>
                                    {item.avatar.map((imageUrl, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: `http://192.168.0.12:3000/api/v1/uploads/${imageUrl}` }}
                                            style={{ width: 200, height: 150, margin: 5 }}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                            <Paragraph>Subtítulo: {item.subtitle}</Paragraph>
                            <Paragraph>Descripción: {item.description}</Paragraph>
                            {/* <View style={{margin:10}}>
                                <Button title="Delete" onPress={() => handleDeletePost(item._id)}></Button>
                            </View> */}

                            <View>
                                <TouchableOpacity
                                    onPress={() => handleDeletePost(item._id)}
                                    style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#ff4545', padding: 10, textAlign:'center', marginTop: 10, marginBottom: 3}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>ELIMINAR</Text>
                                </TouchableOpacity>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            )}/>

            {/* <Button title="Nuevo Post" onPress={() => setModalVisible(true)}/> */}
            <View>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center'}}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>NUEVO POST</Text>
                </TouchableOpacity>
            </View>
            <Modal 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
                animationType="slide">
                
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 70, backgroundColor: 'lightgray', justifyContent: "space-between" , padding: 20}}>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                        {/* <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold'}}>EDU NATIVE</Text> */}
                    </View>
                </View>

                <View style={styles.modalContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={{flex:0, justifyContent:"center", alignContent: "center", alignItems:"center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24}}>INFORMACIÓN DEL POST </Text>
                        </View>
                        <View style={{height: 50}}></View>
                        
                        <TextInput 
                            label="Título"
                            style={styles.input} 
                            onChangeText={(title_text) =>{
                                // console.log("Título publicación",title_text);
                                setNewPost({...newPost, title: title_text});
                            }}
                        />

                        <TextInput 
                            label="Subtítulo"
                            style={styles.input} 
                            onChangeText={(subtitle_text) =>{
                                // console.log("Subtítulo publicación",subtitle_text);
                                setNewPost({...newPost, subtitle: subtitle_text});
                            }}
                        />

                        <TextInput 
                            label="Descripción"
                            style={styles.input} 
                            onChangeText={(description_text) =>{
                                // console.log("Descripción publicación",description_text);
                                setNewPost({...newPost, description: description_text});
                            }}
                        />

                        <View /* style={{height: 150}} */></View>
                            <>
                                {showImageComp ? (
                                    <ImagesComp setSelectedImageUris={setSelectedImageUris}/>
                                ) : (
                                    <PhotosComponent setSelectedImageUri2={setSelectedImageUri2}/>
                                )}
                                
                                {/* <Button title="Cambiar" onPress={switchComponent}/> */}

                                <View style={{height: 10}}></View>

                                <View>
                                    <TouchableOpacity 
                                        onPress={switchComponent} 
                                        style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                                        <Text style={{ color: '#FFF',fontWeight: 'bold'}}>CAMBIAR</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height: 10}}></View>
                            </>



                            {/* <Button
                                title="Crear Post"
                                onPress={() => {
                                    handleCreatePost();
                                    setModalVisible(false);
                                }}
                            /> */}

                            <View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        handleCreatePost();
                                        setModalVisible(false);
                                    }} 
                                    style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center'}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>CREAR POST</Text>
                                </TouchableOpacity>
                            </View>

                    </View>
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
    text_button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        textAlign:'center',
    },
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        // alignItems: 'center',
        width: 300,
        margin:50
        
    },
    
})
