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
import Header from '../header'


const Checkout = ({navigation})=>{
    
    const [data, setData] = useState(null);
    const [UID, setUID] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [checkoutCount, setCheckoutCount] = useState(0)

    const [isFinish, setIsFinish] =useState(false)

    useEffect(() => {  

        const getUIDTemp = (firebase.auth().currentUser.uid);
        setUID(getUIDTemp);
        
        //checkout count
        const refChekout = firebase.database().ref('checkout/'+getUIDTemp+'/checkout/')
        refChekout.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
            console.log('========>',myEvent);
            console.log('========>',myEvent);
            setData({
                ...snapshot.val()
            })
            //   setCheckoutCount(myEvent.checkoutCount)
            setIsLoading(false)
        }else{
           
        }
        });

        //checkout count
        const refChekoutCount = firebase.database().ref('checkout/'+getUIDTemp+'/checkoutCount/')
        refChekoutCount.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
            console.log('========>',myEvent.checkoutCount);
            setCheckoutCount(myEvent.checkoutCount)

            setIsLoading(false)
        }else{
           
        }
        });

        

    }, []) 

    const alertConfirm=()=>{
        setIsFinish(!isFinish)
        Alert.alert('Pesanan anda sudah terkirim, silahkan menunggu')
        navigation.navigate('HomeTabs')
    }


    const finishCheckout =({navigation})=>{
        Alert.alert(
            'Anda Yakin Inngin Memesan?',
            '',
            [
                {
                text: 'Batal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
                },
                { 
                    text: 'Iya', 
                    onPress: () => alertConfirm()
    
                }
            ],
            { cancelable: false }
            );

    }

    return(
        <>
        <ScrollView>
                { data==null?
                <Text>Belum Ada Barang</Text>
                :
                isFinish==false?

                    Object.keys(data).map((key) => (
                        <ScrollView key={key}>
                            <CheckoutItem
                                // productKey={data[key].productKey} 
                                productName={data[key].productName} 
                                productPrice={data[key].productPrice} 
                                productImage={data[key].productImage} 
                                productQuantity={data[key].productQuantity} 
                                productDescribe={data[key].productDescribe} 
                                productOwner={data[key].productOwner}  
                                userOrderID={data[key].userOrderID}  

                                onFinish={false}
                            />
                        </ScrollView>
                    ))
                    :
                            Object.keys(data).map((key) => (
                                <View key={key}>
                                    <CheckoutFinal
                                        // productKey={data[key].productKey} 
                                        productName={data[key].productName} 
                                        productPrice={data[key].productPrice} 
                                        productImage={data[key].productImage} 
                                        productQuantity={data[key].productQuantity} 
                                        productDescribe={data[key].productDescribe} 
                                        productOwner={data[key].productOwner}  
                                        userOrderID={data[key].userOrderID}  
                                        productKey={key}  
        
                                        onFinish={true}
                                    />
                                </View>
                            ))
                
            }
             
             </ScrollView>

             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10, paddingVertical:10, borderColor:'silver'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{marginHorizontal:10, ...Colors.textSilver, ...Typography.Heading5}}>
                            Total Harga
                        </Text>
                        <Text style={{marginHorizontal:10, ...Colors.primText, ...Typography.extraSmallBoldTitle}}>
                            {checkoutCount}
                        </Text>
                    </View>
                    
                    <TouchableOpacity onPress={finishCheckout} style={{borderRadius:10, ...Colors.primLight, padding:10, marginHorizontal:10}}>
                        <Text style={{marginHorizontal:10, ...Colors.whiteText, ...Typography.Heading5}}>Buat Pesanan</Text>
                    </TouchableOpacity>
                </View>
        </>
    )
}

export default Checkout


