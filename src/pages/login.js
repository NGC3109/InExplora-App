import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de tener esta librería
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { Alert } from '../components/ui/Alert';
import { styles } from '../styles/login/signIn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  GoogleSignin.configure({
    webClientId: Config.WEB_CLIENT_ID,
  });

  const handleLogin = async () => {
    setLoading(true);
    setAlert(false);
    setErrorMessage('');

    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const firebaseResult = await auth().signInWithCredential(googleCredential);
      
      if (!firebaseResult.user) {
        throw new Error('No se pudo obtener el usuario autenticado.');
      }
    } catch (error) {
      console.error('Error de autenticación o conexión con el backend:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión.');
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setAlert(false);
    setErrorMessage('');
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (!response.user) {
        throw new Error('No se pudo obtener el usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión con correo y contraseña.');
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeBack} accessibilityLabel='Bienvenidos'>Bienvenidos 👋</Text>
        <Text style={styles.signInText} accessibilityLabel='Inicia sesión y comienza con la gran aventura de descubrir lo InExplora-do'>
          Inicia sesión y comienza con la gran aventura de descubrir lo InExplora-do
        </Text>
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
          <TouchableOpacity accessibilityLabel='¿Olvidaste tu contraseña?'>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleEmailLogin}
          disabled={loading}
          accessibilityLabel="Iniciar sesión con correo y contraseña"
        >
          <Text style={styles.signInButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('signup')}
          accessibilityLabel="Crear una nueva cuenta"
        >
          <Text style={styles.forgotPassword}>Crear cuenta</Text>
        </TouchableOpacity>
        {alert && <Alert accessibilityLabel="Error en el servicio de autenticación." message={errorMessage} type="danger" />}
        <Text style={styles.orText} accessibilityLabel="o">o</Text>
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
