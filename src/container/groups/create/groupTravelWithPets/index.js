import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupTravelWithPetsAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P7_GroupTravelWithPets_Template from '../../../../components/groups/create/groupTravelWithPets';

const P7_GroupTravelWithPets_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const draftState = useSelector(state => state.groupReducer.draft);
  const [incluyeMascotas, setIncluyeMascotas] = useState({
    incluyeMascotas: 'no',
    petSize: null
  });
  const [tamanoMascota, setTamanoMascota] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);

  const handleIncluyeMascotasChange = (itemValue) => {
    setIncluyeMascotas({
      incluyeMascotas: itemValue,
      petSize: tamanoMascota
    });
    setMessageAlert(false)
  };
  const continueButton = () => {
    if(isIncluyePetsValid()){
        dispatch(saveGroupTravelWithPetsAndUpdateDraft(draftState.id, incluyeMascotas))
        navigation.navigate('step8');
        setMessageAlert(false)
    }else{
        setMessageAlert(true)
    }
  };
  const handlePetSize = (sizePet) => {
    setTamanoMascota(sizePet)
    setIncluyeMascotas({
      incluyeMascotas: incluyeMascotas.incluyeMascotas,
      petSize: sizePet
    })
  }
  const isIncluyePetsValid = () => {
      return incluyeMascotas?.incluyeMascotas.trim().length > 0;
  };
  return (
    <P7_GroupTravelWithPets_Template 
        continueButton={continueButton}
        handleIncluyeMascotasChange={handleIncluyeMascotasChange}
        incluyeMascotas={incluyeMascotas}
        tamanoMascota={tamanoMascota}
        handlePetSize={handlePetSize}
        messageAlert={messageAlert}
    />
  );
};
export default P7_GroupTravelWithPets_Container;
