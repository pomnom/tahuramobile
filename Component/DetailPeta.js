import React, {useEffect, useState} from 'react';
import {Box, Center, Text} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import axiosconfig from './config/axiosconfig';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

function DetailPeta({navigations, route}) {
  const {organismeId} = route.params;
  const [kordinats, setkordinats] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [organisme, setorganisme] = useState(null);
  const [myloc, setmyloc] = useState(null);
  useEffect(() => {
    axios
      .all([
        axiosconfig.getDataById(organismeId),
        axiosconfig.getAllPeta(organismeId),
      ])
      .then(
        axios.spread((...responses) => {
          setorganisme(responses[0].data);
          setkordinats(responses[1].data);
          setloading(false);
          seterror(null);
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
        }),
      )
      .catch(err => {
        if (err.response) {
          seterror(false);
          seterror(err.message);
        } else if (error.request) {
          setloading(false);
          seterror(error.message);
        }
      });
  }, []);
  return (
    <Center bg="white">
      {error && <Box>{error}</Box>}
      {loading && <Box>Loading..</Box>}
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
            latitude: myloc
              ? myloc.coords.latitude
              : parseFloat(kordinats[0].latitude),
            longitude: myloc
              ? myloc.coords.longitude
              : parseFloat(kordinats[0].longtitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
          {myloc && (
            <Marker
              pinColor="cyan"
              coordinate={{
                latitude: myloc.coords.latitude,
                longitude: myloc.coords.longitude,
              }}
            />
          )}
        </MapView>
      )}
    </Center>
  );
}

export default DetailPeta;
