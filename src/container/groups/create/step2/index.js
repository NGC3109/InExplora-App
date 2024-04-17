import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupTravelMode } from '../../../../actions/groups/groupAction';
import P2_TravelMode_Template from '../../../../components/groups/create/step2';

const P2_TravelMode_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [transporte, setTransporte] = useState({travelMode: null, compartirConduccion: false});
  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);
  const [compartirConduccion, setCompartirConduccion] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);

  const handleTransporteChange = (itemValue) => {
    setMostrarCheckbox(itemValue === 'autoParticular');
    setTransporte({
      travelMode: itemValue,
      compartirConduccion: compartirConduccion
    });
    setMessageAlert(false)
  };
  const continueButton = () => {
    dispatch(saveGroupTravelMode(transporte))
    if(isTransporteValid()){
        navigation.navigate('step3');
        setMessageAlert(false)
    }else{
        setMessageAlert(true)
    }
  };

  const handleChangeComapartir = () => {
    setCompartirConduccion(!compartirConduccion)
    setTransporte({
      travelMode: transporte.travelMode,
      compartirConduccion: !compartirConduccion
    });
  }
  
  const isTransporteValid = () => {
    return transporte?.travelMode.trim().length > 0;
  };
 
  return (
    <P2_TravelMode_Template 
        transporte={transporte}
        handleTransporteChange={handleTransporteChange}
        continueButton={continueButton}
        mostrarCheckbox={mostrarCheckbox}
        compartirConduccion={compartirConduccion}
        handleChangeComapartir={handleChangeComapartir}
        messageAlert={messageAlert}
    />
  );
};

export default P2_TravelMode_Container;
