import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox, NativeBaseProvider } from 'native-base';
import { styles } from '../../../styles/login/signUp';

const SignUp_Template = ({
    email,
    password,
    agree,
    setAgree,
    handleSignUp,
    handleGoBack,
    isFormValid,
    confirmPassword,
    emailError,
    handleEmailChange,
    validatePassword,
    passwordError,
    passwordCriteria,
    handleConfirmPasswordChange,
    confirmPasswordError,
}) => {
  return (
    <NativeBaseProvider>
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.subtitle}>Crea una cuenta para desbloquear todas las características.</Text>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : email && styles.inputSuccess]}
                    onChangeText={handleEmailChange}
                    value={email}
                    placeholder="Ingresa tu correo"
                    keyboardType="email-address"
                />
                {!!emailError && <Text style={styles.helperText}>{emailError}</Text>}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={[
                        styles.input,
                        password && Object.keys(passwordError).some((key) => passwordError[key]) ? styles.inputError : 
                        password && Object.keys(passwordError).every((key) => !passwordError[key]) && password.length > 0 ? styles.inputSuccess : styles.input
                    ]}
                    onChangeText={validatePassword}
                    value={password}
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry
                />
                {(password && Object.keys(passwordError).length > 0) ? (
                    <View>
                        {Object.keys(passwordCriteria).map((criterion, index) => (
                            <Text key={criterion} style={[styles.helperText, !passwordError[criterion] && styles.helperTextValid]}>
                            {index + 1}) {passwordCriteria[criterion].message}
                            </Text>
                        ))}
                    </View>
                ) : null}
                <Text style={styles.label}>Repetir Contraseña</Text>
                <TextInput
                    style={[
                        styles.input,
                        confirmPassword && confirmPasswordError ? styles.inputError : 
                        confirmPassword && !confirmPasswordError && confirmPassword.length > 0 ? styles.inputSuccess : styles.input
                      ]}
                    onChangeText={handleConfirmPasswordChange}
                    value={confirmPassword}
                    placeholder="Repite tu contraseña"
                    secureTextEntry
                />
                <View style={styles.checkboxContainer}>
                    <Checkbox isChecked={agree} onChange={setAgree} />
                    <Text style={styles.checkboxLabel}>Acepto los términos y condiciones de InExplora.</Text>
                </View>
                <TouchableOpacity onPress={handleSignUp} style={[styles.signUpButton, !isFormValid && styles.disabledButton]} disabled={!isFormValid}>
                    <Text style={styles.signUpButtonText}>Registrarse</Text>
                </TouchableOpacity>
                
                <View style={styles.signInContainer}>
                <Text style={styles.signInText}>¿Ya tienes una cuenta? </Text>
                <TouchableOpacity onPress={handleGoBack}>
                    <Text style={styles.signInButton}>Iniciar sesión</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.orText}>o</Text>
                <TouchableOpacity style={styles.googleButton}>
                    <Icon name="google" size={24} color="#DB4437" />
                    <Text style={styles.googleButtonText}>Continuar con Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Icon name="facebook" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Continuar con Facebook</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </NativeBaseProvider>
  );
};
export default SignUp_Template;
