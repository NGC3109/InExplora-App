import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de tener esta librería
import { Checkbox, NativeBaseProvider } from 'native-base';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/users/userActions';
import { Alert } from '../components/ui/Alert';

const Login = () => {
  const dispatch = useDispatch();
  const [isSelected, setSelection] = useState(false);
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
        
        const { displayName, email } = firebaseResult.user;

        const userData = {
            displayName,
            email,
        };
        dispatch(getUser(userData));
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
      // Aquí manejar la respuesta exitosa y la navegación
      navigation.navigate("MainTabs");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlert(true); // Asegúrate de mostrar un mensaje de error relevante al usuario
    } finally {
      setLoading(false);
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeBack}>Bienvenidos 👋</Text>
        <Text style={styles.signInText}>Inicia sesion y comienza con la gran aventura de descubrir lo InExplora-do</Text>
        <TextInput
           style={styles.input}
           placeholder="Correo electrónico"
           value={email}
           onChangeText={setEmail}
           autoCapitalize="none"
           keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            isChecked={isSelected}
            onChange={setSelection}
            accessibilityLabel="Recuerdame"
          />
          <Text style={styles.label}> Recuerdame</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleEmailLogin} disabled={loading}>
          <Text style={styles.signInButtonText}>Iniciar sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.forgotPassword}>Crear cuenta</Text>
          </TouchableOpacity>
        {
          alert && <Alert message="Error en el servicio de google, ingrese nuevamente." type="danger" />
        }
        <Text style={styles.orText}>o</Text>
        <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={handleLogin} disabled={loading}>
          <Icon name="google" size={24} color="#DB4437" />
          <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="facebook" size={24} color="#3b5998" />
          <Text style={styles.buttonText}>Continuar con Facebook</Text>
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
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
  welcomeBack: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 50,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    marginRight: 10,
  },
  forgotPassword: {
    color: '#007bff',
  },
  signInButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    alignSelf: 'center',
    marginVertical: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
export default Login;
