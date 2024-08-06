import { TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabBarButton = ({ children, onPress, focused }) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomTabBarButton;