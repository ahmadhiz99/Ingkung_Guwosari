import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Component,
  ImageBackground,
  Button,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {RadioButton} from 'react-native-paper'
import ImagePicker from 'react-native-image-picker';
import firebase from '../../../../Database/firebaseDB'
import storage from '@react-native-firebase/storage';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';


 import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../styles'

//  const navigation = useNavigation();

//  return(
//  <View style={[styles.scene, { backgroundColor: '#ffffff', alignItems:'center', padding:10 }]} >
//    <TouchableOpacity onPress={()=>navigation.navigate('FoodScreen')} style={{marginTop:20}}>
//      <Text style={{...Colors.textSilver, ...Typography.smallTitle}}> BELUM ADA POSTINGAN </Text>
//    </TouchableOpacity>
//  </View>
//  );
const FirstRoute = ({screenName}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({})  
  const [myId, setMyId] = useState('')  

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {  
  // GET UID
  const user = firebase.auth().currentUser.uid;
  setMyId(user)

  
  
  // firebase
  // .database()
  // .ref('activity/')
  // // .orderByChild('productOwner')
  // // .equalTo(user)
  // .on('value', snapshotCheck => {  
  //         if (snapshotCheck.val() != null) {  
            
    // const db = firebase.database().ref('userFollow/'+productOwner+'/event/'+myId)
    firebase.database().ref('userBuyerFollow/'+user+'/seller/')
    .on('value', snapshot2 => { 
                const checkData = ({...snapshot2.val()})
                    Object.keys(checkData).map((key)=>(
                          // console.log('ssss',key)
                                      firebase
                                      .database()
                                      .ref('activity/')
                                      .orderByChild('productOwner')
                                      .equalTo(key)
                                      .on('value', snapshot => {  
                                            setData({  
                                                  ...snapshot.val()  
                                              })
                                            })
                     
                              ))
                  })  



      //     }  else{
      //         setData({});
      //     }
      // })  
      
}, [])  

  return(
  <ScrollView style={styles2.container}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
  >
      {
          Object.keys(data).map((key) => (
              <View key={key} style={{alignItems:'center', marginVertical:5}}>
                 <ActivityItem 
                    myId={myId} 
                    productKey={key} 
                    productOwner={data[key].productOwner} 
                    productOwnerImage={data[key].productOwnerImage} 
                    productOwnerUsername={data[key].productOwnerUsername} 
                    productDescribe={data[key].productDescribe} 
                    productImage={data[key].productImage} 
                  />      
              </View>
          ))
      }
 
 </ScrollView>
)
  }
 

// SecondRoute
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


const SecondRoute = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({})  
  const [myId, setMyId] = useState('')  

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {  
  // GET UID
  const user = firebase.auth().currentUser.uid;
  setMyId(user)
  
  firebase
  .database()
  .ref('activity/')
  // .orderByChild('productOwner')
  // .equalTo(user)
  .on('value', snapshot => {  
          if (snapshot.val() != null) {  
              setData({  
                  ...snapshot.val()  
              });  
          }  else{
              setData({});
          }
      })  
      
}, [])  



  return(
  <ScrollView style={styles2.container}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
  >
      {
          Object.keys(data).map((key) => (
              <View key={key} style={{alignItems:'center', marginVertical:5}}>
                 <ActivityItem 
                    myId={myId} 
                    productKey={key} 
                    productOwner={data[key].productOwner} 
                    productOwnerImage={data[key].productOwnerImage} 
                    productOwnerUsername={data[key].productOwnerUsername} 
                    productDescribe={data[key].productDescribe} 
                    productImage={data[key].productImage} 
                  />      
              </View>
          ))
      }
 
 </ScrollView>
)
}

