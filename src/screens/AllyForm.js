import ImagesComp from './ImagesComp';
import PhotosComponent from './PhotosComponent';
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Switch } from 'react-native';
// import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import { View, FlatList, Button, Image, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import ImageComp from './ImageComp';
import ImageUrl from './ImageUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Paragraph, Title, TextInput, IconButton, Icon, } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const AllyForm = () => {
    const navigation = useNavigation();
    const [selectedImageUris, setSelectedImageUris] = useState(null);
    const [showImageComp, setShowImageComp] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isNational, setIsNational] = useState(false);

    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [selectedImageUri2, setSelectedImageUri2] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageUris2, setSelectedImageUris2] = useState([]);
    // const [showImageComp, setShowImageComp] = useState(true);

    const [alliesList, setAlliesLists] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [newAlly, setNewAlly] = useState({
        allyName: "",
        national: "",
        avatar: "",
        active: false
    });

    const handleGoBack = () => {
        navigation.goBack();
    };
  
    const switchComponent = () => {
        setShowImageComp(!showImageComp);
    };

    // const handleSwitchChangeActive = () => {
    //     setIsActive(prevIsActive => {
    //         const newIsActive = !prevIsActive;
    //         console.log("Active value:", newIsActive);
    //         setNewAlly({...newAlly, active: newIsActive});
    //         return newIsActive;
    //     });
    //  }

    // const handleSwitchChangeNational = () => {
    //     setIsNational(prevIsNational => {
    //         const newIsNational = !prevIsNational;
    //         console.log("National value:", newIsNational);
    //         setNewAlly({...newAlly, national: newIsNational});
    //         return newIsNational;
    //     });
    // };

    const handleSwitchChangeActive = () => {
        setIsActive(!isActive);
        // console.log(isActive)
    };

    const handleSwitchChangeNational = () => {
        setIsNational(!isNational);
        // console.log(isNational)
    };

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

    useEffect(() => {
        console.log(isActive);
        setNewAlly({...newAlly, active: isActive});
    }, [isActive]);

    useEffect(() => {
        console.log(isNational);
        setNewAlly({...newAlly, national: isNational});
    }, [isNational]);

    const listsAllies = () => {

        axios.get(`http://mantenimientoandino.co:3000/api/v1/admin/allies`)
        .then((response) => {
            // console.log('Data posts: ', response.data)
            setAlliesLists(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        listsAllies();
    }, [alliesList])


    const handleCreateAlly = async () => {
        const image = selectedImageUri;
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
            if (image) {
                console.log('ojitoooo----', image)
                let formData = new FormData();
                const mime = require('mime');

                const fileType = mime.getType(image);
                const fileNameParts = image.split('/');
                imageName = fileNameParts[fileNameParts.length - 1];
                
                formData.append('allyName', newAlly.allyName);
                formData.append('active', newAlly.active); 
                formData.append('national', newAlly.national);

                formData.append('avatar', {
                    uri: image,
                    type: fileType, // Ajusta el tipo de archivo si es necesario
                    name: 'uploads/clients/'+imageName
                });

                newAlly.avatar = 'uploads/allies/'+imageName

                console.log('FormDataINDIVIDUAL----', formData)

                // const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-image', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // });
                // console.log('Imagen guardada con éxito en el backend:', response.data);

                // imagen = response.data.fileDetails.name;

                // console.log(imagen);


                // const response = await axios.get(`http://192.168.0.12:3000/images/${imagen}`);
                // const blob = new Blob([response.data], { type: response.headers['content-type'] });
                // const imageUrl = URL.createObjectURL(blob);

                // const imagenBase64 = Buffer.from(response.data, 'binary').toString('base64');
                // const imagenDataUri = `data:image/jpeg;base64,${imagenBase64}`;

                // newAlly.avatar = imagen; //PASA LAS NOMBRES ORIGINALES DE LAS FOTOS

                // newAlly.avatar = image2; // PASA LAS URIS TEMPORALES DE LAS FOTOS EN EL CELULAR
                console.log(newAlly);
                const accessToken = await AsyncStorage.getItem("accessToken");


                const allyResponse = await axios.post("http://mantenimientoandino.co:3000/api/v1/admin/allies/new-ally", formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                console.log('Data new ALLY', allyResponse.data);

                setSelectedImageUris(null);
                setSelectedImageUri(null);
                setSelectedImageUri2(null);
            } else if(image2){
                console.log('ojitoooo----', image2)
                let formData = new FormData();
                const mime = require('mime');

                const fileType = mime.getType(image2);
                const fileNameParts = image2.split('/');
                imageName = fileNameParts[fileNameParts.length - 1];
                
                formData.append('allyName', newAlly.allyName);
                formData.append('active', newAlly.active); 
                formData.append('national', newAlly.national);

                formData.append('avatar', {
                    uri: image2,
                    type: fileType, // Ajusta el tipo de archivo si es necesario
                    name: 'uploads/allies/'+imageName
                });

                newAlly.avatar = 'uploads/allies/'+imageName

                console.log('FormDataINDIVIDUAL----', formData)

                // const response = await axios.post('http://192.168.0.12:3000/api/v1/posts/upload-image', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // });
                // console.log('Imagen guardada con éxito en el backend:', response.data);

                // imagen = response.data.fileDetails.name;

                // console.log(imagen);


                // const response = await axios.get(`http://192.168.0.12:3000/images/${imagen}`);
                // const blob = new Blob([response.data], { type: response.headers['content-type'] });
                // const imageUrl = URL.createObjectURL(blob);

                // const imagenBase64 = Buffer.from(response.data, 'binary').toString('base64');
                // const imagenDataUri = `data:image/jpeg;base64,${imagenBase64}`;

                // newAlly.avatar = imagen; //PASA LAS NOMBRES ORIGINALES DE LAS FOTOS

                // newAlly.avatar = image2; // PASA LAS URIS TEMPORALES DE LAS FOTOS EN EL CELULAR
                console.log(newAlly);
                const accessToken = await AsyncStorage.getItem("accessToken");


                const allyResponse = await axios.post("http://mantenimientoandino.co:3000/api/v1/admin/allies/new-ally", formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                console.log('Data new client', allyResponse.data);

                setSelectedImageUris(null);
                setSelectedImageUri(null);
                setSelectedImageUri2(null);
            }

        //  newAlly.avatar = selectedImageUri;

        //   const postResponse = await axios.post("http://192.168.0.12:3000/api/v1/posts/new-post", newAlly);
        //   console.log('Data new post', postResponse.data);

        } catch (error) {
          console.error('Error al crear la publicación o cargar la imagen en el backend:', error);

            setSelectedImageUris(null);
            setSelectedImageUri(null);
            setSelectedImageUri2(null);
        }
    };


    const handleDeleteAlly = async (allyId) =>{

        const accessToken = await AsyncStorage.getItem("accessToken");

        console.log("allyId", allyId);
        const updatedAllies = alliesList.filter((ally) => ally._id !== allyId);
        setAlliesLists(updatedAllies);
        axios.delete(`http://mantenimientoandino.co:3000/api/v1/admin/allies/${allyId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        .then((response) => {
            console.log('Ally deleted', response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <View style={{ flex: 1 }}>
            <FlatList 
            data={alliesList} 
            keyExtractor={(item) => item._id}
            renderItem = {({item})=>(
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", margin: 10}}>
                    <Card>
                        <Card.Content>

                            <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                                <Title>Nombre: {item.allyName}</Title>
                            </View>
                            {/* <View style={{flex:0, justifyContent:"center", alignItems:"center"}}>
                                <ScrollView horizontal={true} style={{width:200}}>
                                    {item.avatar.map((imageUrl, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: `http://mantenimientoandino.co:3000/${imageUrl}` }}
                                            style={{ width: 200, height: 150, margin: 5 }}
                                        />
                                    ))}
                                </ScrollView>
                            </View> */}
                            <Image
                                source={{ uri: `http://mantenimientoandino.co:3000/${item.avatar}` }}
                                style={{ width: 200, height: 150, margin: 5 }}
                            />
                            <Paragraph>National: {item.national ? "True" : "False"}</Paragraph>
                            <Paragraph>Active: {item.active ? "True" : "False"}</Paragraph>
                            {/* <View style={{margin:10}}>
                                <Button title="Delete" onPress={() => handleDeletePost(item._id)}></Button>
                            </View> */}

                            <View>
                                <TouchableOpacity
                                    onPress={() => handleDeleteAlly(item._id)}
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
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>NUEVO ALIADO</Text>
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
                            <Text style={{fontWeight: 'bold', fontSize: 24}}>INFORMACIÓN DEL ALIADO </Text>
                        </View>
                        <View style={{height: 50}}></View>
                        
                        <TextInput 
                            label="Nombre Aliado"
                            style={styles.input} 
                            onChangeText={(title_text) =>{
                                // console.log("Título publicación",title_text);
                                setNewAlly({...newAlly, allyName: title_text});
                            }}
                        />

                        <View style={styles.container}>
                            <Switch
                                value={isNational}
                                onValueChange={handleSwitchChangeNational}
                                
                            />
                            <Text >Nacional</Text>
                        </View>
                        <View style={styles.container}>
                            <Switch
                                value={isActive}
                                onValueChange={handleSwitchChangeActive}
                            />
                            <Text >Activo</Text>
                        </View>

                        <View /* style={{height: 150}} */></View>
                            <>
                                {showImageComp ? (
                                    <ImageComp setSelectedImageUri={setSelectedImageUri}/>
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
                                    handleCreateAlly();
                                    setModalVisible(false);
                                }}
                            /> */}

                            <View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        handleCreateAlly();
                                        setModalVisible(false);
                                    }} 
                                    style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center'}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>CREAR ALIADO</Text>
                                </TouchableOpacity>
                            </View>

                    </View>
                </View>
            </Modal>
        </View>
        // <View>
        //     <TextInput label="Nombre Cliente" />
        //     <View style={styles.container}>
        //         <Switch
        //             value={estaActivo}
        //             onValueChange={handleSwitchChange}
        //         />
        //         <Text >Nacional</Text>
        //     </View>
        //     <View style={styles.container}>
        //         <Switch
        //             value={estaActivo}
        //             onValueChange={handleSwitchChange}
        //         />
        //         <Text >Activo</Text>
        //     </View>

        //     <>
        //         {showImageComp ? (
        //             // <ImagesComp setSelectedImageUris={setSelectedImageUris}/>
        //             <ImageComp setSelectedImageUri={setSelectedImageUri}/>
        //         ) : (
        //             <PhotosComponent setSelectedImageUri2={setSelectedImageUri2}/>
        //         )}
                
        //         {/* <Button title="Cambiar" onPress={switchComponent}/> */}

        //         <View style={{height: 10}}></View>

        //         <View>
        //             <TouchableOpacity 
        //                 onPress={switchComponent} 
        //                 style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
        //                 <Text style={{ color: '#FFF',fontWeight: 'bold'}}>CAMBIAR</Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View style={{height: 10}}></View>
        //     </>

        //     <View>
        //         <TouchableOpacity 
        //             onPress={() => {
        //                 handleCreateClient();
        //                 setModalVisible(false);
        //             }} 
        //             style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center'}}>
        //             <Text style={{color: '#FFF', fontWeight: 'bold'}}>CREAR CLIENTE</Text>
        //         </TouchableOpacity>
        //     </View>
            
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
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
});

export default AllyForm
