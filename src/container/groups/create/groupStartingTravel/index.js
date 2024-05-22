import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveGroupStartingTravel } from '../../../../actions/groups/groupAction';
import P8_9_1_StartingTravel_Template from '../../../../components/groups/create/groupStartingTravel';
import Config from 'react-native-config';


const P8_9_1_StartingTravel_Container = ({ navigation }) => {
    const dispatch = useDispatch();
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
        dispatch(saveGroupStartingTravel(startingTravel))
        if(isStartingTravelValid()){
            navigation.navigate('step9');
            setMessageAlert(false)
        }else{
            setMessageAlert(true)
        }
    };
    const isStartingTravelValid = () => {
        return startingTravel?.startingTravel?.trim().length > 0;
    };
    const handleSelect = (description, placeId) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${Config.API_KEY_MAPS}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {
                const location = json.result.geometry.location;
                setStartingTravel({
                    startingTravel: description,
                    latitude: location.lat,
                    longitude: location.lng
                })
                setRegion({
                    ...region,
                    latitude: location.lat,
                    longitude: location.lng
                });
            })
            .catch((error) => {
                console.error('Error fetching location details:', error);
            });
    };
    return (
        <P8_9_1_StartingTravel_Template
            continueButton={continueButton}
            messageAlert={messageAlert}
            handleSelect={handleSelect}
            region={region}
            setRegion={setRegion}
        />
    );
};

export default P8_9_1_StartingTravel_Container;
