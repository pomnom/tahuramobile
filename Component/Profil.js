import React, {useContext} from 'react';
import {
  View,
  Text,
  Heading,
  Center,
  Button,
  Spinner,
  Divider,
} from 'native-base';
import {AuthContext} from './AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default function Profil({}) {
  const {signOut} = useContext(AuthContext);
  const [user, setuser] = React.useState();
  const [isloading, setisloading] = React.useState(true);
  const getData = async () => {
    let userToken = await AsyncStorage.getItem('@token');
    axios
      .get('https://tahurauserservices.herokuapp.com/user/me', {
        headers: {token: userToken},
      })
      .then(res => {
        setuser(res.data);
        setisloading(false);
      })
      .catch(err => {
        if (err.response) {
          signOut();
        }
      });
  };
  React.useEffect(() => {
    getData();
  }, [user]);
  return (
    <Center flex={1} alignItems="center" alignContent="center">
      {isloading && <Spinner color="emerald.500" size="lg" />}
      {user && (
        <View mx="5">
          <Heading
            py="2"
            my="3"
            bg="emerald.400"
            borderRadius="100"
            textAlign="center">
            Profil
          </Heading>
          <Center bg="emerald.400" borderRadius="full" p="5" mx="16">
            <FontAwesomeIcon icon={faUser} size={150} color="white" />
          </Center>
          <Divider my="2" bg="emerald.500" thickness="5" />
          <Heading>
            Halo, <Heading color="emerald.400">{user.nama}</Heading>
          </Heading>
          <Center>
            <Divider my="2" bg="emerald.400" thickness="3" />
          </Center>
          <Heading fontWeight="semibold" fontSize="lg" color="emerald.600">
            Email :{' '}
            <Heading fontWeight="medium" fontSize="lg">
              {user.email}
            </Heading>
          </Heading>
          <Center>
            <Divider my="2" bg="emerald.400" thickness="3" />
          </Center>
          <Heading fontWeight="semibold" fontSize="lg" color="emerald.600">
            Pekerjaan :{' '}
            <Heading fontWeight="medium" fontSize="lg">
              {user.pekerjaan}
            </Heading>
          </Heading>
          <Center>
            <Divider my="2" bg="emerald.400" thickness="3" />
          </Center>
          <Heading fontWeight="semibold" fontSize="lg" color="emerald.600">
            Status :{' '}
            <Heading fontWeight="medium" fontSize="lg">
              {user.status ? 'Admin' : 'Pengguna'}
            </Heading>
          </Heading>
          <Button
            my="5"
            variant="solid"
            colorScheme="primary"
            onPress={() => {
              signOut();
            }}>
            Logout
          </Button>
        </View>
      )}
    </Center>
  );
}
