// import {View}
import React,{useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  Image
 
} from 'react-native';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../../styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from '../../../../../../Database/firebaseDB'
import { useNavigation } from '@react-navigation/native';


const VerticalContent =({screenName,})=>{
    const navigation = useNavigation();

    const [data, setData] = useState({})  

    useEffect(() => {  
            firebase.database()
            .ref('product/')
            .orderByChild('productCategory')
            .equalTo('food')
            .on('value', snapshot => {  
          if (snapshot.val() != null) {  
              setData({  
                  ...snapshot.val()  
              });              
              console.log('========================================================================');
              console.log(data);
              console.log('========================================================================');
          }  else{
             setData({});
          }
      })  
  }, []) 
  
    return(
        <>
            {/* Main Content */}
            <View>
        
        {/* Hoorizontal */}
            <View >
                        
            {Object.keys(data).map((key) => (
                <View key={key} >
                    
                        {/* Item Kolom 1 */}
                        <TouchableOpacity onPress={() => navigation.navigate(screenName, {productKey:key})} 
                        style={{margin:5, flexDirection:'row',elevation:5,width:'98%',backgroundColor:'snow',borderRadius:10}} >

                            <Image source={{uri:data[key].productImage}} style={styles.imageContent} />
                            <View style={{padding:5}}>
                                <Text style={{...Typography.textNormal}}>
                                    {data[key].productName}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View>                
                                <Text style={{...Typography.smallTitle,...Colors.primText}}>
                                    Rp. {data[key].productPrice}
                                </Text>
                            </View>

                        </TouchableOpacity>                     
                    </View>
                ))
            }                
    

                    </View>
                </View>
           
        </>
    );
}

const styles = StyleSheet.create({
    container:{
    },
    containerHeader:{
        paddingRight:10,
        paddingLeft:10,
        paddingTop:30,
    },
    buttonBack:{
        ...Colors.whiteBackground,
        ...Buttons.buttonBack,
        marginRight:10,
        alignSelf:'center',
        marginTop:5
    },
    headerContent:{
        ...Colors.primary,
    },
    imageContent:{
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        width:150,
        height:150
    },

})

export default VerticalContent