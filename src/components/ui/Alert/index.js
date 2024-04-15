import { StyleSheet } from "react-native"
import { AlertIcon } from "../../../assets/vectores"
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