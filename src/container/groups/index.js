import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GroupTemplate from '../../components/groups';
import { saveGroupDestination } from '../../actions/groups/groupAction';
import Config from 'react-native-config';

const GroupContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [destino, setDestino] = useState([]);
    const [messageAlert, setMessageAlert] = useState(false);

    const onChangeText = (itemValue) => {
        setDestino(itemValue);
    };
    const getPhotoUrl = (photoReference) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.API_KEY_MAPS}`;
        // return `https://lh3.googleusercontent.com/p/AF1QipNQaLAooJOp8efk1X75wYBDg7QAUGokiUHgN03k=s680-w680-h510`;
    };
    const continueButton = () => {
        if(isDestinoValid()){
            dispatch(saveGroupDestination(destino))
            navigation.navigate('step1');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    const isDestinoValid = () => {
        // return  destino.description && destino.description?.trim().length > 0;
        return true;
    };
    useEffect(() => {
        isDestinoValid && console.log('destino: ', destino.description && destino.description.trim())
    }, [destino])
    return (
        <GroupTemplate 
            continueButton={continueButton}
            onChangeText={onChangeText}
            messageAlert={messageAlert}
            destino={destino}
            getPhotoUrl={getPhotoUrl}
        />
    );
};

export default GroupContainer;
