import React, {useEffect} from 'react';
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

interface Props extends StackScreenProps<any, any> {}
const HeaderNav = ({navigation}: Props) => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
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
            USer
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
