import React, { useState } from 'react';
import SignUp_Template from '../../../container/login/signup';
import { useNavigation } from '@react-navigation/native';
import { isEmailValid } from '../../../utils/functions';
import { passwordCriteria } from '../../../utils/errores';
import auth from '@react-native-firebase/auth';

const SignUp_Container = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState({});
    const [confirmPasswordError, setConfirmPasswordError] = useState(true);
    const isFormValid = email && password && password === confirmPassword && agree;

    const handleSignUp = async () => {
        if (agree) {
            if (email && password && confirmPassword && password === confirmPassword && Object.keys(passwordError).length === 0) {
                try {
                    await auth().createUserWithEmailAndPassword(email, password);
                    // await sendVerificationEmail(userCredential.user);
                    navigation.navigate('MainTabs'); // Navega a la pantalla principal o de bienvenida
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        setEmailError('Este correo electrónico ya está en uso.');
                    } else if (error.code === 'auth/invalid-email') {
                        setEmailError('El correo electrónico no es válido.');
                    } else {
                        setEmailError('Error al crear la cuenta: ' + error.message);
                    }
                }
            } else {
                // Asegúrate de que todos los campos están llenos y las contraseñas coinciden
                if (!email) setEmailError('El correo electrónico es necesario.');
                if (!password) setPasswordError({ general: 'La contraseña es necesaria.' });
                if (password !== confirmPassword) setConfirmPasswordError(true);
            }
        } else {
            // Informar al usuario que debe aceptar los términos y condiciones
            alert("Por favor, acepta los términos y condiciones para continuar.");
        }
    };

    const sendVerificationEmail = async (user) => {
        try {
          await user.sendEmailVerification({
            // Opcional: Configura la URL de redirección después de la verificación
            url: 'https://tu-app.com/after-verification', // Asegúrate de configurar esta URL en la consola de Firebase
          });
          console.log('Correo de verificación enviado');
        } catch (error) {
          console.error('Error al enviar el correo de verificación:', error);
        }
    };

    const validatePassword = (password) => {
        let errors = {};
        for (const criterion in passwordCriteria) {
          if (!passwordCriteria[criterion].regex.test(password)) {
            errors[criterion] = passwordCriteria[criterion].message;
          }
        }
        setPasswordError(errors);
        setPassword(password);
        setConfirmPasswordError(password !== confirmPassword);
    };

    const handleConfirmPasswordChange = (newConfirmPassword) => {
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordError(password !== newConfirmPassword);
    };

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
        if (newEmail) {
          setEmailError(isEmailValid(newEmail) ? '' : 'El correo electrónico no es válido.');
        } else {
          setEmailError('');
        }
    };

    const handleGoBack= () => {
        navigation.navigate('Login');
    }
    return (
        <SignUp_Template 
            email={email}
            password={password}
            agree={agree}
            setAgree={setAgree}
            handleSignUp={handleSignUp}
            handleGoBack={handleGoBack}
            isFormValid={isFormValid}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            emailError={emailError}
            handleEmailChange={handleEmailChange}
            validatePassword={validatePassword}
            passwordError={passwordError}
            passwordCriteria={passwordCriteria}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            confirmPasswordError={confirmPasswordError}
        />
    );
};

export default SignUp_Container;
