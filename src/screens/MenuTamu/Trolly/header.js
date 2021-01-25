import React from 'react'
import{
    View, Text
} from 'react-native'


import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from '../../../../Database/firebaseDB'

import {Colors, Typography} from '../../../styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { set } from 'react-native-reanimated';


const Header =()=>{
    return(
        <View style={{backgroundColor:'white', width:'100%', height:50, elevation:3, flexDirection:'row',alignItems:'center', padding:10, justifyContent:'space-between'}}>
            <Text style={{...Typography.smallBoldTitle, ...Colors.primText}}>Troli</Text>
            <TouchableOpacity>
                <Icon name='envelope' size={24} style={{...Colors.textSilver,}} />
            </TouchableOpacity>
        </View>
    )
}

export default Header