import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import P2_signUp_Template from '../../../../components/Login/signup/step2';
import { useNavigation } from '@react-navigation/native';
import { displayNameToCreate, saveUser } from '../../../../actions/users/userActions';

const P2_SignUp_Container = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);
    const currentUser = useSelector(state => state.userReducer.user);

    const handleDisplayNameChange = (itemValue) => {
        setDisplayName(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        dispatch(displayNameToCreate(displayName));
        if(isDisplayNameValid()){
            const newUser = {
                email: currentUser.email,
                password: currentUser.password,
                displayName: displayName
            }
            dispatch(saveUser(newUser))
            navigation.navigate('MainTabs', {
                screen: 'MiPerfil'
            });
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    
    const isDisplayNameValid = () => {
        return displayName.trim().length > 0;
    };
    return (
        <P2_signUp_Template 
            continueButton={continueButton}
            handleDisplayNameChange={handleDisplayNameChange}
            messageAlert={messageAlert}
            displayName={displayName}
        />
    );
};

export default P2_SignUp_Container;
