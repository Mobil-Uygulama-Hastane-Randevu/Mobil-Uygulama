import React, { useState } from 'react'
import { firebase } from '../loginConfig.js'; // Dosya uzantısını ekledik
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import Home from './Home.js';



const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const loginUser = async (email, password) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // Kullanıcı girişi başarılı olduğunda yönlendirme yapabilirsiniz
        navigation.navigate('Home');
      } catch (error) {
        alert(error.message);
      }
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}></Text>
        <View style={styles.inputContainer}>
          {/* E-posta giriş alanını siyah renkle yuvarlak içerik kutusuna al */}
          <View style={[styles.roundedInput, { backgroundColor: '#d6d7cb' }]}>
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="E-posta"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {/* Şifre giriş alanını siyah renkle yuvarlak içerik kutusuna al */}
          <View style={[styles.roundedInput, { backgroundColor: '#d6d7cb' }]}>
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Şifre"
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin')}
          style={styles.signupLink}
        >
          <Text style={styles.signupText}>Hesabınız yok mu? Hemen kaydolun!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
      justifyContent: 'center',
      paddingHorizontal: 50,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 26,
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
      marginTop: 20,
    },
    roundedInput: {
      borderRadius: 45,
      overflow: 'hidden',
      marginBottom: 12,
    },
    input: {
      paddingTop: 20,
      paddingBottom: 10,
      fontSize: 20,
      borderBottomColor: '#000',
      textAlign: 'center',
    },
    button: {
      height: 60,
      width: '100%',
      backgroundColor: '#0c7f57',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 20,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#fff',
    },
    signupLink: {
      marginTop: 20,
    },
    signupText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });