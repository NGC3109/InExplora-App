import { StyleSheet, TouchableOpacity } from "react-native"
import { ArrowLeft } from "../../../assets/vectores"

export const Header = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <ArrowLeft />
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    button: {
        marginLeft: 10
    },
});
