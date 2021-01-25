import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  Image
 
} from 'react-native';
import {Button} from 'native-base';

import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles/'

import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Header from '../../Dashboard/header'
import Banner from '../../Dashboard/banner'
import VerticalContent from '../../Dashboard/TravelScreen/VerticalContent'

class TravelScreen extends React.Component{
      
    render(){
        const { navigate } = this.props.navigation;
        
        return(
            <ScrollView style={{...Colors.whiteBackground}}>
                <View style={styles.headerContent}>
                    <View style={styles.containerHeader}>
                        <View style={{flexDirection:'row'}}>
                            {/* Back Button */}
                            <Button onPress={() => this.props.navigation.navigate('Dashboard')} title="Dashboard" style={styles.buttonBack}>
                                <Icon name="chevron-left" style={{flex:1,marginLeft:10,...Colors.primText}} size={20}/>
                            </Button>

                            {/* SearchField */}
                            <View style={{width:280}}>
                                <Header hex='#F6FFFB' />
                            </View>
                        </View>
                    </View>
                    
                    {/* Text */}
                    <View style={{alignSelf:'center', marginTop:10}}>
                        <Text style={[{...Colors.whiteText,...Typography.mid,...Typography.fontBold}]}>MAU KEMANA KAMU HARI INI ?</Text>
                    </View>

                    {/* Banner */}
                    <View>
                        <Banner url='wisata' />
                    </View>

                </View>

                       
               <VerticalContent />
    
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    },
    containerHeader:{
        paddingRight:10,
        paddingLeft:10,
        paddingTop:30,
    },
    buttonBack:{
        ...Colors.whiteBackground,
        ...Buttons.buttonBack,
        marginRight:10,
        alignSelf:'center',
        marginTop:5
    },
    headerContent:{
        ...Colors.primary,
    },
    imageContent:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        width:'100%'
   
    }
})

export default TravelScreen