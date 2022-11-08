import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';

import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { getImageColors } from '../helpers/getImageColors';
import { GradientContext } from '../context/GradientContext';

const windowWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
  // Utilisamos nuestro custom hook useMovies
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();

  // Utilizamos el hook que nos facilita React Native
  const { top } = useSafeAreaInsets();

  // Utiliamos nuestro GradientContext
  const { setMainColors } = useContext(GradientContext);

  // Función que contiene una función que obtiene los colores de la imagen en pantalla
  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View
          style={{
            marginTop: top + 20,
          }}>
          {/* Carrusel principal */}
          <View style={{ height: 420 }}>
            <Carousel
              data={nowPlaying!}
              renderItem={({ item }: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Peliculas populares */}
          <HorizontalSlider title="Populares" movies={popular} />
          <HorizontalSlider title="Top más votadas" movies={topRated} />
          <HorizontalSlider title="Próximamente" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
