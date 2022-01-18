import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import CardListView from './Component/CardListView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailInformation from './Component/DetailInformation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FaunaCardList from './Component/FaunaCardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCat, faHome, faTree, faUser} from '@fortawesome/free-solid-svg-icons';
import FloraCardList from './Component/FloraCardList';
import DetailPeta from './Component/DetailPeta';
import Login from './Component/Login';
import Daftar from './Component/Daftar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginHorizontal: 5,
          backgroundColor: '#5C6BC0',
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
        },
        tabBarBadgeStyle: {borderTopEndRadius: 40, borderTopStartRadius: 40},
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: '#3F51B5',
        tabBarInactiveTintColor: '#cacaca',
      }}>
      <Tab.Screen
        options={{
          tabBarItemStyle: {
            borderTopStartRadius: 40,
          },
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faHome} size={25} color={color} />
          ),
        }}
        name="Home"
        component={CardListView}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faCat} size={25} color={color} />
          ),
        }}
        name="Fauna"
        component={FaunaCardList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faTree} size={25} color={color} />
          ),
        }}
        name="Flora"
        component={FloraCardList}
      />
      <Tab.Screen
        options={{
          tabBarItemStyle: {
            borderTopEndRadius: 40,
          },
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUser} size={25} color={color} />
          ),
        }}
        name="Login"
        component={Login}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Box safeArea flex={1}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#5C6BC0',
                borderBottomEndRadius: 40,
                borderBottomStartRadius: 40,
              },
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen name="TAHURA NURAKSA" component={TabNav} />
            <Stack.Screen name="Detail" component={DetailInformation} />
            <Stack.Screen name="Peta" component={DetailPeta} />
            <Stack.Screen name="Daftar" component={Daftar} />
          </Stack.Navigator>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
