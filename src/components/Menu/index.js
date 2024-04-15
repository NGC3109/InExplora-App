import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../../pages/Home';
import MiPerfil from './../../pages/MiPerfil';
import Grupos from '../../pages/Grupos';
import MessageScreen from '../../container/messages';
import ChatHeader from '../../pages/ChatHeader';
import CrearGrupo from '../groups';
import Step3 from '../../pages/steps/Step3';
import Step4 from '../../pages/steps/Step4';
import Step5 from '../../pages/steps/Step5';
import Step6 from '../../pages/steps/Step6';
import Step7 from '../../pages/steps/Step7';
import GroupHeader from '../../pages/steps/GroupHeader';
import Congratuilations from '../../pages/steps/Congratulations';
import Itinerario from '../../pages/Itinerario';
import DetailGroup from '../../pages/GroupDetails';
import Login from '../../pages/login';
import Chats from '../../pages/ChatContainer';
import GroupContainer from '../../container/groups';
import CreateGroupContainer from '../../container/groups/create/steps9';
import P8_GroupDescriptionContainer from '../../container/groups/create/step8';
import P2_TravelMode_Container from '../../container/groups/create/step2';
import { Header } from '../ui/Header';
import { headerStyle } from '../../container/menu/constants';

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
            } else if (route.name === 'Mensajes') {
              iconName = 'paper-plane-o';
            }
            return <Icon name={iconName} size={20} color={color} />;
          },
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} focused={props.accessibilityState.selected} />
          )
        })}
      >
      {/* <Tab.Screen name="DetailGroup" component={DetailGroup} options={{ headerShown: false }}/> */}
      <Tab.Screen name="Inicio" component={Home} options={{ title: 'InExplora', headerTitleAlign: 'center' }}/>
      <Tab.Screen name="Grupos" component={Grupos} options={{ headerTitleAlign: 'center' }} />
      <Tab.Screen name="Mensajes" component={Chats} options={{
          tabBarBadge: 10,
          headerTitleAlign: 'center',
        }}/>
      <Tab.Screen name="MiPerfil" component={MiPerfil}  options={{ title: 'Perfil', headerTitleAlign: 'center' }}/>
    </Tab.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
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
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('MiPerfil')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step2" component={P2_TravelMode_Container} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('crearGrupo')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step3" component={Step3} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step2')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step4" component={Step4} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step3')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step5" component={Step5} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step4')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step6" component={Step6} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step5')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step7" component={Step7} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step6')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step8" component={P8_GroupDescriptionContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step7')} />
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="step9" component={CreateGroupContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <Header onPress={() => navigation.navigate('step8')} />
          ),
          
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle,
        })}/>
        <RootStack.Screen name="congratulations" component={Congratuilations} options={{ title: 'Felicidades', headerTitleAlign: 'center' }}/>
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
