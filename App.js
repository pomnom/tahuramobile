import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import CardListView from './Component/CardListView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailInformation from './Component/DetailInformation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FaunaCardList from './Component/FaunaCardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCat, faHome, faTree} from '@fortawesome/free-solid-svg-icons';
import FloraCardList from './Component/FloraCardList';
import DetailPeta from './Component/DetailPeta';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#c2d9ff',
        },
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: '#abbede',
        tabBarInactiveTintColor: '#f59090',
      }}>
      <Tab.Screen
        options={{
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Box safeArea flex={1} px={0.5}>
          <Stack.Navigator>
            <Stack.Screen name="TAHURA NURAKSA" component={TabNav} />
            <Stack.Screen name="Detail" component={DetailInformation} />
            <Stack.Screen name="Peta" component={DetailPeta} />
          </Stack.Navigator>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
