import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveJoinSuperPower, requestToJoinGroup } from '../../../../actions/groups/groupAction';
import Join_P2_Template from '../../../../components/groups/join/step2';

const Join_P2_Container = ({ navigation, route }) => {
    const { groupId } = route.params;
    const dispatch = useDispatch();
    const [superpower, setSuperPower] = useState([]);
    const [messageAlert, setMessageAlert] = useState(false);
    const currentPower = useSelector(state => state.groupReducer.sendRequestToJoin);
    const currentUserId = useSelector(state => state.userReducer.user);
    const continueButton = () => {
        dispatch(saveJoinSuperPower(superpower))
        // if(isSuperPowerValid()){
            // setMessageAlert(false)
            console.log('data: ', superpower)
            dispatch(requestToJoinGroup(currentUserId.id, groupId, currentPower.message, superpower));
            navigation.navigate('congratulations_request_to_join');
        // }else{
        //     setMessageAlert(true)
        // }
    };
    const isSuperPowerValid = () => {
        return superpower.length > 0;
    };

    const toggleSwitch = (powerId, title) => {
        const updatedPowers = { ...superpower };
        if (updatedPowers[powerId]) {
        delete updatedPowers[powerId];
        } else {
            updatedPowers[powerId] = { enabled: true, title: title }
        }
        setSuperPower(updatedPowers);
    };
    return(
        <Join_P2_Template 
            superpower={superpower}
            continueButton={continueButton}
            messageAlert={messageAlert}
            toggleSwitch={toggleSwitch}
        />
    )

}

export default Join_P2_Container;