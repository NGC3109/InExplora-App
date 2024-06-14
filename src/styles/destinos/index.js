import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    iconsContainer:{
      padding: 5,
      borderRadius: 8
    },
    scrollContainer: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
      backgroundColor: '#f0f0f0',
      height: 50,
    },
    searchInputContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    searchPlaceholder: {
        color: '#888',
        paddingLeft: 10,
    },
    searchIcon: {
        marginLeft: 8,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black'
    },
    flatListContainer: {
      paddingLeft: 8,
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      padding: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      height: 48,
    },
    categoryText: {
      marginLeft: 8,
      fontSize: 14,
    },
    destinationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: 'black'
    },
    masonryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginHorizontal: 4,
    },
    destinationContainer: {
      marginBottom: 8,
      borderRadius: 8,
      overflow: 'hidden',
    },
    destinationImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    destinationOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      padding: 8,
    },
    destinationName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    heartIcon: {
      alignSelf: 'flex-end',
    },
    hexImageTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: 'black'
    },
    hexImageContainer: {
      width: 165,
      height: 190,
      marginRight: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    hexImage: {
      width: '100%',
      height: '100%',
    },
    hexImageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      padding: 8,
    },
    hexImageName: {
      color: 'white',
      fontSize: 16,
      marginBottom: 30,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      textAlign: 'center',
    },
    hexHeartIcon: {
      alignSelf: 'flex-end',
      marginTop: 40,
      backgroundColor: 'white',
      padding: 3,
      borderRadius: 20
    },
    lastGroupsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: 'black'
    },
    lastGroupContainer: {
      width: 200,
      height: 250,
      marginRight: 16,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
    },
    lastGroupImage: {
      width: '100%',
      height: '100%',
    },
    lastGroupOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      padding: 8,
    },
    lastGroupHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    lastGroupName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    lastGroupDays: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      backgroundColor: '#6b6b6b',
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
    },
    hauntedTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: 'black'
    },
    hauntedDestinationContainer: {
      width: 300,
      height: 200,
      marginRight: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    hauntedDestinationImage: {
      width: '100%',
      height: '100%',
    },
    hauntedDestinationOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
      padding: 8,
    },
    hauntedDestinationName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    hauntedHeartIcon: {
      alignSelf: 'flex-end',
      backgroundColor: 'white',
      padding: 3,
      borderRadius: 20
    },
    footerSpace: {
      height: 30,
    },
  });