import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupDescription } from '../../../../actions/groups/groupAction';
import P8_GroupDescriptionTemplate from '../../../../components/groups/create/groupDescription';

const P8_GroupDescriptionContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [descripcion, setDescripcion] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const limiteCaracteres = 300;

    const continueButton = () => {
        dispatch(saveGroupDescription(descripcion))
        if(isDescriptionValid()){
            navigation.navigate('step8_9');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
        
    };
    const isDescriptionValid = () => {
        return descripcion.trim().length > 0;
    };
    return(
        <P8_GroupDescriptionTemplate 
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            continueButton={continueButton}
            limiteCaracteres={limiteCaracteres}
            messageAlert={messageAlert}
        />
    )

}

export default P8_GroupDescriptionContainer;