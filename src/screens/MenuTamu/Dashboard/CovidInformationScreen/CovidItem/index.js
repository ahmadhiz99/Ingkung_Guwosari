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

import {Colors, Buttons, Typography} from '../../../../../styles'

const CovidItem =({navigation})=>{
    const [x,setX] = useState('test')

    return(
      
    <ScrollView style={{backgroundColor:'white', padding:10}}>        
          <TouchableOpacity onPress={() => navigation.navigate('CovidInformationScreen')}
          title="LoginScreen" style={styles.buttonBack}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
  
          <Text style={{padding:10, ...Colors.primText, ...Typography.HeadingBold3}}>
          [UPDATE] Kasus Virus Corona
          Indonesia per 29 Oktober 2020
          Naik Jadi 404.048 Orang
          </Text>
          <Image 
          style={{width:'100%', height:200, borderRadius:10}}
          source={require('../../../../../assets/images/covidImages/covid2.png')} />      

        <Text style={{...Colors.textSilver, ...Typography.normalText, textAlign:'justify', marginTop:20, marginBottom:20}}>
            Update terbaru jumlah kasus virus corona (Covid-19) di Indonesia kembali diunggah pada sore hari ini
            Dikutip Pikiran-Rakyat.com dari situs Kemkes.go.id, jumlah kasus per Kamis 29 Oktober 2020 mencapai 404.048 orang.
            Angka ini didapat karena penambahan pasien positif harian dalam 24 jam mencapai 3.565 orang. Sementara itu, untuk pasien sembuh mengalami pertambahan sebanyak 3.985 orang.
            Akumulasi pasien yang sembuh dari Covid-19 hari ini mencapai 329.778 orang atau sekitar 81,62 persen. Adapun pasien meninggal dunia mengalami penambahan sebanyak 89 orang, lebih sedikit dibandingkan hari sebelumnya.
        </Text>

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

export default CovidItem