const ActivityItem=({myId,productKey,productOwner,productOwnerImage,productOwnerUsername,productDescribe, productImage})=>{
  const navigation = useNavigation();

  const [follow,setFollow] = useState(false)
  const [followCount,setFollowCount] = useState(0)
  const [isLoading,setIsLoading] = useState(false)

  const [likeCount,setLikeCount] = useState(0)
  const [favorite,setFavorite] = useState(false)



   // Follow Handler
   const followHandler = () => {
    setFollow(current => !current)
    const followTemp=!follow
    const db = firebase.database().ref('userFollow/'+productOwner+'/event/'+myId)
    db.set({
        follow:followTemp,
    })

    // list buyer follow
    firebase.database().ref('userBuyerFollow/'+myId+'/seller/'+productOwner)
    .set({
        productOwner:productOwner,
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

  firebase.database().ref('userBuyerFollow/'+myId+'/seller/'+productOwner).remove()

    firebase
    .database()
    .ref('userFollowCount/'+productOwner)
    .set({
        followers: followCount - 1 ,            
    })
    setFollowCount(followCount - 1)
}

  
  useEffect(() => {  
  
      const refFollowers = firebase.database().ref('userFollow/'+productOwner+'/event/'+myId)
      refFollowers.on("value", function(snapshot) {

      const myEvent = snapshot.val();
      myEvent==null?
      null
      :
      myEvent.follow==null?
      null
      :
      myEvent.follow==true?
      setFollow(true)
      :
      setFollow(false)
    });


      // FOllow  Count            
      const refFollowCount = firebase.database().ref('userFollowCount/'+myId)
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

    // Favorite Database
    const refFavorite = firebase.database().ref('activityLike/'+productKey+'/event/'+myId)
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
        const refLikeCount = firebase.database().ref('activityLikeCount/'+productKey)
        refLikeCount.on("value", function(snapshot) {
            const myEvent = snapshot.val();
            myEvent==null?
            console.log('')
            :
            setLikeCount(myEvent.likes)
        });
    
      
  })

    //Favorite
      const favoriteHandler = () => {
        setFavorite(current => !current)

        // Uddate to Database
        const favoriteTemp=!favorite
        console.log(favoriteTemp);

        const db = firebase.database().ref('activityLike/'+productKey+'/event/'+myId)
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
        .ref('activityLikeCount/'+productKey)
         .set({
             likes: likeCount + 1 ,
         })
    }
    
    const dislikeHandler=()=>{
      firebase
      .database()
      .ref('activityLikeCount/'+productKey)
      .set({
          likes: likeCount - 1 ,            
      })
    }
    

  return(
    <TouchableOpacity 
    // onPress={()=>navigation.navigate('Item',{productKey:key})} 
    // onPress={likeProductActivityHandler(data[key].productOwner)} 
    style={styles2.itemContainer}>
       
      <View style={{backgroundColor:'white', justifyContent:'space-between', width:'95%', height:50, padding:5, alignItems:'center', flexDirection:'row' }}>
      <View style={{ flexDirection:'row', alignItems:'center', borderTopLeftRadius:10,  borderTopRightRadius:10, }}>
          {productOwnerImage!==''?
            <Image 
            source={{uri:productOwnerImage}}
            style={{marginHorizontal:10, borderRadius:10, width:40, height:40, borderRadius:40}} />
          :
            <View style={{marginHorizontal:10, borderRadius:10, width:40, height:40, borderRadius:40, ...Colors.silver, alignItems:'center', justifyContent:'center'}}>
              <Icon name='user' size={24} style={{...Colors.whiteText}} />
            </View>
          }
           <Text style={{...Typography.HeadingBold5, ...Colors.primText}}>
                {productOwnerUsername}
            </Text>
      </View>
          {follow==true?
            <TouchableOpacity 
            onPress={followHandler}
            style={{borderColor:'green', borderWidth:1, width:100, borderRadius:5, paddingVertical:5, paddingLeft:10, paddingRight:15}}>
                    <Text style={{color:'green', ...Typography.HeadingBold4, alignSelf:'center'}}>Mengikuti</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity 
            onPress={followHandler}
            style={{borderColor:'silver', borderWidth:1, width:100, borderRadius:5, paddingVertical:5, paddingLeft:10, paddingRight:15}}>
                    <Text style={{...Colors.textSilver, ...Typography.Heading4, alignSelf:'center'}}>+ Ikuti</Text>
            </TouchableOpacity>
            }

      </View>
      
        <Image style={styles2.image} source={{uri:productImage}} />

        <View  style={styles2.describe}>
            <Text style={{height:30,...Typography.HeadingBold5, ...Colors.primText}}>
                {productOwnerUsername}
            </Text>
            <Text style={styles2.detail}>
                {productDescribe}
            </Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10, borderTopWidth:1, borderColor:'silver'}}>
          <TouchableOpacity onPress={favoriteHandler} style={{flexDirection:'row', justifyContent:'center', flex:1, alignItems:'center'}}>
            {favorite==true?
              <>
                <AntDesign style={{color:'red', alignItems:'center', marginBottom:5}} name="like1" size={20} />
                <Text style={{...Typography.Heading5, color:'red'}}>
                  Disukai
                </Text>
              </>
              :
              <>
                <AntDesign style={{color:'silver', alignItems:'center', marginBottom:5}} name="like2" size={20} />
                <Text style={{...Typography.Heading5, ...Colors.textSilver}}>
                  Suka
                </Text>
              </>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('ActivityDetail',{productKey:productKey,productOwnerUID:productOwner})} style={{flexDirection:'row', justifyContent:'center', flex:1, alignItems:'center'}}>
            <MaterialCommunityIcons style={{color:'orange', alignItems:'center'}} name="message-bulleted" size={20} />
            <Text style={{...Typography.Heading5, color:'orange'}}>
                Komentar
            </Text>
          </TouchableOpacity>
        </View>
        
    </TouchableOpacity>
  )
}
const styles2 = StyleSheet.create({
  container:{
      backgroundColor:'white'
  },
  headerText:{
      ...Colors.primText,
      ...Typography.smallBoldTitle,
  },
  itemContainer:{
      width:'95%',
      height:400,
      elevation:3,
      backgroundColor:'white',
      borderRadius:10,

  },
  image:{
      width:'100%',
      height:'100%',
      flex:3,
      // borderTopLeftRadius:10,
      // borderTopRightRadius:10,
  },
  describe:{
      flex:1,
      margin:10,
  },
  title:{
      ...Colors.primText,
      ...Typography.extraSmallBoldTitle
  },
  detail:{
      height:50,
      ...Typography.Heading5,
      ...Colors.textSilver
  },
  buttonText:{
      ...Colors.whiteText,
      ...Typography.Heading5
  },
  buttonBack:{
      ...Colors.whiteBackground,
      ...Buttons.buttonBack,
      margin:10,
      justifyContent:'center',
      alignItems:'center',
      elevation:5
  },
})
 
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const Fourth = () => (
  <View style={[styles.scene, { backgroundColor: '#ffffff' }]} />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function ActivityScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'diikuti', title: 'Di ikuti' },
    { key: 'umum', title: 'Umum' },
    // { key: 'terbaru', title: 'Terbaru' },
    // { key: 'vidio', title: 'Vidio' },
  ]);  
  
  const renderScene = SceneMap({
    diikuti: FirstRoute,
    umum: SecondRoute,
    terbaru: ThirdRoute,
    vidio: Fourth,
  });
 
  const renderTabBars = props => (
    <TabBar
      {...props}
      indicatorStyle={{ ...Colors.primary }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ ...Colors.primText, ...Typography.Heading4 }}>
          {route.title}
        </Text>
      )}
    />
  );
  const navigation = useNavigation();

  return (
    
    <>
    <View style={{flexDirection:'row',padding:10,justifyContent:'center',...Colors.whiteBackground}}> 
      <Text style={{flex:5, ...Typography.HeadingBold2,...Colors.primText}}>Aktivitas</Text>
        
      <TouchableOpacity onPress={()=>navigation.navigate('MessageScreen')}>
          <Icon name='envelope' size={24} style={{flex:1,marginLeft:10, marginTop:10, color:'#767676'}} />
      </TouchableOpacity>
    </View>

    <TabView
    renderTabBar={renderTabBars}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
    </>
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});