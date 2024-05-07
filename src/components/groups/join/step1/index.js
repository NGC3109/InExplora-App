import React from 'react';
import { View, Text, TextInput } from 'react-native';
import ButtonCustom from '../../../ui/Button';
import { styles } from '../../../../styles/groups/step8';
import { Alert } from '../../../ui/Alert';

const Join_P1_Template = ({ message, setMessage, continueButton, limiteCaracteres, messageAlert }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>Cuéntanos tu interés por el grupo</Text>
        <Text style={styles.description}>
            Comparte tus expectativas y lo que te motiva a ser parte de este viaje.
        </Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setMessage(text)}
          value={message}
          maxLength={limiteCaracteres}
          placeholder="¿Qué te apasiona de este grupo?"
        />
        {
            messageAlert ? 
                <>
                    <Alert
                        message="Por favor, escribe un mensaje. Es tu oportunidad de conectar con esta increible aventura."
                        type="danger"
                    />
                    <Text style={styles.caracteresLimit}>{`${message.length}/${limiteCaracteres}`}</Text>
                </>
            : 
                <>
                  <Text style={styles.helperText}>
                      Este es el primer paso para increíbles aventuras y nuevas amistades.
                  </Text>
                    <Text style={styles.caracteresLimit}>{`${message.length}/${limiteCaracteres}`}</Text>
                </>
        }
        
      </View>
      <View style={{ flex: 1 }} />
      <ButtonCustom 
        onPress={continueButton}
        title="Enviar solicitud"
      />
    </View>
  );
};

export default Join_P1_Template;
