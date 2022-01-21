import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import Home from './Component/Home';
import ReqPermission from './Component/ReqPermission';
import Splash from './Component/Splash';

export default function App() {
  const [showsplash, setshowsplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowsplash(false);
    }, 1500);
    ReqPermission();
  }, []);
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1}>
        {showsplash ? <Splash /> : <Home />}
      </Box>
    </NativeBaseProvider>
  );
}
