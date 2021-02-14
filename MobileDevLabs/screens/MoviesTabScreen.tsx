import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Movie from '../components/Movie';
import Movies from '../collections/MoviesList';
import window from '../constants/Layout';
import { View, Text } from '../components/Themed';
import { MovieItem, MoviesList } from '../types';

const MoviesTabScreen = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = React.useState<MoviesList>(Movies);

    const addMovieButton = () => {
        const addMovie = (movie: MovieItem) => {
            setMovies([...movies, movie]);
        };

        const moveToAddMovie = () =>
            navigation.navigate('AddMovieTabScreen', { addMovie });

        return (
            <Button
                onPress={moveToAddMovie}
                icon={<AntDesign name="plus" size={25} color="black" />}
                buttonStyle={styles.addMovieButton}
            />
        );
    };

    navigation.setOptions({
        headerRight: addMovieButton
    });

    const renderItem = React.useCallback(
        ({ item }) => {
            const moveToMovieDetail = () =>
                navigation.navigate('MovieDetailTabScreen', {
                    movie: item
                });

            const deleteMovie = () => {
                const newMovies = movies.filter(
                    ({ imdbID }) => imdbID !== item.imdbID
                );
                setMovies(newMovies);
            };

            return (
                <Movie
                    movie={item}
                    moveToMovieDetail={moveToMovieDetail}
                    deleteMovie={deleteMovie}
                />
            );
        },
        [navigation, movies]
    );

    const memoizedRenderItem = React.useMemo(() => renderItem, [renderItem]);

    const itemSeparatorComponent = (_: number, rowId: number) => (
        <View
            key={rowId}
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
    );

    const [movieSearch, setMovieSearch] = React.useState({ search: '' });
    const [filteredMovies, setFilteredMovies] = React.useState(movies);
    const [notFoundMovies, setNotFoundMovies] = React.useState(false);

    const searchMovieByTitle = React.useCallback(
        (search: string) => {
            setMovieSearch({ search });

            const foundMovies = movies.filter(({ Title }) => {
                const itemTitle = Title.toLowerCase();
                const searchTitle = search.toLowerCase();
                return itemTitle.includes(searchTitle);
            });

            setNotFoundMovies(foundMovies.length === 0);
            setFilteredMovies(foundMovies);
        },
        [movies]
    );

    React.useEffect(() => {
        setFilteredMovies(movies);
        searchMovieByTitle('');
    }, [movies, searchMovieByTitle]);

    return (
        <View style={styles.container}>
            <SearchBar
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInput}
                inputStyle={styles.searchInput}
                placeholder="Movie Title ..."
                onChangeText={searchMovieByTitle}
                value={movieSearch.search}
                disableFullscreenUI
                lightTheme
            />
            <View
                style={styles.listHeaderSeparator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            {notFoundMovies ? (
                <Text style={styles.moviesNotFound}>No items found!</Text>
            ) : null}
            <FlatList
                data={filteredMovies}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                centerContent
                initialNumToRender={10}
                windowSize={10}
                keyExtractor={({ imdbID }) => imdbID}
                fadingEdgeLength={50}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={itemSeparatorComponent}
                style={{ width: window.window.width / 1.1 }}
                renderItem={memoizedRenderItem}
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
    },
    listHeaderSeparator: {
        marginVertical: 10,
        height: 1,
        width: '100%'
    },
    searchContainer: {
        marginTop: '2%',
        borderRadius: 15,
        height: window.window.height / 15,
        width: '90%'
    },
    searchInput: {
        color: 'black',
        fontSize: 14,
        borderRadius: 10,
        height: window.window.height / 25
    },
    moviesNotFound: {
        marginTop: '5%',
        fontSize: 30
    },
    addMovieButton: {
        backgroundColor: 'transparent',
        marginRight: 15
    }
});

export default MoviesTabScreen;
