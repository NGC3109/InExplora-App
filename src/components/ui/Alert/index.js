import { StyleSheet } from "react-native"
import { AlertIcon, InfoIcon } from "../../../assets/vectores"
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
    <View style={[type === "info" && styles.messageContainerError, Customstyle]}>
        <InfoIcon />
        <Text style={type === "info" && styles.helperTextError}>
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
    helperTextError: {
        color: '#FFFFFF', // Text color
        flex: 1, // Take up as much space as possible
        marginLeft: 8, // Space between icon and text
    },
})