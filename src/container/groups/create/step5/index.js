import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupMaximumAge, saveGroupMinimumAge } from '../../../../actions/groups/groupAction';
import P5_GroupMinMax_Template from '../../../../components/groups/create/step5';

const P5_GroupMinMax_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const [minGroupSize, setMinGroupSize] = useState(0);
    const [maxGroupSize, setMaxGroupSize] = useState(60);
    const [messageAlert, setMessageAlert] = useState(false);

    const updateMinGroupSize = (itemValue) => {
        setMinGroupSize(itemValue);
        if (itemValue > maxGroupSize) {
            setMaxGroupSize(itemValue);
            setMessageAlert(false)
        }
        setMessageAlert(false)
    };

    const handleMaxSize = (itemValue) => {
        setMaxGroupSize(itemValue)
    }
    const continueButton = () => {
        if(isGroupSizeValid()){
            dispatch(saveGroupMinimumAge(minGroupSize))
            dispatch(saveGroupMaximumAge(maxGroupSize))
            navigation.navigate('step6');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    
    const isGroupSizeValid = () => {
        return minGroupSize >= 18 && maxGroupSize <= 60;
    };
  return (
    <P5_GroupMinMax_Template
        continueButton={continueButton}
        updateMinGroupSize={updateMinGroupSize}
        handleMaxSize={handleMaxSize}
        messageAlert={messageAlert}
        minGroupSize={minGroupSize}
        maxGroupSize={maxGroupSize}
    />
  );
};

export default P5_GroupMinMax_Container;
