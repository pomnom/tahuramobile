import React, {useEffect, useState} from 'react';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Image,
  Text,
  Stack,
  ScrollView,
  Divider,
  Spinner,
  Button,
} from 'native-base';
import axios from 'axios';

function DetailInformation({navigation, route}) {
  const {organismeId} = route.params;
  const [datas, setdatas] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  useEffect(() => {
    const fetchAxios = () => {
      setloading(true);
      axios
        .get(
          'https://organisme-service.herokuapp.com/organisme/' + organismeId,
          {},
        )
        .then(Response => {
          if (Response.status !== 200) {
            seterror(Response.status);
          } else {
            setloading(false);
            setdatas(Response.data);
            seterror(null);
          }
        })
        .catch(err => {
          setloading(false);
          seterror(err.message);
        });
    };
    fetchAxios();
    return () => {
      setdatas(null);
      seterror(null);
      setloading(null);
    };
  }, []);

  return (
    <Center flex={1}>
      {loading && (
        <Center justifyContent="center" alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" />
          <Heading color="primary.500" fontSize="md">
            Memuat Data
          </Heading>
        </Center>
      )}
      <ScrollView>
        {error && <Box>{error}</Box>}
        {datas && (
          <Box w={'100%'} h={'100%'}>
            <Box>
              <AspectRatio>
                <Box borderBottomRadius="3xl" shadow="9">
                  <Image
                    source={{
                      uri: datas.gambar,
                    }}
                    alt="image"
                    size="100%"
                    position="absolute"
                    borderBottomRadius="3xl"
                  />
                </Box>
              </AspectRatio>
            </Box>
            <Stack>
              <Stack px={3} py={3}>
                <Heading fontSize="4xl">{datas.nama_organisme}</Heading>
                <Text
                  fontSize="lg"
                  _light={{
                    color: 'violet.500',
                  }}
                  _dark={{
                    color: 'violet.200',
                  }}
                  fontWeight="500"
                  mt="0.5">
                  {datas.status_organisme ? 'Fauna : ' : 'Flora : '}
                  {datas.status_kelangkaan ? 'Langka' : 'Umum'}
                </Text>
                <Divider bg="indigo.500" thickness="2" />
                <Text fontWeight="400" fontSize="xl" textAlign="justify" my="2">
                  {datas.deskripsi}
                </Text>
                <Divider bg="indigo.500" thickness="2" />
                <Text mt="0.5" fontSize="lg" textAlign="center">
                  {datas.jumlah && 'Jumlah : ' + datas.jumlah}
                  {datas.status_organisme ? ' Ekor' : ' Pohon'}
                </Text>
                <Center py={3}>
                  <Box
                    bg="gray.200"
                    w="96%"
                    justifyContent="center"
                    alignItems="center">
                    <Heading color="indigo.500">Klasifikasi</Heading>
                    <Divider bg="gray.500" thickness="1" />
                    <Text fontSize="lg" bold>
                      Nama Ilmiah{' : '}
                      <Text italic>{datas.klasifikasi.namailmiah}</Text>
                    </Text>
                    <Divider bg="gray.500" thickness="1" />
                    <Text fontSize="lg" bold>
                      Kingdom{' : '}
                      <Text italic>{datas.klasifikasi.kingdom}</Text>
                    </Text>
                    <Divider bg="gray.500" thickness="1" />
                    <Divider bg="gray.500" thickness="1" />
                    <Text fontSize="lg" bold>
                      Ordo{' : '}
                      <Text italic>{datas.klasifikasi.ordo}</Text>
                    </Text>
                    <Divider bg="gray.500" thickness="1" />
                    <Divider bg="gray.500" thickness="1" />
                    <Text fontSize="lg" bold>
                      Famili{' : '}
                      <Text italic>{datas.klasifikasi.famili}</Text>
                    </Text>
                    <Divider bg="gray.500" thickness="1" />
                    <Divider bg="gray.500" thickness="1" />
                    <Text fontSize="lg" bold>
                      Genus{' : '}
                      <Text italic>{datas.klasifikasi.genus}</Text>
                    </Text>
                  </Box>
                </Center>
                <Center
                  mx={{
                    base: 'auto',
                    md: '0',
                  }}>
                  <Button
                    variant="solid"
                    colorScheme="secondary"
                    size="lg"
                    onPress={() =>
                      navigation.navigate('Peta', {
                        organismeId: datas._id,
                      })
                    }
                    w="30%">
                    Lihat Peta
                  </Button>
                </Center>
              </Stack>
            </Stack>
          </Box>
        )}
      </ScrollView>
    </Center>
  );
}

export default DetailInformation;
