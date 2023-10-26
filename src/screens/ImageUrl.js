// import axios from 'axios';
// import React, { useState, useEffect } from 'react'
// import { Image } from 'react-native';

// const ImageUrl = ({imagenURL}) => {
//     const [imageData, setImageData] = useState('');

//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const response = await axios.get(`http://192.168.0.12:3000/api/v1/images/${imagenURL}`);
//                 setImageData(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchImage();
//     }, []);


//     return (
//         <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={{width: 50, height:50}}/>
//     )
// }

// export default ImageUrl