import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import Autocomplete from '../../../ui/Autocomplete';
import MapView, { Marker } from 'react-native-maps';
import ButtonWithIcon from '../../../ui/ButtonWithIcon';

const P8_9_1_StartingTravel_Template = ({
    continueButton,
    region,
    setRegion,
    handleSelect,
}) => {
    const [showContent, setShowContent] = useState(true);
    const animation = useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => {
            setShowContent(false);
        });
    };

    const handleBlur = () => {
        setShowContent(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={[]}
                ListHeaderComponent={
                    <Animated.View style={[styles.animatedContainer, { opacity: animation }]}>
                        {showContent && (
                            <>
                                <Text style={styles.subtitle}>Define el punto de partida de tu Aventura</Text>
                                <Text style={styles.description}>
                                    Ingresa un lugar aproximado desde donde iniciaran el viaje, recuerda no dar informacion sensible.
                                </Text>
                            </>
                        )}
                    </Animated.View>
                }
                ListFooterComponent={
                    <>
                        <Autocomplete onSelect={handleSelect} onFocus={handleFocus} onBlur={handleBlur} />
                        <MapView
                            style={styles.map}
                            region={region}
                            onRegionChangeComplete={setRegion}
                        >
                            <Marker coordinate={region} />
                        </MapView>
                        <ButtonWithIcon 
                            handleClick={continueButton}
                            title="Continuar"
                            width='100%'
                        />
                    </>
                }
            />
        </View>
    );
};

export default P8_9_1_StartingTravel_Template;
