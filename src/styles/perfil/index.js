import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginVertical: 5,
  },
  tag: {
    backgroundColor: '#08202B', // Cambiar por el color deseado
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 3,
  },
  tagText: {
    color: '#FFF', // Texto blanco
    fontSize: 14,
  },
  infoStat:{
    marginHorizontal: 10,
    alignItems: 'center'
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },
  profileContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileStatText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  profileUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  profileDescription: {
    fontSize: 16,
    marginBottom: 5,
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
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 1,
  },
  singleGridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 150, // Ajusta la altura según tus necesidades
    resizeMode: 'cover',
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