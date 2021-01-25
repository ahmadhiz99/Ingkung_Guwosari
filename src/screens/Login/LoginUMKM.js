import React,{useState, useEffect} from 'react'
import {Alert,Dimensions, ActivityIndicator ,Component,View,StyleSheet,Image,TextInput} from 'react-native'
import {Container,Header,Content,Form,Item,Label, Title, Button,Text, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../styles'
import firebase from '../../../Database/firebaseDB'

const LoginUMKM = ({ onSignIn, navigation }) => {
    const [valid, setValid]=useState(false)

    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [isLoading, setIsLoading] = useState(false)

    // find email
    const [emailCheck, setEmailCheck] = useState('')

    const [studentObjects, setStudentObjects] = useState({})  

    const [showPassword, setShowPassword] = useState(false)


    // useEffect(() => {  
        
    // }, [])  
    
    const Checker =()=>{
        // firebase.database().ref('user/seller').orderByChild('email').equalTo('gghhh@gmail.com').on('child_added', snapshot => {  
        // const result = snapshot.val();
        // setEmailCheck(result.email)
        // console.log("EMAIL: " + emailCheck);
        //     email==emailCheck?  console.log('sama'):  console.log('tidak sama');
        // })  
    }
    
    
    const SignInWithEmail=()=>{
        setIsLoading(true)
        console.log('==> Email: ', email);

             firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                // onSignIn()
                firebase.database().ref('user/seller').orderByChild('email').equalTo(email).on('child_added', snapshot => {  
                    const result = snapshot.val().email; //output => user
                    setValid(true)
                       onSignIn()
                    console.log('User logged-in successfully!');
                    setIsLoading(false)
                    // Alert.alert('Ditemukan')
                    result=='null'?  console.log('kosong'):  console.log('ada');
                    console.log('valid 1 =>',valid);
                })  
                
                // if not match in realtime database
                setValid(true)
                console.log('|||valid 2=>',valid);
                setIsLoading(false)
                setValid(false);
                // valid==false? Alert.alert('Username atau Password Tidak Terdaftar'):null
        
        
         }).catch(error => {
            setIsLoading(false)

            console.log(error);
            if (error.code === 'auth/invalid-email') {
            Alert.alert('Email atau Password Salah')
            // console.log('Email atau Password Salah');
            }
    
            if (error.code === 'auth/wrong-password') {
                Alert.alert('Email atau Password Salah')
                // console.log('Email atau Password Salah');
            }
                
            if (error.code === 'auth/too-many-requests') {
                Alert.alert('Percobaan Login Sudah Mencapai Batas Wajar')
                // console.log('Email atau Password Salah');
                }
        console.error(error);
    });
}

const showPasswordHandler=()=>{
    setShowPassword(!showPassword)
}

        return (
            <>
                <View style={styles.container}>

                    <View style={{flexDirection:'row'}}>
                       <Button style={styles.buttonBack} onPress={() => navigation.navigate('LoginScreen')}>
                            <Icon name="chevron-left" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                        </Button>
                        <View>
                        <Text style={styles.textTitle}>Login Sebagai</Text>
                        <Text style={styles.textTitle}>Pelaku UMKM</Text>
                        </View>
                    </View>
                
                    <View style={{marginTop:50}}>
                        <View>
                            <Text style={styles.labelInput}>Email</Text>
                            <TextInput onChangeText={setEmail} keyboardType="email-address" placeholder="Inicontohemail@gmail.com" style={styles.inputText} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Password</Text>
                            <View style={{flexDirection:'row', width:'100%'}}>
                                <TextInput onChangeText={setPassword} secureTextEntry={showPassword==true?false:true} placeholder="**********" style={{  ...Typography.textNormal, ...Colors.primText, ...InputStyle.primInputText, flex:0.9}} />
                                    {showPassword==true?
                                        <TouchableOpacity onPress={showPasswordHandler}>
                                            <Icon name='eye' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={showPasswordHandler}>
                                            <Icon name='eye-slash' size={22} style={{...Colors.primText, marginLeft:10}} />                                        
                                        </TouchableOpacity>
                                    }
                            </View>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'flex-end',marginTop:10}}>
                            <Text style={{...Typography.textNormal,...Colors.textLight}}>Lupa Password? </Text>
                            <TouchableOpacity>
                                <Text style={{...Typography.textNormal,...Colors.primText}}>Klik Disini</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop:50}}>
                            
                            <Button block style={{...Colors.primary}} onPress={SignInWithEmail}>
                                <Text style={{...Typography.Regular}}>Masuk</Text>
                            </Button>

                            <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
                            <Text style={{...Typography.textNormal,...Colors.textLight}}>Belum Punya Akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                                <Text style={{...Typography.textNormal,...Colors.primText}}>Daftar</Text>
                            </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{alignSelf:'center',marginTop:20,flexDirection:'row'}}>
                            <View style={{ 
                                    borderBottomColor: '#C4C4C4',
                                    borderBottomWidth: 2,
                                    width:'40%',
                                    marginBottom:-200,
                                    height:20}}/>
                            
                            <Text style={{marginTop:8,...Typography.textNormal,...Colors.textLight}}>    Atau    </Text>
                                    
                            <View style={{ 
                                    borderBottomColor: '#C4C4C4',
                                    borderBottomWidth: 2,
                                    width:'40%',
                                    height:20}}/>
                        </View>

                        <View style={{flexDirection:'row', marginTop:20, alignSelf:'center'}}>
                            <Button rounded style={{paddingLeft:20}}>
                                <Icon name="facebook" size={20} color='#ffffff' />
                                <Text>Facebook</Text>
                            </Button>
                            <View width={10} />
                            <Button danger rounded style={{paddingLeft:20}}>
                                <Icon name="google" size={20} color='#ffffff' />
                                <Text>Google</Text>
                            </Button>
                        </View>

                            
                    </View>
                </View>

            {
                isLoading==true?
                        <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
                :
                null
            }
            </>
        )
    }


const styles = StyleSheet.create({
    container:{
        ...Layout.containerPadding,
        ...Layout.containerSize,
        ...Colors.whiteBackground,
    },
    textTitle:{
        ...Typography.textTitle,
        ...Colors.primText,
        marginBottom:-20
    },
    buttonBack:{
        ...Colors.whiteBackground,
        ...Buttons.buttonBack,
        margin:10,
        marginTop:15
    },
    labelInput:{
        ...Typography.textNormal,
        ...Colors.primText,
    },
    inputText:{
        ...Typography.textNormal,
        ...Colors.primText,
        ...InputStyle.primInputText,
    },
})

export default LoginUMKM;