const CheckoutItem = ({onFinish,navigation,userOrderID ,productKey,productName, productPrice, productImage, productQuantity,  productDescribe, productOwner })=>{

    
        const [UID, setUID] = useState('')
        const [isLoading, setIsLoading] = useState('')
        const [checkoutCount, setCheckoutCount] = useState(0)

       
    return(
    <>
        <View style={{ backgroundColor: '#ffffff' }} > 
       
                <View  style={{ width:'100%', marginVertical:5, paddingVertical:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#E5E5E5'}}>
                    <View style={{flexDirection:'row',}}>
                    <Image source={{uri:productImage}}
                        style={{marginHorizontal:10, borderRadius:10, width:100, height:80}} />
        
                    <View style={{width:120}}>
                        <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                            {productName}
                        </Text>
                        <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                        {productDescribe}
                        </Text>
                        <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                            {productPrice}
                        </Text>
                        <Text style={{...Typography.Heading4, ...Colors.textSilver, textDecorationLine:'line-through', textDecorationStyle:'solid'}}>
                            {parseInt(productPrice)}
                        </Text>
                    </View>
                    </View>
                    <Text style={{...Typography.HeadingBold4, ...Colors.primText, padding:10}}>
                        Kuantitas: {productQuantity}
                    </Text>
                    <Text style={{...Typography.HeadingBold4, ...Colors.primText, padding:10}}>
                        Total: {productQuantity*productPrice}
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





// ==============================================================
// ==============================================================
// ==============================================================

const CheckoutFinal = ({onFinish,navigation,userOrderID , productKey, productName, productPrice, productImage, productQuantity,  productDescribe, productOwner })=>{
    
    const [UID, setUID] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [checkoutCount, setCheckoutCount] = useState(0)


    useEffect(() => {  

        const today = new Date();
        const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        console.log(date);

        const getUIDTemp = (firebase.auth().currentUser.uid);
        setUID(getUIDTemp);
            firebase
            .database()
            // .ref('checkout/'+UID+'/checkoutCount/')
            .ref('sellerTrolly/'+productOwner+'/waitingList/'+productKey)
            .set({
                productOwner:productOwner  ,
                productKey: productKey,
                productName: productName,
                productDescribe: productDescribe,
                productPrice: productPrice,
                productQuantity:productQuantity,
                productImage:productImage,
                userOrderID:userOrderID,
                orderTime:date
            })
          
            // Remove data trolly
            firebase.database().ref('trolly/'+userOrderID+'/trollyList/'+productKey).remove()
            firebase.database().ref('checkout/').remove()

            // Add to history
            firebase
            .database()
            // .ref('checkout/'+UID+'/checkoutCount/')
            .ref('buyerHistory/'+getUIDTemp+'/completedList/'+productKey)
            .set({
                productOwner:productOwner  ,
                productKey: productKey,
                productName: productName,
                productDescribe: productDescribe,
                productPrice: productPrice,
                productQuantity:productQuantity,
                productImage:productImage,
                buyerUserID:getUIDTemp,
                orderTime:date,
                orderStatus:'waiting'
            })
            
            
        }, [])  
        
return(
<>
    <View style={{ backgroundColor: '#ffffff',height:'100%' }} > 
   
        {/* <Header /> */}
        {/* <ScrollView showsVerticalScrollIndicator={false} > */}
            <View  style={{ width:'100%', marginVertical:5, paddingVertical:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#E5E5E5'}}>
                <View style={{flexDirection:'row',}}>
                <Image source={{uri:productImage}}
                    style={{marginHorizontal:10, borderRadius:10, width:100, height:80}} />
    
                <View style={{width:120}}>
                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                        {productName}
                    </Text>
                    <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                    {productDescribe}
                    </Text>
                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                        {productPrice}
                    </Text>
                    <Text style={{...Typography.Heading4, ...Colors.textSilver, textDecorationLine:'line-through', textDecorationStyle:'solid'}}>
                        {parseInt(productPrice)}
                    </Text>
                </View>
                </View>
                <Text style={{...Typography.HeadingBold4, ...Colors.primText, padding:10}}>
                    Kuantitas: {productQuantity}
                </Text>
            </View>
                 
        {/* </ScrollView> */}
      
       
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