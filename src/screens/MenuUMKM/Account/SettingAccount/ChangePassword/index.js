import React,{useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Alert
} from 'react-native';
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../../styles'
import firebase from '../../../../../../Database/firebaseDB'
const ChangePassword =({SignOut, navigation})=> {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [passwordConfirm, setPasswordConfirm] =useState('');

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  
  const showPasswordHandler=()=>{
    setShowPassword(!showPassword)
  }

  const showPasswordConfirmHandler=()=>{
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const reauthenticate = (password) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  }

  const changePassword = (password, passwordConfirm) => {
    reauthenticate(password).then(() => {
      const user = firebase.auth().currentUser;
      user.updatePassword(passwordConfirm).then(() => {
        console.log("Password updated!");               
      }).catch((error) => { Alert.alert('Pengubahan Katasandi Gagal, Pastikan Katasandi Benar') });
    }).catch((error) => { Alert.alert('Pengubahan Katasandi Gagal, Pastikan Katasandi Benar') });
  }

  const changePass=()=>{
    reauthenticate(password)
    changePassword(password, passwordConfirm)
  }
  
  const ChangePasswordHandler=()=>{
    // const user = firebase.auth().currentUser;
    // user.updatePassword(passwordConfirm).then(() => {
    //   console.log("Password updated!");
    // }).catch((error) => { console.log(error); });

    console.log(password);
    console.log(passwordConfirm);

    Alert.alert(
      'Anda Yakin Ingin Mengubah?',
      '',
      [
          {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
          },
          { 
              text: 'Ubah', 
              onPress: () =>changePass()
          }
      ],
      { cancelable: false }
      );
    // firebase.auth().sendPasswordResetEmail(email)

  }

    return (
      <>
       <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', elevation:5}}>
          <TouchableOpacity style={{...Colors.whiteBackground, ...Buttons.buttonBack, margin:10, marginTop:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('HomeAdminTabs')}>
              <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
          <View>
          <Text style={{...Typography.smallBoldTitle, ...Colors.primText, marginBottom:-20}}>
            Tentang Aplikasi
          </Text>
          </View>
      </View>

      <View style={{ backgroundColor: '#ffffff',height:'100%', alignItems:'center', padding:10 }} >
            <Image source={require('../../../../../assets/images/changePassword/change_password.png')} style={{width:100,height:100, margin:10}}/>
            <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
            <Text style={{...Colors.primText, ...Typography.smallBoldTitle, alignSelf:'center'}}>Ubah Katasandi</Text>

           <View style={{paddingBottom:30, alignItems:'center'}}>
           <View style={{marginTop:20}}>
                            <Text style={{...Typography.textNormal, ...Colors.primText,}}>Password Lama</Text>
                            <View style={{flexDirection:'row', width:'100%'}}>
                                <TextInput onChangeText={setPassword} secureTextEntry={showPassword==true?false:true} placeholder="**********" style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, flex:0.9}} />
                                    {showPassword==true?
                                        <TouchableOpacity onPress={showPasswordHandler}>
                                            <Icon name='eye' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={showPasswordHandler}>
                                            <Icon name='eye-slash' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                    }
                            </View>
              </View>
               <View style={{marginTop:20}}>
                            <Text style={{...Typography.textNormal, ...Colors.primText,}}>Password Baru</Text>
                            <View style={{flexDirection:'row', width:'100%'}}>
                                <TextInput onChangeText={setPasswordConfirm} secureTextEntry={showPasswordConfirm==true?false:true} placeholder="**********" style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, flex:0.9}} />
                                    {showPasswordConfirm==true?
                                        <TouchableOpacity onPress={showPasswordConfirmHandler}>
                                            <Icon name='eye' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={showPasswordConfirmHandler}>
                                            <Icon name='eye-slash' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                    }
                              </View>
              </View>

             {(password=='' || (passwordConfirm!=='' && passwordConfirm.length>7))?
                <TouchableOpacity onPress={ChangePasswordHandler} style={{...Colors.primary, padding:10, borderRadius:10, marginTop:20}}>
                <Text style={{...Colors.whiteText, ...Typography.Heading4}}>
                  Ubah Katasandi
                </Text>
                </TouchableOpacity>
            :
              <>
                <Text style={{...Colors.textSilver, ...Typography.Heading4}}>
                  Kata Sandi Minimal 8 Karakter
                </Text>
                <TouchableOpacity onPress={ChangePasswordHandler} style={{...Colors.silver, padding:10, borderRadius:10, marginTop:20}}>
                <Text style={{...Colors.whiteText, ...Typography.Heading4}}>
                  Ubah Katasandi
                </Text>
                </TouchableOpacity>
              </>
             }
              
           </View>
            
      </View>
    </View>


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
});

export default ChangePassword