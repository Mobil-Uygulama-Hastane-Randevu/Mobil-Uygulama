import React, {useState,useEffect} from 'react'
import { SafeAreaView ,StyleSheet, ScrollView, Text, View, StatusBar, Dimensions,Image,FlatList, TextInput,TouchableOpacity,Keyboard, Pressable,ActivityIndicator} from 'react-native';
import {firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const images =[
  'https://www.sigortadunyasi.com.tr/wp-content/uploads/2021/01/saglik-1.jpg',
  'https://www.akgunyazilim.com.tr/uploads/sectorproductsdigerfoto/1602081961dc40.jpg',
  'https://assets.kpmg.com/is/image/kpmg/saglik-turizmi:cq5dam.web.512.341',  
  'https://www.marketingturkiye.com.tr/wp-content/uploads/2022/08/saglik.png'
]

const WIDTH= Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Home = ()=> {
    const[todos, setTodos]=useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();
    
    const[imgActive, setimgActive] = useState(0);

    const onchange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(slide !== imgActive){
                setimgActive(slide);
            }
        }
    }


    useEffect (()=> {
       todoRef
        .orderBy('createdAt', 'desc') 
        .onSnapshot(
            querySnapShot =>{
                const todos = []
                querySnapShot.forEach((doc) =>{
                    const {heading} = doc.data()
                    todos.push({
                        id:doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        )
    }, [])

    const addTodo=()=>{
        if(addData && addData.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading : addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(()=>{
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error)=>{
                    alert(error);
                })
        }
    }

    return(
        <SafeAreaView style={styles. container}>
            <View style={styles.wrap}>
                <ScrollView
                onScroll={({nativeEvent} ) => onchange (nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                >
                {
                    images.map((e, index) =>
                    <Image
                        key={e}
                        resize Mode='stretch'
                        style={styles.wrap}
                        source={{uri: e}}
                    />
                    )
                }
                </ScrollView>
                <View style={styles.wrapDot}>
                {
                    images.map((e, index) =>
                    <Text
                        key={e}
                        style={imgActive == index ? styles.dotActive: styles.dot}
                    >
                        ●
                    </Text>
                    )
                }  
                </View>
            </View>
            <View style ={{flex:1}}>
                <View style={styles.formcontainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Add A New Todo'
                        placeholderTextColor='#aaaaaa'
                        onChangeText={(heading) => setAddData(heading)}
                        value={addData}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />
                    <TouchableOpacity style={styles.button} onPress={addTodo}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data = {todos}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View>
                            <Pressable
                                style={styles.container }
                                onPress={()=>navigation.navigate('Detail',{item})}
                            >   
                                <View style={styles.innerContainer}>
                                    <Text style={styles.itemHeading}>
                                        {item.heading[0].toUpperCase()+item.heading.slice(1)}
                                    </Text>
                                </View>
                            </Pressable>

                        </View>
                    )}
                >
                </FlatList>
            </View>
        </SafeAreaView>
        
    )

}
export default Home

const styles = StyleSheet.create({
    /*container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },*/
      wrap:{
        width:WIDTH,
        height:HEIGHT*0.25,
      },
      wrapDot:{
        position:'absolute',
        buttom:0,
        flexDirection:'row',
        alignSelf: 'center'
      },
      dotActive:{
        margin: 3,
        color: 'black',
      },
      dot:{
        margin:3,
        color:'white'
      },

    container:{
        backgroundColor:'#e5e5e5e',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexdirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemheading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight:10,
        marginTop:100, 
    },
    input:{
        height: 48,
        borderRadius:5,
        overflow: 'hidden',
        backgroundColor: 'black',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    }, 
    button: {
        height:47,
        borderRadius:5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: 'white',
        fontSize:20
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14
    }
})











