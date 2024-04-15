import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupNumberOfPeople } from '../../../../actions/groups/groupAction';
import P4_GroupSize_Template from '../../../../components/groups/create/step4';

const P4_GroupSize_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const [groupSize, setGroupSize] = useState(1);
    const [messageAlert, setMessageAlert] = useState(false);

    const handleChangeSize = (itemValue) => {
        setGroupSize(itemValue)
        setMessageAlert(false)
    }
    const continueButton = () => {
        dispatch(saveGroupNumberOfPeople(groupSize))
        if(isGroupSizeValid()){
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
