import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: 'white'
    },
    logoutButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      padding: 10,
    },
    badge: {
      position: 'absolute',
      right: -6,
      top: -3,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold'
    },
    profileContainer: {
      marginBottom: 20,
    },
    profileContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10, // Añade margen inferior para separar la descripción
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 75,
      marginRight: 10,
    },
    profileTextContainer: {
      flex: 1,
    },
    profileUserName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      color: 'black'
    },
    profileFollowers: {
      fontSize: 14,
      textAlign: 'left',
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: 'blue',
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    tabContent: {
      flex: 1,
    },
    gridItem: {
      flex: 1,
      margin: 1,
    },
    image: {
      flex: 1,
      height: 150, // Ajusta la altura según tus necesidades
      resizeMode: 'cover',
    },
    profileDescription: {
      fontSize: 16,
      textAlign: 'left',
      marginBottom: 10,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    buttonContainer: {
      flex: 1,
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 0.5,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
  });