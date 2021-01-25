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

const ConsultationItem =({navigation})=>{
    const [x,setX] = useState('test')

    return(
      
    <ScrollView style={{backgroundColor:'white'}}>  

        <TouchableOpacity onPress={() => navigation.navigate('ConsultationScreen')}
        title="LoginScreen" style={styles.buttonBack}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
        </TouchableOpacity>
        
        <View style={{padding:10}}>        
            <View style={{}}>
                <Text style={{...Colors.primText, ...Typography.smallBoldTitle }}>
                Bagaimana Cara Meningkatkan Pendapatan Usaha Di Masa Pandemi COVID-19
                </Text>

                <Image 
                style={{width:'100%'}}
                source={require('../../../../../assets/images/consultationImages/consultation2.png')} />

                <Text style={{...Colors.textSilver, ...Typography.Heading4, textAlign:'justify', marginTop:20 }}>
                    Dalam situasi COVID-19 ini, dimana masyarakat diminta untuk PSBB, ada beberapa hal yang dapat Anda lakukan untuk meningkatkan penjualan:
                    Jangan panik dan jangan berhenti menjual
                    Perkuatlah hubungan dengan pelanggan
                    Maksimalkan pemasaran online
                    Buatlah promosi penjualan yang tepat
                    Buatlah strategi penjualan yang kreatif
                    Bangunlah kolaborasi yang saling menguntungkan
                    Untuk melakukan itu semua, memang tidak mudah. Kondisi yang tidak menentu ini tentunya menjadi tantangan besar untuk kita. Namun seperti yang disampaikan sebelumnya, jangan panik dan jangan berhenti menjual. Selalu ada jalan selama kita mau berusaha. Sekali lagi, kuncinya adalah jangan panik, sehingga kita bisa berpikir lebih jernih.
                </Text>
            </View>


               
          </View>

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

export default ConsultationItem


