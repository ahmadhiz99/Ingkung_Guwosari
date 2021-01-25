import React, {useEffect } from 'react';
import {
  StyleSheet,   
  Text,         
  View,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity         
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {  Colors, Typography, Layout } from '../../styles'
import firebase from '../../.../../../Database/firebaseDB'


const Dots=({selected})=>{
  let backgroundColor;
  backgroundColor= selected? 'white':'silver';
  return(
    <View 
      style={{
        width:5,
        height:5,
        marginHorizontal:3,
        borderRadius:5,
        backgroundColor
      }}
    />

  )
}


const Skip=({...props})=>(
  <TouchableOpacity
  style={{marginHorizontal:10}}
  {...props}
  >
  <Text style={styles.onBoardingText}>LEWATI</Text>

</TouchableOpacity>
);

const Next=({...props})=>(
  <TouchableOpacity
    style={{marginHorizontal:10}}
    {...props}
  >
    <Text style={styles.onBoardingText}>SELANJUTNYA</Text>

  </TouchableOpacity>

);

const Done=({...props})=>(
  <TouchableOpacity
    style={{marginHorizontal:10}}
    {...props}
  >
    <Text style={styles.onBoardingText}>SELESAI</Text>

  </TouchableOpacity>
  
);

const OnBoardingScreens =({navigation})=> {
    return(
      <Onboarding 
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("LoginScreen") }
        onDone={() => navigation.navigate("LoginScreen") }
        pages={[
        {
        backgroundColor: 'black',
          image: <> 
                    <ImageBackground source={require('../../assets/images/onBoarding/onBoarding1.png')} style={styles.Image} >
                      <View style={styles.Overlay} />
                    </ImageBackground>
                    <View style={{position:'absolute',marginTop:100,alignItems:'center',width:'100%',height:'100%'}}>
                    <Image source={require('../../assets/images/Logo.png')} />
                      <View style={{marginTop:20}}>
                        <Text style={styles.title}>
                          Ingkung
                          Guwosari
                        </Text>
                        <Text style={styles.subTitle}>
                        Dapatkan kualitas ingkung terbaik langsung dari khas Desa Guwosari sudah terpercaya selama bertahun tahun
                        </Text>
                      </View>
                    </View>
                  </>,
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: 'black',
          image: <> 
                    <ImageBackground source={require('../../assets/images/onBoarding/onBoarding2.png')} style={styles.Image} >
                      <View style={styles.Overlay} />
                    </ImageBackground>
                    <View style={{position:'absolute',marginTop:100,alignItems:'center',width:'100%',height:'100%'}}>
                      <View style={{marginTop:20,alignItems:'center'}}>
                        <Text style={styles.title}>
                        Sebagai hasil
                        dari kerja sama
                        </Text>
                          <View style={{flexDirection:'row'}}>
                            <Image style={{marginRight:10,marginLeft:10}} source={require('../../assets/images/onBoarding/logo-desa.png')} />
                            <Image style={{marginRight:10,marginLeft:10}} source={require('../../assets/images/onBoarding/alma-ata.png')} />
                          </View>
                        <Text style={styles.subTitle}>
                        Aplikasi ini merupakan hasil dari kerjasama antara Desa Guwosari bersama dengan Universitas Alma Ata Yogyakarta
                        </Text>
                      </View>
                    </View>
                  </>,
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: 'black',
          image: <> 
                    <ImageBackground source={require('../../assets/images/onBoarding/onBoarding3.png')} style={styles.Image} >
                      <View style={styles.Overlay} />
                    </ImageBackground>
                    <View style={{position:'absolute',marginTop:100,alignItems:'center',width:'100%',height:'100%'}}>
                      <View style={{marginTop:20}}>
                        <Text style={styles.title}>
                          Cita rasa ingkung yang terbaik
                        </Text>
                        <Text style={styles.subTitle}>
                        Menyajikan cita rasa ingkung terbaik yang belum pernah anda rasakan dan anda temukan sebelumnya dimanapun
                        </Text>
                      </View>
                    </View>
                  </>,
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: 'black',
          image: <> 
                    <ImageBackground source={require('../../assets/images/onBoarding/onBoarding4.png')} style={styles.Image} >
                      <View style={styles.Overlay} />
                    </ImageBackground>
                    <View style={{position:'absolute',marginTop:100,alignItems:'center',width:'100%',height:'100%'}}>
                      <View style={{marginTop:20}}>
                        <Text style={styles.title}>
                          Informasi update tentang desa
                        </Text>
                        <Text style={styles.subTitle}>
                        Informasi terbaru seputar desa mulai dari berita harian, info wisata, kuliner, kegiatan tradisional, geografis, dan masih banyak informasi yang lainnya
                        </Text>
                      </View>
                    </View>
                  </>,
          title: 'Onboarding 4',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
       
        
      ]}
      />
    );
  }
 
  const styles = StyleSheet.create({
    onBoardingText:{
      fontSize:16,
      color:'#fff',
       ...Typography.Heading4
    },
    Image:{
      width:'100%',
      height:'100%',
      opacity:0.3,
      justifyContent:'center',
    },
    Overlay:{
      width:'100%',
      height:'100%',
      backgroundColor:'black',
    },
    text:{
      fontSize:40,
      alignSelf:'center',
      color:'#ffffff',
      
    },
    title:{
      alignSelf:'center',
      color:'#ffffff',
      ...Typography.textBigTitle,
      textAlign:'center'
      
    },
    subTitle:{
      ...Typography.textNormal,
      marginTop:20,
      fontSize:12,
      width:300,
      alignSelf:'center',
      color:'#ffffff',
      textAlign:'center'
    }
  })
  export default OnBoardingScreens;