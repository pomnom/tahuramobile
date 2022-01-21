import React, {useState, useContext, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  useToast,
} from 'native-base';
import {Pressable} from 'react-native';
import {AuthContext} from './AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const {signIn} = useContext(AuthContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [error, seterror] = useState();
  const [isloading, setisloading] = useState(false);
  const toast = useToast();
  const handleSubmit = async e => {
    seterror(null);
    setisloading(true);
    const data = {
      email,
      password,
    };
    await axios
      .post(
        'https://tahurauserservices.herokuapp.com/user/login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async res => {
        if (res.status === 200) {
          await AsyncStorage.setItem('@token', res.data.token);
          signIn(res.data.token);
          setisloading(false);
          seterror(null);
        }
      })
      .catch(err => {
        if (err.response) {
          seterror(err.response.data.message);
        } else if (err.error) {
          console.log(err.error);
          seterror(err.error);
        } else {
          console.log(err);
        }
        setisloading(false);
      });
  };
  useEffect(() => {
    error &&
      toast.show({
        title: 'Gagal Masuk',
        status: 'error',
        description: error,
      });
  }, [error]);
  return (
    <Center flex={1}>
      <Box
        p={5}
        w="90%"
        borderWidth="2"
        borderRadius="3xl"
        borderColor="indigo.500"
        bg="trueGray.50">
        <Heading
          size="lg"
          textAlign="center"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Selamat Datang
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          textAlign="center"
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Masuk untuk lanjut!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="email"
              placeholder="contoh@mail.com"
              onChangeText={email => setemail(email.toLowerCase())}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Kata Sandi</FormControl.Label>
            <Input
              type="password"
              placeholder="******"
              onChangeText={password => setpassword(password)}
            />
          </FormControl>
          <Center>
            {isloading ? (
              <Button
                isLoading
                isLoadingText="Sedang masuk"
                variant="solit"
                colorScheme="indigo">
                Button
              </Button>
            ) : (
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => {
                  handleSubmit();
                }}>
                Masuk
              </Button>
            )}
          </Center>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Belum punya akun?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Daftar')}>
              <Text color="indigo.500" fontWeight="medium" fontSize="sm">
                Daftar sekarang!
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
