import React,{useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'


const Order = ({navigation})=>{
    
    const [data, setData] = useState(null);
    const [UID, setUID] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [checkoutCount, setCheckoutCount] = useState(0)

    const [isFinish, setIsFinish] =useState(false)

    useEffect(() => {  

        const today = new Date();
        const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        console.log(date);

        const getUIDTemp = (firebase.auth().currentUser.uid);
        setUID(getUIDTemp);
        console.log('========>',getUIDTemp);
        
        //checkout count
        const refChekout = firebase.database().ref('sellerTrolly/'+getUIDTemp+'/waitingList/')
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
    
            <ScrollView style={{...Colors.whiteBackground, width:'100%'}}>

            { data==null?
                <Text>Belum Ada Barang</Text>
                    :
                Object.keys(data).map((key) => (
                    <TouchableOpacity  style={{ width:'100%', marginVertical:5, paddingVertical:10, elevation:2, borderRadius:5}}>
                            <View style={{padding:10, flexDirection:'row', alignItems:'center'}}>
                                <View style={{width:30,height:30,borderRadius:30, ...Colors.primary, alignItems:'center', justifyContent:'center'}}>
                                    <Icon name='hourglass-start' size={17} style={{...Colors.whiteText}} />
                                </View>
                                <View style={{ marginHorizontal:10}}>
                                <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>Pesanan Pelanggan Sedang di Proses</Text>
                                    <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                                        {data[key].orderTime} 
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',}}>
                                <Image source={{uri:data[key].productImage }}
                                    style={{marginHorizontal:10, borderRadius:10, width:100, height:80}} />
                    
                                <View style={{width:200}}>
                                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                                    {data[key].productName} 
                                    </Text>
                                  
                                    <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                                    {data[key].productDescribe} 
                                    </Text>
                                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                                        Harga: {data[key].productPrice} 
                                    </Text>
                                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                                         Kuantitas: {data[key].productQuantity} 
                                    </Text>
                                    <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                                        Total: {data[key].productQuantity * data[key].productPrice} 
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                   
                   ))        
                }
                
            </ScrollView>
    )
}

// export default Order


const CheckoutItem = ({onFinish,navigation,userOrderID ,productKey,productName, productPrice, productImage, productQuantity,  productDescribe, productOwner })=>{

    
        const [UID, setUID] = useState('')
        const [isLoading, setIsLoading] = useState('')
        const [checkoutCount, setCheckoutCount] = useState(0)

    return(
    <>
                               
           
        {
            isLoading==true?
            <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
            :
            null
        }
      </>
    )
}



import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

const FirstRoute = ({screenName}) => {
  const navigation = useNavigation();

  return(
  <View style={[styles.scene, { backgroundColor: '#ffffff', alignItems:'center', padding:10 }]} >
    <Order />
  </View>
  );
  }
 

  // 

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const Fourth = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 

export default function TabViews({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'new', title: 'Baru' },
    { key: 'waiting', title: 'Proses' },
    { key: 'completed', title: 'Selesai' },
    { key: 'cancel', title: 'Batal' },
  ]);  
  
  const renderScene = SceneMap({
    new: FirstRoute,
    waiting: SecondRoute,
    completed: ThirdRoute,
    cancel: Fourth,
  });
 
  const renderTabBars = props => (
    <TabBar
      {...props}
      indicatorStyle={{ ...Colors.primary }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ ...Colors.primText, ...Typography.Heading4 }}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <>
    <View style={{flexDirection:'row',...Colors.whiteBackground}}> 
        <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10,}}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeAdminTabs')}
            title="LoginScreen" style={{
                ...Colors.whiteBackground,
                ...Buttons.buttonBack,
                margin:10,
                justifyContent:'center',
                alignItems:'center',
                elevation:5}}>
                <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
            </TouchableOpacity>
            <Text style={{ margin:10,...Colors.primText, ...Typography.HeadingBold3}}>Daftar Pesanan</Text>
        </View>
    </View>

    <TabView
        renderTabBar={renderTabBars}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
    />
    </>
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
