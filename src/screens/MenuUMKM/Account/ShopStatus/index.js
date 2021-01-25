//This is an example code for Bottom Navigation//
import React,{useState,useEffect} from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Modal,
  Alert,
  Switch,
  ViewPagerAndroidBase
} from 'react-native';
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'

const ShopStatus =({SignOut, navigation})=> {
    const [modalVisible, setModalVisible] = useState(false);
    const [myID, setMyID] = useState(false);
    
    const [statusTemp, setStatusTemp] = useState(false);

const toggleModal=(visible)=> {
    setModalVisible(visible);
    }

 const [isEnabled, setIsEnabled] = useState(false);

 const toggleSwitch = () => setIsEnabled(previousState => !previousState);

 const saveStatusTemp = () => setStatusTemp(isEnabled);

 const cancelStatus = () => setIsEnabled(statusTemp);

 const saveStatus=()=>{
     firebase
     .database()
     .ref('shop/status/'+myID)
     .set({
         currentStatus:isEnabled
     })
 }

 useEffect(() => {  
    // GET UID
    const user = firebase.auth().currentUser.uid;
    console.log(user);
    setMyID(user)

    firebase.database().ref('shop/status/'+user).on('value', snapshot => {  
      if (snapshot.val() != null) {  
          const status =snapshot.val().currentStatus
          setIsEnabled(status)       
      }  else{
        null
      }
  })  
 
 }, [])  

  return (
    <View>
     <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', elevation:5}}>
        <TouchableOpacity style={{...Colors.whiteBackground, ...Buttons.buttonBack, margin:10, marginTop:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('AdminSettingAccount')}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
        </TouchableOpacity>
        <View>
        <Text style={{...Typography.smallBoldTitle, ...Colors.primText, marginBottom:-20}}>
          Pengaturan Toko
        </Text>
        </View>
    </View>

    <View style={{ width:'100%',backgroundColor:'white', padding:10}}>
    <View style={{ borderRadius:10, padding:10,elevation:1, }}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Status Toko</Text>

        <TouchableOpacity onPress={() => {setModalVisible(!modalVisible), saveStatusTemp()}} style={{flexDirection:'row', margin:10, alignItems:'center'}}>
            <Text style={{flex:6,...Colors.textSilver, ...Typography.smallTitle}}>Sedang</Text>
            <View style={{flex:2}}>
                        {isEnabled==true?
                            <Text style={{...Colors.primText, ...Typography.HeadingBold4}}>
                             BUKA
                            </Text> 
                            :
                            <Text style={{...Colors.textSilver, ...Typography.HeadingBold4}}>
                             TUTUP
                            </Text> 
                        }
                        </View>

            <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

      </View>

    <View style={{ backgroundColor: '#ffffff',height:'100%', alignItems:'center', padding:10, justifyContent:'center' }} >
     
      <Modal animationType = {"none"} transparent = {true}
               visible = {modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style={{flex:1,justifyContent:'flex-end'}}>
               <View style={{flex:1,justifyContent:'flex-end', backgroundColor:'black', opacity:0.2,}} />
                <View style={{paddingVertical:30, paddingHorizontal:10, ...Colors.whiteBackground}}>
                    <Text style={{...Typography.smallBoldTitle, ...Colors.primText}}>
                    Status Toko
                    </Text>
                    
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:4}}>
                                <Text style={{...Colors.textSilver, ...Typography.Heading4, marginRight:20}}>
                                Atur status toko anda apakah buka atau sudah tutup
                                </Text> 
                        </View>

                        <View style={{flex:1}}>
                        {isEnabled==true?
                            <Text style={{...Colors.primText, ...Typography.HeadingBold4}}>
                             BUKA
                            </Text> 
                            :
                            <Text style={{...Colors.textSilver, ...Typography.HeadingBold4}}>
                             TUTUP
                            </Text> 
                        }
                        </View>

                        <View style={{flex:1}}>
                            <Switch
                                trackColor={{ false: "#ECECEC", true: "#7C3532" }}
                                thumbColor={isEnabled ? "#ffffff" : "#767676"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                />
                        </View>

                    </View>
                </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress = {() => {
                            toggleModal(!modalVisible),saveStatus()}}
                            style={{flex:0.5, ...Colors.primary, paddingVertical:15}}
                            >
                            <Text style={{...Colors.whiteText, ...Typography.HeadingBold4, textAlign:'center'}}>
                                SIMPAN
                            </Text> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => {
                            toggleModal(!modalVisible), cancelStatus()}}
                            style={{flex:0.5, backgroundColor:'#ECECEC', paddingVertical:15}}
                            >
                            <Text style={{color:'#767676', ...Typography.HeadingBold4, textAlign:'center'}}>
                                BATAL
                            </Text> 
                        </TouchableOpacity>
                    </View>
               </View>
        </Modal>

  </View>
  </View>

  </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ShopStatus