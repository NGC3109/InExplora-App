import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupNumberOfPeopleAndUpdateDraft } from '../../../../actions/groups/groupAction';
import GroupStartEnd_Template from '../../../../components/groups/create/groupStartEnd';

const GroupStartEnd_Container = ({ navigation }) => {
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
            navigation.navigate('step1');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
  
    const isGroupSizeValid = () => {
        return groupSize > 0;
    };
  return (
    <GroupStartEnd_Template 
        groupSize={groupSize}
        messageAlert={messageAlert}
        continueButton={continueButton}
        handleChangeSize={handleChangeSize}
    />
  );
};

export default GroupStartEnd_Container;
