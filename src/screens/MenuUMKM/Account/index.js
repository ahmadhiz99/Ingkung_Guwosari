import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Alert,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import firebase from '../../.../../../../Database/firebaseDB';

export default class Account extends React.Component {
  constructor(props)  {
    super(props)
    this.state={
      name:'unknown',
      profileImage:''
    }
  }

  componentDidMount(){
    const user = firebase.auth().currentUser.uid;
    firebase.database().ref('user/seller/'+user).on('value', snapshot => {  
      if (snapshot.val() != null) {  
          const name =snapshot.val().name
          const profileImage =snapshot.val().profileImage
          this.setState({name:name, profileImage:profileImage})          
      }  else{
        null
      }
  })  

  }

  
  render() {

    const logout =()=>{
      firebase.auth().signOut().then(function() {
        console.log('Berhasil Keluar');
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.log('error');
      });
      
    }

    const { navigate } = this.props.navigation;
   
    return (
      <View style={{backgroundColor:'white', height:'100%'}}>
        <View style={{backgroundColor:'white', height:70, padding:10, elevation:5, justifyContent:'center'}}>
          <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Akun</Text>
        </View>
        <ScrollView>
        <View style={[{ backgroundColor: 'white',height:'100%', alignItems:'center', padding:10 }]} >
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%', backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('AdminSettingAccount')} style={{flexDirection:'row', alignItems:'center'}}>
          {
            this.state.profileImage!==''?
              <Image 
              source={{uri:this.state.profileImage}}
              style={{borderRadius:100, width:50, height:50, marginRight:10}}
              />
            :
              // <Image 
              // source={require('../../../assets/images/ingkung.png')}
              // style={{borderRadius:100, width:50, height:50, marginRight:10}}
              // />
              <Icon name='user-circle' size={50} style={{borderRadius:100, width:50, height:50, marginRight:10,...Colors.textSilver}} />
          }
          
          <Text style={{...Colors.textSilver, ...Typography.extraSmallBoldTitle}}>
          {this.state.name}  
          </Text>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle, flex:1, textAlign:'right',paddingRight:10 }}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderRadius:5, borderTopWidth:3, borderTopColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('AdminChangePassword')}  style={{flexDirection:'row', margin:10, paddingVertical:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Ganti Kata Sandi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View>
      
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Pengaturan Toko</Text>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShopStatus')}  style={{flexDirection:'row', margin:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Status Toko</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

        {/* <View style={{borderRadius:5, borderTopWidth:3, borderTopColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')}  style={{flexDirection:'row', margin:10, alignItems:'center', paddingVertical:10}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Ganti Kata Sandi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity> */}
      </View>
        
    </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    ...Colors.whiteBackground
  },
  title:{
    ...Typography.extraSmallBoldTitle,
    alignSelf:'flex-start',
    flex:2,
    alignSelf:'center',
    marginTop:10,
    alignSelf:'flex-start'
},
button:{
    alignSelf:'flex-end',
    ...Colors.primary,
    flex:0.8,
    ...Buttons.smallRounded,
    margin:10,
    height:20,
    justifyContent:'center',
    alignSelf:'center'
},
});