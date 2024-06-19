import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Animated, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonCustom from '../Button';
import { formatToThousands } from '../../../utils/functions';
import { styles } from '../../../styles/ui/Filtros';
import { FiltrosIcon } from '../../../assets/vectores';

const FiltrosComponent = ({
    ageRange,
    setAgeRange,
    budget,
    setBudget,
    gender,
    setGender,
    travelWithPets,
    setTravelWithPets,
    travelWithChildren,
    setTravelWithChildren,
    selectedTransport,
    setSelectedTransport,
    handleApplyFilters
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const transportModes = [
        { key: 'Moto', value: 'moto' },
        { key: 'Auto', value: 'autoParticular' },
        { key: 'Bus', value: 'bus' },
        { key: 'Mochileo', value: 'mochileo' },
        { key: 'Avion', value: 'avion' }
    ];
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
            handleApplyFilters();
        });
    };

    const resetFilters = () => {
        setAgeRange([18, 60]);
        setBudget(5000000);
        setGender('');
        setTravelWithPets();
        setTravelWithChildren();
        setSelectedTransport('');
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
                            values={[ageRange[0], ageRange[1]]}
                            sliderLength={sliderWidth}
                            onValuesChange={setAgeRange}
                            min={18}
                            max={60}
                            allowOverlap={false}
                            minMarkerOverlapDistance={30}
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.buttonText}>{`${ageRange[0]} años`}</Text>
                            <Text style={styles.buttonText}>{`${ageRange[1]} años`}</Text>
                        </View>
                </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    gender === 'Solo hombres' && styles.buttonsSelected,
                ]}
                onPress={() => setGender('Solo hombres')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        gender === 'Solo hombres' && styles.buttonsTextSelected,
                    ]}
                >Solo Hombres</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    gender === 'Solo mujeres' && styles.buttonsSelected,
                ]}
                onPress={() => setGender('Solo mujeres')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        gender === 'Solo mujeres' && styles.buttonsTextSelected,
                    ]}
                >Solo Mujeres</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    gender === 'Hombres y mujeres' && styles.buttonsSelected,
                ]}
                onPress={() => setGender('Hombres y mujeres')}
                >
                <Text
                    style={[
                        styles.buttonText,
                        gender === 'Hombres y mujeres' && styles.buttonsTextSelected,
                    ]}
                >Mixto</Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.modalText}>Presupuesto máximo</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5000000}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    value={budget}
                    step={50000}
                    onValueChange={setBudget}
                />
                <Text style={styles.sliderValueText}>{`$${formatToThousands(budget)}`}</Text>

            <View style={styles.checkboxGroup}>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    travelWithPets && styles.buttonsSelected,
                ]}
                onPress={() => setTravelWithPets(!travelWithPets)}
                >
                <Text 
                    style={[
                        styles.buttonText,
                        travelWithPets && styles.buttonsTextSelected
                    ]}
                >Viaja con mascotas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.buttonsContainer,
                    travelWithChildren && styles.buttonsSelected,
                ]}
                onPress={() => setTravelWithChildren(!travelWithChildren)}
                >
                <Text 
                    style={[
                        styles.buttonText,
                        travelWithChildren && styles.buttonsTextSelected
                    ]}
                >Viaja con menores</Text>
                </TouchableOpacity>
            </View>
                <View style={styles.transportButtonsContainer}>
                    {transportModes.map((mode) => (
                        <TouchableOpacity
                            key={mode.key}
                            style={[
                                styles.buttonsContainer,
                                selectedTransport === mode.value && styles.buttonsSelected,
                            ]}
                            onPress={() => setSelectedTransport(mode.value)}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedTransport === mode.value && styles.buttonsTextSelected,
                                ]}
                            >
                            {mode.key}
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
                <TouchableOpacity style={{paddingVertical: 5}} onPress={resetFilters}>
                    <Text style={{color: 'black'}}>Reestablecer filtros</Text>
                </TouchableOpacity>
            </Animated.View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );
};

export default FiltrosComponent;
