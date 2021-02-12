import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Movie from '../components/Movie';
import window from '../constants/Layout';
import { View } from '../components/Themed';
import Movies from '../collections/MoviesList';
import { MovieItem } from '../types';

const MoviesTabScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: MovieItem }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MovieDetailTabScreen', {
                    movie: item
                })
            }
        >
            <Movie movie={item} />
        </TouchableOpacity>
    );

    const itemSeparatorComponent = (_: number, rowId: number) => (
        <View
            key={rowId}
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Movies}
                centerContent
                windowSize={5}
                keyExtractor={({ imdbID }) => imdbID}
                fadingEdgeLength={50}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={itemSeparatorComponent}
                style={{ width: window.window.width / 1.1 }}
                renderItem={renderItem}
            />
        </View>
    );
};

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
