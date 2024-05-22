import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupTravelMode } from '../../../../actions/groups/groupAction';
import { getTransports } from '../../../../actions/transports/transportsAction';
import P2_TravelMode_Template from '../../../../components/groups/create/groupTravelMode';

const P2_TravelMode_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [transporte, setTransporte] = useState({ travelMode: null, compartirConduccion: false });
  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);
  const [compartirConduccion, setCompartirConduccion] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const transports = useSelector(state => state.transportsReducer.transports);

  useEffect(() => {
    dispatch(getTransports());
  }, [dispatch]);

  const handleTransporteChange = (itemValue) => {
    setMostrarCheckbox(itemValue === 'autoParticular');
    setTransporte({
      travelMode: itemValue,
      compartirConduccion: compartirConduccion
    });
    setMessageAlert(false);
  };

  const continueButton = () => {
    dispatch(saveGroupTravelMode(transporte));
    if (isTransporteValid()) {
      navigation.navigate('step3');
      setMessageAlert(false);
    } else {
      setMessageAlert(true);
    }
  };

  const handleChangeCompartir = () => {
    setCompartirConduccion(!compartirConduccion);
    setTransporte({
      travelMode: transporte.travelMode,
      compartirConduccion: !compartirConduccion
    });
  };

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
      handleChangeCompartir={handleChangeCompartir}
      messageAlert={messageAlert}
      transports={transports.data}
    />
  );
};

export default P2_TravelMode_Container;
