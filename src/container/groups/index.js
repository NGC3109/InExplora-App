import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GroupTemplate from '../../components/groups';

const GroupContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [destino, setDestino] = useState('');

    const onChangeText = (itemValue) => {
        setDestino(itemValue);
    };
    const continueButton = () => {
        dispatch(saveGroupTravelMode(transporte))
        navigation.navigate('step3');
    };
    return (
        <GroupTemplate 
            continueButton={continueButton}
            onChangeText={onChangeText}
            textValue={destino}
        />
    );
};

export default GroupContainer;
