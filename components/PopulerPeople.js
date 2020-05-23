import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

function PopulerPeople(params) {
  const imagesUri = 'https://image.tmdb.org/t/p/original/';
  const [PopulerPeople, setPopulerPeople] = useState([]);
  const api_key = '68c64b166b241b09d598e6f5d102d9ee';
  useEffect(() => {
    const bootstrapAsync = async () => {
      const Populer = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=TR&page=1`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setPopulerPeople(Populer.results);
    };
    bootstrapAsync();
  }, []);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {PopulerPeople.map((data, index) => {
        const star = data.known_for[0].vote_average;
        var film_adi = null;

        if (data.original_title == null) {
          film_adi = data.name;
        } else {
          film_adi = data.original_title;
        }
        return (
          <View style={styles.poster} key={index}>
            <FastImage
              source={{
                uri: imagesUri + data.known_for[0].backdrop_path,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              style={{width: 200, height: 200}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text text={film_adi.slice(0, 10)} FFamily="Montserrat-Bold" />
              </View>
              {star <= 2 ? (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                </View>
              ) : star > 2 && star <= 4 ? (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                </View>
              ) : star > 4 && star <= 6 ? (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                </View>
              ) : star > 6 && star <= 8 ? (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="white" />
                </View>
              ) : star > 8 && star <= 10 ? (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                  <Feather name="star" size={15} color="yellow" />
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                  <Feather name="star" size={15} color="white" />
                </View>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  poster: {
    width: 200,
    height: 300,
    marginLeft: 40,
    flexDirection: 'column',
  },
});
export default PopulerPeople;
