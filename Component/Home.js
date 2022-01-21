import React, {useState, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCat, faHome, faTree, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from './AuthContext';
import DetailInformation from './DetailInformation';
import DetailPeta from './DetailPeta';
import Login from './Login';
import Daftar from './Daftar';
import FloraCardList from './FloraCardList';
import FaunaCardList from './FaunaCardList';
import CardListView from './CardListView';
import Profil from './Profil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: '#cffafe',
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        },
        headerStyle: {
          backgroundColor: '#10b981',
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        },
      }}>
      <AuthStack.Screen name="TAHURA Nuraksa" component={Login} />
      <AuthStack.Screen name="Daftar" component={Daftar} />
    </AuthStack.Navigator>
  );
};

const TabNav = createBottomTabNavigator();
const TabNavScreen = () => {
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          marginHorizontal: 5,
          backgroundColor: '#10b981',
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
        headerStyle: {
          backgroundColor: '#10b981',
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        },
        tabBarBadgeStyle: {borderTopEndRadius: 40, borderTopStartRadius: 40},
        tabBarActiveTintColor: '#fda4af',
        tabBarActiveBackgroundColor: '#047857',
        tabBarInactiveTintColor: '#a5f3fc',
      }}>
      <TabNav.Screen
        options={{
          tabBarItemStyle: {
            borderTopStartRadius: 40,
          },
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              icon={faHome}
              size={color == '#a5f3fc' ? 20 : 25}
              color={color}
            />
          ),
        }}
        name="Home"
        component={CardListView}
      />
      <TabNav.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              icon={faCat}
              size={color == '#a5f3fc' ? 20 : 25}
              color={color}
            />
          ),
        }}
        name="Fauna"
        component={FaunaCardList}
      />
      <TabNav.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              icon={faTree}
              size={color == '#a5f3fc' ? 20 : 25}
              color={color}
            />
          ),
        }}
        name="Flora"
        component={FloraCardList}
      />
      <TabNav.Screen
        options={{
          tabBarItemStyle: {
            borderTopEndRadius: 40,
          },
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={color == '#a5f3fc' ? 20 : 25}
              color={color}
            />
          ),
        }}
        name="Profil"
        component={Profil}
      />
    </TabNav.Navigator>
  );
};

const StackDetail = createStackNavigator();
const StackDetailScreen = () => {
  return (
    <StackDetail.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: '#cffafe',
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        },
        headerStyle: {
          backgroundColor: '#10b981',
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        },
      }}>
      <StackDetail.Screen name="Detail" component={DetailInformation} />
      <StackDetail.Screen name="Peta" component={DetailPeta} />
    </StackDetail.Navigator>
  );
};

const Root = createStackNavigator();
const RootScreen = ({userToken}) => {
  return (
    <Root.Navigator screenOptions={{headerShown: false}}>
      {userToken ? (
        <>
          <Root.Screen name="auth" component={TabNavScreen} />
          <Root.Screen name="detail" component={StackDetailScreen} />
        </>
      ) : (
        <>
          <Root.Screen name="authnot" component={AuthStackScreen} />
        </>
      )}
    </Root.Navigator>
  );
};

// const Stack = createStackNavigator();
export default () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootScreen userToken={state.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
