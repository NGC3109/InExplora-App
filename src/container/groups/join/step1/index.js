import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveJoinMessage } from '../../../../actions/groups/groupAction';
import Join_P1_Template from '../../../../components/groups/join/step1';

const Join_P1_Container = ({ navigation, route }) => {
    const { groupId } = route.params;
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const limiteCaracteres = 300;

    const continueButton = () => {
        dispatch(saveJoinMessage(message))
        if(isMessageValid()){
            navigation.navigate('join_step2', { groupId: groupId });
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
        
    };
    const isMessageValid = () => {
        return message.trim().length > 0;
    };
    return(
        <Join_P1_Template 
            message={message}
            setMessage={setMessage}
            continueButton={continueButton}
            limiteCaracteres={limiteCaracteres}
            messageAlert={messageAlert}
        />
    )

}

export default Join_P1_Container;