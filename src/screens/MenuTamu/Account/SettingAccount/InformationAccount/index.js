//This is an example code for Bottom Navigation//
import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  // Button,
  ScrollView,
  TextInput
} from 'react-native';
import {Button} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';


//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography, Layout, Buttons, InputStyle } from '../../../../../styles'
import ImagePicker from 'react-native-image-picker';
import firebase from '../../../../../../Database/firebaseDB'
import storage from '@react-native-firebase/storage';

const InformationAccount =({SignOut, navigation})=> {
  
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState(0)
  const [phone, setPhone] = useState('')
  const [myID, setMyID] = useState('');
  const [email, setEmail] = useState(''); 
  const [bornDate, setBornDate] = useState('');
  const [value, setValue] = useState('available'); 
  const [ImageSource, setImageSource] = useState(null);
  const [imageSourceURI, setImageSourceURI] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [editName, setEditName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editBornDate, setEditBornDate] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // const [editName, setEditName] = useState(false);

  useEffect(() => {  
    // GET UID
    const user = firebase.auth().currentUser.uid;
    console.log(user);
    setMyID(user)

    const ref = firebase.database().ref('user/buyer/'+user);
    ref.on("value", function(snapshot) {
        setUsername(snapshot.val().name);
        setAddress(snapshot.val().address);
        setEmail(snapshot.val().email);
        setPhone(snapshot.val().phone);
        setImageSourceURI(snapshot.val().profileImage);
        setBornDate(snapshot.val().bornDate);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); 
 
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
        upload(source)
      }
    });
  }
  
  const upload =(source) =>{
    setIsLoading(true);

    // IMAGE PART
    const { uri } = source;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef =  storage().ref('/').child('profile').child(myID).child(filename)
    const task = storageRef.putString(data, storage.StringFormat.DATA_URL);
    task.on('state_changed', taskSnapshot =>{
      taskSnapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(myID)
        
        firebase.database()
        .ref('/user/buyer/'+myID)
        .update({
          profileImage: downloadURL
        })
        .then(() => 
          clear()
        );      
      });
    })

    function clear(){
      // setProductName('');
      // setProductDescribe('');
      // setProductPrice(0);
      // setImageSource(null);
      // setproductImage('');
      setIsLoading(false)
      Alert.alert('Foto Berhasil Diupload')
    }
        
    // setIsLoading(false);
      }
    
    const editNameHandler=()=>{
      setEditName(!editName)
    }
    const saveNameHandler=()=>{
      setEditName(!editName)
      firebase.database()
        .ref('/user/buyer/'+myID)
        .update({
          name:username
        })
    }
    
    const editPhoneHandler=()=>{
      setEditPhone(!editPhone)
    }
    const savePhoneHandler=()=>{
      setEditPhone(!editPhone)
      firebase.database()
        .ref('/user/buyer/'+myID)
        .update({
          phone:phone
        })
    }
    
    const editAddressHandler=()=>{
      setEditAddress(!editAddress)
    }
    const saveAddressHandler=()=>{
      setEditAddress(!editAddress)
      firebase.database()
        .ref('/user/buyer/'+myID)
        .update({
          address:address
        })
    }
    
    const editBornDateHandler=()=>{
      setEditBornDate(!editBornDate)
    }
    const saveBornDateHandler=()=>{
      setEditBornDate(!editBornDate)
      firebase.database()
        .ref('/user/buyer/'+myID)
        .update({
          bornDate:date.toLocaleDateString()
        })
    }

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'Android');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    return (
      <>
       <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', elevation:5}}>
          <TouchableOpacity style={{...Colors.whiteBackground, ...Buttons.buttonBack, margin:10, marginTop:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('SettingAccount')}>
              <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
          <View>
          <Text style={{...Typography.textTitle, ...Colors.primText, marginBottom:-20}}>
            Data Diri
          </Text>
          </View>
      </View>

      <ScrollView style={{backgroundColor:'white'}}>

      <View style={{margin:10, alignItems:'center'}}>
            <TouchableOpacity onPress={selectPhotoTapped}>
                    <View style={styles.ImageContainer}>
                        {
                          imageSourceURI!==null?
                          <Image style={styles.ImageContainer} source={{uri:imageSourceURI}} />
                          :
                          ImageSource === null ? 
                          <View style={{height:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}><Icon name='camera' color='grey' size={50} /></View>
                            :
                          <TextInput placeholder='test'/>
                        }
                    </View>
                </TouchableOpacity>
        </View>


      <View style={[styles.scene, { backgroundColor: '#ffffff',height:'100%', alignItems:'center', padding:10 }]} >
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle, alignSelf:'center'}}>Data diri</Text>
        
        <View style={{ marginVertical:10,marginHorizontal:10}}>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Nama</Text>
          {editName==false?
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{username}</Text>
              <TouchableOpacity onPress={editNameHandler}>
                <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Edit</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <TextInput value={username} onChangeText={setUsername} style={{...Colors.whiteBackground, ...Typography.smallTitle}} style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, width:200, backgroundColor:'#F2F2F2'}}/>
              <TouchableOpacity onPress={saveNameHandler}>
                <Text style={{color:'green', ...Typography.extraSmallBoldTitle}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={editNameHandler}>
                <Text style={{color:'red', ...Typography.extraSmallBoldTitle}}>Batal</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />
        <View style={{ marginVertical:10,marginHorizontal:10}}>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Tanggal Lahir</Text>
          {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{bornDate}</Text>
          </View> */}
           {editBornDate==false?
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{bornDate}</Text>
              <TouchableOpacity onPress={editBornDateHandler}>
                <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Edit</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              {/* <TextInput value={bornDate} onChangeText={setBornDate} style={{...Colors.whiteBackground, ...Typography.smallTitle}} style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, width:200, backgroundColor:'#F2F2F2'}}/> */}
              <Button onPress={showDatepicker} style={{backgroundColor:'snow',width:200}}>
                                    <Text style={{...Colors.primText}}>
                                        {date.toLocaleDateString()}
                                    </Text>
              </Button>

              <TouchableOpacity onPress={saveBornDateHandler}>
                <Text style={{color:'green', ...Typography.extraSmallBoldTitle}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={editBornDateHandler}>
                <Text style={{color:'red', ...Typography.extraSmallBoldTitle}}>Batal</Text>
              </TouchableOpacity>
            </View>
          }
           {show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              />
          )}    
        </View>
        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />
        <View style={{ marginVertical:10,marginHorizontal:10}}>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Email</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{email}</Text>
                {/* <TouchableOpacity>
                  <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Edit</Text>
                </TouchableOpacity> */}
          </View>
        </View>
        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />
        <View style={{ marginVertical:10,marginHorizontal:10}}>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Nomor Ponsel</Text>
          {editPhone==false?
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{phone}</Text>
              <TouchableOpacity onPress={editPhoneHandler}>
                <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Edit</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <TextInput value={phone} onChangeText={setPhone} style={{...Colors.whiteBackground, ...Typography.smallTitle}} style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, width:200, backgroundColor:'#F2F2F2'}}/>
              <TouchableOpacity onPress={savePhoneHandler}>
                <Text style={{color:'green', ...Typography.extraSmallBoldTitle}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={editPhoneHandler}>
                <Text style={{color:'red', ...Typography.extraSmallBoldTitle}}>Batal</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />
        <View style={{ marginVertical:10,marginHorizontal:10}}>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Alamat</Text>
          {editAddress==false?
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>{address}</Text>
              <TouchableOpacity onPress={editAddressHandler}>
                <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle}}>Edit</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <TextInput value={address} onChangeText={setAddress} style={{...Colors.whiteBackground, ...Typography.smallTitle}} style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, width:200, backgroundColor:'#F2F2F2'}}/>
              <TouchableOpacity onPress={saveAddressHandler}>
                <Text style={{color:'green', ...Typography.extraSmallBoldTitle}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={editAddressHandler}>
                <Text style={{color:'red', ...Typography.extraSmallBoldTitle}}>Batal</Text>
              </TouchableOpacity>
            </View>
          }
        </View>

      </View>
      </View>
     
   
    </ScrollView>
    </>
    );
  }
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
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
    width:100,
    height:100,
    borderRadius:100,
    backgroundColor:'silver',
    flexDirection:'column',
    alignItems:'center',
  }
});

export default InformationAccount