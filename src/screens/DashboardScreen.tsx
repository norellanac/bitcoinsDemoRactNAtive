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
  Stack,
  Center,
  useColorModeValue,
  Avatar,
  HStack,
  Spacer,
  Slide,
} from 'native-base';
import {TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import FooterNavigation from '../components/FooterNavigation';
import HeaderNavigation from '../components/HeaderNavigation';

interface Props extends StackScreenProps<any, any> {}
export const DashboardScreen = ({navigation}: Props) => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const [isOpenTop, setIsOpenTop] = React.useState(false);
  const str = `${isOpenTop ? 'Hide' : 'Check Internet Connection'}`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getRecords = async () => {
    try {
      const response = await fetch(
        'https://api.coinlore.net/api/tickers/?start=100&limit=50',
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      <Slide in={isOpenTop} placement="top">
        <Alert justifyContent="center" status="error">
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            No Internet Connection
          </Text>
        </Alert>
      </Slide>
      <Heading size="lg">Welcome to Cryptoapp</Heading>
      <Heading mt="1" size="xs">
        Sign in to continue!
      </Heading>
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
                  onPress={() => console.log('You touched me')}
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
                        {item.rank}
                      </Text>
                    </HStack>
                  </Box>
                </Pressable>
              </Box>
            );
          })
        )}
      </ScrollView>
      <Box w="10080%">
        <Button
          mt="auto"
          onPress={() => setIsOpenTop(!isOpenTop)}
          variant="unstyled"
          bg="coolGray.700:alpha.30">
          {str}
        </Button>
      </Box>
      <FooterNavigation navigation={navigation} selected={0} />
    </Box>
  );
};
