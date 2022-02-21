import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Alert,
  Spinner,
  Pressable,
  Button,
  IconButton,
  Divider,
  Input,
  Center,
  useColorModeValue,
  Avatar,
  HStack,
  Spacer,
  Slide,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {StackScreenProps} from '@react-navigation/stack';
import FooterNavigation from '../components/FooterNavigation';
import HeaderNavigation from '../components/HeaderNavigation';

interface Props extends StackScreenProps<any, any> {}
export const CoinsScreen = ({navigation, route}: Props) => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchText, steSearchText] = useState('');


  const getRecords = async () => {
    try {
      const response = await fetch(
        'https://api.coinlore.net/api/tickers/?start=0&limit=50',
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = (text: string) => {
    console.log('filtering:', text);

    setData(
      data.filter(data => {
        return data?.name.includes(text);
      }),
    );
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Box
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
      <HeaderNavigation navigation={navigation} />
      <VStack my="0.5" space={5} w="100%" safeAreaBottom>
        <VStack w="95%" space={5} alignSelf="center">
          <Input
            onChangeText={text => (
              steSearchText(text), filterRecords(searchText)
            )}
            placeholder="Search a crypto name"
            variant="filled"
            width="100%"
            borderRadius="10"
            borderWidth="0"
            InputRightElement={
              <IconButton
                onPress={() => {
                  filterRecords(searchText);
                }}
                icon={<Icon name="search" size={25} color="darkorange" />}
              />
            }
          />
        </VStack>
      </VStack>
      <ScrollView>
        {isLoading ? (
          <Center mt={200}>
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="primary.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
          </Center>
        ) : (
          data.map(item => {
            return (
              <Box>
                <Pressable
                  onPress={() => {
                    navigation.navigate('DashboardScreen', {
                      itemId: item.id,
                      name: item.name,
                    });
                  }}
                  _dark={{
                    bg: 'coolGray.800',
                  }}
                  _light={{
                    bg: 'white',
                  }}>
                  <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                      <Avatar
                        size="48px"
                        source={{
                          uri: item.avatarUrl,
                        }}
                      />
                      <VStack>
                        <Text
                          color="coolGray.800"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          bold>
                          {item.name}
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {item.name}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        color="coolGray.800"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        alignSelf="flex-start">
                        {item?.rank}
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
              </Box>
            );
          })
        )}
      </ScrollView>
      <FooterNavigation navigation={navigation} selected={0} />
    </Box>
  );
};
