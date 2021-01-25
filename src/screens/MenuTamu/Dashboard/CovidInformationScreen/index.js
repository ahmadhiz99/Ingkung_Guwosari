import React,{useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  ImageBackground,
  Button,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {Colors, Buttons, Typography} from '../../../../styles'

const CovidInformationScreen =({navigation})=>{
    const [x,setX] = useState('test')
    return(
      
    <ScrollView>
      <ImageBackground 
      source={require('../../../../assets/images/covidImages/covid.png')}
      style={{width:'100%',height:200}}
      >
        <View style={{width:'100%', height:200, backgroundColor:'black', opacity:0.3, position:'absolute'}} />
        
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}
          title="LoginScreen" style={styles.buttonBack}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
        </View>
  
        <View style={{padding:10}}>
          <Text style={{...Colors.whiteText, ...Typography.HeadingBold3}}>
          Satgas: Menggunakan Masker Medis
          Menutup Rantai Penularan Covid-19
          Hingga 70 Persen
          </Text>        
        </View>
          <Text style={{...Colors.whiteText}}>asasdd</Text>
      </ImageBackground>

      <TouchableOpacity 
      onPress={()=>navigation.navigate('CovidItem')}
      style={{ width:'100%', flexWrap:'wrap', padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../../../assets/images/covidImages/covid2.png')} />
          <Text style={{width:220, padding:10}}>
          [UPDATE] Kasus Virus Corona
          Indonesia per 29 Oktober 2020
          Naik Jadi 404.048 Orang
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width:'100%', flexWrap:'wrap', padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../../../assets/images/covidImages/covid2.png')} />
          <Text style={{width:220, padding:10}}>
          Tahapan Uji Klinik Vaksin
          COVID-19 Diawasi Ketat Agar
          Aman & Efektif
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width:'100%', flexWrap:'wrap', padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../../../assets/images/covidImages/covid2.png')} />
          <Text style={{width:220, padding:10}}>
          [Hoaks] Klaim Aliansi Dokter
          Dunia soal Covid-19, Begini
          Faktanya
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width:'100%', flexWrap:'wrap', padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../../../assets/images/covidImages/covid2.png')} />
          <Text style={{width:220, padding:10}}>
          Positif COVID-19, Pegawai Dinkes
          Blitar Meninggal  
          </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
        
    )
}


const styles = StyleSheet.create({
  buttonBack:{
    ...Colors.whiteBackground,
    ...Buttons.buttonBack,
    margin:10,
    marginTop:15,
    justifyContent:'center',
    alignItems:'center',
    elevation:5
},
})

export default CovidInformationScreen


