import React, {useState} from 'react'
import { SafeAreaView ,StyleSheet, ScrollView, Text, View, StatusBar, Dimensions,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './Screens/Home';
import Detail from './Screens/Detail';
import CreateAppointment from './Screens/CreateAppointment';
import Randevu from './Screens/Randevu';
import Profil from './Screens/Profil';
import Footer from './Components/Footer'; // Footer component'inin bulunduğu dizini doğru şekilde güncelleyin


const Stack = createStackNavigator();


export default function App() {
  
  return (
      <NavigationContainer> 
        
        <Stack.Navigator screenOptions={{headerShown : false}}>
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='Details'
            component={Detail}
          />
          <Stack.Screen 
            name="CreateAppointment" 
            component={CreateAppointment} 
          />
          <Stack.Screen 
            name="Randevu" 
            component={Randevu} 
          />
          <Stack.Screen 
            name="Profil" 
            component={Profil} 
          />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
