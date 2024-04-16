import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupTravelWithChildren } from '../../../../actions/groups/groupAction';
import P6_GroupTravelWithChildren_Template from '../../../../components/groups/create/step6';

const P6_GroupTravelWithChildren_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const [incluyeMenores, setIncluyeMenores] = useState('no');
    const [edadMayorMenor, setEdadMayorMenor] = useState(0);
    const [messageAlert, setMessageAlert] = useState(false);

    const handleIncluyeMenoresChange = (itemValue) => {
        setIncluyeMenores(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        if(isIncluyeMenoresValid()){
            dispatch(saveGroupTravelWithChildren(incluyeMenores))
            navigation.navigate('step7');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
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
            handleIncluyeMenoresChange={handleIncluyeMenoresChange}
            continueButton={continueButton}
            messageAlert={messageAlert}
        />
    );
};


export default P6_GroupTravelWithChildren_Container;
