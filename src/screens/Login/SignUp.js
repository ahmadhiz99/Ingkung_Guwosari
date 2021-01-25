import React,{useState} from 'react'
import {Component,View,StyleSheet,Image,TextInput} from 'react-native'
import {Container,Header,Content,Form,Item,Label, Title, Button,Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
// import DateTimePicker from '@react-native-community/datetimepicker';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../styles'
// import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper'
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const SignUp =({navigation})=>{

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [buttonEnable, setButtonEnable] = useState('')

    // radiobutton
    const [value, setValue] = useState('male');
    
    // Date
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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

        // const [date, setDate] = useState('09-10-2020');
        //   const [date, setDate] = useState(new Date())

        const check =()=>{
            console.log(
                name,
                date.toLocaleDateString(),
                password,
                passwordConfirm,
                value
            );
        }
        return (
            <ScrollView style={styles.container}>
                <View >

                    <View style={{flexDirection:'row'}}>
                        <Button onPress={() => navigation.navigate('LoginScreen')}
                        title="Go to Login Screen" style={styles.buttonBack}>
                            <Icon name="chevron-left" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                        </Button>
                        <View>
                        <Text style={styles.textTitle}> DAFTAR BARU</Text>
                        </View>
                    </View>
                
                    <View style={{marginTop:50}}>
                        <View>
                            <Text style={styles.labelInput}>Nama Lengkap </Text>
                            <TextInput onChangeText={setName} placeholder="Heri Darmawan" style={styles.inputText} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Password</Text>
                            <TextInput onChangeText={setPassword} secureTextEntry={true} style={styles.default} placeholder="**********" style={styles.inputText} />
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Tulis lagi passwordnya</Text>
                            <TextInput onChangeText={setPasswordConfirm} secureTextEntry={true} style={styles.default} placeholder="**********" style={styles.inputText} />
                            {
                            password.length<8? 
                            <Text style={styles.labelAlert}>Kata Sandi Minimal 8 Karakter</Text>
                            :
                                passwordConfirm==password?
                                <Text style={styles.labelAlert}></Text>
                                :
                                    passwordConfirm==''?
                                    <Text style={styles.labelAlert}></Text>
                                        :
                                    <Text style={styles.labelAlert}>Passwod Tidak sama</Text> 
                            }
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Tanggal Lahir</Text>
                            <View>                                                
                                <Button onPress={showDatepicker} style={{backgroundColor:'snow',width:'100%'}}>
                                    <Text style={{...Colors.primText}}>
                                        {date.toLocaleDateString()}
                                    </Text>
                                </Button>
                            </View>
                                {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    />
                                )}                                
                            </View>

                        <View style={{marginTop:20}}>
                            <Text style={styles.labelInput}>Jenis Kelamin</Text>
                            <View>
                            <View >
                                <RadioButton.Group  onValueChange={value => setValue(value)} value={value}>
                                    <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <RadioButton.Item color="#7C3532" label="Laki-laki" labelStyle={{...Typography.textNormal,...Colors.primText}} value="male" style={{marginRight:-15}}/>
                                        {/* <Text style={{marginTop:18,...Typography.textNormal,...Colors.primText}}>male</Text> */}
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <RadioButton.Item color="#7C3532" label="Perempuan" labelStyle={{...Typography.textNormal,...Colors.primText}} value="female" style={{marginRight:-15}}/>
                                        {/* <Text style={{marginTop:18,...Typography.textNormal,...Colors.primText}}>female</Text> */}
                                    </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                            </View>
                        </View>
            
                        <View style={{marginTop:50, marginBottom:20}}>
                            {
                            (name&&password&&passwordConfirm&&date.toDateString()&&(password==passwordConfirm))==''?
                                <Button disabled={true} block style={{...Colors.silver,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                    <Text style={{...Typography.textNormal}}>Selanjutnya</Text>
                                </Button>
                            :
                                <Button 
                                    onPress={() => navigation.navigate('Sign Up 2', {
                                        name : name,
                                        password: password,
                                        bornDate:date.toDateString(),
                                        gender:value

                                    })}
                                    block style={{...Colors.primary,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                    <Text style={{...Typography.textNormal}}>Selanjutnya</Text>
                                </Button>
                            }
                        </View>
                            
                    </View>
                </View>
            </ScrollView>
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
    labelAlert:{
        ...Typography.textNormal,
        ...Colors.textSilver,
    }
})

export default SignUp;