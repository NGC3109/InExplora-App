import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { displayNameToCreate } from '../../../../actions/users/userActions';
import SignUp_Displayname_Template from '../../../../components/Login/signup/username';

const SignUp_Displayname_Container = () => {
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
        <SignUp_Displayname_Template 
            continueButton={continueButton}
            handleDisplayNameChange={handleDisplayNameChange}
            messageAlert={messageAlert}
            displayName={displayName}
        />
    );
};

export default SignUp_Displayname_Container;
