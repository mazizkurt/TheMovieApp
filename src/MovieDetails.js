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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

function MovieDetails({navigation, route}) {
  const movie_id = route.params.id;
  const [film, setFilm] = useState([]);
  const [onerilen, setOnerilen] = useState([]);
  const [benzer, setBenzer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(route.params.star);
  const [filmTitle, setFilmTitle] = useState(route.params.film_title);
  const [overview, setOverview] = useState(route.params.overview);
  const [backdrop_path, setBackdrop] = useState(route.params.backdrop_path);
  const imagesUri = 'https://image.tmdb.org/t/p/original/';
  const api_key = '68c64b166b241b09d598e6f5d102d9ee';
  useEffect(() => {
    const bootstrapAsync = async () => {
      const Film_Details = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=TR`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setFilm(Film_Details);
      const Onerilen_Filmler = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${api_key}&language=TR`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setOnerilen(Onerilen_Filmler);
      const Benzer_Filmler = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${api_key}&language=TR`,
      )
        .then(response => response.json())
        .then(json => {
          return json;
        });
      setBenzer(Benzer_Filmler);
      setLoading(false);
    };
    bootstrapAsync();
  }, []);
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
      <View style={{flex: 1, backgroundColor: '#11110F'}}>
        <ScrollView
          contentContainerStyle={styles.movieContainer}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" color="white" size={35} />
            </TouchableOpacity>
            <View style={styles.filmDetails}>
              <FastImage
                source={{uri: imagesUri + backdrop_path}}
                style={{width: '49%', height: 'auto', flex: 1}}
                resizeMode="cover"
              />

              <View style={styles.content}>
                <Text
                  text={filmTitle}
                  mL={20}
                  pR={20}
                  FFamily="Montserrat-ExtraBold"
                  size={20}
                />

                <Text
                  text="Kategoriler :"
                  mL={20}
                  mT={20}
                  FFamily="Montserrat-ExtraBold"
                  size={13}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 10,
                  }}>
                  {film.genres != undefined
                    ? film.genres.map((data, index) => {
                        return (
                          <Text
                            key={index}
                            text={data.name}
                            mL={20}
                            size={12}
                            FFamily="Montserrat-Medium"
                          />
                        );
                      })
                    : null}
                  {/* {} */}
                </View>

                <Text
                  text={'Film Tarihi :' + film.release_date}
                  mL={20}
                  mT={20}
                  FFamily="Montserrat-Medium"
                  size={13}
                />
                {film.runtime == null ? null : (
                  <Text
                    text={'Süre : ' + film.runtime + ' dk'}
                    mL={20}
                    mT={20}
                    FFamily="Montserrat-Medium"
                    size={13}
                  />
                )}

                <View style={{marginLeft: 20, marginTop: 20}}>
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
            </View>
            {overview == '' ? null : (
              <View>
                <Text
                  text="Açıklama"
                  mT={30}
                  FFamily="Montserrat-ExtraBold"
                  size={20}
                />
                <Text
                  text={overview}
                  mT={5}
                  FFamily="Montserrat-Medium"
                  size={12}
                />
              </View>
            )}
            <TouchableOpacity style={styles.arsiv_ekle}>
              <Text text="Arşive Ekle" FFamily="Montserrat-ExtraBold" />
            </TouchableOpacity>
            {Object.keys(benzer.results).length == 0 ? null : (
              <Text
                text="Benzer Filmler"
                mT={30}
                FFamily="Montserrat-ExtraBold"
                size={20}
              />
            )}

            {benzer.status_code > 0 ? null : (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{marginTop: 20}}
                showsHorizontalScrollIndicator={false}>
                {benzer.results.map((data, index) => {
                  var film_adi = null;

                  if (data.original_title == null) {
                    film_adi = data.name;
                  } else {
                    film_adi = data.original_title;
                  }

                  return (
                    <View style={styles.poster} key={index}>
                      {data.backdrop_path == null ? (
                        <Image
                          source={require('../assets/movie.png')}
                          style={{width: 200, height: 200}}
                        />
                      ) : (
                        <FastImage
                          source={{
                            uri: imagesUri + data.backdrop_path,
                            headers: {Authorization: 'someAuthToken'},
                            priority: FastImage.priority.high,
                          }}
                          style={{width: 200, height: 200}}
                        />
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <View style={{width: '50%'}}>
                          <Text text={film_adi} FFamily="Montserrat-Bold" />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
            {/* {Object.keys(onerilen.results).length == 0 ? null : (
              <Text
                text="Önerilen Filmler"
                mT={30}
                FFamily="Montserrat-ExtraBold"
                size={20}
              />
            )}

            {onerilen.status_code > 0 ? null : (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{marginTop: 20}}
                showsHorizontalScrollIndicator={false}>
                {onerilen.results.map((data, index) => {
                  var film_adi = null;

                  if (data.original_title == null) {
                    film_adi = data.name;
                  } else {
                    film_adi = data.original_title;
                  }
                  return (
                    <View style={styles.poster} key={index}>
                      {data.backdrop_path == null ? (
                        <Image
                          source={require('../assets/movie.png')}
                          style={{width: 200, height: 200}}
                        />
                      ) : (
                        <FastImage
                          source={{
                            uri: imagesUri + data.backdrop_path,
                            headers: {Authorization: 'someAuthToken'},
                            priority: FastImage.priority.high,
                          }}
                          style={{width: 200, height: 200}}
                        />
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <View style={{width: '50%'}}>
                          <Text text={film_adi} FFamily="Montserrat-Bold" />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  movieContainer: {
    backgroundColor: '#11110F',
  },
  header: {
    padding: 30,
  },
  filmDetails: {
    marginTop: 40,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  arsiv_ekle: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C26B7',
    marginTop: 20,
    borderRadius: 5,
  },
  poster: {
    width: 200,
    height: 300,
    flexDirection: 'column',
    marginLeft: 20,
  },
});
export default MovieDetails;
