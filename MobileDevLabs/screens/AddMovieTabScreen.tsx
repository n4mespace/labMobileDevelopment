import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import AddMovie from '../components/AddMovie';
import { View } from '../components/Themed';
import { MovieItem } from '../types';

const AddMovieTabScreen = ({
    route: {
        params: { addMovie }
    }
}: {
    route: { params: { addMovie: (movie: MovieItem) => void } };
}) => (
    <View style={styles.container}>
        <ScrollView
            removeClippedSubviews
            fadingEdgeLength={50}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <AddMovie addMovie={addMovie} />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    }
});

export default AddMovieTabScreen;
