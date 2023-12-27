import React, {useState} from 'react'
import { SafeAreaView ,StyleSheet, ScrollView, Text, View, StatusBar, Dimensions,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './Screens/Home';
import Detail from './Screens/Details';

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
            name='Detail'
            component={Detail}
          />
        </Stack.Navigator>
        
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
