import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import P2_signUp_Template from '../../../../components/Login/signup/usergenre';
import { useNavigation } from '@react-navigation/native';
import { genreToCreate } from '../../../../actions/users/userActions';

const P2_SignUp_Container = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [genre, setGenre] = useState('');
    const [messageAlert, setMessageAlert] = useState(false);

    const handleGenreChange = (itemValue) => {
        setGenre(itemValue);
        setMessageAlert(false)
    };
    const continueButton = () => {
        if(isGenreValid()){
            dispatch(genreToCreate(genre))
            navigation.navigate('p3_signUp_birthday');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    
    const isGenreValid = () => {
        return genre.trim().length > 0;
    };
    return (
        <P2_signUp_Template 
            continueButton={continueButton}
            handleGenreChange={handleGenreChange}
            messageAlert={messageAlert}
            genre={genre}
        />
    );
};

export default P2_SignUp_Container;
