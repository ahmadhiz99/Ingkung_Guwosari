import React,{useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'


const Message = ({navigation, route})=>{
    const {buyerUserID} = route.params
    const {profileImage} = route.params
    const {usernameBuyer} = route.params
    const [data, setData] = useState(null);
    const [UID, setUID] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [checkoutCount, setCheckoutCount] = useState(0)
    const [text, setText] = useState('')
    // const [usernameBuyer, setUsernameBuyer] = useState('')
    const [usernameOwner, setUsernameOwner] = useState('')
    const [myProfileImage, setMyProfileImage] = useState('')


    const [isFinish, setIsFinish] =useState(false)

    useEffect(() => {  

        
        const getUIDTemp = (firebase.auth().currentUser.uid);
        setUID(getUIDTemp);

        
        // My ID
        // const refMyID = firebase.database().ref('user/buyer/'+buyerUserID);
        // refMyID.on("value", function(snapshot) {
        //   const myEvent = snapshot.val();
        //   if(myEvent!==null){
        //       setUsernameBuyer(myEvent.name)
        // }else{
           
        // }
        // });

        //MY ID
        const refOwnerID = firebase.database().ref('user/seller/'+getUIDTemp);
        refOwnerID.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
              console.log(myEvent.name);
              setUsernameOwner(myEvent.name)
              setMyProfileImage(myEvent.profileImage)
        }else{
           
        }
        });

        
        // Add to seller message
        const refChekout = firebase.database().ref('MessageSeller/'+getUIDTemp+'/buyer/'+buyerUserID+'/message');
        refChekout.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
            console.log('========>',myEvent);
            setData({
                ...snapshot.val()
            })
            setIsLoading(false)
        }else{
           
        }
        });


    }, []) 


    const sendMessage =()=>{
        const today = new Date();
        const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        const time = today.getHours() + ":"+ today.getMinutes();


        console.log(text);
        setText('')
        
        console.log(date);
          const message=  firebase
                            .database()
                            .ref('MessageBuyer/'+buyerUserID+'/seller/'+UID+'/message')
                            .push({
                                message:text,
                                sellerUserID:UID,
                                buyerUserID:buyerUserID,
                                type:'seller',   
                                usernameBuyer:usernameBuyer,
                                usernameOwner:usernameOwner,
                                messageDate:date,
                                messageTime:time,
                            }).getKey()
                            
                // Add to Message buyer route
                firebase
                .database()
                .ref('MessageBuyerRoute/'+buyerUserID+'/seller/'+UID)
                .set({
                    message:text,
                    sellerUserID:UID,
                    buyerUserID:buyerUserID,
                    type:'seller',
                    usernameBuyer:usernameBuyer,
                    usernameOwner:usernameOwner,
                    profileImage:myProfileImage,
                    messageDate:date,
                    messageTime:time,
                })
          

                // Add to Message seller
                firebase
                .database()
                .ref('MessageSeller/'+UID+'/buyer/'+buyerUserID+'/message')
                .push({
                    message:text,
                    sellerUserID:UID,
                    buyerUserID:buyerUserID,
                    type:'seller',
                    usernameBuyer:usernameBuyer,
                    usernameOwner:usernameOwner,
                    messageDate:date,
                    messageTime:time,
                })

                // Add to Message seller route
                firebase
                .database()
                .ref('MessageSellerRoute/'+UID+'/buyer/'+buyerUserID)
                .set({
                    message:text,
                    sellerUserID:UID,
                    buyerUserID:buyerUserID,
                    type:'seller',
                    usernameBuyer:usernameBuyer,
                    usernameOwner:usernameOwner,
                    profileImage:profileImage,
                    messageDate:date,
                    messageTime:time,
                })
          
            

    }

    return(
        <>
           <View style={{flexDirection:'row',...Colors.whiteBackground, elevation:5}}> 
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10,}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Information')}
                    title="LoginScreen" style={{
                        ...Colors.whiteBackground,
                        ...Buttons.buttonBack,
                        margin:10,
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:5}}>
                        <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
                    </TouchableOpacity>
                    <Text style={{ margin:10,...Colors.primText, ...Typography.HeadingBold3}}>
                    {usernameBuyer}
                    </Text>
                    
                </View>
            </View>

        <ScrollView style={{...Colors.whiteBackground, paddingHorizontal:10, paddingBottom:30}}>
                { data==null?
                    <Text></Text>
                    :
                
                    Object.keys(data).map((key) => (
                        <View key={key}>
                            
                            {data[key].type=='seller'?
                                <View style={{alignItems:'flex-end'}}>
                                    <View style={{...Colors.primLight, marginVertical:5,borderRadius:10, padding:10}}>
                                        <Text>{data[key].message} </Text>
                                    </View>
                                </View>
                            :
                                <View style={{alignItems:'flex-start'}}>
                                    <View style={{...Colors.silver, marginVertical:5,borderRadius:10, padding:10}}>
                                        <Text>{data[key].message} </Text>
                                    </View>
                                </View>
                            }


                        </View>
                    ))
                
            }
             
             </ScrollView>

             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'white'}}>
                    <View style={{flexDirection:'row', alignItems:'center', flex:0.8, backgroundColor:'white', padding:10}}>
                        <TextInput value={text} onChangeText={setText} placeholder='Tulis pesan anda' style={{backgroundColor:'white', width:'100%', marginHorizontal:10,borderRadius:10, borderColor:'silver', borderWidth:1, ...Typography.Heading4, height:50}} /> 
                    </View>
                    <View style={{flexDirection:'row', flex:0.2, justifyContent:'center'}}>
                        <TouchableOpacity disabled={text==''?true:false} onPress={sendMessage} style={{borderRadius:10}}>
                            <Icon name='send' size={26} style={text==''?{...Colors.textSilver}:{...Colors.primText}}> </Icon>
                        </TouchableOpacity>
                    </View>
                    
                    
                    
                </View>
        </>
    )
}

