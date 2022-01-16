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
} from 'native-base';
import axiosconfig from './config/axiosconfig';

function DetailInformation({navigation, route}) {
  const {organismeId} = route.params;
  const [datas, setdatas] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);

  const getData = () => {
    axiosconfig
      .getDataById(organismeId)
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <Center flex={1}>
        {error && <Box>{error}</Box>}
        {loading && (
          <Center flexDir="row">
            <Spinner accessibilityLabel="Loading posts" size="lg" />
            <Heading color="primary.500" fontSize="md">
              Memuat Data
            </Heading>
          </Center>
        )}
        {datas && (
          <Box w={'100%'} h={'100%'}>
            <Box>
              <AspectRatio>
                <Box>
                  <Image
                    source={{
                      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
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
                </Text>
              </Stack>
            </Stack>
          </Box>
        )}
      </Center>
    </ScrollView>
  );
}

export default DetailInformation;
