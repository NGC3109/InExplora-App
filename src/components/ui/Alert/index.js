import { StyleSheet } from "react-native"
import { AlertIcon, IconCheckGreen, InfoIcon } from "../../../assets/vectores"
import { View, Text } from 'react-native';

export const Alert = ({
    message,
    type,
    Customstyle,
}) => (
    <View style={[type === "danger" && styles.messageContainerError, Customstyle]}>
        <AlertIcon />
        <Text style={type === "danger" && styles.helperTextError}>
            {message}
        </Text>
    </View>
)
export const AlertInfo = ({
    message,
    type,
    Customstyle,
}) => (
    <View style={[type === "info" && styles.messageContainerInfo, Customstyle]}>
        <InfoIcon />
        <Text style={type === "info" && styles.helperTextInfo}>
            {message}
        </Text>
    </View>
)
export const AlertSuccess = ({
    message,
    type,
    Customstyle,
}) => (
    <View style={[type === "success" && styles.messageContainerSuccess, Customstyle]}>
        <IconCheckGreen />
        <Text style={type === "success" && styles.helperTextSuccess}>
            {message}
        </Text>
    </View>
)
const styles = StyleSheet.create({
    messageContainerError: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#EF665B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    messageContainerInfo: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#CCE5FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    messageContainerSuccess: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#d4edda',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    helperTextError: {
        color: '#FFFFFF', // Text color
        flex: 1, // Take up as much space as possible
        marginLeft: 8, // Space between icon and text
    },
    helperTextInfo: {
        color: '#004084', // Text color
        flex: 1, // Take up as much space as possible
        marginLeft: 8, // Space between icon and text
    },
    helperTextSuccess: {
        color: '#155724', // Text color
        flex: 1, // Take up as much space as possible
        marginLeft: 8, // Space between icon and text
    },
})