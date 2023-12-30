import React from 'react';
import { View, Text } from 'react-native';
import Footer from '../Components/Footer'; // Footer component'inin bulunduğu dizini doğru şekilde güncelleyin
import Header from '../Components/Header';


const Profil = () => {
  return (
    <View>
                  <Header title={'DoctorApp'} icon={require('../assets/logo.png')} />

      <Text>Randevu Oluştur</Text>
      <Footer/>
    </View>
  );
};

export default Profil;