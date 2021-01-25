import React,{useState, useEffect}  from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  ImageBackground,
  Button,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
 
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from '../../../../../Database/firebaseDB'

import {Colors, Typography} from '../../../../styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { set } from 'react-native-reanimated';

const ActivityDetail =({navigation, route})=>{
    const {productKey} = route.params;
    const {productOwnerUID} = route.params;

    const [favorite,setFavorite] = useState(false)
    const [follow,setFollow] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [UID, setUID] = useState('')
    
    const [productImage, setproductImage] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [productOwnerUsername, setProductOwnerUsername] = useState('');
    const [productDescribe, setProductDescribe] = useState('')

    const [text, setText] = useState('')
    const [mention, setMention] = useState('')



    const [likeCount,setLikeCount] = useState(0)
    const [followCount,setFollowCount] = useState(0)
    const [review,setReview] = useState(false)
    const [commentReview,setCommentReview] = useState('')
    const [rating,setRating] = useState(3)
    
    const [myName,setMyName] = useState('')
    const [profileShopImage,setProfileShopImage] = useState('')
    
    const [ratingCount,setRatingCount] = useState(0)
    const [reviewerCount,setReviewerCount] = useState(0)
    
    const [finalRating, setFinalRating] = useState(0)

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productCategory, setProductCategory] = useState('food'); //Category
    const [value, setValue] = useState('available'); //Stok
    const [ImageSource, setImageSource] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {  
        setIsLoading(true)
        // GET UID
                const getUIDTemp = (firebase.auth().currentUser.uid);
                setUID(getUIDTemp);
               
                // MyData
                const refMyData = firebase.database().ref('user/buyer/'+getUIDTemp);
                refMyData.on("value", function(snapshot) {
                    setMyName(snapshot.val().name);
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

                // // Mention Data
                // firebase.database().ref('user/seller/'+productOwner);
                // refMyData.on("value", function(snapshot) {
                //     setMyName(snapshot.val().name);
                // }, function (errorObject) {
                //     console.log("The read failed: " + errorObject.code);
                // });
                
                const ref = firebase.database().ref('activity/'+productKey);
                ref.on("value", function(snapshot) {
                    console.log(productKey);
                    setproductImage(snapshot.val().productImage);
                    setProductOwner(snapshot.val().productOwner);
                    setProductOwnerUsername(snapshot.val().productOwnerUsername);
                    setProductDescribe(snapshot.val().productDescribe);
                    // setProductName(snapshot.val().productName);
                    // setproductImage(snapshot.val().productImage);
                    // setProductPrice(snapshot.val().productPrice);
                    // setProductCategory(snapshot.val().productCategory);
                    // setValue(snapshot.val().productStock);        
                    
                        // const refMyData = firebase.database().ref('user/seller/'+snapshot.val().productOwner);
                        // refMyData.on("value", function(snapshot) {
                        //     setProfileShopImage(snapshot.val().profileImage);
                        // }, function (errorObject) {
                        //     console.log("The read failed: " + errorObject.code);
                        // });

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

                loadData();
                
    }, [])  


    // Load Data
    const loadData =()=>{
        // GET UID
    const user = firebase.auth().currentUser.uid;
    setUID(user)

    
    // Favorite Database
    const refFavorite = firebase.database().ref('productLike/'+productKey+'/event/'+user)
    refFavorite.on("value", function(snapshot) {
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

                
        // Like  Count            
        const refLikeCount = firebase.database().ref('productLikeCount/'+productKey)
        refLikeCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
            myEvent==null?
            console.log('')
            :
            setLikeCount(myEvent.likes)
        });
    
        // Follow Database
        const productRef = firebase.database().ref('activity/'+productKey);
        productRef.on("value", function(snapshot) {
            setProductOwner(snapshot.val().productOwner);
            const TempOwner= snapshot.val().productOwner
            
            const refFollowers = firebase.database().ref('userFollow/'+(snapshot.val().productOwner)+'/event/'+user)
            refFollowers.on("value", function(snapshot) {

            const myEvent = snapshot.val();
            myEvent==null?
            console.log(myEvent+' tFOLLOW NDAKak ada ==============')
            :
            myEvent.follow==null?
            console.log('============'+myEvent+' FOLOW tak ada ==============')
            :
            myEvent.follow==true?
            setFollow(true)
                    :
                    console.log(myEvent+' FOLOW NDAK ADA TAPI FALSEe ===============')
                    });

            //Commnet
            const refReview = firebase.database().ref('activityComment/'+productKey+'/comment/')
            refReview.on("value", function(snapshot) {
                const myEvent = snapshot.val();
                console.log(myEvent)
                setData({  
                    ...snapshot.val()  
                }); 
                setIsLoading(false)

            });
    

            // FOllow  Count            
            const refFollowCount = firebase.database().ref('userFollowCount/'+TempOwner)
            refFollowCount.on("value", function(snapshot) {
                const myEvent = snapshot.val()
                if(myEvent==null){
                    console.log('FOLLOWERS COUNT NULL')
                }else{
                    console.log(myEvent)
                    setFollowCount(myEvent.followers)
                    console.log('ilililililililililililililili')
                }
                setIsLoading(false)
            });
                                
}, function (errorObject) {
console.log("The read failed: " + errorObject.code);
});
    
    
    // Retrieve Review Count            
    const refReviewCount = firebase.database().ref('productReviewCount/'+productKey)
        refReviewCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
        
            if( myEvent==null){
                console.log(myEvent+' NULL REVIEW KOSONG   ======================================= ')
            }else{
                setReviewerCount(snapshot.val().reviewerCount)
                setRatingCount(snapshot.val().ratingCount)
                console.log(myEvent,'UNKNOWN');
                setFinalRating(snapshot.val().ratingCount/snapshot.val().reviewerCount)
            }
        });
    }
   

      //Favorite
      const favoriteHandler = () => {
        setFavorite(current => !current)

        // Uddate to Database
        const favoriteTemp=!favorite
        console.log(favoriteTemp);

        const db = firebase.database().ref('productLike/'+productKey+'/event/'+UID)
        db.set({
          like:favoriteTemp,
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
        .ref('productLikeCount/'+productKey)
         .set({
             likes: likeCount + 1 ,
         })
    }
    
    const dislikeHandler=()=>{
      firebase
      .database()
      .ref('productLikeCount/'+productKey)
      .set({
          likes: likeCount - 1 ,            
      })
    }
    
    
    // Follow Handler
    const followHandler = () => {
        setFollow(current => !current)
        const followTemp=!follow
        const db = firebase.database().ref('userFollow/'+productOwner+'/event/'+UID)
        db.set({
            follow:followTemp,
        })

        followTemp==true?
            followCountHandler()
            :
            unfollowCountHandler()
    }
        
    const followCountHandler=()=>{   
        firebase
        .database()
        .ref('userFollowCount/'+productOwner)
        .set({
            followers: followCount+1 ,
        })
        setFollowCount(followCount+1)
        console.log(followCount+1,'====>Follow Count + 1');
    }
        
        // unfollow
    const unfollowCountHandler=()=>{
        firebase
        .database()
        .ref('userFollowCount/'+productOwner)
        .set({
            followers: followCount - 1 ,            
        })
        setFollowCount(followCount - 1)
    }
    

    const reviewHandle =()=>{
        setReview(current => !current)
    }

    const reviewSubmit=()=>{        
        const db = firebase.database().ref('productReview/'+productKey+'/'+UID)
        db
        .set({
          review: commentReview,
          rating: rating,
          reviewerUID: UID,
          reviewerName: myName.name,
        })

        // Count Review
        const finalRatingCount = rating+ratingCount
        const finalReviewerCount = reviewerCount+1
        const dbReviewCount = firebase.database().ref('productReviewCount/'+productKey)
        dbReviewCount
        .set({
          ratingCount:finalRatingCount,
          reviewerCount:finalReviewerCount
        })
        
        Alert.alert('Ulasan Anda Berhasil Ditambahkan')
        setCommentReview('')
        reviewHandle(false)
    }

    const sendMessage =()=>{
        const today = new Date();
        const date = today.getDate  () + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        const time = today.getHours() + ":"+ today.getMinutes();

        console.log(text);
        setText('')
        
          const message=  firebase
                            .database()
                            .ref('activityComment/'+productKey+'/comment/')
                            .push({
                                productOwner:productOwner  ,
                                message:text,
                                UID:UID,
                                username:myName,
                                messageDate:date,
                                messageTime:time,
                                type:'buyer',
                                mention: productOwnerUsername,
                                // usernameBuyer:usernameBuyer,
                                // usernameOwner:usernameOwner,
                                // productKey: productKey,
                                // productDescribe: productDescribe,
                                // productPrice: productPrice,
                                // productQuantity:productQuantity,
                                // productImage:productImage,
                                // userOrderID:userOrderID,
                                // orderTime:date
                                // profileImage:sellerProfileImage,
                                // buyerUsername:UID.email,
                            }).getKey()
                            
                // Add to Message buyer route
                // profileShopImage==''?
                // firebase
                // .database()
                // .ref('MessageBuyerRoute/'+UID+'/seller/'+productOwner)
                // .set({
                
                //     message:text,
                //     buyerUserID:UID,
                //     sellerUserID:productOwner,
                //     type:'buyer',
                //     usernameBuyer:usernameBuyer,
                //     usernameOwner:usernameOwner,
                //     // profileImage:sellerProfileImage,
                //     profileImage:profileShopImage,
                //     messageDate:date,
                //     messageTime:time,
                
                // })
                // :
                // firebase
                // .database()
                // .ref('MessageBuyerRoute/'+UID+'/seller/'+productOwner)
                // .set({
                
                //     message:text,
                //     buyerUserID:UID,
                //     sellerUserID:productOwner,
                //     type:'buyer',
                //     usernameBuyer:usernameBuyer,
                //     usernameOwner:usernameOwner,
                //     profileImage:sellerProfileImage,
                //     // profileImage:profileShopImage,
                //     messageDate:date,
                //     messageTime:time,
                
                // })
          

                // // Add to Message seller
                // firebase
                // .database()
                // .ref('MessageSeller/'+productOwner+'/buyer/'+UID+'/message')
                // .push({
                
                //     message:text,
                //     buyerUserID:UID,
                //     sellerUserID:productOwner,
                //     type:'buyer',   
                //     usernameBuyer:usernameBuyer,
                //     usernameOwner:usernameOwner,
                //     messageDate:date,
                //     messageTime:time,
                // })

                // // Add to Message seller route
                // firebase
                // .database()
                // .ref('MessageSellerRoute/'+productOwner+'/buyer/'+UID)
                // .set({
                
                //     message:text,
                //     buyerUserID:UID,
                //     type:'buyer',
                //     sellerUserID:productOwner,
                //     usernameBuyer:usernameBuyer,
                //     usernameOwner:usernameOwner,
                //     profileImage:myProfileImage,
                //     messageDate:date,
                //     messageTime:time,
            
                // })

    }

    const mentionHandler=()=>{
        setMention(productOwnerUsername)
    }


    return(
        <>
            <ScrollView style={{backgroundColor:'white', flex:9}}>
                <View>
                    <ImageBackground style={{width:'100%',height:300}} source={{uri:productImage}}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Activity')}>
                        <Icon name='close' size={30} style={{color:'white', alignSelf:'flex-end', padding:10}} />
                    </TouchableOpacity>
                    </ImageBackground>
                    <View  style={{flex:1, margin:10,}}>
                        <Text style={{height:30,...Typography.HeadingBold5, ...Colors.primText}}>
                            {productOwnerUsername}
                        </Text>
                        <Text style={{ height:50,...Typography.Heading5, ...Colors.textSilver}}>
                            {productDescribe}
                        </Text>
                    </View>
                </View>

                <View style={{marginHorizontal:10}}  >
                    <Text style={{...Typography.HeadingBold3, ...Colors.primTextLight}}>
                        Komentar
                    </Text>
                    <Text style={{...Typography.Heading5, ...Colors.textSilver}}>
                        <View>
                            {data==null?
                                <Text>Belum ada komentar</Text>
                                :
                                Object.keys(data).map((key) => (
                                    <View key={key} style={{marginVertical:10}}>
                                        <Text style={{...Typography.HeadingBold5, ...Colors.primText}}>{data[key].username}</Text>
                                            <View style={{flexDirection:'row'}}>
                                                {/* <Text style={{...Typography.Heading5, ...Colors.primTextLight}}>
                                                    @{productOwnerUsername} 
                                                </Text> */}
                                                <Text style={{...Typography.Heading5, ...Colors.textSilver}}>{data[key].message}</Text>
                                            </View>
                                            {/* <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity>
                                                    <Text style={{...Typography.Heading5, color:'orange', marginRight:10}}>Balas</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={{...Typography.Heading5, color:'orange'}}>Suka</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                    </View>
                                ))
                            }
                        </View>
                    </Text>
                </View>
            </ScrollView>

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'white'}}>         
                <View style={{flexDirection:'row', alignItems:'center', flex:0.8, backgroundColor:'white', padding:10}}>
                    <TextInput value={text} onChangeText={setText} placeholder='Tulis Komentar Anda' style={{backgroundColor:'white', width:'100%', marginHorizontal:10,borderRadius:10, borderColor:'silver', borderWidth:1, ...Typography.Heading4, height:50}} /> 
                </View>
                <View style={{flexDirection:'row', flex:0.2, justifyContent:'center'}}>
                    <TouchableOpacity disabled={text==''?true:false} onPress={sendMessage} style={{borderRadius:10}}>
                        <Icon name='send' size={26} style={text==''?{...Colors.textSilver}:{...Colors.primText}}> </Icon>
                    </TouchableOpacity>
                </View>
            </View>

            {
                isLoading==true?
                        <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
                :
                null
            }
        </>
        
    )
}

export default ActivityDetail


