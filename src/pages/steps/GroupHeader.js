import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de haber instalado react-native-vector-icons

const GroupHeader = ({ step }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(true);
  };

  const handleConfirmClose = () => {
    setModalVisible(false);
    navigation.navigate('MainTabs', {
      screen: 'Inicio'
    });
  };

  const handleCancelClose = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Preparando el viaje</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.iconContainer}>
              <Icon name="close-circle" size={80} color="#ff5c5c" style={styles.icon} />
            </View>
            <Text style={styles.modalTitle}>Salir</Text>
            <Text style={styles.modalText}>¿Seguro que quieres salir?</Text>
            <View style={styles.divider} />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleConfirmClose} style={[styles.modalButton, styles.exitButton]}>
                <Text style={styles.modalButtonText}>Salir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelClose} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    borderWidth: 0.8,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 25,
    color: '#7c8690',
    fontWeight: 'bold',
    zIndex: 1,
    marginTop: 40,
    marginBottom: 10
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20
  },
  icon: {
    position: 'absolute',
    top: -50,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f1f5f8',
  },
  modalButtonContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f8',
    width: '100%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    width: '50%',
    marginRight: 5
  },
  exitButton: {
    backgroundColor: '#fb5a46',
  },
  cancelButton: {
    backgroundColor: '#d0ddea',
  },
  cancelButtonText: {
    color: '#9ca8b8',
    fontWeight: 'bold'
  },
  saveExitButton: {
    backgroundColor: '#00c0a0',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default GroupHeader;
