import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
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
            props.navigation.navigate('CoinsScreen');
          }}>
          <Center>
            <Icon name="coins" size={25} color="darkorange" />
            <Text fontSize="12">Home</Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            props.navigation.navigate('DashboardScreen');
          }}>
          <Center>
            <Icon name="chart-line" size={25} color="darkorange" />
            <Text fontSize="12">Details</Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            props.navigation.navigate('ProfileScreen');
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
