import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  ImageBackground,
  Button,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {RadioButton} from 'react-native-paper'
import ImagePicker from 'react-native-image-picker';
import firebase from '../../../../Database/firebaseDB'
import storage from '@react-native-firebase/storage';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

 import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'

const FirstRoute = ({screenName}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({})  
  const [myId, setMyId] = useState('')  

  useEffect(() => {  
  // GET UID
  const user = firebase.auth().currentUser.uid;
  console.log(user);
  setMyId(user)
  
  firebase
  .database()
  .ref('activity/')
  // .orderByChild('productOwner')
  // .equalTo(user)
  .on('value', snapshot => {  
      console.log();
          if (snapshot.val() != null) {  
              setData({  
                  ...snapshot.val()  
              });  
              console.log(data);
          }  else{
              setData({});
          }
      })  
      
}, [])  
  return(

  <ScrollView style={styles2.container}>
      
      {
          Object.keys(data).map((key) => (
              <View key={key} style={{alignItems:'center'}}>
                  <TouchableOpacity 
                  onPress={()=>navigation.navigate('ActivityAdminDetail',{productKey:key})} 
                  style={styles2.itemContainer}>
                      <Image style={styles2.image} source={{uri:data[key].productImage}} />
                      <View  style={styles2.describe}>
                          <Text style={{height:30,...Typography.HeadingBold5, ...Colors.primText}}>
                              {data[key].productOwnerUsername}
                          </Text>
                          <Text style={styles2.detail}>
                              {data[key].productDescribe}
                          </Text>
                      </View>
                  </TouchableOpacity>
              </View>
          ))
      }
 
 </ScrollView>
  );
  }
 
  const styles2 = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    headerText:{
        ...Colors.primText,
        ...Typography.smallBoldTitle,
    },
    itemContainer:{
        width:'95%',
        height:400,
        elevation:3,
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5,

    },
    image:{
        width:'100%',
        height:'100%',
        flex:3,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    describe:{
        flex:1,
        margin:10,
    },
    title:{
        ...Colors.primText,
        ...Typography.extraSmallBoldTitle
    },
    detail:{
        height:50,
        ...Typography.Heading5,
        ...Colors.textSilver
    },
    buttonText:{
        ...Colors.whiteText,
        ...Typography.Heading5
    },
    buttonBack:{
        ...Colors.whiteBackground,
        ...Buttons.buttonBack,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        elevation:5
    },
})
  // 

const SecondRoute = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productDescribe, setProductDescribe] = useState('')
  const [productImage, setproductImage] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [productCategory, setProductCategory] = useState('food'); //Category
  const [value, setValue] = useState('available'); //Stok
  const [ImageSource, setImageSource] = useState(null);
  const [data, setData] = useState(null);
  const [productOwnerUsername, setProductOwnerUsername] = useState('');
  const [productOwnerImage, setProductOwnerImage] = useState('');
  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {  
   // GET UID
   const user = firebase.auth().currentUser;
   console.log(user);
   setProductOwner(user.uid)

   firebase
   .database()
   .ref('user/seller/'+user.uid)
   .on('value', snapshot => {  
     if (snapshot.val() != null) {  
        setProductOwnerUsername(snapshot.val().name)  
        setProductOwnerImage(snapshot.val().profileImage)  
    }else{
      null
    }
       })  

}, [])  


  const selectPhotoTapped=()=> {
    const options = {
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
 
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = { uri: response.uri };
        setImageSource(source);
        setData('data:image/jpeg;base64,'+ response.data)
      }
    });
  }
  
  const upload =() =>{
    setIsLoading(true);

    // GET UID
    const user = firebase.auth().currentUser;
    console.log(user);
    setProductOwner(user.uid)
    const path=''
    
    
    const db = firebase.database().ref('activity/');
    const productID= db.push({
      productDescribe:productDescribe,
      productImage:productImage,
      productOwner:productOwner,
      productOwnerUsername:productOwnerUsername,
      productOwnerImage:productOwnerImage,
    }).getKey();
    
    // IMAGE PART
    const { uri } = ImageSource;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef =  storage().ref('/').child('activity').child(productOwner).child(filename)
    const task = storageRef.putString(data, storage.StringFormat.DATA_URL);
    task.on('state_changed', taskSnapshot =>{
      taskSnapshot.ref.getDownloadURL().then(downloadURL => {
    
        firebase.database()
        .ref('/activity/'+productID)
        .update({
          productImage: downloadURL
        })
        .then(() => 
          clear()
        );
                
      });
    })

    function clear(){
      setProductDescribe('');
      setImageSource(null);
      setproductImage('');
      setIsLoading(false)
      Alert.alert('Data Berhasil Ditambahkan')
      // setProductName('');
      // setProductPrice(0);
    }
    // setIsLoading(false);    
  }

  return(
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} >

