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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from '../../../../../../Database/firebaseDB'
import { useNavigation } from '@react-navigation/native';

import HorizontalContent from '../HorizontalContent'

const Content =({productName,productDescribe,productImage, screenName, productKey})=>{
    // const {productKey} = route.params;

    const navigation = useNavigation();
    const [finalRating, setFinalRating] = useState(0)
    

    useEffect(() => {  
        
             // Retrieve Review Count            
        const refReviewCount = firebase.database().ref('productReviewCount/'+productKey)
        refReviewCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
            
            if( myEvent==null){
                console.log(myEvent+' NULL REVIEW KOSONG   ======================================= ')
            }else{
                console.log(myEvent,'UNKNOWN');
                setFinalRating(snapshot.val().ratingCount/snapshot.val().reviewerCount)
                // console.log(snapshot.val().ratingCount/snapshot.val().reviewerCount);
            }
        });
         
    })

    return(
        
        <View style={{margin:5}}>

            <View>
        <View style={{margin:5,elevation:2,borderRadius:10,height:210,flexDirection:'row'}}>
            <Image 
                source={{uri:productImage}} 
                style={{height:207,marginTop:2,borderTopLeftRadius:10,borderBottomLeftRadius:10,flex:0.4}}
                />
            <View style={{borderBottomRightRadius:10,borderTopRightRadius:10,flex:0.6}}>
                <View style={{padding:10}}>
                    <Text style={{...Colors.primText,...Typography.extraSmallBoldTitle, height:30}}>{productName}</Text>
                     {
                            finalRating==0?
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

                    <Text style={{...Typography.Heading5,  height:100}}>
                      {productDescribe}
                    </Text>

                    <TouchableOpacity onPress={()=>navigation.navigate(screenName, {productKey:productKey})} style={{...Colors.primary,borderRadius:5,alignSelf:'flex-end'}}>
                        <Text style={{...Colors.whiteText, ...Typography.Heading5, marginTop:2 ,marginRight:10,marginLeft:10}}>Lihat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
            </View>
    </View>   

    )
}

const VerticalContent =()=>{
    // const [favorite,setFavorite] = useState(false);
    
    // const favoriteHandler = () => {
    //     setFavorite(current => !current)
    
    const navigation = useNavigation();

    
    useEffect(() => {  
        firebase.database()
        .ref('product/')
        .orderByChild('productCategory')
        .equalTo('tour')
        .on('value', snapshot => {  
            if (snapshot.val() != null) {  
          setData({  
              ...snapshot.val()  
          });              
          console.log('========================================================================');
          console.log(data);
          console.log('========================================================================');
        }else{
            setData({});
        }
        })


}, []) 

    //   }
    const [data, setData] = useState({})  
    return(
        <ScrollView>
            <View>
                <View style={{margin:5}}>
                    <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle }}>Terakhir Dilihat</Text>
                </View>   

                {/* Horizontal COntent */}
                <ScrollView horizontal={true} style={{flexDirection:'row'}}>

                {Object.keys(data).map((key) => (
                <View key={key}>
                    <HorizontalContent productKey={key} productName={data[key].productName} productDescribe={data[key].productDescribe} productImage={data[key].productImage} /> 
                </View>
                ))}
                </ScrollView>

              
          
                <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle, marginLeft:10, marginTop:10 }}>Lainnya</Text>

                {Object.keys(data).map((key) => (
                    <View key={key}>
                        <Content screenName='FoodItem' productName={data[key].productName} productDescribe={data[key].productDescribe} productImage={data[key].productImage} productKey={key}  />
                    </View>
                    ))}

            </View>
        </ScrollView>
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

})

export default VerticalContent