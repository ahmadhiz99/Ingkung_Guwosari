import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
// import firebase from 'firebase';
import ProductItem from './ProductItem'
export default class Dashboard extends React.Component {


  render() {

    const { navigate } = this.props.navigation;
   
    return (
      <ScrollView style={styles.container}>
        <View style={{margin:10}}>

        <View style={{flexDirection:'row', alignItems:'center', height:60 ,width:'100%'}}>
            <Text style={{flex:1, ...Colors.primText, ...Typography.HeadingBold3}}>Beranda</Text>
            {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Order')} style={{alignItems:'center'}}>
              <FontAwesome5 name='concierge-bell' color='#7C3532' size={40} style={{alignSelf:'flex-end', marginRight:20}}/>
            </TouchableOpacity> */}
        </View>

        <View style={{flexDirection:'row', elevation:5, margin:5, backgroundColor:'white', borderRadius:10, padding:10 }}>
            <View style={{alignItems:'center', flex:1}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddProductScreen')} style={{width:60, height:60, borderRadius:60, ...Colors.primary, alignItems:'center', justifyContent:'center'}}>
              <MaterialIcons name='add-to-photos' size={30} color='white' />
              </TouchableOpacity>
              <Text style={{textAlign:'center', ...Typography.Heading4}}>Tambah Produk</Text>
            </View>
            <View style={{alignItems:'center', flex:1}}>
              <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ShowProduct')} style={{width:60, height:60, borderRadius:60, ...Colors.primary, alignItems:'center', justifyContent:'center'}}>
              <MaterialIcons name='list-alt' size={30} color='white' />
              </TouchableOpacity>
              <Text style={{textAlign:'center', ...Typography.Heading4}}>Lihat Produk</Text>
            </View>
            <View style={{alignItems:'center', flex:1}}>
              <View style={{width:60, height:60, borderRadius:60, ...Colors.primLight, alignItems:'center', justifyContent:'center'}}>
              <MaterialIcons name='coronavirus' size={30} color='white' />
              </View>
              <Text style={{textAlign:'center', ...Typography.Heading4, color:'#E3A46E'}}>Informasi Covid-19</Text>
            </View>
        </View>

      </View>

        <View>
          <ProductItem screenName='Item'  />
        </View>

        
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // ...Layout.container,

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