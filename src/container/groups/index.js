import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupTemplate from '../../components/groups';
import { loadDraftByUser, saveGroupDestinationAndCreateDraft, deleteDraft } from '../../actions/groups/groupAction';
import DiscardModal from '../../components/ui/DiscardModal';
import { View } from 'react-native';

const GroupContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const [destino, setDestino] = useState([]);
    const [messageAlert, setMessageAlert] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const currentUserId = useSelector(state => state.userReducer.user);
    const draftState = useSelector(state => state.groupReducer.draft);
    useEffect(() => {
        dispatch(loadDraftByUser(currentUserId.id))
    }, [])
    const onChangeText = (itemValue) => {
        setDestino(itemValue);
    };
    const getPhotoUrl = (photoReference) => {
        //return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.API_KEY_MAPS}`;
        return `https://lh3.googleusercontent.com/p/AF1QipNQaLAooJOp8efk1X75wYBDg7QAUGokiUHgN03k=s680-w680-h510`;
    };
    const continueButton = () => {
        if(isDestinoValid()){
            const destinosObj = {
                country: destino.country,
                description: destino.description,
                region: destino.region
            }
            dispatch(saveGroupDestinationAndCreateDraft(currentUserId.id, destinosObj))
            navigation.navigate('groupStartEnd');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    const isDestinoValid = () => {
        // return  destino.description && destino.description?.trim().length > 0;
        return true;
    };
    const onContinue = () => {
        navigation.navigate(draftState.currentStep);
    }
    const onDiscard = () => {
        setModalVisible(true);
    };

    const handleConfirmDiscard = () => {
        if (draftState.id) {
            dispatch(deleteDraft(draftState.id));
        }
        setModalVisible(false);
    };

    const handleCancelDiscard = () => {
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <GroupTemplate 
                continueButton={continueButton}
                onChangeText={onChangeText}
                messageAlert={messageAlert}
                destino={destino}
                getPhotoUrl={getPhotoUrl}
                draftState={draftState}
                onContinue={onContinue}
                onDiscard={onDiscard}
            />
            <DiscardModal
                title="¿Seguro que quieres descartar el borrador?"
                visible={modalVisible}
                onConfirm={handleConfirmDiscard}
                onCancel={handleCancelDiscard}
            />
        </View>
    );
};

export default GroupContainer;
