import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupGenre } from '../../../../actions/groups/groupAction';
import P1_GroupTravelWith_Women_Men_Template from '../../../../components/groups/create/groupTravelWithMW';

const P1_GroupTravelWith_Women_Men_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const [generoViaje, setGeneroViaje] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);

    const handleGeneroChange = (itemValue) => {
        setGeneroViaje(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        if(isGenreValid()){
            dispatch(saveGroupGenre(generoViaje))
            navigation.navigate('step2');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    const isGenreValid = () => {
        return generoViaje.trim().length > 0;
    };
    return (
        <P1_GroupTravelWith_Women_Men_Template 
            generoViaje={generoViaje}
            handleGeneroChange={handleGeneroChange}
            continueButton={continueButton}
            messageAlert={messageAlert}
        />
    );
};


export default P1_GroupTravelWith_Women_Men_Container;
