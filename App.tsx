/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import {NativeBaseProvider, Slide, Alert, Text} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigation/Navigator';
import {useNetInfo} from '@react-native-community/netinfo';

const App = () => {
  const netInfo = useNetInfo();
  const [isOpenTop, setIsOpenTop] = React.useState(false);
  const str = `${isOpenTop ? 'Hide' : 'Check Internet Connection'}`;
  return (
    <NativeBaseProvider>
      <Slide in={!netInfo?.isConnected} placement="top">
        <Alert justifyContent="center" status="error">
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            No Internet Connection
          </Text>
        </Alert>
      </Slide>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
