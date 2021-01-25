// import {View}
import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ImageBackground,
} from 'react-native';

import {
    TouchableOpacity,
 } from 'react-native-gesture-handler'

import firebase from '../../../../../../Database/firebaseDB'
import { useNavigation } from '@react-navigation/native';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../../styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HorizontalContent =({route,productName,productImage, productDescribe, productKey})=>{
    const navigation = useNavigation();

    const [data, setData] = useState({})  
    const [favorite,setFavorite] = useState(false);
    const [myID, setMyID] = useState('');
    const [likeCount,setLikeCount] = useState(0)
    const [finalRating, setFinalRating] = useState(0)

    
  useEffect(() => {  
    // GET UID
    const user = firebase.auth().currentUser.uid;
    setMyID(user)

    
    // Attach an asynchronous callback to read the data at our posts reference
    const ref = firebase.database().ref('productLike/'+productKey+'/event/'+user)
    ref.on("value", function(snapshot) {
        const myEvent = snapshot.val();
        myEvent==null?
            console.log(myEvent+' tak ada ==============')
            :
            myEvent.like==null?
            console.log(myEvent+' Like tak ada ==============')
            :
                 myEvent.like==false?
                    console.log(myEvent+' Like ada Tapi False ===============')
                    :
                    setFavorite(true)
                });
                
        // Like Handler
        const refLike = firebase.database().ref('productLikeCount/'+productKey+'/count')
        refLike.on("value", function(snapshot) {
            const likeCountDB = snapshot.val();
            likeCountDB==null?
                // setLikeCount(0)
                console.log('result '+likeCountDB)
                :
                // console.log(likeCountDB)
                setLikeCount(likeCountDB.likes);

        });

    
    // const [finalRating, setFinalRating] = useState(0)
    // Retrieve Review Count            
    const refReviewCount = firebase.database().ref('productReviewCount/'+productKey)
        refReviewCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
        
            if( myEvent==null){
                console.log(myEvent+' NULL REVIEW KOSONG   ======================================= ')
            }else{
                console.log(myEvent,'UNKNOWN');
                setFinalRating(snapshot.val().ratingCount/snapshot.val().reviewerCount)
            }
        });

    
        
}, [])  

 
    const favoriteHandler = () => {
        setFavorite(current => !current)
        const favoriteTemp=!favorite
        
        const db = firebase.database().ref('productLike/'+productKey+'/event/'+myID)
        db.set({
          like:favoriteTemp,
          comment:'Sangat Mantap',
        })

        favoriteTemp==true?
            likeHandler()
            :
            dislikeHandler()
      }


      const likeHandler=()=>{
          // Like
          firebase
          .database()
          .ref('productLikeCount/'+productKey+'/count')
           .set({
               likes: likeCount + 1 ,
           })
           setLikeCount(likeCount+1)
      }
      
      const dislikeHandler=()=>{
        firebase
        .database()
        .ref('productLikeCount/'+productKey+'/count')
        .set({
            likes: likeCount - 1 ,            
        })
        setLikeCount(likeCount-1)
      }

      return(
    <> 

                     
        <View style={{flexDirection:'row',margin:5}}>
                <ImageBackground 
                    source={{uri:productImage}} 
                    style={styles.imageContent}
                    borderRadius={10}
                    >
                <View style={styles.overlay}/>

                <View style={{margin:10,}}>
                    <View style={{alignSelf:'flex-end'}}>
                        <TouchableOpacity onPress={favoriteHandler}>
                            {
                                favorite==true?
                            <MaterialIcons name='favorite' size={30} color='red' />
                            :
                            <MaterialIcons name='favorite-border' size={30} color='#FFFFFF' />
                        }
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:60}}>
                        <Text style={{...Colors.whiteText, ...Typography.extraSmallBoldTitle}}>
                        {productName}
                        </Text>
                        {
                              finalRating==0?
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                              :
                              finalRating==1?
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                                :
                                finalRating==2?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                                :
                                finalRating==3?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                                :
                                finalRating==4?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                                :
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                </View> 
                          } 
                        <Text style={{...Colors.whiteText, ...Typography.textNormal    }}>
                        {productDescribe}
                        </Text>
                    
                    </View>
                </View>
                </ImageBackground>
                
            </View>          
        {/* </View> */}
        {/* ))
    } */}
    </>
    )
}

const styles = StyleSheet.create({
    imageContent:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        width:170,
        height:270,
    },
    overlay:{
        width:170,
        height:270,
        backgroundColor:'#E3A46E',
        borderRadius:10,
        opacity:0.6,
        position:'absolute',
        
    },

})

export default HorizontalContent