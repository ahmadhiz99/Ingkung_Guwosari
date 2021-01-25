import React, { useState } from 'react'
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import {Container,Header, Title, Button,Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {  Colors, Typography, Layout } from '../../styles'

const LoginScreen =({navigation})=>{
    const gotoLoginTamu =()=>{
        navigation.navigate('LoginTamu');
    }
    const gotoLoginUMKM =()=>{
        navigation.navigate('LoginUMKM');
    }
    const gotoSignUp =()=>{
        navigation.navigate('Sign Up');
    }
    return(
        <View style={styles.container}>
            <View style={{flex:1}}>
                <Text style={styles.textTitle}>
                    LOGIN
                </Text>
                <Text style={styles.textTitle}>
                    INGKUNG GUWOSARI
                </Text>
            </View>
           
           <View style={{flex:2}}>
            <Image  source={require('../../assets/images/ilustrasi-login.png')} style={styles.imageLogin} />
            </View>

            <View style={{flex:1}}
            style={{alignSelf:'flex-end',alignSelf:'center'}}
            >
                <Button
                style={styles.buttonRadius}
                onPress={gotoLoginTamu}
                >
                    <Icon name="person" size={20} color="#fff" style={{flex:1,marginLeft:10}}/>
                    {/* <Icon name="android" size={30} color="#fff" /> */}
                    <Text style={styles.textPrimary}>Tamu atau Warga Desa</Text>
                </Button>
                <Button
                style={styles.buttonRadiusBorder}
                onPress={gotoLoginUMKM}
                >
                    <Icon name="people" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                    <Text style={styles.textPrimaryPurple}>Sahabat UMKM</Text>
                </Button>       
                
                <View style={{flexDirection:'row',alignSelf:'flex-end', marginTop:20,marginRight:20}}>
                    <Text style={styles.textRegularLight}>Atau </Text> 
                    <Text style={styles.textRegularDark} onPress={gotoSignUp}>Daftar Disini</Text> 
                </View>
            </View>
             
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        ...Layout.containerPadding,
        ...Colors.whiteBackground,
        flex:1,alignContent:'space-between',
    },
    buttonRadius:{
        ...Colors.primary,
        padding:10,
        width:300,
        height:50,
        borderRadius:20,
        elevation:0,
        alignSelf:'center',
        justifyContent:'center',
        margin:5
    },
    buttonRadiusBorder:{
        ...Colors.primBorder,
        backgroundColor:'#ffffff',
        borderWidth:2,
        padding:10,
        width:300,
        height:50,
        borderRadius:20,
        elevation:0,
        alignSelf:'center',
        justifyContent:'center',
        margin:5,
    },
    textPrimary:{   
        color:'#ffffff',
        textAlign:'center',
        ...Typography.primFont,
        fontWeight:'900',
        flex:10,   
    },
    textPrimaryPurple:{
        ...Colors.primText,
        ...Typography.primFont,
        textAlign:'center',
        fontWeight:'900',
        flex:10,
    },
    textTitle:{
        ...Colors.primText,
        ...Typography.textTitle,
        textAlign:'center',
        fontSize:28,
        letterSpacing:0.01
    },
    textRegularLight:{
        ...Typography.textNormal,
        ...Colors.textLight
        
    },
    textRegularDark:{
        ...Typography.textNormal,
        ...Colors.primText,
        fontWeight:'700'
        
    },
    imageLogin:{
        width:260,
        height:260,
        alignSelf:'center'
    },
    
    
})

export default LoginScreen;