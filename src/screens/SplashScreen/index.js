import React from 'react';
import { View,Image , Text } from 'react-native';

import {Colors, Typography} from '../../styles'
import firebase from '../../.../../../Database/firebaseDB'
class SplashScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      timePassed: false
   }
  }


  AuthCheck(){
    // setTimeout(() => this.setState({timePassed: true}), 100)
      // const user = firebase.auth().currentUser;
      // console.log(user);
      // user==null?
      // null
      // :
      // this.props.onSignIn()
      // this.props.onSiddgnInAdmin()
     
      // const user = firebase.auth().currentUser;
      // const search = user.email
      // console.log('======================');
      // console.log(user.uid);
      // console.log(user.email);
      // console.log(user);
      // console.log('+++++++++++++++++++++++++++++++');
      
      
      // user!==null?
    //   x
      // :
      // if(user!==null){

      // user!==null?
      // firebase.database().ref('user/seller').orderByChild('email').equalTo(search).on('child_added', snapshot => {  
      //   const result = snapshot.val(); //output => usez
      //   console.log('Result  =>',result);
      //   // result=='null'?  console.log('kosong'):  console.log('ada');
      //   this.props.onSignInAdmin()
    //   }) 
    // }
      // :

    // null


  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    
    const data = await this.performTimeConsumingTask();
    
    if (data !== null) {
      this.AuthCheck(); 
      this.props.navigation.navigate('OnBoarding');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
          <View style={{flex:1}}>
            <Image source={require('../../assets/images/Logo.png')} width={300} height={300} 
            style={{
                marginTop:20
            }} />
        </View>
       
        <View style={{flex:1,justifyContent:'flex-end'}}>
        <Text style={{marginBottom:200, ...Typography.HeadingBold6, ...Colors.textSilver}}>
          Tunggu Sebentar ...
        </Text>

            <Text style={{
                ...Typography.HeadingBold5,
                ...Colors.primText,
            }}>
                PHP2D-UAA-2020
            </Text>
        </View>

      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyles: {
    color: 'silver',
    fontSize: 10,
    fontWeight: 'bold',
  }
}

export default SplashScreen;
