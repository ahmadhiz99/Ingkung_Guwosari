//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
//import all the basic component we have used
import Icon from 'react-native-vector-icons/FontAwesome'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import firebase from '../../../../Database/firebaseDB'
export default class AccountScreen extends React.Component {
  constructor(props)  {
    super(props)
    this.state={
      name:'unknown',
      profileImage:''
    }
  }
  
  componentDidMount(){
    const user = firebase.auth().currentUser.uid;
    firebase.database().ref('user/buyer/'+user).on('value', snapshot => {  
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
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: 'white',height:'100%', alignItems:'center', padding:10 }]} >
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Akun</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')} style={{flexDirection:'row', alignItems:'center'}}>
          <Image 
            source={{uri:this.state.profileImage}}
            style={{borderRadius:100, width:50, height:50, marginRight:10}}
            />
          <Text style={{...Colors.textSilver, ...Typography.extraSmallBoldTitle}}>
            {this.state.name}
          </Text>
          <Text style={{...Colors.primText, ...Typography.extraSmallBoldTitle, flex:1, textAlign:'right',paddingRight:10 }}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderRadius:5, borderTopWidth:3, borderTopColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangePassword')}  style={{flexDirection:'row', marginVertical:20, marginHorizontal:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Ganti Kata Sandi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View>
      
      
      {/* <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Favorit Saya</Text>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')}  style={{flexDirection:'row', margin:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Ganti Kata Sandi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

        <View style={{borderRadius:5, borderTopWidth:3, borderTopColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')}  style={{flexDirection:'row', margin:10, alignItems:'center',marginVertical:20, marginHorizontal:10,}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Ganti Kata Sandi</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View>
      
      <View style={{marginTop:20, borderRadius:10, elevation:2, backgroundColor:'white', paddingTop:10, paddingLeft:10, width:'100%'}}>
        <Text style={{...Colors.primText, ...Typography.smallBoldTitle}}>Cek Produk</Text>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')}  style={{flexDirection:'row', margin:10, alignItems:'center'}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Produk Terakhir Dilihat</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>

        <View style={{borderRadius:5, borderTopWidth:3, borderTopColor:'#E0E0E0', marginRight:10, marginTop:10}} />

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingAccount')}  style={{flexDirection:'row', alignItems:'center',marginVertical:20, marginHorizontal:10,}}>
          <Text style={{...Colors.textSilver, ...Typography.smallTitle}}>Produk Terakhir Dibeli</Text>
          <Icon name='chevron-right' color='silver' style={{flex:1, textAlign:'right'}} />
        </TouchableOpacity>
      </View> */}
      

    </View>
    );
  }
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

// export default AccountScreen