<>      
    <ScrollView style={{backgroundColor:'white', padding:10}}>        
  
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', margin:10}}>
          <TouchableOpacity title="LoginScreen" style={{backgroundColor:'white', borderRadius:5, elevation:5}}>
            <Text style={{ margin:10,...Colors.primText, ...Typography.HeadingBold4}}>Ambil Dari Galeri Toko</Text>
          </TouchableOpacity>
        </View>

        <View style={{margin:10}}>
            <Text style={styles3.labelInput}>Unggah Foto Produk</Text>
            <TouchableOpacity onPress={selectPhotoTapped}>
                    <View style={styles3.ImageContainer}>
                        {ImageSource === null ? 
                        <View style={{height:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}><Icon name='camera' color='grey' size={50} /></View>
                        :
                        <Image style={styles3.ImageContainer} source={ImageSource} />}
                    </View>
                </TouchableOpacity>

        </View>

        <View style={{margin:10}}>
            <Text style={styles3.labelInput}>Deskripsi</Text>
            <TextInput placeholder="Deskripsi" 
            value={productDescribe}
            onChangeText={setProductDescribe}
              multiline = {true}
              numberOfLines = {10}
              style={{
                  borderWidth:2,
                  borderRadius:10,
                  textAlignVertical:'top',
                  borderColor:'#7C3532',
                  height:100,
                  padding:10,
                  ...Typography.textNormal,
                  ...Colors.primText,}} 
                />
        </View>

        <View style={{width:'100%', alignItems:'flex-end', marginBottom:20}}>
          {
            (ImageSource&&productDescribe!=='')?
            <TouchableOpacity onPress={upload} style={{...Colors.primary, padding:10, borderRadius:10}}>
                <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                    Terbitkan
                </Text>
            </TouchableOpacity>
            :
            <>
              <Text style={styles3.labelInput}>Semua data wajib diisi</Text>
              <TouchableOpacity disabled={true} style={{...Colors.silver, padding:10, borderRadius:10}}>
                  <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                      Terbitkan
                  </Text>
              </TouchableOpacity>
            </>
          }
        </View>

    </ScrollView>
        {
            isLoading==true?
                    <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
            :
            null
        }
    </>

  </View>
  )
}

const styles3 = StyleSheet.create({
  buttonBack:{
    ...Colors.whiteBackground,
    ...Buttons.buttonBack,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    elevation:5
},
labelInput:{
    ...Typography.textNormal,
    ...Colors.primText,
},
inputText:{
    ...Typography.textNormal,
    ...Colors.primText,
    ...InputStyle.primInputText,
},
ImageContainer:{
    width:'100%',
    height:200,
    backgroundColor:'silver',
    borderRadius:5,
    flexDirection:'column',
    // alignContent:'flex-end',
    // alignSelf:'center',
    alignItems:'center',
    // paddingLeft:'40%'
  }
});
 
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const Fourth = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function ActivityScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // { key: 'diikuti', title: 'Di ikuti' },
    { key: 'umum', title: 'Umum' },
    // { key: 'terbaru', title: 'Terbaru' },
    // { key: 'vidio', title: 'Vidio' },
    { key: 'unggah', title: 'Unggah' },
  ]);  
  
  const renderScene = SceneMap({
    umum: FirstRoute,
    unggah: SecondRoute,
    // diikuti: FirstRoute,
    // umum: SecondRoute,
    // terbaru: ThirdRoute,
    // vidio: Fourth,
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
      <Text style={{flex:5, ...Typography.HeadingBold2,...Colors.primText}}>Aktivitas</Text>
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