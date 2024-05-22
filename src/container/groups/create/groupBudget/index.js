import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupBudget } from '../../../../actions/groups/groupAction';
import P8_9_Budget_Template from '../../../../components/groups/create/groupBudget';

const P8_9_Budget_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);

  const handleBudgetsChange = (itemValue) => {
    setBudget(itemValue);
    setMessageAlert(false)
  };
  const continueButton = () => {
    dispatch(saveGroupBudget(budget))
    if(isBudgetValid()){
        navigation.navigate('step8_9_1');
        setMessageAlert(false)
    }else{
        setMessageAlert(true)
    }
  };
  
  const isBudgetValid = () => {
    return budget.trim().length > 0;
  };
  return (
    <P8_9_Budget_Template 
        continueButton={continueButton}
        handleBudgetsChange={handleBudgetsChange}
        messageAlert={messageAlert}
        budget={budget}
    />
  );
};

export default P8_9_Budget_Container;
