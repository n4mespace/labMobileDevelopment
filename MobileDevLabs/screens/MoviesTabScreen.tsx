import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Movie from '../components/Movie';
import window from '../constants/Layout';
import { View } from '../components/Themed';
import Movies from '../collections/MoviesList';

const MoviesTabScreen = () => (
    <View style={styles.container}>
        <FlatList
            data={Movies}
            centerContent
            windowSize={5}
            keyExtractor={({ imdbID }) => imdbID}
            fadingEdgeLength={50}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={(sectionId, rowId) => (
                <View
                    key={rowId}
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
            )}
            style={{ width: window.window.width / 1.1 }}
            renderItem={({ item }) => <Movie movie={item} />}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%'
    }
});

export default MoviesTabScreen;
