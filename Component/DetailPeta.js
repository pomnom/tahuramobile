import React, {useEffect, useState} from 'react';
import {Box, Center, Text, Spinner, Heading} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import GetPetas from './GetPetas';

function DetailPeta({navigations, route}) {
  const {organismeId} = route.params;
  const {kordinats, error, loading, organisme} = GetPetas(organismeId);
  const [myloc, setmyloc] = useState(null);
  const getmyloc = () => {
    Geolocation.getCurrentPosition(
      position => {
        setmyloc(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getmyloc();
  }, []);
  return (
    <Center bg="primary.100" flex={1}>
      {error && <Box>{error}</Box>}
      {loading && (
        <Center justifyContent="center" alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" />
          <Heading color="primary.500" fontSize="md">
            Memuat Data
          </Heading>
        </Center>
      )}
      {organisme && (
        <Text
          textAlign="center"
          fontSize={25}
          py={5}
          w="100%"
          fontWeight="bold">
          {organisme.nama_organisme}
        </Text>
      )}
      {kordinats && (
        <MapView
          initialRegion={{
            latitude: myloc ? myloc.coords.latitude : -8.3,
            longitude: myloc ? myloc.coords.longitude : 116.4,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          zoomControlEnabled={true}
          style={{width: 400, height: 700}}>
          {kordinats.map(kor => {
            return (
              <Marker
                key={kor._id}
                coordinate={{
                  latitude: parseFloat(kor.latitude),
                  longitude: parseFloat(kor.longtitude),
                }}
              />
            );
          })}
        </MapView>
      )}
    </Center>
  );
}

export default DetailPeta;
