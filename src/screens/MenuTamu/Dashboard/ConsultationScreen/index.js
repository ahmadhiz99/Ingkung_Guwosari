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

const ConsultationScreen =({navigation})=>{
    const [x,setX] = useState('test')

    return(
      
    <ScrollView style={{backgroundColor:'white'}}>  

        <ImageBackground
        source={require('../../../../assets/images/consultationImages/consultation.png')}
        style={{flexDirection:'row', width:'100%', height:100}}>

            <View style={{flexDirection:'row', alignItems:'center', width:300}}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}
            title="LoginScreen" style={styles.buttonBack}>
                <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
            </TouchableOpacity>
  
            <Text style={{...Colors.whiteText, ...Typography.smallBoldTitle }}>
                Apa yang bisa kami bantu ?Tuliskan pertanyaan anda
            </Text>
            </View>
        </ImageBackground >     

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

            <View style={{borderRadius:5, borderBottomWidth:3, borderBottomColor:'#E3A46E', width:'100%'}} />

            <View style={{width:'100%'}}>
                 <Text style={{textAlign:'center',padding:10, ...Colors.primText, ...Typography.smallBoldTitle}}>
                    Tidak menemukan Solusi
                 </Text>
                 <Text style={{textAlign:'center',padding:10, ...Colors.textSilver, ...Typography.fontRegular, flex:10}}>
                    Langsung hubungi pakar konsultasi masalah anda dibawah sini
                    </Text>
                
                <TouchableOpacity style={{width:200, backgroundColor:'#E3A46E',borderRadius:5, elevation:2, height:40, alignSelf:'center', alignItems:'center', justifyContent:'center', marginVertical:10}}>
                    <Text style={{textAlign:'center',padding:10, ...Colors.whiteText, ...Typography.Heading4}}>
                        CHAT SEKARANG
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{borderRadius:5, marginVertical:10, borderBottomWidth:3, borderBottomColor:'#E3A46E', width:'100%'}} />

                    <Text style={{textAlign:'center',padding:10, ...Typography.Heading4}}>
                        Apakah kami membantu masalah anda ?
                    </Text>

                    <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
                        <TouchableOpacity 
                        style={{}}>
                            <MaterialIcons name='thumb-up' size={24} color='#E3A46E' />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{}}>
                            <MaterialIcons name='thumb-down' size={24} color='#E3A46E' />
                        </TouchableOpacity>
                    </View>

                <TouchableOpacity style={{width:'100%', marginTop:20, backgroundColor:'#E3A46E',borderRadius:5, elevation:2, height:40, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{textAlign:'center',padding:10, ...Colors.whiteText, ...Typography.Heading4}}>
                        Copyright © 2020 Tim PHP2D
                    </Text>
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

export default ConsultationScreen


