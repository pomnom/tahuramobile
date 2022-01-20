import * as React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
} from 'native-base';
import {Pressable} from 'react-native';
export default function Login({navigation}) {
  return (
    <Center flex={1} bg="primary.100">
      <Box
        p={5}
        w="90%"
        borderWidth="2"
        borderRadius="3xl"
        borderColor="indigo.500"
        bg="trueGray.50">
        <Heading
          size="lg"
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
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Masuk untuk lanjut!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Nama Pengguna</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Kata Sandi</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Masuk
          </Button>
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
