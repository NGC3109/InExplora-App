import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de tener esta librería
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/users/userActions';
import { Alert } from '../components/ui/Alert';
import { styles } from '../styles/login/signIn';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
  });
  const handleLogin = async () => {
    setLoading(true);
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const firebaseResult = await auth().signInWithCredential(googleCredential);
        
        const { email } = firebaseResult.user;
        dispatch(getUser(email));
        console.log('email: ',email )
        navigation.navigate("MainTabs");
        // Verificar la respuesta del backend
        // if (response.status === 201) {
        //     // Usuario creado exitosamente, procede según sea necesario
        //     navigation.navigate("MainTabs");
        // } else {
        //     // Manejar respuesta no exitosa, según sea necesario
        //     console.error('Error en la creación del usuario en el backend');
        // }
    } catch (error) {
        console.error('Error de autenticación o conexión con el backend:', error);
        setAlert(true)
    } finally {
        setLoading(false);
    }
  };
  const handleEmailLogin = async () => {
    setLoading(true);
    setAlert(false);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      dispatch(getUser(response.user.email));
      navigation.navigate("MainTabs");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text 
          style={styles.welcomeBack} 
          accessibilityLabel='Bienvenidos'
        >Bienvenidos 👋</Text>
        <Text 
          style={styles.signInText} 
          accessibilityLabel='Inicia sesion y comienza con la gran aventura de descubrir lo InExplora-do'
        >Inicia sesion y comienza con la gran aventura de descubrir lo InExplora-do</Text>
        <TextInput
           style={styles.input}
           placeholder="Correo electrónico"
           value={email}
           accessibilityLabel='Correo electrónico'
           onChangeText={setEmail}
           autoCapitalize="none"
           keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          accessibilityLabel='Contraseña'
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            accessibilityLabel='Olvidaste tu contraseña?'
          >
            <Text style={styles.forgotPassword}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={handleEmailLogin} 
          disabled={loading}
          accessibilityLabel="Iniciar sesión con correo y contraseña"
        >
          <Text style={styles.signInButtonText}>Iniciar sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('signup')}
          accessibilityLabel="Crear una nueva cuenta"
        >
            <Text style={styles.forgotPassword}>Crear cuenta</Text>
          </TouchableOpacity>
        {
          alert && <Alert 
                      accessibilityLabel="Error en el servicio de google, ingrese nuevamente." 
                      message="Error en el servicio de google, ingrese nuevamente." 
                      type="danger" 
                    />
        }
        <Text 
          style={styles.orText} 
          accessibilityLabel="o"
        >o</Text>
        <TouchableOpacity 
          style={[styles.button, { marginTop: 8 }]} 
          onPress={handleLogin} 
          disabled={loading}
          accessibilityLabel="Iniciar sesión con Google"
        >
          <Icon name="google" size={24} color="#DB4437" />
          <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          accessibilityLabel="Iniciar sesión con Facebook"
          style={styles.button}
        >
          <Icon name="facebook" size={24} color="#3b5998" />
          <Text style={styles.buttonText}>Continuar con Facebook</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};


export default Login;
