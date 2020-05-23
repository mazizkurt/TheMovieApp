import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
function Trending(params) {
  const imagesUri = 'https://image.tmdb.org/t/p/original/';
  const [PopulerFilmler, setPopulerFilmler] = useState([]);
  const api_key = '68c64b166b241b09d598e6f5d102d9ee';
  useEffect(() => {
    const bootstrapAsync = async () => {
      const Populer = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&language=TR`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setPopulerFilmler(Populer.results);
    };
    bootstrapAsync();
  }, []);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {PopulerFilmler.map((data, index) => {
        const star = data.vote_average;
        var film_adi = null;
        var film_tarihi = '-';
        if (data.release_date == null) {
        } else {
          var date = data.release_date.split('-');
          film_tarihi = date[2] + '.' + date[1] + '.' + date[0];
        }
        if (data.title == null) {
          film_adi = data.name;
        } else {
          film_adi = data.title;
        }
        return (
          <TouchableOpacity
            onPress={() =>
              params.navigation.push('MovieDetails', {
                id: data.id,
                backdrop_path: data.backdrop_path,
                film_title: film_adi,
                star: star,
                overview: data.overview,
              })
            }
            style={styles.poster}
            key={index}
            activeOpacity={0.6}>
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
              text={'Film Tarihi : ' + film_tarihi}
              mT={10}
              FFamily="Montserrat-Medium"
              size={12}
            />
          </TouchableOpacity>
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
export default Trending;
