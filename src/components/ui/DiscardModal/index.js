import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de haber instalado react-native-vector-icons

const DiscardModal = ({ visible, onConfirm, onCancel, title }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Icon name="close-circle" size={80} color="#ff5c5c" style={styles.icon} />
          </View>
          <Text style={styles.modalTitle}>Salir</Text>
          <Text style={styles.modalText}>{title}</Text>
          <View style={styles.divider} />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={onConfirm} style={[styles.modalButton, styles.exitButton]}>
              <Text style={styles.modalButtonText}>Salir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={[styles.modalButton, styles.cancelButton]}>
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default DiscardModal;
