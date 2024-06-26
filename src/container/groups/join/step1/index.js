import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestToJoinGroup } from '../../../../actions/request/requestAction';
import Join_P1_Template from '../../../../components/groups/join/step1';

const Join_P1_Container = ({ navigation, route }) => {
    const { groupId, userCreator } = route.params;
    const currentUserId = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const limiteCaracteres = 300;

    const continueButton = () => {
        if(isMessageValid()){
            dispatch(requestToJoinGroup(currentUserId.id, groupId, message, userCreator))
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