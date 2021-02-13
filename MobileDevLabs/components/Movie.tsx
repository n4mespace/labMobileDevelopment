import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import window from '../constants/Layout';
import { MovieItem } from '../types';
import { View, Text } from './Themed';

const Movie = ({
    movie,
    moveToMovieDetail,
    deleteMovie
}: {
    movie: MovieItem;
    moveToMovieDetail: () => void;
    deleteMovie: () => void;
}) => {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <TouchableOpacity onPress={moveToMovieDetail} onLongPress={toggleMenu}>
            <View style={styles.leftColumn}>
                <Overlay
                    animationType="fade"
                    removeClippedSubviews
                    isVisible={menuVisible}
                    onBackdropPress={toggleMenu}
                >
                    <>
                        <Text style={styles.mainText}>Choose action:</Text>
                        <Button
                            onPress={deleteMovie}
                            icon={
                                <AntDesign
                                    name="delete"
                                    size={20}
                                    color="white"
                                />
                            }
                            title=" Delete"
                            buttonStyle={{ backgroundColor: 'gray' }}
                        />
                    </>
                </Overlay>
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
};

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
