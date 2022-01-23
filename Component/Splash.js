import React from 'react';
import {Center, Image} from 'native-base';

function Spash() {
  return (
    <Center flex={1} bg="white">
      <Image source={require('../assets/logo.png')} alt="text" size="2xl" />
    </Center>
  );
}
export default Spash;
