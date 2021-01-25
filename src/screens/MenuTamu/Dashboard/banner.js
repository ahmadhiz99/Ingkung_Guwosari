import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box'

import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'


const Banner =({url})=>{
    const [gambar,setGambar] = useState(url);
    const imagesFood = [
        require('../../../assets/images/banner1.png'),
        require('../../../assets/images/banner1.png'),
        require('../../../assets/images/banner1.png'),
        // "https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg",
        // "https://images-na.ssl-images-amazon.com/images/I/717DWgRftmL._SX522_.jpg"
    ];
    const imagesCraft = [
        require('../../../assets/images/banner2.png'),
        require('../../../assets/images/banner2.png'),
        require('../../../assets/images/banner2.png'),
        // "https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg",
        // "https://images-na.ssl-images-amazon.com/images/I/717DWgRftmL._SX522_.jpg"
    ];
    const imagesTravel = [
        require('../../../assets/images/banner3.png'),
        require('../../../assets/images/banner3.png'),
        require('../../../assets/images/banner3.png'),
        // "https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg",
        // "https://images-na.ssl-images-amazon.com/images/I/717DWgRftmL._SX522_.jpg"
    ];

    return(
        <View style={styles.container}>
            <SliderBox
             autoplay
             circleLoop            
            images={
            
            gambar=='kerajinan'? imagesCraft
            :
            gambar=='wisata'?imagesTravel
            :
            imagesFood
             }
            style={styles.image}
            // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
            />
        </View>
    )
}      

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        width:'100%',
    },
    image:{
        width:'100%',
    }
})
export default Banner