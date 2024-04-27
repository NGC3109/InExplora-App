import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Animated, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonCustom from '../Button';
import { formatToThousands } from '../../../utils/functions';
import { styles } from '../../../styles/ui/Filtros';
import { FiltrosIcon } from '../../../assets/vectores';

const FiltrosComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [rangoEdad, setRangoEdad] = useState([25, 40]);
    const [presupuesto, setPresupuesto] = useState(50000);
    const [sexo, setSexo] = useState('mixto');
    const [viajaConMascotas, setViajaConMascotas] = useState(false);
    const [viajaConHijos, setViajaConHijos] = useState(false);
    const mediosDeTransporte = ['Moto', 'Auto', 'Bus', 'Mochileo', 'Avión'];
    const [transporteSeleccionado, setTransporteSeleccionado] = useState('');
    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderContainerRef = useRef(null);

    useEffect(() => {
        if (sliderContainerRef.current) {
          sliderContainerRef.current.measure((x, y, width, height) => {
            setSliderWidth(width);
          });
        }
      }, []);
    const openModal = () => {
        setModalVisible(true);
        Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        }).start(() => {
        setModalVisible(false);
        });
    };

    const modalY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
    });

    return (
        <>
        <TouchableOpacity
            onPress={openModal}
            style={styles.fab}
        >
            <Text style={styles.fabIcon}><FiltrosIcon /></Text>
        </TouchableOpacity>
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.centeredView}>
            <Animated.View
                style={[
                styles.modalView,
                {
                    transform: [{ translateY: modalY }],
                },
                ]}
            >
                <View
                    ref={sliderContainerRef}
                    style={styles.container}
                    onLayout={() => {
                        // Se asegura de que la medición ocurre después del layout
                        if (sliderContainerRef.current) {
                          sliderContainerRef.current.measure((x, y, width, height) => {
                            setSliderWidth(width);
                          });
                        }
                    }}
                >
                    <Text style={styles.modalText}>Rango de edad</Text>
                        <MultiSlider
                            values={[rangoEdad[0], rangoEdad[1]]}
                            sliderLength={sliderWidth}
                            onValuesChange={setRangoEdad}
                            min={18}
                            max={60}
                            allowOverlap={false}
                            minMarkerOverlapDistance={30}
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.buttonText}>{`${rangoEdad[0]} años`}</Text>
                            <Text style={styles.buttonText}>{`${rangoEdad[1]} años`}</Text>
                        </View>
                </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    sexo === 'hombres' && styles.buttonsSelected,
                ]}
                onPress={() => setSexo('hombres')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        sexo === 'hombres' && styles.buttonsTextSelected,
                    ]}
                >Solo Hombres</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    sexo === 'mujeres' && styles.buttonsSelected,
                ]}
                onPress={() => setSexo('mujeres')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        sexo === 'mujeres' && styles.buttonsTextSelected,
                    ]}
                >Solo Mujeres</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    sexo === 'mixto' && styles.buttonsSelected,
                ]}
                onPress={() => setSexo('mixto')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        sexo === 'mixto' && styles.buttonsTextSelected,
                    ]}
                >Mixto</Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.modalText}>Presupuesto máximo</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={300000}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    value={presupuesto}
                    step={5000}
                    onValueChange={setPresupuesto}
                />
                <Text style={styles.sliderValueText}>{`$${formatToThousands(presupuesto)}`}</Text>

            <View style={styles.checkboxGroup}>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    viajaConMascotas && styles.buttonsSelected,
                ]}
                onPress={() => setViajaConMascotas(!viajaConMascotas)}
                >
                <Text 
                    style={[
                        styles.buttonText,
                        viajaConMascotas && styles.buttonsTextSelected
                    ]}
                >Viajan con mascotas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    viajaConHijos && styles.buttonsSelected,
                ]}
                onPress={() => setViajaConHijos(!viajaConHijos)}
                >
                <Text 
                    style={[
                        styles.buttonText,
                        viajaConHijos && styles.buttonsTextSelected
                    ]}
                >Viajan con hijos</Text>
                </TouchableOpacity>
            </View>
                <View style={styles.transportButtonsContainer}>
                    {mediosDeTransporte.map((medio) => (
                    <TouchableOpacity
                        key={medio}
                        style={[
                        styles.buttonsContainer,
                        transporteSeleccionado === medio && styles.buttonsSelected,
                        ]}
                        onPress={() => setTransporteSeleccionado(medio)}
                    >
                        <Text
                        style={[
                            styles.buttonText,
                            transporteSeleccionado === medio && styles.buttonsTextSelected,
                        ]}
                        >
                        {medio}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                <ButtonCustom 
                    onPress={closeModal}
                    title="Aplicar filtros"
                    customStyle={{
                        marginBottom: 10
                    }}
                />
            </Animated.View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );
};



export default FiltrosComponent;
