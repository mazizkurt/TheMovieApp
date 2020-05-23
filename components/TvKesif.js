import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
function TvKesif(params) {
  const imagesUri = 'https://image.tmdb.org/t/p/original/';
  const [KesifFilmler, setKesifFilmler] = useState([]);
  const api_key = '68c64b166b241b09d598e6f5d102d9ee';
  useEffect(() => {
    const bootstrapAsync = async () => {
      const Populer = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=TR&sort_by=popularity.desc&page=1&timezone=Europe/Istanbul`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setKesifFilmler(Populer.results);
    };
    bootstrapAsync();
  }, []);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {KesifFilmler.map((data, index) => {
        const star = data.vote_average;
        var film_adi = null;
        var film_tarihi = '-';
        if (data.first_air_date == null) {
        } else {
          var date = data.first_air_date.split('-');
          film_tarihi = date[2] + '.' + date[1] + '.' + date[0];
        }
        if (data.original_title == null) {
          film_adi = data.name;
        } else {
          film_adi = data.original_title;
        }
        return (
          <View style={styles.poster} key={index}>
            <FastImage
              source={{
                uri: imagesUri + data.backdrop_path,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
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
            <Text
              text={'İlk TV Tarihi : ' + film_tarihi}
              mT={10}
              FFamily="Montserrat-Medium"
              size={12}
            />
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
export default TvKesif;
