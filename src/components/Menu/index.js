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
import Step2 from '../../pages/steps/Step2';
import Step3 from '../../pages/steps/Step3';
import Step4 from '../../pages/steps/Step4';
import Step5 from '../../pages/steps/Step5';
import Step6 from '../../pages/steps/Step6';
import Step7 from '../../pages/steps/Step7';
import Step8 from '../../pages/steps/Step8';
import Step9 from '../../pages/steps/Step9';
import GroupHeader from '../../pages/steps/GroupHeader';
import Congratuilations from '../../pages/steps/Congratulations';
import Itinerario from '../../pages/Itinerario';
import DetailGroup from '../../pages/GroupDetails';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Svg, { Ellipse } from 'react-native-svg'; // Asegúrate de que `react-native-svg` esté instalado y de importar Svg y Ellipse
import Login from '../../pages/login';
import Chats from '../../pages/ChatContainer';
import ArrowLeft from '../../assets/vectores/ArrowLeft'
import Config from 'react-native-config';
import GroupContainer from '../../container/groups';

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
      {focused && (
        // El SVG debe estar correctamente alineado para no interferir con el layout
        <View style={{ position: 'absolute', top: -10, alignItems: 'center' }}>
          <Svg
            width={75}
            height={61}
            viewBox="0 0 582 574"
          >
            <Ellipse cx="291" cy="287" rx="290.5" ry="286.5" fill="#fff" strokeMiterlimit={10} />
          </Svg>
        </View>
      )}
      {children}
    </TouchableOpacity>
  );
};

const MyTabBarIcon = ({ focused, iconName, color, size }) => {
  const scale = useSharedValue(focused ? 1.5 : 1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Icon name={iconName} size={focused ? 25 : 20} color={color} />
    </Animated.View>
  );
};
const MainTabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            flexDirection: 'row',
          },
          tabBarIcon: ({ focused, color }) => {
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
            return <MyTabBarIcon focused={focused} iconName={iconName} color={color} />;
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
              <TouchableOpacity onPress={() => navigation.navigate('Mensajes')} style={{ marginLeft: 10 }}>
                <ArrowLeft />
              </TouchableOpacity>
            ),
            drawerItemStyle: { height: 0 },
            headerTitleAlign: 'left',
            swipeEnabled: false,
            headerStyle: {
              backgroundColor: Config.COLOR_BLUE_OPACITY,
              borderBottomWidth: 1,
              borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
            },
          })}
        />
        <RootStack.Screen name="crearGrupo" component={GroupContainer} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MiPerfil')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step2" component={Step2} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('crearGrupo')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step3" component={Step3} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step2')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step4" component={Step4} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step3')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step5" component={Step5} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step4')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step6" component={Step6} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step5')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step7" component={Step7} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step6')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step8" component={Step8} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step7')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
        })}/>
        <RootStack.Screen name="step9" component={Step9} options={({navigation}) => ({
          headerTitle: () => <GroupHeader navigation={navigation} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('step8')} style={{ marginLeft: 10 }}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
          drawerItemStyle: { height: 0 },
          headerTitleAlign: 'center',
          swipeEnabled: false,
          headerStyle: {
            backgroundColor: Config.COLOR_BLUE_OPACITY,
            borderBottomWidth: 1,
            borderBottomColor: Config.COLOR_BLUE // Establece el color de fondo del header
          },
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
