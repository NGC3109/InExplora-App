import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BlockedIcon from 'react-native-vector-icons/Octicons';
import PrivacityIcon from 'react-native-vector-icons/MaterialIcons';
import useAuth from '../../../../utils/hooks/useAuth';

function Settings() {
  const [isPrivate, setIsPrivate] = useState(false);
  const { logout } = useAuth();
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Cuenta privada</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#f44336" }}
          thumbColor={isPrivate ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPrivate}
          style={styles.switch}
        />
      </View>
      <Text style={styles.description}>Si seleccionas esta opción, solo quienes te sigan podrán ver tu información</Text>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Contactos bloqueados</Text>
        <BlockedIcon name="blocked" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.description}>Lista de contactos que tienes bloqueado de InExplora, puedes entrar y desbloquear si ya no quieres que estén en esta lista</Text>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Cambiar contraseña</Text>
        <Icon name="key-outline" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Políticas de privacidad</Text>
        <PrivacityIcon name="privacy-tip" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionContainer, styles.termsYCond]}>
        <Text style={styles.optionLabel}>Términos y condiciones</Text>
        <Icon name="information-circle-outline" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Versión 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#001422',
    paddingHorizontal: 20,
  },
  termsYCond: {
    borderBottomWidth: 1,
    borderBottomColor: '#001422',
  },
  optionLabel: {
    fontSize: 16,
    color: '#001422'
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#001422',
    paddingVertical: 15,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 12,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default Settings;
