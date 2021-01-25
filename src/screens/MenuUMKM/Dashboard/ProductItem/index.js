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

const ProductItem =({screenName})=>{
    const navigation = useNavigation();
    const [data, setData] = useState({})  

    useEffect(() => {  
    // GET UID
    const user = firebase.auth().currentUser.uid;
    console.log(user);
    
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

        console.log();
    // firebase.database().ref('product/'+user).on('value', snapshot => {  
    //     console.log();
    //     // let isMounted = true; // note this flag denote mount status
    //         if (snapshot.val() != null) {  
    //             setData({  
    //                 ...snapshot.val()  
    //             });  
    //             console.log(data);
    //         }  else{
    //             setData({});
    //         }
    //     })  
    }, [])  
    
    return(
        <ScrollView style={styles.container}>
            <View style={{marginHorizontal:10}}>
                <Text style={styles.headerText}>Produk Anda</Text>
            </View>

            {
                Object.keys(data).map((key) => (
                    <View key={key}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate(screenName,{productKey:key})} 
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
    }
})

export default ProductItem