import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import P3_Accommodation_Template from '../../../../components/groups/create/groupAccommodation';
import { saveGroupAccommodationAndUpdateDraft } from '../../../../actions/groups/groupAction';
import { getAccommodations } from '../../../../actions/accomodations/accomodationsAction';

const P3_Accommodation_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);
  const accommodations = useSelector(state => state.accomodationsReducer.accommodations);
  const draftState = useSelector(state => state.groupReducer.draft);

  useEffect(() => {
    dispatch(getAccommodations());
  }, [dispatch]);

  const handleHotelsChange = (itemValue) => {
    setHotels(itemValue);
    setMessageAlert(false)
  };
  const continueButton = () => {
    if (isAccommodationValid()) {
        dispatch(saveGroupAccommodationAndUpdateDraft(draftState.id, hotels))
        navigation.navigate('step4');
        setMessageAlert(false)
    } else {
        setMessageAlert(true)
    }
  };

  const isAccommodationValid = () => {
    return hotels.trim().length > 0;
  };

  return (
    <P3_Accommodation_Template 
        continueButton={continueButton}
        handleHotelsChange={handleHotelsChange}
        messageAlert={messageAlert}
        hotels={hotels}
        accommodations={accommodations.data}
    />
  );
};

export default P3_Accommodation_Container;
