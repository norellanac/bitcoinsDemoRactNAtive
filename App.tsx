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
 import {NativeBaseProvider} from 'native-base';
 
 import {NavigationContainer} from '@react-navigation/native';
 import {Navigator} from './src/navigation/Navigator';
 
 const App = () => {
   return (
     <NativeBaseProvider>
       <NavigationContainer>
         <Navigator />
       </NavigationContainer>
     </NativeBaseProvider>
   );
 };
 export default App;
 
