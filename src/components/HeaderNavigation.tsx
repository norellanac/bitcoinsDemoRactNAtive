import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Box,
  HStack,
  IconButton,
  StatusBar,
  Text,
  useColorModeValue,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any> {}
const HeaderNav = ({navigation}: Props) => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const [user, setUser] = useState('');
  const getLocalData = async () => {
    let val = await AsyncStorage.getItem('user');
    setUser(val);
    console.log('readed local data', val);
  };

  useEffect(() => {
    getLocalData();
  }, []);
  return (
    <>
      <StatusBar bg={darkModeScheme} />
      <Box safeAreaTop bg={darkModeScheme} />
      <HStack
        bg={darkModeScheme}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack alignItems="center">
          <IconButton
            onPress={() => {
              navigation.goBack();
            }}
            icon={
              <Icon name="arrow-circle-left" size={25} color="darkorange" />
            }
          />
        </HStack>
        <HStack>
          <Text fontSize="20" fontWeight="bold">
            {user}
          </Text>
          <IconButton
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}
            icon={<Icon name="user" size={25} color="darkorange" />}
          />
        </HStack>
      </HStack>
    </>
  );
};

export default HeaderNav;
