import React, {useState,useEffect} from 'react'
import { SafeAreaView ,StyleSheet, ScrollView, Text, View, StatusBar, Dimensions,Image,FlatList, TextInput,TouchableOpacity,Keyboard, Pressable,ActivityIndicator,Button} from 'react-native';
import {firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const images =[
  'https://www.sigortadunyasi.com.tr/wp-content/uploads/2021/01/saglik-1.jpg',
  'https://www.akgunyazilim.com.tr/uploads/sectorproductsdigerfoto/1602081961dc40.jpg',
  'https://assets.kpmg.com/is/image/kpmg/saglik-turizmi:cq5dam.web.512.341',  
  'https://www.marketingturkiye.com.tr/wp-content/uploads/2022/08/saglik.png'
]

const WIDTH= Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Home = ({navigation: nav})=> {
    const[todos, setTodos]=useState([]);
    const todoRef = firebase.firestore().collection('hastane');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();
    
    const [loading, setLoading] = useState(true); 
    const [hastane, sethastane] = useState([]);


    const[imgActive, setimgActive] = useState(0);

    useEffect (() => { 
        todoRef
            .onSnapshot(querySnapshot => {
                const hastane = [];
                querySnapshot.forEach (documentSnapshot=> {
                    hastane.push({
                        ...documentSnapshot.data(),
                        key:documentSnapshot.id,
                    });

                });
                sethastane(hastane);
                setLoading (false);
            });
            return()=> subscriber();
    },[]);

    if(loading){
        return<ActivityIndicator/>
    }

    const onchange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(slide !== imgActive){
                setimgActive(slide);
            }
        }
    }

    
    /*useEffect (()=> {
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
    */

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

                <FlatList
                    horizontal
                    data = {hastane}
                    keyExtractor={(item) => item.key.toString()}

                    renderItem={({item})=>(
                        <View style={styles.itemContainer}>
                            <Image style={styles.image} source={{ uri: item.imageURL }} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                    )}
                >
                </FlatList>
            </View>
            <View style={styles.container}>
                <Button title="Randevu Al" onPress={() => nav.navigate('CreateAppointment')} />
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
    itemContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
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












