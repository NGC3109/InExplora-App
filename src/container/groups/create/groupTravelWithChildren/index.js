import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupTravelWithChildrenAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P6_GroupTravelWithChildren_Template from '../../../../components/groups/create/groupTravelWithChildren';

const P6_GroupTravelWithChildren_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
    const [incluyeMenores, setIncluyeMenores] = useState(0);
    const [edadMayorMenor, setEdadMayorMenor] = useState(0);
    const [incluyeNinosConNecesidadesEspeciales, setIncluyeNinosConNecesidadesEspeciales] = useState(0);

    const handleIncluyeMenoresChange = (itemValue) => {
        if(itemValue === 0){
            setIncluyeNinosConNecesidadesEspeciales(0)
        }
        setIncluyeMenores(itemValue);
    };

    const handleIncluyeNinosConNecesidadesEspecialesChange = (itemValue) => {
        setIncluyeNinosConNecesidadesEspeciales(itemValue);
    };

    const continueButton = () => {
        dispatch(saveGroupTravelWithChildrenAndUpdateDraft(draftState.id, {
            incluyeMenores,
            edadMayorMenor,
            incluyeNinosConNecesidadesEspeciales
        }));
        navigation.navigate('step7');
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
        />
    );
};

export default P6_GroupTravelWithChildren_Container;
