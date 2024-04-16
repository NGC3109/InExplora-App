import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupTravelWithPets } from '../../../../actions/groups/groupAction';
import P7_GroupTravelWithPets_Template from '../../../../components/groups/create/step7';

const P7_GroupTravelWithPets_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [incluyeMascotas, setIncluyeMascotas] = useState('no');
  const [tamanoMascota, setTamanoMascota] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);

  const handleIncluyeMascotasChange = (itemValue) => {
    setIncluyeMascotas(itemValue);
    setMessageAlert(false)
  };
  const continueButton = () => {
    if(isIncluyePetsValid()){
        dispatch(saveGroupTravelWithPets(incluyeMascotas))
        navigation.navigate('step8');
        setMessageAlert(false)
    }else{
        setMessageAlert(true)
    }
};
const isIncluyePetsValid = () => {
    return incluyeMascotas.trim().length > 0;
};
  return (
    <P7_GroupTravelWithPets_Template 
        continueButton={continueButton}
        handleIncluyeMascotasChange={handleIncluyeMascotasChange}
        incluyeMascotas={incluyeMascotas}
        tamanoMascota={tamanoMascota}
        setTamanoMascota={setTamanoMascota}
        messageAlert={messageAlert}
    />
  );
};
export default P7_GroupTravelWithPets_Container;
