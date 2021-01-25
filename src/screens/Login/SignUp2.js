import React,{useState,useEffect} from 'react'
import {Dimensions,Alert,ActivityIndicator,Component,View,StyleSheet,Image,TextInput} from 'react-native'
import {Container,Header,Content,Form,Item,Label, Title, Button,Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox';
import firebase from '../../../Database/firebaseDB'
import auth from '@react-native-firebase/auth';
// import firebase from '@react-native-firebase';

// import auth from '@react-native-firebase/auth';

const SignUp2 =({route, navigation})=>{
    const { name ,password, bornDate, gender} = route.params;
    
    const [isLoading, setIsLoading] = useState(false) //Loading

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState('')
    const [address, setAddress] = useState('')
        
    // radiobutton
    const [value, setValue] = React.useState('buyer');
    // ceckbox
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [option1, setOption1] = useState(true); // const [maleCheck, setMaleCheck) = useState(true);

    // Date
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    useEffect(() => {  
        setIsLoading(true)
        // GET UID
        const getUIDTemp = (firebase.auth().currentUser);
        getUIDTemp==null?
        // console.log('NULLL')
        setIsLoading(false)
        :
        firebase.auth().signOut().then(function() {
            console.log('Berhasil Keluar');
            setIsLoading(false)
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
          console.log('error');
        })
        // setUID(getUIDTemp);

        
        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'Android');
            setDate(currentDate);
        };
        
          const showMode = (currentMode) => {
              setShow(true);
            setMode(currentMode);
        };
        
          const showDatepicker = () => {
              showMode('date');
          };
          
          const showTimepicker = () => {
              showMode('time');
            };
          
            const check =()=>{
                console.log(
                name ,
                password, 
                bornDate, 
                gender,
                
                email,
                address,
                phone,
                value,
                toggleCheckBox
                );
                
            }
        }, [])  
        
        const signupWithEmail =()=>{
            setIsLoading(true);
        
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response) => {
            console.log('User account created & signed in!');
            
                const user = firebase.auth().currentUser.uid  
                const childRef = value;
                const db = firebase.database().ref('user/'+childRef+'/'+user);
                
                db.set({
                    uid: user,
                    name: name ,
                    password: password, 
                    bornDate: bornDate, 
                    gender: gender,
                    
                    email: email,
                    address: address,
                    phone: phone,
                    user: value,
                    
                    profileImage: '',
                })
                
                setIsLoading(false)
                Alert.alert('Akun Berhasil Dibuat')
                
                navigation.navigate('LoginScreen')
                
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email Sudah Terdaftar')
                    setIsLoading(false)
                }
                
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setIsLoading(false)
                }
                
                if (error.code === 'auth/unknown') {
                    console.log('Internet slow!');
                    setIsLoading(false)
                }

                console.error(error);
            });
        }

        return (
            <>
            <ScrollView style={styles.container}>
                <View >

                    <View style={{flexDirection:'row'}}>
                        <Button onPress={() => navigation.navigate('Sign Up')}
                        title="Go to Login Screen" style={styles.buttonBack}>
                            <Icon name="chevron-left" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                        </Button>
                        <View>
                        <Text style={styles.textTitle}> DAFTAR BARU</Text>
                        </View>
                    </View>
                
                    <View style={{marginTop:50}}>
                        <View>
                            <Text style={styles.labelInput}>Email </Text>
                            <TextInput onChangeText={setEmail} keyboardType="email-address" placeholder="Inicontohemail@gmail.com" style={styles.inputText} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Nomor Ponsel</Text>
                            <TextInput onChangeText={setPhone} placeholder="Contoh: 089123456789" style={styles.inputText} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Daftar Baru Sebagai:</Text>
                                <View>
                                    <View >
                                        <RadioButton.Group  onValueChange={value => setValue(value)} value={value}>
                                            <View style={{flexDirection:'row'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <RadioButton.Item color="#7C3532" label="Tamu/Warga" labelStyle={{...Typography.textNormal,...Colors.primText}} value="buyer" style={{marginRight:-15}}/>
                                                {/* <View>{radioHandler2}</View> */}
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <RadioButton.Item color="#7C3532" label="Pelaku UMKM" labelStyle={{...Typography.textNormal,...Colors.primText}} value="seller" style={{marginRight:-15}}/>
                                            </View>
                                            </View>
                                        </RadioButton.Group>
                                        <View>
                                            <Text style={styles.labelInput}>Domisili </Text>
                                            <TextInput onChangeText={setAddress} placeholder="Contoh: Desa Guwosari, Pajangan, Kasihan, Bantul " style={styles.inputText} />
                                        </View>
                                    </View>
                                </View>

                        </View>

                        <View style={{marginTop:30}}>
                            <CheckBox
                                Colors='silver'
                                onCheckColor='#7C3532'
                                onFillColor='#7C3532'
                                tintColors='#7C3532'
                                onTintColor='#7C3532'
                                tintColor='silver'
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />         
                            <Text style={styles.labelInput}>
                                Saya menyetujui segala bentuk kebijakan privasi
                                serta syarat dan ketentuan dari aplikasi ini.
                            </Text>
                        </View>
            
                        <View style={{marginTop:50, marginBottom:50}}>
                            {(email&&phone&&address)==''?
                                <Button disabled={true} block style={{...Colors.silver,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                    <Text style={{...Typography.textNormal}}>Buat Akun</Text>
                                </Button>
                            :
                                toggleCheckBox==!(false)?
                                    <Button onPress={signupWithEmail} block style={{...Colors.primary,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                        <Text style={{...Typography.textNormal}}>Buat Akun</Text>
                                    </Button>
                                :
                                    <Button disabled={true} block style={{...Colors.silver,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                        <Text style={{...Typography.textNormal}}>Buat Akun</Text>
                                    </Button>
                            }
                        </View>
                            
                    </View>
                </View>
            </ScrollView>
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
        // marginBottom:-20,
        marginTop:10
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

export default SignUp2;