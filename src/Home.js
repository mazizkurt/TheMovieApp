import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Text from '../components/Text';
import Feather from 'react-native-vector-icons/Feather';
import Trending from '../components/Trending';
import Kesif from '../components/Kesif';
import PopulerPeople from '../components/PopulerPeople';
import TvKesif from '../components/TvKesif';
import Sinema from '../components/Sinema';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  const left = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  function kaydir() {
    setSearch(true);
    Animated.timing(left, {
      toValue: -190,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }
  function kapat() {
    setSearch(false);
    Animated.timing(left, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#11110F',
        }}>
        <StatusBar barStyle="light-content" backgroundColor="#11110F" />
        <ActivityIndicator color="white" size={30} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.containerView}>
        <StatusBar barStyle="light-content" backgroundColor="#11110F" />
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Animated.View style={{marginLeft: left}}>
                <Text text="Trendler" size={20} FFamily="Montserrat-Bold" />
              </Animated.View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {search ? (
                  <TouchableOpacity onPress={() => kapat()}>
                    <Feather name="x-circle" color="#BCBCBC" size={20} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => kaydir()}>
                    <Feather name="search" color="#BCBCBC" size={20} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={{marginLeft: 20}}>
                  <Feather name="settings" color="#BCBCBC" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Trending navigation={navigation} />
          <View style={styles.content}>
            <Text text="Şuan Sinemada" size={20} FFamily="Montserrat-Bold" />
          </View>
          <Sinema navigation={navigation} />
          <View style={styles.content}>
            <Text text="Popüler Aktörler" size={20} FFamily="Montserrat-Bold" />
          </View>
          <PopulerPeople />
          <View style={styles.content}>
            <Text text="Film Keşfet" size={20} FFamily="Montserrat-Bold" />
          </View>
          <Kesif />
          <View style={styles.content}>
            <Text text="TV Keşfet" size={20} FFamily="Montserrat-Bold" />
          </View>
          <TvKesif />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11110F',
  },
  containerView: {
    flex: 1,
    backgroundColor: '#11110F',
  },
  loading: {
    width: 50,
    height: 50,
  },
  content: {
    padding: 30,
  },
  poster: {
    width: 200,
    height: 300,
    marginLeft: 40,
    flexDirection: 'column',
  },
});
export default Home;
