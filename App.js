import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import Home from './Component/Home';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1}>
        <Home />
      </Box>
    </NativeBaseProvider>
  );
}
