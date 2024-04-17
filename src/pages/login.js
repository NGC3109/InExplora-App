import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de tener esta librería
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { saveUser } from '../actions/users/userActions';
import { Alert } from '../components/ui/Alert';

const Login = () => {
    const dispatch = useDispatch();
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
            
            const { displayName, email } = firebaseResult.user;

            const userData = {
                displayName,
                email,
            };
            dispatch(saveUser(userData));
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
    const goHome = () => {
        navigation.navigate("MainTabs");
    }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        source={require('../assets/check.png')} // Reemplaza con tu logo
        style={styles.logo}
      />
      <Text style={styles.title}>InExplora</Text>
      <Text style={styles.subtitle}>Crear cuenta</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Icon name="google" size={24} color="#DB4437" />
        <Text style={styles.buttonText}>Continuar con Google</Text>
      </TouchableOpacity>
      {
          alert && <Alert message="Error en el servicio de google, ingrese nuevamente." type="danger" />
      }
      <TouchableOpacity style={styles.button}>
        <Icon name="apple" size={24} color="#000000" />
        <Text style={styles.buttonText}>Continuar con Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="facebook" size={24} color="#3b5998" />
        <Text style={styles.buttonText}>Continuar con Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="close" size={24} color="#000000" />
        <Text style={styles.buttonText}>Continuar con X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => goHome()}>
        <Text style={styles.signupButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signInText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Politicas de privacidad</Text>
        <Text style={styles.footerText}> · </Text>
        <Text style={styles.footerText}>Terminos de servicio</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 100, // Ajusta según tu logo
    height: 100, // Ajusta según tu logo
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginVertical: 8,
  },
  buttonText: {
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInText: {
    color: '#007bff',
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 50,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
});

export default Login;
