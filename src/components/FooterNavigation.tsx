import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Box,
  HStack,
  Pressable,
  Center,
  Text,
  useColorModeValue,
} from 'native-base';

export const FooterNavigation = (props: any) => {
  const [selected, setSelected] = React.useState(props.selected);
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  console.log('navigator: ', props);
  useEffect(() => {
    setSelected(props.selected);
  }, [selected]);
  return (
    <>
      <Center flex={1}></Center>
      <HStack bg={darkModeScheme} alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Center>
            <Icon name="home" size={25} color="darkorange" />
            <Text fontSize="12">Home</Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            props.navigation.navigate('Favourites');
          }}>
          <Center>
            <Icon name="heart" size={25} color="darkorange" />
            <Text fontSize="12">Favorites</Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => {
            props.navigation.navigate('Cart');
          }}>
          <Center>
            <Icon name="shopping-cart" size={25} color="darkorange" />
            <Text fontSize="12">Cart</Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}>
          <Center>
            <Icon name="user" size={25} color="darkorange" />
            <Text fontSize="12">Account</Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  );
};

export default FooterNavigation;
