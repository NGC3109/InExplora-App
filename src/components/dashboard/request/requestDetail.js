import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { acceptJoinRequest } from '../../../actions/request/requestAction';

const RequestDetail = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const { group } = route.params;

    const handleChangeStatusRequest = (idRequest, accepOrReject) => {
        dispatch(acceptJoinRequest(idRequest, accepOrReject))
      }
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{group?.user?.displayName} <Text style={styles.titleGroup}>a solicitado unirse a tu grupo</Text> {group?.group?.title}</Text>
            <View style={styles.userInfo}>
                <Image source={{ uri: group?.user?.profilePicture || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>{group?.user?.displayName}</Text>
                    <Text style={styles.requestDate}>{new Date().toLocaleDateString()}</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.profileButtonText}>Ver perfil</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.messageText}>{group?.message}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.button}
                >
                    <Text style={[styles.buttonText, styles.rejectButton]}>Rechazar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleChangeStatusRequest(group._id, 'accept')}
                    style={styles.button}
                >
                    <Text style={[styles.buttonText, styles.acceptButton]}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    
    titleGroup: {
        color: 'grey',
        fontWeight: '300'
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
      width: '70%',
      marginBottom: 20
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userDetails: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    requestDate: {
        fontSize: 14,
        color: 'grey',
    },
    profileButton: {
        marginLeft: 'auto',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    profileButtonText: {
        color: 'black',
        fontSize: 14,
    },
    messageText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderWidth: 0.6,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    rejectButton: {
        color: '#f44336', // Red color for reject
    },
    acceptButton: {
        color: '#4caf50', // Green color for accept
    },
});

export default RequestDetail;
