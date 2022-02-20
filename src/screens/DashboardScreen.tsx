import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  useColorMode,
} from 'native-base';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}
export const DashboardScreen = ({navigation}: Props) => {
  const [textColor, setTextColor] = useState('primary.500');
  const [bgColor, setBgColor] = useState('primary.50');
  const {colorMode, toggleColorMode} = useColorMode();
  const colorScreen = colorMode === 'dark' ? 'dark' : 'light';
  useEffect(() => {
    if (colorMode === 'dark') {
      setTextColor('primary.500');
      setBgColor('primary.50');
    } else {
      setTextColor('primary.50');
      setBgColor('primary.500');
    }
  }, []);

  return (
    <Center
      flex="1"
      _dark={{bg: 'primary.400'}}
      _light={{bg: 'primary.400'}}></Center>
  );
};
