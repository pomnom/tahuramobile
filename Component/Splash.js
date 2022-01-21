import React from 'react';
import {Center, Image} from 'native-base';

function Spash() {
  return (
    <Center flex={1} maxW="100%">
      <Image source={require('./srcimg/splash.png')} alt="text" size="full" />
    </Center>
  );
}
export default Spash;
