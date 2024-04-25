import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../../pages/Home';
import MiPerfil from './../../pages/MiPerfil';
import Grupos from '../../pages/Grupos';
import MessageScreen from '../../container/messages';
import ChatHeader from '../../pages/ChatHeader';
import GroupHeader from '../../pages/steps/GroupHeader';
import Congratuilations from '../../pages/steps/Congratulations';
import Itinerario from '../../pages/Itinerario';
import DetailGroup from '../../pages/GroupDetails';
import Login from '../../pages/login';
import Chats from '../../pages/ChatContainer';
import GroupContainer from '../../container/groups';
import P1_GroupTravelWith_Women_Men_Container from '../../container/groups/create/step1';
import P2_TravelMode_Container from '../../container/groups/create/step2';
import P3_Accommodation_Container from '../../container/groups/create/step3';
import P4_GroupSize_Container from '../../container/groups/create/step4';
import P5_GroupMinMax_Container from '../../container/groups/create/step5';
import P6_GroupTravelWithChildren_Container from '../../container/groups/create/step6';
import P7_GroupTravelWithPets_Container from '../../container/groups/create/step7';
import P8_GroupDescriptionContainer from '../../container/groups/create/step8';
import P8_9_Budget_Container from '../../container/groups/create/step8_9';
import CreateGroupContainer from '../../container/groups/create/step9';
import { Header } from '../ui/Header';
import { headerStyle } from '../../container/menu/constants';
import P8_9_1_StartingTravel_Container from '../../container/groups/create/step8_9_1';
import JoinRequestList_Template from '../groups/request';
import Join_P1_Container from '../../container/groups/join/step1';
import Join_P2_Container from '../../container/groups/join/step2';
import CongratulationsRequestToJoin from '../../container/groups/join/congratulations';
import SignUp_Container from '../Login/signup';
import P1_SignUp_Container from '../../container/login/signup/step1';
import HeaderWithIcons from '../ui/HeaderWithIcons';

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
const CustomTabBarButton = ({ children, onPress, focused }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1, // Esto asegura que el botón ocupe un espacio equitativo
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
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            flexDirection: 'row',
          },
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'MiPerfil') {
              iconName = 'user';
            } else if (route.name === 'Grupos') {
              iconName = 'group';
            }
            return <Icon name={iconName} size={20} color={color} />;
          },
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} focused={props.accessibilityState.selected} />
          )
        })
      }
      >
      {/* <Tab.Screen name="DetailGroup" component={DetailGroup} options={{ headerShown: false }}/> */}
      <Tab.Screen name="Inicio" component={Home} options={({ navigation, route }) => ({
        headerTitle: () => 
        <HeaderWithIcons />,
        headerStyle,
      })} />
      <Tab.Screen name="Grupos" component={Grupos} options={{ headerTitleAlign: 'center' }} />
      <Tab.Screen 
        name="MiPerfil" 
        component={MiPerfil}  
        options={{ 
          title: 'Perfil', 
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
            elevation: 8
          }
        }}/>
    </Tab.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Esta es la línea clave para animaciones de deslizamiento
      }}
    >
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} // Esconde la barra de navegación para este stack
      />
      <RootStack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }} // Esconde la barra de navegación para este stack
      />
        <RootStack.Screen
          name="Detalle"
          component={MessageScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => <ChatHeader navigation={navigation} {...route.params.chattingWith} />,
            headerLeft: () => (
              <Header onPress={() => navigation.navigate('Mensajes')} />
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
            <Header onPress={() => navigation.navigate('MiPerfil')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="detalleGrupo" component={DetailGroup} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={1}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('Grupos')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        
        <RootStack.Screen name="step1" component={P1_GroupTravelWith_Women_Men_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={2}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('crearGrupo')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step2" component={P2_TravelMode_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={3}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step1')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step3" component={P3_Accommodation_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={4}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step2')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step4" component={P4_GroupSize_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={5}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step3')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step5" component={P5_GroupMinMax_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={6}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step4')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step6" component={P6_GroupTravelWithChildren_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={7}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step5')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step7" component={P7_GroupTravelWithPets_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={8}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step6')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8" component={P8_GroupDescriptionContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={9} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step7')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8_9" component={P8_9_Budget_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={10}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step8')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8_9_1" component={P8_9_1_StartingTravel_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={10}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step8_9')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        
        <RootStack.Screen name="step9" component={CreateGroupContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} step={11}/>,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step8_9_1')} />
          ),
          
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="congratulations" component={Congratuilations} options={{ title: 'Felicidades', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="joinRequest" component={JoinRequestList_Template} options={{ title: 'Solicitudes', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="join_step1" component={Join_P1_Container} options={{ title: 'Solicitud', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="join_step2" component={Join_P2_Container} options={{ title: 'Solicitud', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="congratulations_request_to_join" component={CongratulationsRequestToJoin} options={{ title: 'Felicidades', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="signup" component={SignUp_Container} options={{ title: 'Únete a InExplora Hoy ✨', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="signUp_displayname" component={P1_SignUp_Container} options={{ title: 'Registra un nombre', headerTitleAlign: 'center' }}/>
        <RootStack.Screen name="messages" component={Chats} options={{ title: 'Mensajes', headerTitleAlign: 'center' }}/>
        
    </RootStack.Navigator>
  );
};

const Menu = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default Menu;
