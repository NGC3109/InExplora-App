import React from 'react';
import { View, Text, TextInput } from 'react-native';
import ButtonCustom from '../../../ui/Button';
import { styles } from '../../../../styles/groups/step8';
import { AlertIcon } from '../../../../assets/vectores';
import { Alert } from '../../../ui/Alert';

const P8_GroupDescriptionTemplate = ({ descripcion, setDescripcion, continueButton, limiteCaracteres, messageAlert }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>Crea una Invitación Irresistible</Text>
        <Text style={styles.description}>
        ¡Explora el camino hacia nuevas aventuras! Describe qué hace único a tu viaje y las experiencias que aguardan.</Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setDescripcion(text)}
          value={descripcion}
          maxLength={limiteCaracteres}
          placeholder="Describe tu viaje aquí..."
        />
        {
            messageAlert ? 
                <>
                    <Alert
                        message="Compartan lo que hace especial a este viaje y por qué otros deberían unirse."
                        type="danger"
                    />
                    <Text style={styles.caracteresLimit}>{`${descripcion.length}/${limiteCaracteres}`}</Text>
                </>
            : 
                <>
                    <Text style={styles.caracteresLimit}>{`${descripcion.length}/${limiteCaracteres}`}</Text>
                  <Text style={styles.helperText}>
                      Compartan lo que hace especial a este viaje y por qué otros deberían unirse.
                  </Text>
                </>
        }
        
      </View>
      <View style={{ flex: 1 }} />
      <ButtonCustom 
        onPress={continueButton}
        title="Continuar"
      />
    </View>
  );
};



export default P8_GroupDescriptionTemplate;
