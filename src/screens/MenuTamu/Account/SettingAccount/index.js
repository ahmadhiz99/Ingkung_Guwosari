//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
  BackHandler 
} from 'react-native';
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'
const SettingAccount =({OnSignOut, navigation})=> {
  
  const exit =()=>{
    // navigation.navigate('LoginScreen')
    BackHandler.exitApp();
    firebase.auth().signOut()
  }
  const SignOutHandler=({SignOut})=>{
    Alert.alert(
      'Anda Yakin Ingin Keluar?',
      '',
      [
          {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
          },
          { 
              text: 'Keluar', 
              onPress: () =>exit()

          }
      ],
      { cancelable: false }
      );
    


  }
  //Setting Screen to show in Setting Option
    return (
      <>
       <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', elevation:5}}>
          <TouchableOpacity style={{...Colors.whiteBackground, ...Buttons.buttonBack, margin:10, marginTop:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('HomeTabs')}>
              <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
          <View>
          <Text style={{...Typography.textTitle, ...Colors.primText, marginBottom:-20}}>
            Akun
          </Text>
          </View>
      </View>

      <View style={[styles.scene, { backgroundColor: '#ffffff',height:'100%', alignItems:'center', padding:10 }]} >
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Akun</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('InformationAccount')} style={{flexDirection:'row', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Informasi Akun</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View>
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
          
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Lainnya    </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AboutApplication')}   style={{flexDirection:'row', margin:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Tentang Aplikasi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>navigation.navigate('PolicyPrivacy')} style={{flexDirection:'row', marginTop:20, marginBottom:10, marginHorizontal:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Kebijakan dan Privasi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

        <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>navigation.navigate('TermsConditions')} style={{flexDirection:'row', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Syarat dan Ketentuan</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View>
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <TouchableOpacity onPress={SignOutHandler} title="Sign Out"  style={{flexDirection:'row', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Keluar</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
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

export default SettingAccount