import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Pressable,
    ActivityIndicator,
    Button, // Make sure this import is present
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

const images = [
    'https://www.sigortadunyasi.com.tr/wp-content/uploads/2021/01/saglik-1.jpg',
    'https://www.akgunyazilim.com.tr/uploads/sectorproductsdigerfoto/1602081961dc40.jpg',
    'https://assets.kpmg.com/is/image/kpmg/saglik-turizmi:cq5dam.web.512.341',
    'https://www.marketingturkiye.com.tr/wp-content/uploads/2022/08/saglik.png',
];

const staticHastaneData = [
    { key: '1', title: 'Serdivan Devlet Hastanesi', imgUrl: 'https://static.daktilo.com/sites/243/uploads/2023/08/15/serdivan-devlet-hastanesi-1.jpg' },
    { key: '2', title: 'Sakarya Eğitim Araştırma', imgUrl: 'https://static.daktilo.com/sites/243/uploads/2020/08/11/large/sakarya-egitim-ve-arastirma-hastanesi-13-1597129000.jpg' },
    { key: '3', title: 'Toyota Hastanesi', imgUrl: '' },

    // ... diğer hastane verileri
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({ navigation: nav }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [imgActive, setImgActive] = useState(0);

    useEffect(() => {
        // Simulate loading, replace this with your actual data fetching logic
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
            );
            if (slide !== imgActive) {
                setImgActive(slide);
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image style={styles.hastaneImage} source={{ uri: item.imgUrl }} />
            <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
            >
                {images.map((e, index) => (
                    <Image
                        key={e}
                        resizeMode="stretch"
                        style={styles.wrap}
                        source={{ uri: e }}
                    />
                ))}
            </ScrollView>
            <View style={styles.wrapDot}>
                {images.map((e, index) => (
                    <Text
                        key={e}
                        style={imgActive == index ? styles.dotActive : styles.dot}
                    >
                        ●
                    </Text>
                ))}
            </View>
            <View style={styles.randevuAlButton}>
                <Button title="Randevu Al" onPress={() => navigation.navigate('CreateAppointment')} />
            </View>
            <FlatList
                horizontal
                data={staticHastaneData}
                keyExtractor={(item) => item.key.toString()}
                renderItem={renderItem}
                style={styles.hastaneList}
            />
            
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({

    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
    },
    wrapDot: {
        position: 'absolute',
        buttom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'black',
    },
    randevuAlButton:{
        marginTop:100,
    },
    dot: {
        margin: 3,
        color: 'white'
    },
    hastaneList: {
        marginVertical: 10,
        marginTop:100,
    },
    hastaneImage: {
        width: '100%',
        height: 100,

        borderRadius: 20,
        marginBottom: 10,
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
    container: {
        backgroundColor: '#e5e5e5e',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexdirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemheading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22,
    },
    itemTitle: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'black',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14
    },
});
