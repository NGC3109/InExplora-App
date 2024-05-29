import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupTravelWithChildrenAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P6_GroupTravelWithChildren_Template from '../../../../components/groups/create/groupTravelWithChildren';

const P6_GroupTravelWithChildren_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
    const [incluyeMenores, setIncluyeMenores] = useState('no');
    const [edadMayorMenor, setEdadMayorMenor] = useState(0);
    const [incluyeNinosConNecesidadesEspeciales, setIncluyeNinosConNecesidadesEspeciales] = useState('no');
    const [messageAlert, setMessageAlert] = useState(false);

    const handleIncluyeMenoresChange = (itemValue) => {
        if(itemValue === "no"){
            setIncluyeNinosConNecesidadesEspeciales('no')
        }
        setIncluyeMenores(itemValue);
        setMessageAlert(false);
    };

    const handleIncluyeNinosConNecesidadesEspecialesChange = (itemValue) => {
        setIncluyeNinosConNecesidadesEspeciales(itemValue);
        setMessageAlert(false);
    };

    const continueButton = () => {
        if (isIncluyeMenoresValid()) {
            dispatch(saveGroupTravelWithChildrenAndUpdateDraft(draftState.id, {
                incluyeMenores,
                edadMayorMenor,
                incluyeNinosConNecesidadesEspeciales
            }));
            navigation.navigate('step7');
            setMessageAlert(false);
        } else {
            setMessageAlert(true);
        }
    };

    const isIncluyeMenoresValid = () => {
        return incluyeMenores.trim().length > 0;
    };

    return (
        <P6_GroupTravelWithChildren_Template 
            incluyeMenores={incluyeMenores}
            edadMayorMenor={edadMayorMenor}
            setEdadMayorMenor={setEdadMayorMenor}
            incluyeNinosConNecesidadesEspeciales={incluyeNinosConNecesidadesEspeciales}
            setIncluyeNinosConNecesidadesEspeciales={handleIncluyeNinosConNecesidadesEspecialesChange}
            handleIncluyeMenoresChange={handleIncluyeMenoresChange}
            continueButton={continueButton}
            messageAlert={messageAlert}
        />
    );
};

export default P6_GroupTravelWithChildren_Container;
