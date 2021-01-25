import React,{useState} from 'react'
import {Component,View,StyleSheet,Image,TextInput} from 'react-native'
import {Container,Header,Content,Form,Item,Label, Title, Button,Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox';

const Verification =({ onSignUp ,navigation})=>{
    // radiobutton
    const [value, setValue] = React.useState('first');
    
    // ceckbox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)


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

        return (
            <ScrollView style={styles.container}>
                <View >

                    <View style={{flexDirection:'row'}}>
                        <Button onPress={() => navigation.navigate('SignUp2')}
                        title="Go to Login Screen" style={styles.buttonBack}>
                            <Icon name="chevron-left" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                        </Button>
                        <View>
                        <Text style={styles.textTitle}>Verifikasi</Text>
                        </View>
                    </View>
                
                    <View style={{marginTop:50}}>
                        <View>
                            <Image source={require('../../assets/images/verification.png')} 
                            style={{alignSelf:'center'}} />
                        </View>

                        <View style={{marginTop:20, width:300, alignSelf:'center'}}>
                            <Text style={{...Typography.textNormal,...Colors.primText,textAlign:'center'}}>
                                Kami telah mengirimkan 4 digit kode verifikasi
                                ke nomor 08********32
                                Silahkan cek pesan masuk anda dan masukan kode
                                tersebut disini
                            </Text>
                        </View>
                        <View style={{marginTop:20,alignSelf:'center'}}>
                            <TextInput 
                                maxLength={4}
                                keyboardType="numeric"
                                style={{
                                // ...Colors.silver,
                                backgroundColor:'#F2F2F2',
                                textAlign:'center',
                                letterSpacing:30,
                                fontSize:24,
                                ...Colors.primText,
                                ...Buttons.mediumRounded,
                                width:200}} />
                        </View>

                        <View style={{marginTop:20,flexDirection:'row'}}>
                            <Text style={{...Typography.textNormal,...Colors.textLight,}}>Belum dapat pesan?</Text>
                            <Text style={styles.labelInput}> Kirim pesan lagi</Text>
                        </View>
            
                        <View style={{marginTop:50}}>
                            <Button onPress={onSignUp} block style={{...Colors.primary,...Buttons.rounded,alignSelf:'flex-end',width:150}}>
                                <Text style={{...Typography.textNormal}}>Kirim</Text>
                            </Button>
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
})

export default Verification;