import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../../pages/Home';
import MessageScreen from '../../container/messages';
import ChatHeader from '../../pages/ChatHeader';
import GroupHeader from '../../pages/steps/GroupHeader';
import Congratuilations from '../../pages/steps/Congratulations';
import Itinerario from '../../pages/Itinerario';
import DetailGroup from '../../pages/GroupDetails';
import Login from '../../pages/login';
import Chats from '../../pages/ChatContainer';
import GroupContainer from '../../container/groups';
import P1_GroupTravelWith_Women_Men_Container from '../../container/groups/create/groupTravelWithMW';
import P2_TravelMode_Container from '../../container/groups/create/groupTravelMode';
import P3_Accommodation_Container from '../../container/groups/create/groupAccommodation';
import P4_GroupSize_Container from '../../container/groups/create/groupSize';
import P5_GroupMinMax_Container from '../../container/groups/create/groupMinMax';
import P6_GroupTravelWithChildren_Container from '../../container/groups/create/groupTravelWithChildren';
import P7_GroupTravelWithPets_Container from '../../container/groups/create/groupTravelWithPets';
import P8_GroupDescriptionContainer from '../../container/groups/create/groupDescription';
import P8_9_Budget_Container from '../../container/groups/create/groupBudget';
import CreateGroupContainer from '../../container/groups/create/groupUpload';
import { Header } from '../ui/Header';
import { headerStyle } from '../../container/menu/constants';
import P8_9_1_StartingTravel_Container from '../../container/groups/create/groupStartingTravel';
import JoinRequestList_Template from '../dashboard/request';
import Join_P1_Container from '../../container/groups/join/step1';
import CongratulationsRequestToJoin from '../../container/groups/join/congratulations';
import SignUp_Container from '../Login/signup';
import P1_SignUp_Container from '../../container/login/signup/step1';
import HeaderWithIcons from '../ui/HeaderWithIcons';
import auth from '@react-native-firebase/auth';
import { getUser } from '../../actions/users/userActions';
import PerfilContainer from '../../container/perfil';
import { useDispatch, useSelector } from 'react-redux';
import UpdateUser from '../perfil/update';
import UpdateGroups from '../groups/update';
import P2_SignUp_Container from '../../container/login/signup/step2';
import P3_SignUp_Container from '../../container/login/signup/step3';
import { IconEarth, IconGroup, IconHome, IconPlusQuad } from '../../assets/vectores';
import Grupos from '../../container/groups/list/Groups';
import RequestDetail from '../dashboard/request/requestDetail';
import NotificationsList_Template from '../dashboard/notifications';
import PerfilPublicoContainer from '../../container/publico/perfil';


const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const styles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.5,
    elevation: 10,
  },
};
const PlaceholderComponent = () => (<View></View>)
const CustomTabBarButton = ({ children, onPress, focused }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
};
const MainTabNavigator = () => {
  const currentUser = useSelector(state => state.userReducer.user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          flexDirection: 'row',
        },
        tabBarIcon: ({ focused, color }) => {
          switch (route.name) {
            case 'Inicio':
              return <IconHome />;
            case 'MiPerfil':
              return (
                <Image
                  source={{ uri: currentUser?.profilePicture || 'https://via.placeholder.com/20' }}
                  style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }}
                />
              );
            case 'Grupos':
              return <IconGroup />;
            case 'nuevo':
              return <IconPlusQuad />;
            case 'destinos':
              return <IconEarth />;
            default:
              return null;
          }
        },
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} focused={props.accessibilityState.selected} />
        ),
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Inicio" component={Home} options={{
        headerTitle: () => <HeaderWithIcons />,
        headerStyle,
      }} />
      <Tab.Screen name="Grupos" component={Grupos} options={{ headerTitleAlign: 'center' }} />
      <Tab.Screen 
          name="nuevo" 
          component={PlaceholderComponent}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('crearGrupo');
            }
          })}
          options={{
            headerTitle: () => <GroupHeader navigation={navigation} step={1}/>,
            headerLeft: () => (
              <Header />
            ),
            headerStyle,
          }}
        />
      <Tab.Screen name="destinos" component={Grupos} options={{ headerTitleAlign: 'center' }} />
      <Tab.Screen 
        name="MiPerfil" 
        component={PerfilContainer}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const RootStackNavigator = ({ user }) => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Esta es la línea clave para animaciones de deslizamiento
      }}
    >
      { user ? (
        <RootStack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }} // Esconde la barra de navegación para este stack
        />
      ) : (
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Esconde la barra de navegación para este stack
        />
      )}
        <RootStack.Screen
          name="Detalle"
          component={MessageScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => <ChatHeader navigation={navigation} {...route.params.chattingWith} />,
            headerLeft: () => (
              <Header onPress={() => navigation.navigate('messages')} />
            ),
            drawerItemStyle: { height: 0 },
            headerTitleAlign: 'left',
            swipeEnabled: false,
            headerStyle,
          })}
        />
        <RootStack.Screen name="crearGrupo" component={GroupContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={1}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="detalleGrupo" component={DetailGroup} options={{ headerShown: false, gestureEnabled: false, }} />
        <RootStack.Screen name="step1" component={P1_GroupTravelWith_Women_Men_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={2}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step2" component={P2_TravelMode_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={3}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step3" component={P3_Accommodation_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={4}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step4" component={P4_GroupSize_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={5}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step5" component={P5_GroupMinMax_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={6}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step6" component={P6_GroupTravelWithChildren_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={7}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step7" component={P7_GroupTravelWithPets_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={8}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8" component={P8_GroupDescriptionContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={9} />,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8_9" component={P8_9_Budget_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={10}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8_9_1" component={P8_9_1_StartingTravel_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={10}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        
        <RootStack.Screen name="step9" component={CreateGroupContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={11}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.goBack()} />
          ),
          
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="congratulations" component={Congratuilations} options={{ title: 'Felicidades', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="joinRequest" component={JoinRequestList_Template} options={{ title: 'Solicitudes', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="join_step1" component={Join_P1_Container} options={{ title: 'Solicitud', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="congratulations_request_to_join" component={CongratulationsRequestToJoin} options={{ title: 'Felicidades', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="signup" component={SignUp_Container} options={{ title: 'Únete a InExplora Hoy ✨', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="signUp_displayname" component={P1_SignUp_Container} options={{ title: 'Registra un nombre', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="messages" component={Chats} options={{ title: 'Mensajes', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="update_user" component={UpdateUser} options={{ title: 'Actualizar perfil', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="update_groups" component={UpdateGroups} options={{ title: 'Actualizar grupo', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="p2_signUp_genre" component={P2_SignUp_Container} options={{ title: 'Registra tu genero', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="p3_signUp_birthday" component={P3_SignUp_Container} options={{ title: 'Registra tu fecha de nacimiento', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="request_detail" component={RequestDetail} options={{ title: 'Solicitud', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="notifications_detail" component={NotificationsList_Template} options={{ title: 'Notificaciones', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="profile_public" component={PerfilPublicoContainer} options={{ headerShown: false, gestureEnabled: false, }}/>
    </RootStack.Navigator>
  );
};

const Menu = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = (user) => {
    if(user){
      dispatch(getUser(user.email));
    }
    setUser(user);
    if (initializing) setInitializing(false);
  };

  if (initializing) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;

  return (
    <NavigationContainer>
      <RootStackNavigator user={user}/>
    </NavigationContainer>
  );
};

export default Menu;
