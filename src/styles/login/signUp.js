import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
    },
    inputSuccess: {
        borderColor: 'green',
    },
    helperTextValid: {
        color: 'green',
    },
    inputSuccess: {
        borderColor: 'green',
    },
    helperText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    innerContainer: {
        paddingHorizontal: 20,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signInText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    signInButton: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    orText: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    googleButtonText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
});