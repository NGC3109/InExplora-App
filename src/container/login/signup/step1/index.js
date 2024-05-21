import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import P1_signUp_Template from '../../../../components/Login/signup/step1';
import { useNavigation } from '@react-navigation/native';
import { displayNameToCreate } from '../../../../actions/users/userActions';

const P1_SignUp_Container = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);

    const handleDisplayNameChange = (itemValue) => {
        setDisplayName(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        if(isDisplayNameValid()){
            dispatch(displayNameToCreate(displayName));
            navigation.navigate('p2_signUp_genre');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    
    const isDisplayNameValid = () => {
        return displayName.trim().length > 0;
    };
    return (
        <P1_signUp_Template 
            continueButton={continueButton}
            handleDisplayNameChange={handleDisplayNameChange}
            messageAlert={messageAlert}
            displayName={displayName}
        />
    );
};

export default P1_SignUp_Container;
