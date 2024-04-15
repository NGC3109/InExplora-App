import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import P3_Accommodation_Template from '../../../../components/groups/create/step3';
import { saveGroupAccommodation } from '../../../../actions/groups/groupAction';

const P3_Accommodation_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);

  const handleHotelsChange = (itemValue) => {
    setHotels(itemValue);
    setMessageAlert(false)
  };
  const continueButton = () => {
    dispatch(saveGroupAccommodation(hotels))
    if(isAccomodationValid()){
        navigation.navigate('step4');
        setMessageAlert(false)
    }else{
        setMessageAlert(true)
    }
  };
  
  const isAccomodationValid = () => {
    return hotels.trim().length > 0;
  };
  return (
    <P3_Accommodation_Template 
        continueButton={continueButton}
        handleHotelsChange={handleHotelsChange}
        messageAlert={messageAlert}
        hotels={hotels}
    />
  );
};

export default P3_Accommodation_Container;
