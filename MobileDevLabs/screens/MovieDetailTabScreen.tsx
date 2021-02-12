import * as React from 'react';
import { StyleSheet } from 'react-native';

import MovieDetail from '../components/MovieDetail';
import { View } from '../components/Themed';
import { MovieItem } from '../types';

const MovieDetailTabScreen = ({
    route: {
        params: { movie }
    }
}: {
    route: { params: { movie: MovieItem } };
}) => (
    <View style={styles.container}>
        <MovieDetail movie={movie} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MovieDetailTabScreen;
