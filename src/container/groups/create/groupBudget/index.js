import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupBudgetAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P8_9_Budget_Template from '../../../../components/groups/create/groupBudget';

const P8_9_Budget_Container = ({ navigation }) => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState('');
  const [budgetNumeric, setBudgetNumeric] = useState('');
  const [messageAlert, setMessageAlert] = useState(false);
  const draftState = useSelector(state => state.groupReducer.draft);

  const handleBudgetsChange = (itemValue, numericValue) => {
    setBudget(itemValue);
    setBudgetNumeric(numericValue)
    setMessageAlert(false)
  };
  const continueButton = () => {
    dispatch(saveGroupBudgetAndUpdateDraft(draftState.id, budgetNumeric))
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
