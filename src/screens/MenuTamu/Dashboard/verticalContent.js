import React,{useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
  ItemList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../../Database/firebaseDB'

const VerticalContent =({screenName })=>{
    const navigation = useNavigation();

    const [currentId, setCurrentId] = useState('');  
    const [data, setData] = useState({})  
    const [childObject, setChildObject] = useState({})  
    
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    
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
            <View>
 
           <View style={{flexDirection:'row'}}>
               <Text style={styles.title}>Terbaru</Text>
               <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.button}>
                   <Text style={styles.textRegular}>Selengkapnya</Text>
                </TouchableOpacity>
           </View>
            <ScrollView
            horizontal={false}>
               
            {Object.keys(data).map((key) => (
            <View key={key} >
               <Content 
                    productName={data[key].productName}
                    productKey={key}
                    productImage={data[key].productImage}
                    productPrice={data[key].productPrice}
                    screenName={screenName}
                />
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
        width:120,
        height:160,
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
        ...Buttons.smallRounded,
        flex:0.8,
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
        width:120,
        height:70,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },

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

const Content =({productName,productKey,productImage,productPrice, screenName})=>{
    const navigation = useNavigation();

    const [finalRating, setFinalRating] = useState(0)
    const [data, setData] = useState({})  


    useEffect(() => {  
        
             // Retrieve Review Count            
        const refReviewCount = firebase.database().ref('productReviewCount/'+productKey)
        refReviewCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
            
            if( myEvent==null){
                null
            }else{
                setFinalRating(snapshot.val().ratingCount/snapshot.val().reviewerCount)
            }
        });
         
    })
    return(
        <TouchableOpacity onPress={() => navigation.navigate(screenName, {productKey:productKey})} 
        style={{margin:5, flexDirection:'row',elevation:5,width:'98%',backgroundColor:'snow',borderRadius:10}} >

            <Image source={{uri:productImage}} style={styles.imageContent} />
            <View style={{padding:5}}>
                <Text style={{...Typography.textNormal}}>
                    {productName}
                </Text>
                <View style={{flexDirection:'row'}}>
                {finalRating==0?
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                  :
                  finalRating==1?
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                    :
                    finalRating==2?
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                    :
                    finalRating==3?
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                    :
                    finalRating==4?
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                    :
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                    </View> 
                }
                </View>                
                <Text style={{...Typography.smallTitle,...Colors.primText}}>
                    Rp. {productPrice}
                </Text>
            </View>

        </TouchableOpacity>                     
    )
}


