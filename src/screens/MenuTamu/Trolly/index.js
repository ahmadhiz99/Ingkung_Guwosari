import React,{useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import Header from './header'
import firebase from '../../../../Database/firebaseDB'
import TrollyItem from './TrollyItem/'

const Trolly =({navigation})=>{

      // ceckbox
      const [toggleCheckBox, setToggleCheckBox] = useState(false);
      const [option1, setOption1] = useState(true); // const [maleCheck, setMaleCheck) = useState(true);

       //    Count
       const [count, setCount] = useState(0)

       // Data from database
       const [data, setData] = useState(null);

       const [UID, setUID] = useState('')
       const [isLoading, setIsLoading] = useState(false)

       const [result, setResult] = useState()

       const [collection, setCollection] =useState({})

       const [checkoutCount, setCheckoutCount] =useState(0)


   useEffect(() => {  
       setIsLoading(true)
       

       const getUIDTemp = (firebase.auth().currentUser.uid);
       setUID(getUIDTemp);
      
       //Remove data checkout
        firebase.database().ref('checkout/'+getUIDTemp).remove()
      
        //trolly
        const refTrolly = firebase.database().ref('trolly/'+getUIDTemp+'/trollyList')
        refTrolly.on("value", function(snapshot) {
         const myEvent = snapshot.val();
         console.log("==============================")
         console.log(myEvent)
         
         setData({  
             ...snapshot.val()  
         });  

         setIsLoading(false)
        });
 
        
        //checkout count
        const refChekout = firebase.database().ref('checkout/'+getUIDTemp+'/checkoutCount/')
        refChekout.on("value", function(snapshot) {
          const myEvent = snapshot.val();
          if(myEvent!==null){
            console.log('========>',myEvent);
            console.log('========>',myEvent);
              setCheckoutCount(myEvent.checkoutCount)
            setIsLoading(false)
        }else{
            setCheckoutCount(0)
        }
        });

   }, [])  


   const listening =()=>{
        //  //checkout count
        //  const refChekout = firebase.database().ref('checkout/'+UID+'/checkoutCount/')
        //  refChekout.on("value", function(snapshot) {
        //    const myEvent = snapshot.val();
        //  });
   }
   
    return(
    <>
        <View style={{ backgroundColor: '#ffffff',height:'100%', alignItems:'center' }} > 
       
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} >
               {
                   data==null?
                   <TrollyItem  />
                   :
                    Object.keys(data).map((key) => (
                    <View key={key}>
                    <TrollyItem 
                        productKey={data[key].productKey} 
                        productName={data[key].productName} 
                        productPrice={data[key].productPrice} 
                        productImage={data[key].productImage} 
                        productQuantity={data[key].productQuantity} 
                        productDescribe={data[key].productDescribe} 
                        productOwner={data[key].productOwner} 

                        OnListen={listening}
                    />
                    </View>
                ))
                }
            </ScrollView>

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderTopWidth:2, marginTop:20, paddingVertical:10, borderColor:'silver'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{marginHorizontal:10, ...Colors.textSilver, ...Typography.Heading5}}>
                            Total Harga
                        </Text>
                        <Text style={{marginHorizontal:10, ...Colors.primText, ...Typography.extraSmallBoldTitle}}>
                            {checkoutCount}
                        </Text>
                    </View>
                    {checkoutCount==0?
                        <TouchableOpacity style={{borderRadius:10, ...Colors.silver, padding:10}}>
                            <Text style={{marginHorizontal:10, ...Colors.whiteText, ...Typography.Heading5}}>Checkout</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={()=>navigation.navigate('Checkout')} style={{borderRadius:10, ...Colors.primLight, padding:10}}>
                            <Text style={{marginHorizontal:10, ...Colors.whiteText, ...Typography.Heading5}}>Checkout</Text>
                        </TouchableOpacity>
                    
                    }
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
export default Trolly