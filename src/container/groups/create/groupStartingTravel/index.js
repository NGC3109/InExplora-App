import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGroupStartingTravelAndUpdateDraft } from '../../../../actions/groups/groupAction';
import P8_9_1_StartingTravel_Template from '../../../../components/groups/create/groupStartingTravel';

const P8_9_1_StartingTravel_Container = ({ navigation }) => {
    const dispatch = useDispatch();
    const draftState = useSelector(state => state.groupReducer.draft);
    const [startingTravel, setStartingTravel] = useState({
        startingTravel: null,
        latitude: null,
        longitude: null,
    });
    const [messageAlert, setMessageAlert] = useState(false);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const continueButton = () => {
        if (isStartingTravelValid()) {
            dispatch(saveGroupStartingTravelAndUpdateDraft(draftState.id, startingTravel));
            navigation.navigate('step9');
            setMessageAlert(false);
        } else {
            setMessageAlert(true);
        }
    };

    const isStartingTravelValid = () => {
        return startingTravel?.startingTravel?.trim().length > 0;
    };

    const handleSelect = (data) => {
        setStartingTravel({
            startingTravel: data.description,
            latitude: data.location.lat,
            longitude: data.location.lng,
        });
        setRegion({
            ...region,
            latitude: data.location.lat,
            longitude: data.location.lng,
        });
    };

    return (
        <P8_9_1_StartingTravel_Template
            continueButton={continueButton}
            messageAlert={messageAlert}
            region={region}
            setRegion={setRegion}
            handleSelect={handleSelect}
        />
    );
};

export default P8_9_1_StartingTravel_Container;
