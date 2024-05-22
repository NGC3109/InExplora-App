import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import Autocomplete from '../../../ui/Autocomplete';
import MapView, { Marker } from 'react-native-maps';

const P8_9_1_StartingTravel_Template = ({
    continueButton,
    messageAlert,
    handleSelect,
    region,
    setRegion,
 }) => {
  return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.subtitle}>Define el costo de tu Aventura</Text>
            <Text style={styles.description}>
            Ingresa un presupuesto aproximado que necesitaran las personas que quieren unirse a tu viaje.
            </Text>
            <Autocomplete onSelect={handleSelect} />
            
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                <Marker coordinate={region} />
            </MapView>
            </ScrollView>
            <View style={{ flex: 1 }} />
            <ButtonCustom 
                onPress={continueButton}
                title="Continuar"
            />
        </View>
  );
};

export default P8_9_1_StartingTravel_Template;
