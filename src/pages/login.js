import React, { useState } from 'react';
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { styles } from '../styles/login/signIn';
import { saveUser } from '../actions/users/userActions';
import { useDispatch } from 'react-redux';
import { generateRandomPassword } from '../utils/functions';
import ISO6391 from 'iso-639-1';
import { InexploraLoginIcon } from '../assets/vectores';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
  scopes: [
    `${Config.GOOGLE_BIRTHDAY}`,
    `${Config.GOOGLE_PROFILE}`,
    `${Config.GOOGLE_GENDER}`,
    `${Config.GOOGLE_LANGUAGUE}`,
  ],
});

const getUserInfo = async (accessToken) => {
  try {
    const response = await fetch(`${Config.GOOGLE_URL_PEOPLE}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    const birthdate = data.birthdays && data.birthdays[0] ? data.birthdays[0].date : null;
    const gender = data.genders && data.genders[0] ? data.genders[0].value : null;
    const languages = data.locales ? data.locales.map(locale => locale.value) : [];

    let birthday = null;
    if (birthdate) {
      const { year, month, day } = birthdate;
      birthday = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    let genre = null;
    if (gender) {
      genre = gender === 'male' ? 'Hombre' : 'Mujer';
    }

    const preferredLanguage = languages.length > 0 ? ISO6391.getName(languages[0]) : null;

    return { genre, birthday, preferredLanguage };
  } catch (error) {
    console.error('Error fetching user info:', error);
    return { genre: null, birthday: null, preferredLanguage: null };
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setAlert(false);
    setErrorMessage('');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const tokens = await GoogleSignin.getTokens();
      const accessToken = tokens.accessToken;

      if (!accessToken) {
        throw new Error('Failed to obtain access token');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const firebaseResult = await auth().signInWithCredential(googleCredential);

      if (!firebaseResult.user) {
        throw new Error('No se pudo obtener el usuario autenticado.');
      }

      const { email, displayName } = firebaseResult.user;
      const { genre, birthday, preferredLanguage } = await getUserInfo(accessToken);

      const newUser = {
        email,
        displayName,
        password: generateRandomPassword(12),
        genre,
        birthday,
        languages: preferredLanguage,
      };
      dispatch(saveUser(newUser));
    } catch (error) {
      setErrorMessage(error.message || 'Error al iniciar sesión.');
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: `${Config.URL_BACKGROUND_LOGIN}` }}
      style={styles.background}
    >
      <View style={styles.topContainer}>
        <Text style={styles.welcomeBack} accessibilityLabel='Bienvenidos'>INEXPL<InexploraLoginIcon />RA</Text>
        <Text style={styles.signInText} accessibilityLabel='Inicia sesión y comienza con la gran aventura de descubrir lo InExplora-do'>
          Inicia sesión y comienza con la gran aventura de descubrir lo InExplora-do
        </Text>
      </View>
      <View style={styles.middleContainer}>
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
          disabled
        >
          <Icon name="facebook" size={24} color="#3b5998" />
          <Text style={styles.buttonText}>Continuar con Facebook</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;