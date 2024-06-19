import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupGenreAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P1_GroupTravelWith_Women_Men_Template from '../../../../components/groups/create/groupTravelWithMW';

const P1_GroupTravelWith_Women_Men_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const [generoViaje, setGeneroViaje] = useState('Hombres y mujeres');
    const [messageAlert, setMessageAlert] = useState(false);
    const draftState = useSelector(state => state.groupReducer.draft);

    const handleGeneroChange = (itemValue) => {
        setGeneroViaje(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        if(isGenreValid()){
            dispatch(saveGroupGenreAndUpdateDraft(draftState.id, generoViaje))
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
