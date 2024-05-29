import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupNumberOfPeopleAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P4_GroupSize_Template from '../../../../components/groups/create/groupSize';

const P4_GroupSize_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
    const [groupSize, setGroupSize] = useState(1);
    const [messageAlert, setMessageAlert] = useState(false);

    const handleChangeSize = (itemValue) => {
        setGroupSize(itemValue)
        setMessageAlert(false)
    }
    const continueButton = () => {
        if(isGroupSizeValid()){
            dispatch(saveGroupNumberOfPeopleAndUpdateDraft(draftState.id, groupSize))
            navigation.navigate('step5');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
  
    const isGroupSizeValid = () => {
        return groupSize > 0;
    };
  return (
    <P4_GroupSize_Template 
        groupSize={groupSize}
        messageAlert={messageAlert}
        continueButton={continueButton}
        handleChangeSize={handleChangeSize}
    />
  );
};

export default P4_GroupSize_Container;
