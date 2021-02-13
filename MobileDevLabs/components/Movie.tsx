import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import window from '../constants/Layout';
import { MovieItem } from '../types';
import { View, Text } from './Themed';

const Movie = ({
    movie,
    onPress
}: {
    movie: MovieItem;
    onPress: () => void;
}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.leftColumn}>
            <Image
                source={movie.Poster}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.infoColumn}>
                <Text style={styles.mainText}>{movie.Title}</Text>
                {movie.Year ? (
                    <Text style={styles.secondaryText}>{movie.Year}</Text>
                ) : null}
                {movie.Type ? (
                    <Text style={styles.secondaryText}>{movie.Type}</Text>
                ) : null}
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    leftColumn: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        height: window.window.height / 5,
        width: window.window.width / 3,
        margin: 5
    },
    infoColumn: {
        flex: 1,
        flexDirection: 'column'
    },
    mainText: {
        marginBottom: 10
    },
    secondaryText: {
        color: 'gray'
    }
});

export default Movie;
