import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { saveGroupDescriptionAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P8_GroupDescriptionTemplate from '../../../../components/groups/create/groupDescription';

const P8_GroupDescriptionContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
    const [descripcion, setDescripcion] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const limiteCaracteres = 300;

    const continueButton = () => {
        if(isDescriptionValid()){
            dispatch(saveGroupDescriptionAndUpdateDraft(draftState.id, descripcion))
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