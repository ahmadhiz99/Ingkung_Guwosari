import React,{useState, useEffect} from 'react';
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
    Dimensions
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {RadioButton} from 'react-native-paper'
import ImagePicker from 'react-native-image-picker';
import {  Colors, Typography,Layout,Buttons, InputStyle } from '../../../../styles'
import firebase from '../../../../../Database/firebaseDB'

const Item =({route,navigation:{goBack}})=>{
    
const {productKey} = route.params;
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

const [product, setProduct] = useState('');
const [isLoading, setIsLoading] = useState(false)

const [editMode, setEditMode] = useState(false)
const [radioOne, setRadioOne] = useState(''); //Category
const [radioTwo, setRadioTwo] = useState(''); //Stok

const [effect, setEffect] = useState(true)

// const storageRef = storage().ref('images/tempImage1.png');
// const dataUrl = 'data:image/gif;base64,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'
    

const show =()=>{
    const getUIDTemp = (firebase.auth().currentUser.uid);
    setUID(getUIDTemp);
    const ref = firebase.database().ref('product/'+productKey);
    ref.on("value", function(snapshot) {
        setProductName(snapshot.val().productName);
        setproductImage(snapshot.val().productImage);
        setProductPrice(snapshot.val().productPrice);
        setProductCategory(snapshot.val().productCategory);
        setProductDescribe(snapshot.val().productDescribe);
        setValue(snapshot.val().productStock);

        // setRaadioTemporary
        setRadioOne(snapshot.val().productCategory)
        setRadioTwo(snapshot.val().productStock)
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); 
}


useEffect(() => {  
    setIsLoading(true)
    // GET UID
    effect==true? show() : console.log(' Effect Stop');

    setIsLoading(false)
}, [])  


const selectPhotoTapped=()=> {
    const options = {
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
 
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = { uri: response.uri };
        setImageSource(source);
        setData('data:image/jpeg;base64,'+ response.data)
      }
    });
  }

  const deleteData =()=>{
      
    goBack()

    firebase.database()
    .ref('/product/'+productKey)
    .remove()
    console.log("Removee");
    
    // Delete the file
    firebase.storage()
    .refFromURL(productImage)
    .delete().then(function() {
        // File deleted successfully
    }).catch(function(error) {
            // Uh-oh, an error occurred!
    });
  

  }
  
  const back =()=>{
        
        setEffect(false)

        Alert.alert(
        'Anda Yakin Akan Menghapus Item Ini?',
        '',
        [
            {
            text: 'Batal',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
            },
            { 
                text: 'Hapus', 
                onPress: () => deleteData()

            }
        ],
        { cancelable: false }
        );
      
  }

  const update =() =>{
      setIsLoading(true)

      firebase
      .database()
      .ref('product/'+productKey)
      .update({
          productName:productName,
          productDescribe:productDescribe,
          productPrice:productPrice,
          productStock:value,
          productImage:productImage,
          productOwner:UID,
          productCategory:productCategory
        })
        .then(() => 
        message()
    );
  }

  const message=()=>{
    setIsLoading(false)
    Alert.alert('Data Berhasil Diubah')
    setEditMode(false)
  }

    return(
        // <ScrollView style={{backgroundColor:'white'}} >
        //     <View style={styles.container}>
        //         <Text>
        //             {productKey}
        //         </Text>
        //     </View>
        //     </ScrollView>


            <>      
    <ScrollView style={{backgroundColor:'white', padding:10}}>        
  
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={() => goBack()} style={styles.buttonBack}>
            <Icon name="chevron-left" style={{...Colors.primText}} size={20}/>
          </TouchableOpacity>
            <Text style={{ margin:10,...Colors.primText, ...Typography.HeadingBold3}}>Detail Produk</Text>
        </View>

        <View style={{flexDirection:'row', alignSelf:'flex-end'}}>
            {editMode===false?
                <TouchableOpacity onPress={()=>setEditMode(true)} style={{backgroundColor:'orange', padding:10, borderRadius:10,  marginHorizontal:5,alignItems:'center' ,width:60}}>
                    <Text style={{...Colors.whiteText,...Typography.Heading5,}}>
                        Edit
                    </Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=>setEditMode(false)}  style={{backgroundColor:'silver', padding:10, borderRadius:10,  marginHorizontal:5,alignItems:'center' ,width:60}}>
                    <Text style={{...Colors.whiteText,...Typography.Heading5,}}>
                        Edit
                    </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity  onPress={back} style={{backgroundColor:'red', padding:10, borderRadius:10, marginHorizontal:5,alignItems:'center' ,width:60}}>
                <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                    Hapus
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{margin:10}}>
            <Text style={styles.labelInput}>Nama Produk</Text>
            <TextInput editable={(editMode == false) ? false : true}  value={productName} onChangeText={setProductName} placeholder="Contoh: Ingkung Bakar" style={styles.inputText}  />
        </View>

        <View style={{margin:10}}>
            <Text style={styles.labelInput}>Unggah Foto Produk</Text>
            <TouchableOpacity disabled={(editMode == false) ? true : false}  onPress={selectPhotoTapped}>
                    <View style={styles.ImageContainer}>
                        {ImageSource !== null ? 
                        <Image style={styles.ImageContainer} source={ImageSource} />
                        :
                            productImage!==''?
                                <Image style={styles.ImageContainer} source={{uri:productImage}} />
                            :
                                <View style={{height:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}><Icon name='camera' color='grey' size={50} /></View>
                        }
                    </View>
                </TouchableOpacity>

        </View>

        <View style={{margin:10}}>
            <Text style={styles.labelInput}>Harga Produk</Text>
            <TextInput editable={(editMode == false) ? false : true}  value={productPrice} onChangeText={setProductPrice} keyboardType='numeric' placeholder="Contoh: 85000" style={styles.inputText} />
        </View>

        <View style={{margin:10}}>
        <Text style={styles.labelInput}>Kategori</Text>
        <RadioButton.Group disabled={true} onValueChange={value => setProductCategory(value)} value={(editMode == false) ? radioOne : productCategory } >
            <View style={{flexDirection:'column', flexWrap:'wrap', width:'100%'}}>
              <View style={{flexDirection:'row'}}>
                  <RadioButton.Item color="#7C3532" label="Ingkung" labelStyle={{...Typography.textNormal,...Colors.primText}} value="food" style={{marginRight:-15, flexDirection:'row-reverse'}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                  <RadioButton.Item color="#7C3532" label="Kerajinan/Pakaian" labelStyle={{...Typography.textNormal,...Colors.primText}} value="craft" style={{marginRight:-15, flexDirection:'row-reverse'}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                  <RadioButton.Item color="#7C3532" label="Wisata" labelStyle={{...Typography.textNormal,...Colors.primText}} value="tour" style={{marginRight:-15, flexDirection:'row-reverse'}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                  <RadioButton.Item color="#7C3532" label="Lainnya" labelStyle={{...Typography.textNormal,...Colors.primText}} value="other" style={{marginRight:-15, flexDirection:'row-reverse'}}/>
              </View>
           
            </View>
          </RadioButton.Group>
        </View>

        <View style={{margin:10}}>
            <Text style={styles.labelInput}>Deskripsi</Text>
            <TextInput placeholder="Deskripsi" 
            editable={(editMode == false) ? false : true}
            value={productDescribe}
            onChangeText={setProductDescribe}
              multiline = {true}
              numberOfLines = {10}
              style={{
                  borderWidth:2,
                  borderRadius:10,
                  textAlignVertical:'top',
                  borderColor:'#7C3532',
                  height:100,
                  padding:10,
                  ...Typography.textNormal,
                  ...Colors.primText,}} 
                />
        </View>

        <View style={{margin:10}}>
        <Text style={styles.labelInput}>Stok</Text>
        <RadioButton.Group  onValueChange={value => setValue(value)} value={(editMode == false) ? radioTwo : value }>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row'}}>
                <RadioButton.Item color="#7C3532" label="Tersedia" labelStyle={{...Typography.textNormal,...Colors.primText}} value="available" style={{marginRight:-15}}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <RadioButton.Item color="#7C3532" label="Belum Tersedia" labelStyle={{...Typography.textNormal,...Colors.primText}} value="unavailable" style={{marginRight:-15}}/>
            </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={{width:'100%', alignItems:'flex-end', marginBottom:20}}>
          {
            editMode==false?
            <TouchableOpacity  style={{...Colors.silver, padding:10, borderRadius:10}}>
                <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                    Terbitkan
                </Text>
            </TouchableOpacity>
            :
                (productName&&productImage&&productPrice&&productDescribe!=='')?
                <TouchableOpacity onPress={update} style={{...Colors.primary, padding:10, borderRadius:10}}>
                    <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                        Terbitkan
                    </Text>
                </TouchableOpacity>

                :
                <>
                <Text style={styles.labelInput}>Semua data wajib diisi</Text>
                <TouchableOpacity disabled={true} style={{...Colors.silver, padding:10, borderRadius:10}}>
                    <Text style={{...Colors.whiteText,...Typography.Heading5}}>
                        Terbitkan
                    </Text>
                </TouchableOpacity>
            </>
          }
        </View>
    </ScrollView>
        {
            isLoading==true?
                    <ActivityIndicator size="large" color="white" style={{backgroundColor:'black', width:'100%', opacity:0.5, position:'absolute', alignSelf:'center', height: Dimensions.get('window').height}}/>
            :
            null
        }
    </>
    )

}

const styles = StyleSheet.create({
    container:{
        margin:10,
        // backgroundColor:'white'
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
        ...Typography.smallBoldTitle
    },
    detail:{
        height:80,
        ...Typography.Heading5
    },
    buttonReadMore:{
        ...Colors.primary,
        alignSelf:'flex-end',
        borderRadius:5,
        padding:5,
    },
    buttonText:{
        ...Colors.whiteText,
    },

    buttonBack:{
        ...Colors.whiteBackground,
        ...Buttons.buttonBack,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        elevation:5
    },
    labelInput:{
        ...Typography.textNormal,
        ...Colors.primText,
    },
    inputText:{
        ...Typography.textNormal,
        ...Colors.primText,
        ...InputStyle.primInputText,
    },
    ImageContainer:{
        width:'100%',
        height:200,
        backgroundColor:'silver',
        borderRadius:5,
        flexDirection:'column',
        // alignContent:'flex-end',
        // alignSelf:'center',
        alignItems:'center',
        // paddingLeft:'40%'
      }
})

export default Item