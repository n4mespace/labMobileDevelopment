import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

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
        <ScrollView
            fadingEdgeLength={50}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <MovieDetail movie={movie} key={movie.imdbID} />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    }
});

export default MovieDetailTabScreen;
