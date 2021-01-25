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

import {Colors, Buttons, Typography} from '../../../../../../styles'

const ConsultationAccount =({navigation})=>{
    const [x,setX] = useState('test')

    return(
      
    <ScrollView style={{backgroundColor:'white'}}>  

        <View style={{flexDirection:'row', width:'100%'}}>

            <View style={{flexDirection:'row', alignItems:'center', width:300}}>
            <TouchableOpacity onPress={() => navigation.navigate('ConsultationScreen')}
            title="LoginScreen" style={styles.buttonBack}>
                <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
            </TouchableOpacity>
  
            <Text style={{...Colors.whiteText, ...Typography.smallBoldTitle }}>
                Konsultasi ...
            </Text>
            </View>
        </View >     

        <View style={{padding:10}}>        
                <Text style={{padding:10, ...Colors.primText, ...Typography.smallBoldTitle}}>
                    Konsultasi yang sering ditanyakan
                </Text>

                <TouchableOpacity onPress={()=>navigation.navigate('ConsultationItem')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                        Cara meningkatkan pendapatan usaha di masa pandemi COVID-19   
                    </Text>
                    <Icon name='chevron-right' size={24} style={{...Colors.textSilver, flex:1}} />
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={()=>navigation.navigate('ConsultationItem')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                        Bagaimana jika lupa email untuk login
                    </Text>
                    <Icon name='chevron-right' size={24} style={{...Colors.textSilver, flex:1}} />
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={()=>navigation.navigate('ConsultationItem')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                        Bagaimana caranya mendaftar sebagai UMKM                    </Text>
                    <Icon name='chevron-right' size={24} style={{...Colors.textSilver, flex:1}} />
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={()=>navigation.navigate('ConsultationItem')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                        Apakah barang yang dipesan langung dikirim
                    </Text>
                    <Icon name='chevron-right' size={24} style={{...Colors.textSilver, flex:1}} />
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={()=>navigation.navigate('ConsultationItem')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                        Bagaimana cara komunikasi dengan UMKM
                    </Text>
                    <Icon name='chevron-right' size={24} style={{...Colors.textSilver, flex:1}} />
                    </View>
                </TouchableOpacity>

            <View>
            <Text style={{padding:10, ...Colors.primText, ...Typography.smallBoldTitle}}>
                Kategori Konsultasi
            </Text>

            <TouchableOpacity 
            onPress={()=>navigation.navigate('ConsultationAccount')}
            style={{marginBottom:10,elevation:2, backgroundColor:'white', padding:5, borderRadius:5, flexDirection:'row', height:60, alignItems:'center'}}>
                <MaterialIcons name='person-outline' size={24} color='#E3A46E' />
                <Text style={{...Colors.textSilver, ...Typography.Heading4, marginLeft:10}}>Konsultasi Akun</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('ConsultationProduct')}
            style={{marginBottom:10,elevation:2, backgroundColor:'white', padding:5, borderRadius:5, flexDirection:'row', height:60, alignItems:'center'}}>
                <MaterialIcons name='local-mall' size={24} color='#E3A46E' />
                <Text style={{...Colors.textSilver, ...Typography.Heading4, marginLeft:10}}>Konsultasi Produk</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('ConsultationSecurity')}
            style={{marginBottom:10,elevation:2, backgroundColor:'white', padding:5, borderRadius:5, flexDirection:'row', height:60, alignItems:'center'}}>
                <MaterialIcons name='privacy-tip' size={24} color='#E3A46E' />
                <Text style={{...Colors.textSilver, ...Typography.Heading4, marginLeft:10}}>Konsultasi Keamanan Pembelian</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('ConsultationBussines')}
            style={{marginBottom:10,elevation:2, backgroundColor:'white', padding:5, borderRadius:5, flexDirection:'row', height:60, alignItems:'center'}}>
                <MaterialIcons name='shopping-cart' size={24} color='#E3A46E' />
                <Text style={{...Colors.textSilver, ...Typography.Heading4, marginLeft:10}}>Konsultasi Bisnis untuk UMKM</Text>
            </TouchableOpacity>
            

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

export default ConsultationAccount


