import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'
import { useNavigation } from '@react-navigation/native';

const ShowProduct =({route})=>{
    const navigation = useNavigation();
    const [data, setData] = useState({})  
    const [myId, setMyId] = useState('')  

    useEffect(() => {  
    // GET UID
    const user = firebase.auth().currentUser.uid;
    console.log(user);
    setMyId(user)
    
    firebase
    .database()
    .ref('product/')
    .orderByChild('productOwner')
    .equalTo(user)
    .on('value', snapshot => {  
        console.log();
        // let isMounted = true; // note this flag denote mount status
            if (snapshot.val() != null) {  
                setData({  
                    ...snapshot.val()  
                });  
                console.log(data);
            }  else{
                setData({});
            }
        })  
        
}, [])  

const search=()=>{
        // firebase
        // .database()
        // .ref('product/')
        // .orderByChild('productOwner')
        // .equalTo(user)
        // .on('value', snapshot => {  
        //     console.log();
        //     // let isMounted = true; // note this flag denote mount status
        //     if (snapshot.val() != null) {  
        //             setData({  
        //                 ...snapshot.val()  
        //             });  
        //             console.log(data);
        //         }  else{
        //             setData({});
        //         }
        //         console.log(dzzata);
        //     })  
    }

    return(
        <ScrollView style={styles.container}>
             <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeAdminTabs')}
           title="LoginScreen" style={styles.buttonBack}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
            <Text onPress={search} style={{ margin:10,...Colors.primText, ...Typography.HeadingBold3}}> Produk Anda</Text>
        </View>

        <View style={{height:50, marginTop:5}}>
            <View style={{flexDirection:'row'}}>
                <TextInput 
                    placeholder="Pencarian"
                    style={[styles.searchField,{backgroundColor:'white', elevation:2, marginHorizontal:20, borderRadius:10,flex:3}]} 
                />
                <View style={{flex:1}}>
                    <TouchableOpacity style={{ width:70, height:'90%', ...Colors.primary, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{...Colors.whiteText, ...Typography.Heading4}}>Cari</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </View>
        
        <View style={{marginHorizontal:10, marginTop:30}}>
            <Text style={styles.headerText}>Produk Anda</Text>
        </View>


            {
                Object.keys(data).map((key) => (
                    <View key={key}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate('Item',{productKey:key})} 
                        style={styles.itemContainer}>
                            <Image style={styles.image} source={{uri:data[key].productImage}} />
                            <View  style={styles.describe}>
                                <Text style={styles.title}>
                                    {data[key].productName}
                                </Text>
                                <Text style={styles.detail}>
                                    {data[key].productDescribe}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            }
            
            </ScrollView>
        )
        
}

const styles = StyleSheet.create({
    container:{
        // margin:10,
        backgroundColor:'white'
    },
    headerText:{
        ...Colors.primText,
        ...Typography.smallBoldTitle,
    },
    itemContainer:{
        flexDirection:'row',
        width:'95%',
        height:160,
        elevation:2,
        backgroundColor:'white',
        borderRadius:10,
        margin:10,

    },
    image:{
        width:140,
        height:'100%',
        flex:1,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
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
        height:30,
        ...Typography.Heading5,
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

export default ShowProduct