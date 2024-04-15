import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GroupTemplate from '../../components/groups';
import { saveGroupDestination } from '../../actions/groups/groupAction';

const GroupContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [destino, setDestino] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);

    const onChangeText = (itemValue) => {
        setDestino(itemValue);
    };
    const continueButton = () => {
        if(isDestinoValid()){
            dispatch(saveGroupDestination(destino))
            navigation.navigate('step2');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    const isDestinoValid = () => {
        return destino.trim().length > 0;
    };
    return (
        <GroupTemplate 
            continueButton={continueButton}
            onChangeText={onChangeText}
            textValue={destino}
            messageAlert={messageAlert}
        />
    );
};

export default GroupContainer;
