//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button
} from 'react-native';
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../../styles'

const TermsConditions =({SignOut, navigation})=> {
  
  //Setting Screen to show in Setting Option
  return (
    <>
     <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', elevation:5}}>
        <TouchableOpacity style={{...Colors.whiteBackground, ...Buttons.buttonBack, margin:10, marginTop:15, alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('AdminSettingAccount')}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
        </TouchableOpacity>
        <View>
        <Text style={{...Typography.smallBoldTitle, ...Colors.primText, marginBottom:-20}}>
          Syarat dan Ketentuan
        </Text>
        </View>
    </View>

    <View style={{ backgroundColor: '#ffffff',height:'100%', alignItems:'center', padding:10, justifyContent:'center' }} >
      <View style={{ alignItems:'center', marginTop:-200 }}>
          <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Syarat dan Ketentuan</Text>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle, textAlign:'center'}}>
          Buatlah kata sandi yang memiliki kemanan yang kuat dengan menggunakan kombinasi huruf, angka, dan simbol khusus.
          </Text>      
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

export default TermsConditions