import React from 'react';
import {FlatList, Text, View} from 'react-native';
import currencyFormatter from 'currency-formatter';

import Icon from 'react-native-vector-icons/Ionicons';
import {Cast} from '../interfaces/creditsInterface';
import {MovieFull} from '../interfaces/movieInterface';
import {CastItem} from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({movieFull, cast}: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" color="grey" size={16} />

          <Text style={{color: 'black'}}> {movieFull.vote_average.toFixed(1)}</Text>

          <Text style={{marginLeft: 5, color: 'black'}}>
            {' '}
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        {/* Historia */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold', color: 'black'}}>
          Historia
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>{movieFull.overview}</Text>

        {/* Presupesto */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold', color: 'black'}}>
          Presupuesto
        </Text>
        <Text style={{color: 'black', fontSize: 18}}>
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>

        {/* Casting */}
        <View style={{marginTop: 10, marginBottom: 30}}>
          <Text
            style={{
              fontSize: 23,
              marginTop: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Actores
          </Text>

          <FlatList
            data={cast}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <CastItem actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10, height: 80}}
          />
        </View>
      </View>
    </>
  );
};
