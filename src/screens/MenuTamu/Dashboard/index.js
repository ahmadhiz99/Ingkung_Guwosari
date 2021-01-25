import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'
import Categories from './categories'
import Header from './header'
import Banner from './banner'
import HorizontalContent from './horizontalContent'
import HorizontalContentSecond from './horizontalContentSecond'
import VerticalContent from './verticalContent.js'
// import firebase from 'firebase';
import firebase from '../../../../Database/firebaseDB'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.dbRef = firebase.database().ref('users/user7');
    this.state = {
    };
  }
  
  UNSAFE_componentWillMount(){
   
  }
  render() {

    const { navigate } = this.props.navigation;
    const insert =()=>{
      this.dbRef.set(
        {
          name:'akbar',
          age:20
        }
      ).then(()=>{
        console.log('INSERTED !');
      }).catch((error)=>{
        console.log(error)
      })
    
    }
    return (
      <ScrollView style={styles.container}>
  
        {/* Header Part */}
        <Header hex='#ECECEC' screenName="Messages" />

        {/* Banner Slidebar */}
        <Banner />

        {/* Categories Part */}
        <Categories />
        
        {/* Horizontal Content Part */}
        <HorizontalContent screenName="FoodItem" />

        {/* Horizontal Content Second */}
        <HorizontalContentSecond screenName="FoodItem" />

     
        <VerticalContent screenName="FoodItem"  />


        
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    ...Colors.whiteBackground
  },
  title:{
    ...Typography.extraSmallBoldTitle,
    alignSelf:'flex-start',
    flex:2,
    alignSelf:'center',
    marginTop:10,
    alignSelf:'flex-start'
},
button:{
    alignSelf:'flex-end',
    ...Colors.primary,
    flex:0.8,
    ...Buttons.smallRounded,
    margin:10,
    height:20,
    justifyContent:'center',
    alignSelf:'center'
},
});