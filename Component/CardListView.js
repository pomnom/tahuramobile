import React, {useEffect, useState} from 'react';
import {
  Image,
  Heading,
  VStack,
  HStack,
  Center,
  IconButton,
  CloseIcon,
  Text,
  Box,
  Spinner,
  Alert,
  ScrollView,
  Pressable,
  AspectRatio,
  Stack,
} from 'native-base';
import axiosconfig from './config/axiosconfig';

function CardListView({navigation}) {
  const [datas, setdatas] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axiosconfig
      .getAllData()
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
  }, []);
  return (
    <ScrollView flex={1}>
      <VStack space={1} alignItems="center" safeArea>
        <Heading textAlign="center" mb="10">
          Fauna
        </Heading>
        {error && (
          <Alert w="100%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {error}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={
                    <CloseIcon
                      size="3"
                      color="coolGray.600"
                      onPress={() => {
                        seterror(false);
                        onRefresh;
                      }}
                    />
                  }
                />
              </HStack>
            </VStack>
          </Alert>
        )}
        {loading && (
          <Center flexDir="row">
            <Spinner accessibilityLabel="Loading posts" size="lg" />
            <Heading color="primary.500" fontSize="md">
              Memuat Data
            </Heading>
          </Center>
        )}
        {datas && (
          <HStack
            alignItems="center"
            flexWrap="wrap"
            space={1.5}
            paddingLeft="2">
            {datas.map(organisme => (
              <Box key={organisme._id} width={'48%'}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Detail', {
                      organismeId: organisme._id,
                    })
                  }>
                  <Box>
                    <AspectRatio w="100%" ratio={9 / 16}>
                      <Image
                        borderRadius={'lg'}
                        source={{
                          uri: 'https://wallpaperaccess.com/full/317501.jpg',
                        }}
                        alt="Alternate Text"
                        size="100%"
                      />
                    </AspectRatio>
                  </Box>
                  <Stack space={2}>
                    <Stack space={1}>
                      <Heading>{organisme.nama_organisme}</Heading>
                    </Stack>
                  </Stack>
                </Pressable>
              </Box>
            ))}
          </HStack>
        )}
      </VStack>
    </ScrollView>
  );
}
export default CardListView;
