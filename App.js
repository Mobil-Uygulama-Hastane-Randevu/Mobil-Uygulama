import React, {useState,useEffect } from 'react'
import { SafeAreaView ,StyleSheet, ScrollView, Text, View, StatusBar, Dimensions,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { firebase } from './loginConfig.js';

import Home from './Screens/Home';
import Detail from './Screens/Detail';
import CreateAppointment from './Screens/CreateAppointment';
import Randevu from './Screens/Randevu';
import Profil from './Screens/Profil';
import Footer from './Components/Footer'; // Footer component'inin bulunduğu dizini doğru şekilde güncelleyin
import Header from './Components/Header'; // Footer component'inin bulunduğu dizini doğru şekilde güncelleyin
import Login from './Screens/Login.js'
import Signin from './Screens/Signin.js'


const Stack = createStackNavigator();


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
  }

  useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
  }, []);

  
  if (initializing) return null;

  if (!user) {
      return (
          <Stack.Navigator>
              <Stack.Screen
                  name="Login"
                  component={Login}
                  
              />

              <Stack.Screen
                  name="Signin"
                  component={Signin}
                  
              />
              
              

          </Stack.Navigator>
      );
  }
  return (
      <Stack.Navigator screenOptions={{headerShown : false}}>

        <Stack.Screen
          name ='Home'
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

  )
};
  export default () => {
    return (
        <NavigationContainer>
          <App/>
        </NavigationContainer>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

/*

export default function App() {
  
  return (
      <NavigationContainer style={styles.container}> 
            <Header title={'DoctorApp'} icon={require('./assets/logo.png')}/>
            <Stack.Navigator screenOptions={{headerShown : false}}>
              
              <Stack.Screen
                name ='Home'
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
};*/