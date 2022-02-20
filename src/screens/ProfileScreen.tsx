/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import FooterNavigation from '../components/FooterNavigation';
import HeaderNavigation from '../components/HeaderNavigation';
import {useIsFocused} from '@react-navigation/native';
import {
  Box,
  AspectRatio,
  useColorMode,
  useColorModeValue,
  Text,
  Image,
  IconButton,
  View,
  Center,
  Spinner,
  Stack,
  HStack,
  VStack,
  Heading,
  Circle,
  Pressable,
  Avatar,
  Spacer,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}
const ProfileScreen = ({navigation}: Props) => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const variant = useColorModeValue('solid', 'outline');
  const {colorMode, toggleColorMode} = useColorMode();
  const isFocused = useIsFocused();
  const [showRegister, setShowRegister] = useState(0);
  const [isHistoryLoaded, setHistoryLoaded] = useState(0);
  const swapScreen = () => {
    if (!showRegister) setShowRegister(1);
    if (showRegister) setShowRegister(0);
  };
  const [orderHistory, setOrderHistory] = useState([]);

  const onPressLogout = async () => {
    console.log('welcome');
  };

  return (
    <Box
      bg={darkModeScheme}
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center">
      <HeaderNavigation navigation={navigation} />
      <ScrollView>
        <Center mt={3}>
          <Center
            justifyContent="center"
            mx={{
              base: 'auto',
              md: '0',
            }}>
            <Avatar
              bg={colorScheme}
              mr="1"
              size="2xl"
              source={{
                uri: 'https://bit.ly/broken-link',
              }}>
              <Text fontSize="48">Ao</Text>
            </Avatar>
            <Text mt="3" fontSize="28">
              USer
            </Text>
          </Center>
        </Center>
        <Center>
          <Center
            h="125px"
            w="90%"
            rounded="xl"
            shadow={5}
            bg={darkModeScheme}
            mt={3}
            mb={3}>
            <Pressable mx="1" onPress={() => navigation.navigate('Favourites')}>
              <VStack alignItems="center">
                <Circle size="60px" bg={colorScheme} mt="5">
                  <Icon name="heart" size={30} />
                </Circle>
                <Text
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="500"
                  mt={1}
                  pb={0}>
                  Favorites
                </Text>
                <Spacer />
              </VStack>
            </Pressable>
          </Center>
          <Center
            h="125px"
            w="90%"
            rounded="xl"
            shadow={5}
            bg={darkModeScheme}
            mt={3}
            mb={3}>
            <Pressable mx="1" onPress={toggleColorMode}>
              <VStack alignItems="center">
                <Circle size="60px" bg={colorScheme} mt="5">
                  <Icon
                    name={colorMode == 'light' ? 'moon-o' : 'sun-o'}
                    size={30}
                  />
                </Circle>
                <Text
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="500"
                  mt={1}
                  pb={0}>
                  Theme
                </Text>
                <Spacer />
              </VStack>
            </Pressable>
          </Center>
          <Center
            h="125px"
            w="90%"
            rounded="xl"
            shadow={5}
            bg={darkModeScheme}
            mt={3}
            mb={3}>
            <Pressable mx="1" onPress={el => onPressLogout()}>
              <VStack alignItems="center">
                <Circle size="60px" bg={colorScheme} mt="5">
                  <Icon name="sign-out" size={30} />
                </Circle>
                <Text
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="500"
                  mt={1}
                  pb={0}>
                  Logout
                </Text>
                <Spacer />
              </VStack>
            </Pressable>
          </Center>
        </Center>
      </ScrollView>
      <FooterNavigation navigation={navigation} selected={2} />
    </Box>
  );
};

export default ProfileScreen;
