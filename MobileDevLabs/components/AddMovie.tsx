import * as React from 'react';
import { StyleSheet } from 'react-native';
import window from '../constants/Layout';
import { MovieItem } from '../types';
import { View, Text } from './Themed';

const AddMovie = ({ addMovie }: { addMovie: (movie: MovieItem) => void }) => (
    <View style={styles.container}>
        <Text>Hi</Text>
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
        height: window.window.height / 2,
        width: window.window.width / 1.5,
        margin: 20
    },
    separator: {
        marginBottom: '3%'
    },
    text: {
        color: 'gray'
    }
});

export default AddMovie;
