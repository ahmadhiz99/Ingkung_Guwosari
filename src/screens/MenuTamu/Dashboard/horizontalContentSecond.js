import React,{useState, useEffect}  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../../Database/firebaseDB'

const HorizontalContentSecond =({ screenName })=>{
    const navigation = useNavigation();
    const [data, setData] = useState({})  

    useEffect(() => {  
            firebase.database().ref('product/').on('value', snapshot => {  
          if (snapshot.val() != null) {  
              setData({  
                  ...snapshot.val()  
              });              
          }  else{
             setData({});
          }
      })  
  }, [])  

    return(
        <View style={{marginTop:20}}>
           <View style={{flexDirection:'row'}}>
               <Text style={styles.title}>Murahnya Kebangetan</Text>
               <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.button}>
                   <Text style={styles.textRegular}>Selengkapnya</Text>
                </TouchableOpacity>
           </View>
            <ScrollView
            horizontal={true}>

            {Object.keys(data).map((key) => (
            <View key={key} >
            
                <TouchableOpacity onPress={() => navigation.navigate(screenName, {productKey:key})} style={styles.content}>
                        <ImageBackground source={{uri:data[key].productImage}} style={styles.image} borderRadius={10}>
                            <View style={{padding:5}}>
                                <View style={styles.overlay} />
                                <View style={{margin:5}}>
                                    <Text style={{...Typography.fontBold,...Colors.whiteText}}>
                                        {data[key].productName}
                                    </Text>
                                    <Text style={{...Typography.textTitle,...Colors.textGold}}>
                                        Rp. {data[key].productPrice}
                                    </Text>
                                    <Text style={{...Typography.fontBold,...Colors.whiteText,textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                                        Rp. { parseInt(data[key].productPrice)+20000}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                </TouchableOpacity>
                </View>
                ))
            }
               
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    content:{
        backgroundColor:'white',
        width:190,
        height:135,
        ...Buttons.contentRounded,
        elevation:3,
        margin:5
    },
    title:{
        ...Typography.extraSmallBoldTitle,
        alignSelf:'flex-start',
        flex:2,
        alignSelf:'center',
        marginTop:10
    },
    button:{
        alignSelf:'flex-end',
        ...Colors.primary,
        flex:0.8,
        ...Buttons.smallRounded,
        margin:10,
        height:20,
        justifyContent:'center',
        alignSelf:'center'
    },
    textRegular:{
        ...Typography.Heading5,
        ...Colors.secText,
        alignSelf:'center',
        marginTop:3
    },
    image:{
        width:190,
        height:135,
    },
    overlay:{
        width:190,
        height:135,
        backgroundColor:'black',
        opacity:0.5,
        position:'absolute',
        borderRadius:10
    }
    
})
export default HorizontalContentSecond