export default Message


// ==============================================================

const ShowMessage = ({onFinish,navigation,userOrderID , productKey, productName, productPrice, productImage, productQuantity,  productDescribe, productOwner, messageKey, messageText })=>{
    
    const [UID, setUID] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [checkoutCount, setCheckoutCount] = useState(0)


    useEffect(() => {  

        // const today = new Date();
        // const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        // console.log(date);

        // const getUIDTemp = (firebase.auth().currentUser.uid);
        // setUID(getUIDTemp);
        //     firebase
        //     .database()
        //     // .ref('checkout/'+UID+'/checkoutCount/')
        //     .ref('sellerTrolly/'+productOwner+'/waitingList/'+productKey)
        //     .set({
        //         productOwner:productOwner  ,
        //         productKey: productKey,
        //         productName: productName,
        //         productDescribe: productDescribe,
        //         productPrice: productPrice,
        //         productQuantity:productQuantity,
        //         productImage:productImage,
        //         userOrderID:userOrderID,
        //         orderTime:date
        //     })
          
        //     // Remove data trolly
        //     firebase.database().ref('trolly/'+userOrderID+'/trollyList/'+productKey).remove()
        //     firebase.database().ref('checkout/').remove()

            // // Add to history
            // firebase
            // .database()
            // // .ref('checkout/'+UID+'/checkoutCount/')
            // .ref('buyerHistory/'+userOrderID+'/completedList/'+productKey)
            // .set({
            //     productOwner:productOwner  ,
            //     productKey: productKey,
            //     productName: productName,
            //     productDescribe: productDescribe,
            //     productPrice: productPrice,
            //     productQuantity:productQuantity,
            //     productImage:productImage,
            //     orderTime:date
            // })
            
            
        }, [])  
        
return(
<>
    <View style={{ backgroundColor: '#ffffff',height:'100%' }} > 
     
            <View  style={{ width:'100%', marginVertical:5, paddingVertical:10, backgroundColor:'silver'}}>
                <Text style={{...Typography.HeadingBold4, ...Colors.primText, padding:10}}>
                    {messageText}
                </Text>
            </View>
                       
       
    </View>
    {
        isLoading==true?
        <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
        :
        null
    }
  </>
)
}

const styles = StyleSheet.create({
content:{
    backgroundColor:'silver',
    width:100,
    height:170,
    ...Buttons.contentRounded,
    elevation:3,
    margin:5
},
title:{
    ...Typography.textTitle,
    alignSelf:'flex-start',
    flex:2
},
button:{
    alignSelf:'flex-end',
    ...Colors.primary,
    ...Buttons.smallRounded,
    flex:1,
    margin:10,
    height:30,
    justifyContent:'center',
},
textRegular:{
    ...Typography.textRegular,
    ...Colors.secText,
    alignSelf:'center',
    
}

})