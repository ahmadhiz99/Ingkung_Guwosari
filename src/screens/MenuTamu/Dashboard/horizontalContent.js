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

const HorizontalContent =({ screenName })=>{
    const navigation = useNavigation();

    const [currentId, setCurrentId] = useState('');  
    const [data, setData] = useState({})  
    const [childObject, setChildObject] = useState({})  
    
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    
      useEffect(() => {  
          // firebase.database().ref('user/buyer').on('value', snapshot => {  
              firebase.database().ref('product/').on('value', snapshot => {  
            // let isMounted = true; // note this flag denote mount status
            if (snapshot.val() != null) {  
                setData({  
                    ...snapshot.val()  
                });              

            }  else{
               setData({});
            }
        })  
    }, [])  

    const go=()=>{
        // for (const prop in data) {
        //     console.log(`obj.${prop} = ${data[prop]}`);
        //     console.log('=====================');
        //     // const tes = data.prop;
        //     // const id = data[prop];
        //     // console.log(id);
        //   }

        for (const prop in data) {
            if (data.hasOwnProperty(prop)) {
              console.log(`data.${prop} = ${data[prop]}`);
              setChildObject(data[prop])
            } 
          }   
          
        }
        
    

    return(
            <View>
 
           <View style={{flexDirection:'row'}}>
               <Text style={styles.title}>Menu Populer</Text>
               <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.button}>
                   <Text style={styles.textRegular}>Selengkapnya</Text>
                </TouchableOpacity>
           </View>
            <ScrollView
            horizontal={true}>
               
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
    }
    
})
export default HorizontalContent

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
        <TouchableOpacity onPress={() => navigation.navigate(screenName, {productKey:productKey})} style={styles.content}>
        <View>
            <Image style={{width:'100%', height:80}} source={{uri:productImage}} />
            <View style={{margin:5}}>
                <Text style={{...Typography.Heading5,...Colors.textSilver, height:30}}>
                    {productName}
                </Text>
                <Text style={{...Typography.extraSmallBoldTitle,...Colors.primText}}>
                Rp. {productPrice}
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
            </View>
        </View>
    </TouchableOpacity>
    )
}