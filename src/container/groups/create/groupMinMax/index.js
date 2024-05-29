import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupAgeRangeAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P5_GroupMinMax_Template from '../../../../components/groups/create/groupMinMax';

const P5_GroupMinMax_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
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
            dispatch(saveGroupAgeRangeAndUpdateDraft(draftState.id, minGroupSize, maxGroupSize))
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
