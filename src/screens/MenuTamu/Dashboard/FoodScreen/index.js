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
import VerticalContent from '../../Dashboard/FoodScreen/VerticalContent'

class FoodScreen extends React.Component{
      
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
                                <Header hex='#FFFFFF' />
                            </View>
                        </View>
                    </View>
                    
                    {/* Text */}
                    <View style={{alignSelf:'center', marginTop:10}}>
                        <Text style={[{...Colors.whiteText,...Typography.mid,...Typography.fontBold}]}>NIKMATI PILIHAN INGKUNG TERBAIK !</Text>
                    </View>

                    {/* Banner */}
                    <View>
                        <Banner />
                    </View>

                    {/* Type/Category */}
                    <View style={{margin:10, flexDirection:'row', alignSelf:'center'}}>
                        <View style={{width:60,alignItems:'center',flex:1, margin:5}}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/foodImages/food1.png')} />
                            </TouchableOpacity>
                            <Text style={{textAlign:'center',...Colors.whiteText, ...Typography.Heading6}}>Ingkung Goreng</Text>
                        </View>
                        
                        <View style={{width:60,alignItems:'center',flex:1, margin:5}}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/foodImages/food2.png')} />
                            </TouchableOpacity>
                            <Text style={{textAlign:'center',...Colors.whiteText, ...Typography.Heading6}}>Ingkung Bakar</Text>
                        </View>
                        
                        <View style={{width:60,alignItems:'center',flex:1, margin:5}}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/foodImages/food3.png')} />
                            </TouchableOpacity>
                            <Text style={{textAlign:'center',...Colors.whiteText, ...Typography.Heading6}}>Ingkung Krispi</Text>
                        </View>
                        
                        <View style={{width:60,alignItems:'center',flex:1, margin:5}}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/foodImages/food4.png')} />
                            </TouchableOpacity>
                            <Text style={{textAlign:'center',...Colors.whiteText, ...Typography.Heading6}}>Ingkung Pedas</Text>
                        </View>
                        
                        <View style={{width:60,alignItems:'center',flex:1, margin:5}}>
                            <TouchableOpacity>
                                <Image source={require('../../../../assets/images/foodImages/food5.png')} />
                            </TouchableOpacity>
                            <Text style={{textAlign:'center',...Colors.whiteText, ...Typography.Heading6}}>Ingkung Jago Utuh</Text>
                        </View>
                        
                    </View>

                </View>

                {/* Sort */}
                <View style={{width:'100%',backgroundColor:'white',elevation:3,padding:10}}>
                    <View style={{width:200,flexDirection:'row'}}>
                    <Text style={{...Colors.primText, ...Typography.HeadingBold4, marginRight:20}}>Urutkan</Text>
                    <Text style={{...Colors.textSilver, ...Typography.Heading4,}}>Paling Laris</Text>
                    </View>
                </View>

           
               <VerticalContent screenName="FoodItem"  />
               
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

export default FoodScreen