import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { saveUser, isNewUserGoogleLogin } from '../../../../actions/users/userActions';
import SignUp_Birthday_Template from '../../../../components/Login/signup/userbirthday';
import { generateRandomPassword } from '../../../../utils/functions';

const SignUp_Birthday_Container = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([...Array(31).keys()].map(i => String(i + 1).padStart(2, '0')));
    const [messageAlert, setMessageAlert] = useState(false);
    const currentUser = useSelector(state => state.userReducer.user);
    console.log('currentUser: ', currentUser)
    useEffect(() => {
        if (month) {
            const days = new Date(year || 2024, month, 0).getDate();
            setDaysInMonth([...Array(days).keys()].map(i => String(i + 1).padStart(2, '0')));
            if (day > days) {
                setDay('');
            }
        }
    }, [month, year]);

    const handleDayChange = (itemValue) => {
        setDay(itemValue);
        setMessageAlert(false);
    };

    const handleMonthChange = (itemValue) => {
        setMonth(itemValue);
        setMessageAlert(false);
    };

    const handleYearChange = (itemValue) => {
        setYear(itemValue);
        setMessageAlert(false);
    };

    const continueButton = () => {
        if (isBirthdayValid()) {
            const formattedBirthday = `${year}-${month}-${day}`;
            const newUser = {
                email: currentUser.email,
                password: currentUser.password || generateRandomPassword(12),
                displayName: currentUser.displayName,
                genre: currentUser.genre,
                birthday: formattedBirthday,
            }
            dispatch(saveUser(newUser));
            dispatch(isNewUserGoogleLogin(false));
            navigation.navigate('MainTabs', {
                screen: 'MiPerfil'
            });
            setMessageAlert(false);
        } else {
            setMessageAlert(true);
        }
    };

    const isBirthdayValid = () => {
        return day && month && year;
    };

    return (
        <SignUp_Birthday_Template
            continueButton={continueButton}
            handleDayChange={handleDayChange}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
            messageAlert={messageAlert}
            day={day}
            month={month}
            year={year}
            daysInMonth={daysInMonth}
        />
    );
};

export default SignUp_Birthday_Container;
