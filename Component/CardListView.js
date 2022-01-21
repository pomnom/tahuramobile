import React from 'react';
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
import GetDataAllOrganisme from './catchapi/GetDataAllOrganisme';

function CardListView({navigation}) {
  const {error, loading, datas} = GetDataAllOrganisme();
  return (
    <ScrollView flex={1}>
      <VStack space={1} alignItems="center" safeArea>
        <Heading
          px="40"
          py="4"
          my="3"
          bg="emerald.400"
          borderBottomRadius="50"
          textAlign="center">
          Fauna
        </Heading>

        {datas && (
          <HStack
            alignItems="center"
            flexWrap="wrap"
            space={1.5}
            paddingLeft="2">
            {datas
              .filter(datas => datas.status_organisme)
              .slice(0, 4)
              .map(organisme => (
                <Box key={organisme._id} width={'48%'}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('detail', {
                        screen: 'Detail',
                        params: {organismeId: organisme._id},
                      })
                    }
                    my={3}
                    bg="emerald.400"
                    borderRadius={'lg'}>
                    <Box>
                      <AspectRatio w="100%" ratio={9 / 16}>
                        <Image
                          borderRadius={'lg'}
                          source={{
                            uri: organisme.gambar,
                          }}
                          alt="Alternate Text"
                          size="100%"
                        />
                      </AspectRatio>
                    </Box>
                    <Stack space={2}>
                      <Stack space={1}>
                        <Text
                          textAlign="center"
                          fontSize="xl"
                          fontWeight="bold"
                          py={1}>
                          {organisme.nama_organisme}
                        </Text>
                      </Stack>
                    </Stack>
                  </Pressable>
                </Box>
              ))}
          </HStack>
        )}
      </VStack>
      <VStack space={1} alignItems="center" safeArea>
        <Heading
          textAlign="center"
          px="40"
          py="4"
          my="3"
          bg="emerald.400"
          borderBottomRadius="50"
          textAlign="center">
          Flora
        </Heading>
        {datas && (
          <HStack
            alignItems="center"
            flexWrap="wrap"
            space={1.5}
            paddingLeft="2">
            {datas
              .filter(datas => !datas.status_organisme)
              .slice(0, 4)
              .map(organisme => (
                <Box key={organisme._id} width={'48%'}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('detail', {
                        screen: 'Detail',
                        params: {organismeId: organisme._id},
                      })
                    }
                    my={3}
                    bg="emerald.400"
                    borderRadius={'lg'}>
                    <Box>
                      <AspectRatio w="100%" ratio={9 / 16}>
                        <Image
                          borderRadius={'lg'}
                          source={{
                            uri: organisme.gambar,
                          }}
                          alt="Alternate Text"
                          size="100%"
                        />
                      </AspectRatio>
                    </Box>
                    <Stack space={2}>
                      <Stack space={1}>
                        <Text
                          textAlign="center"
                          fontSize="xl"
                          fontWeight="bold"
                          py={1}>
                          {organisme.nama_organisme}
                        </Text>
                      </Stack>
                    </Stack>
                  </Pressable>
                </Box>
              ))}
          </HStack>
        )}
      </VStack>
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
    </ScrollView>
  );
}
export default CardListView;
