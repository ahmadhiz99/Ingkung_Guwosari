import React,{useState,useEffect} from 'react';
import { 
  ScrollView,  TextInput ,Image ,View, StyleSheet, Dimensions, Text, TouchableOpacity,
  RefreshControl

} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../../Database/firebaseDB'

import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'

 const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const FirstRoute = ({screenName}) => {
  const navigation = useNavigation();

  return(
    <ScrollView style={{padding:10, backgroundColor:'white'}}>
      <Message screenName='MessageItem' />
    </ScrollView>
  );
}
 
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff', alignItems:'center', padding:10 }]} >
  <Order orderStatus='waiting' />
</View>
);
 
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff', alignItems:'center', padding:10 }]} >
    <Order orderStatus='success' />
</View>
);
 
const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff', alignItems:'center', padding:10 }]} >
    <Order orderStatus='cancel' />
</View>
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function MessageScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'chat', title: 'Obrolan' },
    { key: 'wait', title: 'Tunggu' },
    { key: 'success', title: 'Berhasil' },
    { key: 'cancel', title: 'Batal' },
  ]);
  
  
  const renderScene = SceneMap({
    chat: FirstRoute,
    wait: SecondRoute,
    success: ThirdRoute,
    cancel: FourthRoute,
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
    <View style={{flexDirection:'row',padding:10,justifyContent:'center',...Colors.whiteBackground}}> 
      <Text style={{flex:5, ...Typography.HeadingBold2,...Colors.primText}}>Pesan</Text>
      <View style={{flex:1,alignSelf:'center'}}>
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


// First route
const Message = ({screenName})=>{
  const navigation = useNavigation();
      
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

          //Add to Seller Message count
          const refChekout = firebase.database().ref('MessageBuyerRoute/'+getUIDTemp+'/seller/')
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
  
  
      return(
      
              <ScrollView style={{...Colors.whiteBackground, width:'100%'}}>
  
              { data==null?
                  <Text style={{...Typography.Heading4, ...Colors.textSilver, alignSelf:'center', marginTop:20}}>Belum Pesan Masuk</Text>
                      :
                  Object.keys(data).map((key) => (
                      <TouchableOpacity onPress={()=>navigation.navigate(screenName, {productOwner:data[key].sellerUserID, profileImage:data[key].profileImage})} 
                        style={{ width:'100%', marginVertical:5, paddingVertical:10, elevation:1, borderRadius:5}}>
              
                              <View style={{flexDirection:'row',}}>
                                
                                 {data[key].profileImage!==''?
                                    <Image 
                                    source={{uri:data[key].profileImage}}
                                    style={{marginHorizontal:10, borderRadius:10, width:50, height:50, borderRadius:50}} />
                                    :
                                  
                                       <View style={{marginHorizontal:10, borderRadius:10, width:50, height:50, borderRadius:50, ...Colors.silver, alignItems:'center', justifyContent:'center'}}>
                                         <Icon name='user' size={24} style={{...Colors.whiteText}} />
                                        </View>
                                      }
                      
                                  <View style={{width:200, justifyContent:'center'}}>
                                      <Text style={{...Typography.HeadingBold4, ...Colors.primText}}>
                                      {data[key].usernameOwner} 
                                      </Text>
                                    
                                      <Text style={{...Typography.Heading4, ...Colors.textSilver}}>
                                      {data[key].message} 
                                      </Text>
                                      
                                  </View>
                              </View>
                          </TouchableOpacity>
                     
                     ))        
                  }
                  
              </ScrollView>
      )
  }
  
  const Order = ({navigation, orderStatus})=>{
    
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
        const refChekout = firebase.database().ref('buyerHistory/'+getUIDTemp+'/completedList/').orderByChild('orderStatus').equalTo(orderStatus)
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

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);

      wait(2000).then(() => setRefreshing(false));
    }, []);

    return(
            <ScrollView style={{...Colors.whiteBackground, width:'100%'}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            { data==null?
                <Text style={{...Colors.textSilver, ...Typography.HeadingBold3, alignSelf:'center'}}>Belum Ada Barang</Text>
                    :
                Object.keys(data).map((key) => (
                    <TouchableOpacity  style={{ width:'100%', marginVertical:5, paddingVertical:10, elevation:2, borderRadius:5}}>
                            <View style={{padding:10, flexDirection:'row', alignItems:'center'}}>
                                    {
                                      orderStatus=='waiting'?
                                      <View style={{width:30,height:30,borderRadius:30, ...Colors.primary, alignItems:'center', justifyContent:'center'}}>
                                        <Icon name='hourglass-start' size={17} style={{...Colors.whiteText}} />
                                      </View>
                                      :
                                        orderStatus=='success'?
                                            <View style={{width:30,height:30,borderRadius:30, backgroundColor:'green', alignItems:'center', justifyContent:'center'}}>
                                              <Icon name='check-circle-o' size={17} style={{...Colors.whiteText}} />
                                            </View>
                                          :
                                            <View style={{width:30,height:30,borderRadius:30, backgroundColor:'red', alignItems:'center', justifyContent:'center'}}>
                                              <Icon name='times-circle-o' size={17} style={{...Colors.whiteText}} />
                                            </View>
                                    }
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
