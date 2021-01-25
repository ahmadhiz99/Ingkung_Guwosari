import React,{useState, useEffect} from 'react';
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

const TrollyItem =({navigation,OnListen, productKey, productName, productPrice, productImage, productQuantity,  productDescribe, productOwner})=>{

       // ceckbox
       const [toggleCheckBox, setToggleCheckBox] = useState(false);
       const [option1, setOption1] = useState(true);

        //    Count
        const [count, setCount] = useState(1)

        // Data from database
        const [data, setData] = useState(null);

        const [UID, setUID] = useState('')
        const [isLoading, setIsLoading] = useState('')

        const [checkout, setCheckout] = useState(0)
        const [checkoutCount, setCheckoutCount] = useState(0)


    const increase =()=>{
        console.log(data);
            firebase
            .database()
            .ref('checkout/'+UID+'/checkout/'+productKey)
            .update({
                productQuantity: count+1 ,
            })
            
            firebase
            .database()
            .ref('checkout/'+UID+'/checkoutCount/')
            .set({
                // checkoutCount: checkout*count ,
                checkoutCount:checkoutCount+parseInt(productPrice),
            })

            console.log(checkoutCount,'==========',parseInt(productPrice));
            
            setCount(count+1)
            
        }

        const decrease =()=>{
            console.log(data);
            //checkout
            firebase
                .database()
                .ref('checkout/'+UID+'/checkout/'+productKey)
                .update({
                    productQuantity: count-1 ,
                })

            // checkout count decrease/
            firebase
                .database()
                .ref('checkout/'+UID+'/checkoutCount/')
                .set({
                    // checkoutCount: checkout/count ,
                    // checkoutCount: parseInt(productPrice)/(count+1) ,
                    checkoutCount:checkoutCount-parseInt(productPrice),

                })
                // const decrease = parseInt(productPrice)/(count-1)

                setCount(count-1)
        }
        
        const checkBoxhandler =()=>{
            setToggleCheckBox(!toggleCheckBox)
        // (newValue) => setToggleCheckBox(newValue)
        const toggleCheckBoxTemp = !toggleCheckBox
        console.log(toggleCheckBoxTemp);
        

        if(toggleCheckBoxTemp==true){
            const db = firebase.database().ref('checkout/'+UID+'/checkout/'+productKey)
            db
            .set({
                productKey: productKey,
                productName: productName,
                productDescribe: productDescribe,
                productPrice: productPrice,
                productQuantity:count,
                productImage:productImage,
                productOwner:productOwner,
                userOrderID:UID

            })   

            // set ccheckout count
            firebase
            .database()
            .ref('checkout/'+UID+'/checkoutCount/')
            .set({
                // checkoutCount: checkout*count ,
                checkoutCount:checkoutCount+parseInt(productPrice),
            })

            OnListen()
            
            
        }else{

            // set ccheckout count
            firebase
            .database()
            .ref('checkout/'+UID+'/checkoutCount/')
            .set({
                checkoutCount:checkoutCount-(count*parseInt(productPrice)),
            })
            setCount(1)
            const db = firebase.database().ref('checkout/'+UID+'/checkout/'+productKey).remove()
        }
        

    }


    useEffect(() => {  

        const getUIDTemp = (firebase.auth().currentUser.uid);
        setUID(getUIDTemp);
       
        //Remove data checkout
        //  firebase.database().ref('checkout/'+getUIDTemp).remove()
        // refTrolly.on("value", function(snapshot) {
        //   const myEvent = snapshot.val();

        //trolly
        const refTrolly = firebase.database().ref('trolly/'+getUIDTemp+'/trollyList')
        refTrolly.on("value", function(snapshot) {
          const myEvent = snapshot.val();
        //   console.log(myEvent)
          
          setData({  
              ...snapshot.val()  
          }
          ); 

          setIsLoading(false)
        });

        //checkout count
        const refChekout = firebase.database().ref('checkout/'+getUIDTemp+'/checkoutCount/')
        refChekout.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
            console.log('========>',myEvent);
            console.log('========>',myEvent.productQuantity);
              setCheckoutCount(myEvent.checkoutCount)
                if(myEvent.productQuantity==0){
                    setToggleCheckBox(false)
                    setCheckoutCount(0)
                }
              setIsLoading(false)
            }else{
                setCheckoutCount(0)
        }
        });

        

    }, [])  

    const alertConfirm=() =>{
        //   //trolly item
          firebase.database().ref('trolly/'+UID+'/trollyList/'+productKey).remove()
          checkBoxhandler();
    }

    const deleteTrollyItem =()=>{
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
                    text: 'Hapus', 
                    onPress: () => alertConfirm()
    
                }
            ],
            { cancelable: false }
            );
    }


    
    const increaseHandler=()=>{
        // Like
        // firebase
        // .database()
        // .ref('trolly/'+getUIDTemp+'/trollyList')
        //  .set({
        //      likes: likeCount + 1 ,
        //  })

    }
    
    const decreaseHandler=()=>{
      firebase
      .database()
      .ref('productLikeCount/'+productKey)
      .set({
          likes: likeCount - 1 ,            
      })
    }
    
   
    return(
    <>

    {productKey==null?
            <Text>Masih Belum Ada Barang Yang Ditamabahkan</Text>
        :
                <View>    
                <View style={{flexDirection:'row', width:'100%', marginVertical:5, paddingVertical:10, borderTopWidth:1, borderBottomWidth:1, borderColor:'#E5E5E5'}}>
                    
                    <View style={{width:20}}>
                        <CheckBox
                            Colors='silver'
                            onCheckColor='#7C3532'
                            onFillColor='#7C3532'
                            tintColors='#7C3532'
                            onTintColor='#7C3532'
                            tintColor='silver'
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={checkBoxhandler}
                            />     
                    </View>
            
                    <Image source={{uri:productImage}}
                        style={{marginHorizontal:10, borderRadius:10, width:100, height:80}} />
                        
                    <View style={{width:120}}>
                        <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>{productName}</Text>
                        <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                            {productDescribe}
                        </Text>
                        <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                        {productPrice}
                        </Text>
                        <Text style={{...Typography.Heading4, ...Colors.textSilver, textDecorationLine:'line-through', textDecorationStyle:'solid'}}>
                        {parseInt(productPrice)+20000}
                        </Text>
                    </View>
                
                
                <View>
                <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                    {count==1?
                        <TouchableOpacity disabled={toggleCheckBox==false?true:false} style={{ padding:5, borderWidth:2, borderColor:'#7C3532'}}>
                            <Text style={{color:'#7C3532', fontWeight:'bold'}}>-</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity disabled={toggleCheckBox==false?true:false} onPress={decrease} style={{ padding:5, borderWidth:2, borderColor:'#7C3532'}}>
                            <Text style={{color:'#7C3532', fontWeight:'bold'}}>-</Text>
                        </TouchableOpacity>
                    }
                    
                    <Text style={{padding:5, ...Colors.primText, ...Typography.HeadingBold4, width:30, justifyContent:'center' }}>
                        {count}
                    </Text>
                    
                    <TouchableOpacity onPress={increase} disabled={toggleCheckBox==false?true:false} style={{padding:5, borderWidth:2, borderColor:'#7C3532'}}>
                        <Text style={{color:'#7C3532', fontWeight:'bold'}}>+</Text>
                    </TouchableOpacity>
                </View>

                    <View style={{marginTop:20}}>
                        <TouchableOpacity onPress={deleteTrollyItem} style={{backgroundColor:'red', padding:5, borderRadius:5}}>
                            <Text style={{...Colors.whiteText, ...Typography.Heading4}}>Hapus Item</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                </View>

        </View>
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
export default TrollyItem