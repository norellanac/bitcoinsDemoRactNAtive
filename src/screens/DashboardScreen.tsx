import React, {useContext, useEffect, useState, useRef} from 'react';
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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

import {useNetInfo} from '@react-native-community/netinfo';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import FooterNavigation from '../components/FooterNavigation';
import HeaderNavigation from '../components/HeaderNavigation';

interface Props extends StackScreenProps<any, any> {}
export const DashboardScreen = ({navigation, route}: Props) => {
  const netInfo = useNetInfo();
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('blueGray.50', 'blueGray.900');
  const [isDataUpdated, steIsDataUpdated] = React.useState(false);
  const [maxTimesFetch, setMaxTimesFetch] = React.useState(0);
  const [secondsData, setSecondsData] = React.useState(30);
  const [timeCounter, setTimeCounter] = React.useState(30);
  const str = `${isDataUpdated ? 'Hide' : 'Check Internet Connection'}`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, stChartLabels] = useState([]);

  const getRecords = async () => {
    console.log('fetching api records');
    steIsDataUpdated(true);
    try {
      const response = await fetch(
        'https://api.coinlore.net/api/ticker/?id=' + route.params.itemId,
      );
      const json = await response.json();
      setData(json);
      setChartData([...chartData, parseFloat(json[0]?.price_usd)]);
      stChartLabels([...chartLabels, '$']);
      console.log('chartData', chartData, chartLabels);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setMaxTimesFetch(maxTimesFetch + 1);
      hideSlideData();
      console.log('end request, fetch times', maxTimesFetch);
    }
  };
  const hideSlideData = () => {
    steIsDataUpdated(false);
  };

  useEffect(() => {
    if (maxTimesFetch < 4 && netInfo?.isConnected) {
      if (timeCounter === 30) {
        getRecords();
      }
      if (timeCounter > 0) {
        const timeout = setTimeout(() => {
          setTimeCounter(timeCounter - 1);
        }, 100);

        return () => {
          clearTimeout(timeout);
        };
      } else {
        setTimeCounter(30);
      }
    } else {
      setTimeCounter(30);
    }
  }, [timeCounter, netInfo?.isConnected]);

  return (
    <Box
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
      <HeaderNavigation navigation={navigation} />
      <Slide in={isDataUpdated} placement="top">
        <Alert justifyContent="center" status="info">
          <Alert.Icon />
          <Text color="info.600" fontWeight="medium">
            Updating records {maxTimesFetch}
          </Text>
        </Alert>
      </Slide>
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
        <View>
          <Text>Nex Line Chart update in : {timeCounter}, remaining</Text>
          {chartData.length ? (
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={120}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <FooterNavigation navigation={navigation} selected={0} />
    </Box>
  );
};
function usePrevious(maxTimesFetch: number) {
  throw new Error('Function not implemented.');
}
