import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupTemplate from '../../components/groups';
import { saveGroupDestination } from '../../actions/groups/groupAction';
import Config from 'react-native-config';

const GroupContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [destino, setDestino] = useState([]);
    const [messageAlert, setMessageAlert] = useState(false);
    const currentUserId = useSelector(state => state.userReducer.user);
    const onChangeText = (itemValue) => {
        console.log('logs: ', itemValue)
        setDestino(itemValue);
    };
    const getPhotoUrl = (photoReference) => {
        //return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.API_KEY_MAPS}`;
        return `https://lh3.googleusercontent.com/p/AF1QipNQaLAooJOp8efk1X75wYBDg7QAUGokiUHgN03k=s680-w680-h510`;
    };
    const continueButton = () => {
        if(isDestinoValid()){
            const destinosObj = {
                country: destino.country,
                description: destino.description,
                region: destino.region
            }
            dispatch(saveGroupDestination(destinosObj))
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
        console.log('currentUserId: ', currentUserId)
    }, [currentUserId])
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
