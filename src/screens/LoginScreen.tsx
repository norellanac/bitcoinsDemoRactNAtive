import React, {useContext, useEffect, useState} from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  Button,
  VStack,
  Code,
  Image,
  FormControl,
  Input,
  Box,
  Stack,
  useColorModeValue,
} from 'native-base';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import NativeBaseIcon from '../components/NativeBaseIcon';

// Color Switch Component
export const ToggleDarkMode = () => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light' ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
};

interface Props extends StackScreenProps<any, any> {}
export const LoginScreen = ({navigation}: Props) => {
  const [textColor, setTextColor] = useState('primary.500');
  const [bgColor, setBgColor] = useState('primary.50');
  const {colorMode, toggleColorMode} = useColorMode();
  const colorScreen = colorMode === 'dark' ? 'dark' : 'light';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = async () => {
    navigation.navigate('CoinsScreen');
  };

  return (
    <Center
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}
      px={4}
      flex={1}
      safeAreaTop>
      <VStack space={5} alignItems="center">
        <Image
          size={100}
          resizeMode={'contain'}
          source={{
            uri: 'https://www.iconpacks.net/icons/2/free-cryptocurrency-coin-icon-2457-thumb.png',
          }}
          borderRadius={300}
          alt="Alternate Text"
        />
        <Heading size="lg">Welcome to Cryptoapp</Heading>
        <Heading mt="1" size="xs">
          Sign in to continue!
        </Heading>
        <HStack space={2} mt="5">
          <FormControl>
            <FormControl.Label>Email | username</FormControl.Label>
            <Input
              placeholder="Enter your email or username"
              onChangeText={text => setEmail(text)}
            />
          </FormControl>
        </HStack>

        <Button
          mt="2"
          colorScheme="primary"
          onPress={onPressLogin}
          variant={'solid'}
          rounded="xl"
          isDisabled={email.length ? false : true}>
          Sign in
        </Button>
        <Center mt={25}>
          <ToggleDarkMode />
        </Center>
      </VStack>
    </Center>
  );
};
