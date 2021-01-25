import React,{useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import { useNavigation } from '@react-navigation/native';


const Header =({hex})=>{
    const navigation = useNavigation();

    const [warna,setWarna] = useState(hex);
    

    return(
        <View style={{width:'100%',flex:10}}>
            <View style={{flexDirection:'row',width:'100%'}}>
                <TextInput  placeholder="Search"
                style={[styles.searchField,{backgroundColor:`${warna}`}]} />
                {warna=="#ECECEC"?
                <TouchableOpacity onPress={()=>navigation.navigate('MessageScreen')}>
                    <Icon name='envelope' size={24} style={{flex:1,marginLeft:10, marginTop:10, color:'#767676'}} />
                </TouchableOpacity>
                    :
                warna=='#F6FFFB'?
                <MaterialIcons name='favorite-border' size={26} style={{flex:1,marginLeft:10, marginTop:10, color:'#FFFFFF'}} />
                :
                <Icon name='shopping-cart' size={24} style={{flex:1,marginLeft:10, marginTop:10, color:'#FFFFFF'}} />
                }
                
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchField: {
        flex:10,
        ...Colors.fieldColor,
        ...Buttons.mediumRounded,
        height:42,
        width:'100%'
      },
})
export default Header