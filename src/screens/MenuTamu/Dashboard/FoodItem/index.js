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

const FoodItem =({navigation, route})=>{
    const {productKey} = route.params;

    const [favorite,setFavorite] = useState(false)
    const [follow,setFollow] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [UID, setUID] = useState('')

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productDescribe, setProductDescribe] = useState('')
    const [productImage, setproductImage] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [productCategory, setProductCategory] = useState('food'); //Category
    const [value, setValue] = useState('available'); //Stok
    const [ImageSource, setImageSource] = useState(null);
    const [data, setData] = useState(null);

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

    const [statusShop, setStatusShop] = useState(false)


    useEffect(() => {  
        setIsLoading(true)
        // GET UID
                const getUIDTemp = (firebase.auth().currentUser.uid);
                setUID(getUIDTemp);
               
                // MyData
                const refMyData = firebase.database().ref('user/buyer/'+getUIDTemp);
                refMyData.on("value", function(snapshot) {
                    setMyName(snapshot.val());
                }, function (errorObject) {
                    // console.log("The read failed: " + errorObject.code);
                    null
                });

                // Status Shop
                firebase.database().ref('shop/status/'+productOwner)
                .on("value", function(snapshot) {
                    setStatusShop(snapshot.val().currentStatus);
                }, function (errorObject) {
                    // console.log("The read failed: " + errorObject.code);
                    null
                });
                
                const ref = firebase.database().ref('product/'+productKey);
                ref.on("value", function(snapshot) {
                    setProductName(snapshot.val().productName);
                    setproductImage(snapshot.val().productImage);
                    setProductPrice(snapshot.val().productPrice);
                    setProductCategory(snapshot.val().productCategory);
                    setProductDescribe(snapshot.val().productDescribe);
                    setProductOwner(snapshot.val().productOwner);
                    setValue(snapshot.val().productStock);        
                    
                        const refMyData = firebase.database().ref('user/seller/'+snapshot.val().productOwner);
                        refMyData.on("value", function(snapshot) {
                            setProfileShopImage(snapshot.val().profileImage);
                        }, function (errorObject) {
                            // console.log("The read failed: " + errorObject.code);
                            null
                        });

                }, function (errorObject) {
                    // console.log("The read failed: " + errorObject.code);
                    null
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
        // const refFollow = firebase.database().ref('userFollow/'+productOwner+'/'+UID)
        // refFollow.on("value", function(snapshot) {
        //     const myEvent = snapshot.val();
        //     console.log('FOLLOWERS COUNT NULL=>',myEvent)
        //     setFollow(myEvent.follow)
    // });

        // Follow Database
        const productRef = firebase.database().ref('product/'+productKey);
        productRef.on("value", function(snapshot) {
            setProductOwner(snapshot.val().productOwner);
            const TempOwner= snapshot.val().productOwner
            
            const refFollowers = firebase.database().ref('userFollow/'+(snapshot.val().productOwner)+'/event/'+user)
            refFollowers.on("value", function(snapshot) {

            console.log('ini produk owner=>',TempOwner);
            console.log('ini UID ku =>',user);
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
    // console.log("The read failed: " + errorObject.code);
    null
});



    // follow  Count            
        // const getUIDTemp = (firebase.auth().currentUser.uid);
        // setUID(getUIDTemp);
        
        // const refFollowCount = firebase.database().ref('userFollowersCount/'+getUIDTemp)
        // refFollowCount.on("value", function(snapshot) {
        //     const myEvent = snapshot.val();
        //     myEvent==null?
        //     console.log('')
        //     :
        //     setFollowCount(myEvent.followers)
        // });

    
    //Review
    const refReview = firebase.database().ref('productReview/'+productKey)
    refReview.on("value", function(snapshot) {
        const myEvent = snapshot.val();
        console.log(myEvent)
        
        setData({  
            ...snapshot.val()  
        }); 
        setIsLoading(false)

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

        // list buyer follow
        firebase.database().ref('userBuyerFollow/'+UID+'/seller/'+productOwner)
        .set({
            productOwner:productOwners,
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

        firebase.database().ref('userBuyerFollow/'+UID+'/seller/'+productOwner).remove()

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


    const addTrolly =()=>{
        const db = firebase.database().ref('trolly/'+UID+'/trollyList/'+productKey)
        db
        .set({
          productKey: productKey,
          productName: productName,
          productDescribe: productDescribe,
          productPrice: productPrice,
          productQuantity:0,
          productImage:productImage,
          productOwner:productOwner
        }
            
    )

    Alert.alert('Berhasil Ditambahkan ke troli')

    // Alert.alert(
    //     'Anda Yakin Akan Menghapus Item Ini?',
    //     '',
    //     [
    //         { text: 'Batal', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //         { text: 'Hapus', onPress: () => deleteData()}
    //     ],
    //     { cancelable: false }
    // );

    }

    return(
        <>
        <View style={{flex:10}}>

            <ImageBackground style={{width:'100%',height:300, flex:1}} source={{uri:productImage}}>
            <View style={{width:'100%',height:300, backgroundColor:'black', position:'absolute',opacity:0.4}} />
            <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
                <Icon name='close' size={30} style={{color:'white', alignSelf:'flex-end', padding:10}} />
            </TouchableOpacity>

                <View style={{padding:10, marginTop:10}}> 
                    <View>
                        {follow==true?
                            <TouchableOpacity 
                            onPress={followHandler}
                            style={{backgroundColor:'green', width:100, borderRadius:5, paddingVertical:5, paddingLeft:10, paddingRight:15}}>
                                    <Text style={{...Colors.whiteText, ...Typography.Heading4, alignSelf:'center'}}>Mengikuti</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                            onPress={followHandler}
                            style={{...Colors.primary, width:100, borderRadius:5, paddingVertical:5, paddingLeft:10, paddingRight:15}}>
                                    <Text style={{...Colors.whiteText, ...Typography.Heading4, alignSelf:'center'}}>+ Ikuti</Text>
                            </TouchableOpacity>
                           }
                        
                           <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                             {statusShop==true?
                                <>
                                    <Icon name='circle' color='#469E70' size={15} style={{marginBottom:3, marginRight:5}}/>
                                    <Text style={{...Typography.Heading4,...Colors.whiteText}}>Buka</Text>
                                </>
                                :
                                <>
                                    <Icon name='circle' color='red' size={15} style={{marginBottom:3, marginRight:5}}/>
                                    <Text style={{...Typography.Heading4,...Colors.whiteText}}>Tutup</Text>
                                </>
                            }
                            </View>

                           
                    </View>
                    <Text style={{...Typography.textTitle, ...Colors.whiteText}}>
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
                                <Text style={{color:'#F2C94C', ...Typography.Heading4}}>Belum ada rating</Text>
                                </View> 
                              :
                              finalRating==1?
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Text style={{color:'#F2C94C', ...Typography.Heading3, alignItems:'center'}}>2/5</Text>
                                </View> 
                                :
                                finalRating==2?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Text style={{color:'#F2C94C', ...Typography.Heading3, alignItems:'center'}}>2/5</Text>
                                </View> 
                                :
                                finalRating==3?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Text style={{color:'#F2C94C', ...Typography.Heading3, alignItems:'center'}}>3/5</Text>
                                </View> 
                                :
                                finalRating==4?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star-o" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Text style={{color:'#F2C94C', ...Typography.Heading3, alignItems:'center'}}>4/5</Text>
                                </View> 
                                :
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Icon name="star" size={15} color="#F2C94C" style={{marginRight:2}} />
                                <Text style={{color:'#F2C94C', ...Typography.Heading3, alignItems:'center'}}>5/5</Text>
                                </View> 
                          }

                </View>

            </ImageBackground>
            
            <ScrollView style={{marginTop:-70, borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor:'white', padding:10, height:'100%', flex:5}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:20}}>
                    <View style={{flex:1}}>
                        <Text style={{...Colors.primText, ...Typography.HeadingBold3}}>
                            Rp. {productPrice}
                        </Text>  
                    </View>
                    <View style={{flex:1,width:'100%', alignItems:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={favoriteHandler}>
                                {favorite==true?
                                <MaterialIcons name='favorite' size={26} style={{color:'red', alignSelf:'flex-end', marginRight:10}} />
                                :
                                <MaterialIcons name='favorite-border' size={26} style={{color:'silver', alignSelf:'flex-end', marginRight:10}} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('MessageItem', {productOwner:productOwner, profileShopImage:profileShopImage})}>
                                <MaterialIcons name='chat' size={28} style={{...Colors.primTextLight, alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
 
                <View style={{marginVertical:10}}>
                    <Text style={{...Colors.primText, ...Typography.HeadingBold3}}>Deskripsi Produk</Text>  
                    <View style={{flex:1}}>
                        <Text style={{...Colors.textSilver, ...Typography.Heading4}}>
                        {productDescribe}
                        </Text>
                    </View>
                </View>

                <View style={{marginVertical:20}}>
                    <Text style={{...Colors.primText, ...Typography.HeadingBold3}}>Komentar pembeli</Text>  
                    
{
    data==null?
    <Text>Jadilah Orang Pertama yang Memberi Ulasan</Text>
    :

                Object.keys(data).map((key) => (
                        <View key={key} >
                        
                        <View style={{marginBottom:20}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View>
                                <Icon name='user-circle-o' size={40} color='silver' />
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{...Colors.primText, ...Typography.HeadingBold4}}>
                                {data[key].reviewerName}
                                </Text>
                                <Rating
                                    rating
                                    startingValue={data[key].rating}
                                    // onFinishRating={setRating}
                                    readonly={true}
                                    style={{ paddingVertical: 10 }}
                                    imageSize={15}
                                />
                            </View>
                        
                        </View>
                            <Text style={{...Colors.textSilver, ...Typography.Heading4}}>
                            {data[key].review}
                            </Text>
                    </View>
                    </View>
                ))
                 
}
                    
                 

                    <View style={{borderRadius:10,borderBottomWidth:2, borderBottomColor:'silver', marginVertical:10}} />
                    
                    {review==true?
                    <View>
                        <Text style={{...Colors.primTextLight, ...Typography.Heading5}}>
                        Ulasan
                        </Text>
                        <View>
                            <TextInput placeholder="Ulasan" 
                                value={commentReview}
                                onChangeText={setCommentReview}
                                multiline = {true}
                                numberOfLines = {10}
                                // onFinishRating={ratingCompleted}
                                style={{
                                    borderWidth:2,
                                    borderRadius:10,
                                    textAlignVertical:'top',
                                    borderColor:'#E3A46E',
                                    height:100,
                                    padding:10,
                                    ...Typography.textNormal,
                                    ...Colors.primText,
                                    marginBottom:10
                            }} 
                                />
                                
                            <Text style={{...Colors.primTextLight, ...Typography.Heading5}}>
                            Beri Rating
                            </Text>
                            <Rating
                                showRating
                                rating
                                startingValue={3}
                                onFinishRating={setRating}
                                style={{ paddingVertical: 10 }}
                                imageSize={30}
                            />
                            <Text style={{color:'orange', ...Typography.textNormal, textAlign:'center'}}>
                                Geser gambar bintang untuk mengubah
                            </Text>
                           
                            {commentReview==''?
                                <View>
                                    <TouchableOpacity style={{marginTop:10,alignSelf:'center', ...Colors.silver, borderRadius:10,padding:10,width:'100%', alignItems:'center'}}>
                                    <Text style={{...Colors.whiteText, ...Typography.HeadingBold4}}>
                                        Kirim
                                    </Text>
                                    </TouchableOpacity>
                                    <Text style={{...Colors.textSilver, ...Typography.Heading4, textAlign:'center'}}>
                                        Ulasan anda tidak boleh kosong untuk dapat mengirim
                                    </Text>
                                </View>
                               :
                                <TouchableOpacity onPress={reviewSubmit} style={{marginTop:10,alignSelf:'center', ...Colors.primLight, borderRadius:10,padding:10,width:'100%', alignItems:'center'}}>
                                <Text style={{...Colors.whiteText, ...Typography.HeadingBold4}}>
                                    Kirim
                                </Text>
                                </TouchableOpacity>
                           }     
                        </View>
                            <TouchableOpacity onPress={reviewHandle} style={{alignSelf:'center', borderRadius:10,padding:10, flexDirection:'row'}}>
                            <Icon name='arrow-left' size={15} color='#828282' style={{alignSelf:'center', marginHorizontal:10}} />
                            <Text style={{...Colors.textSilver, ...Typography.extraSmallBoldTitle}}>
                                Tutup Ulasan Dan Rating
                            </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={reviewHandle} style={{alignSelf:'center', borderRadius:10,padding:10, flexDirection:'row'}}>
                        <Text style={{...Colors.textSilver, ...Typography.extraSmallBoldTitle}}>
                            Beri Ulasan Dan Rating
                        </Text>
                        <Icon name='arrow-right' size={15} color='#828282' style={{alignSelf:'center', marginHorizontal:10}} />
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>

                <View style={{backgroundColor:'white', flex:0.2, flexDirection:'row', width:'100%', borderTopWidth:2,borderTopColor:'silver', justifyContent:'space-between', paddingHorizontal:10, paddingTop:10}}>
                    <TouchableOpacity style={{borderRadius:10, backgroundColor:'#E3A46E', width:'100%', height:'100%',alignItems:'center', justifyContent:'center',paddingHorizontal:10}}>
                        <Text style={{...Colors.whiteText, ...Typography.HeadingBold3}}>Beli sekarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addTrolly} style={{borderRadius:10, backgroundColor:'#AC946F', width:'100%', height:'100%',alignItems:'center', justifyContent:'center',paddingHorizontal:5}}>
                        <Text style={{...Colors.whiteText, ...Typography.extraSmallBoldTitle}}>Tambahkan Ke troli</Text>
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

export default FoodItem


