import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LoadingIndicator } from 'dooboo-ui';
import { Image } from 'react-native-elements';
import { window } from '../constants/Layout';
import { MovieItem } from '../types';
import { View, Text } from './Themed';

const MovieDetail = ({ movie }: { movie: MovieItem }) => (
    <View style={styles.container}>
        <Image
            source={movie.Poster}
            resizeMode="contain"
            style={styles.image}
            placeholderStyle={{ backgroundColor: 'transparent' }}
            PlaceholderContent={<LoadingIndicator color="gray" />}
        />
        {Object.entries(movie).map(([key, value], idx) =>
            key !== 'imdbID' && key !== 'Poster' ? (
                <Text style={idx % 3 === 0 ? styles.separator : {}}>
                    <Text style={styles.text}>{key}: </Text>
                    <Text>{value}</Text>
                </Text>
            ) : null
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    image: {
        alignSelf: 'center',
        height: window.height / 2,
        width: window.width / 1.5,
        margin: 20
    },
    separator: {
        marginBottom: '3%'
    },
    text: {
        color: 'gray'
    }
});

export default MovieDetail;
