import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import CardListView from './Component/CardListView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailInformation from './Component/DetailInformation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Coba from './Component/Coba';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCat, faHome, faTags} from '@fortawesome/free-solid-svg-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'yellow',
        },
        tabBarActiveTintColor: 'red',
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
        name="Coba"
        component={Coba}
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
          </Stack.Navigator>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
