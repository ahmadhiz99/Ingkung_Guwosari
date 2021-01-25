import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'

import database from 'firebase';

const Categories =()=>{
  const navigation = useNavigation();
  // const reference = database().ref('/users/123');
  // let users = firebase.database().ref('users/')
    return(
        <View>
          <View style={{marginBottom:20}}>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            {/* <Text>{reference}</Text> */}
    {/* <Text>{users}</Text> */}
            <View>
              <TouchableOpacity style={styles.categories} onPress={()=>navigation.navigate('FoodScreen')}>
                <Icon name='cutlery' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Makanan</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.categories} onPress={()=>navigation.navigate('CraftScreen')}>
                <FontAwesome5 name='feather-alt' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Kerajinan</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.categories}  onPress={()=>navigation.navigate('TravelScreen')}>
                <FontAwesome5 name='umbrella-beach' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Wisata</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.categories}>
                <Icon name='newspaper-o' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Informasi Desa</Text>
            </View>
          </View>

          <View style={{flexDirection:'row', alignSelf:'center'}}>
             <View>
              <TouchableOpacity style={styles.categoriesSec}  onPress={()=>navigation.navigate('CovidInformationScreen')}>
                <MaterialIcons name='coronavirus' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Informasi Covid-19</Text>
            </View>
             <View>
              <TouchableOpacity style={styles.categories} onPress={()=>navigation.navigate('ConsultationScreen')}>
                <Icon name='question-circle' size={22} color='#ffffff'/>
              </TouchableOpacity>
                <Text style={styles.categoriesText}>Konsultasi</Text>
            </View>
          </View>
        </View>
        </View>
    )
}

export const button={

  marginTop:20,
  marginLeft:10,
  marginRight:10,
  flex:1,
  padding:5,
  margin:3,
  ...Buttons.roundedCircle,
  alignItems:'center',
}

const styles = StyleSheet.create({
  
  categories:{
    ...button,
    ...Colors.primary,
  },
  categoriesSec:{
    ...button,
    backgroundColor:'#E3A46E',
    alignSelf:'center',
  },
  categoriesText:{
    alignSelf:'center',
    ...Typography.textNormal
  }
})
export default Categories