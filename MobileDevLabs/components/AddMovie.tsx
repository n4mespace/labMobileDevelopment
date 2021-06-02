import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EditText } from 'dooboo-ui';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
    validateMovieTitle,
    validateMovieType,
    validateMovieYear
} from '../validators';
import { MovieItem } from '../types';
import { View, Text } from './Themed';

const AddMovie = ({ addMovie }: { addMovie: (movie: MovieItem) => void }) => {
    const navigation = useNavigation();

    const [movieTitle, setMovieTitle] = React.useState<string>('');
    const [movieType, setMovieType] = React.useState<string>('');
    const [movieYear, setMovieYear] = React.useState<string>('');

    const [errorMovieTitle, setErrorMovieTitle] = React.useState<string>('');
    const [errorMovieType, setErrorMovieType] = React.useState<string>('');
    const [errorMovieYear, setErrorMovieYear] = React.useState<string>('');

    const [movieFormValid, setMovieFormValid] = React.useState<boolean>(false);

    const movieImdbID = `tr${Math.random().toString(9).substring(2, 9)}`;
    const moviePoster = '';

    const onMovieAdd = () => {
        if (movieFormValid) {
            const newMovie: MovieItem = {
                Title: movieTitle,
                Type: movieType,
                Year: movieYear,
                Poster: moviePoster,
                imdbID: movieImdbID
            };
            addMovie(newMovie);
            navigation.goBack();
        } else {
            alert('Enter valid movie data!');
        }
    };

    const onTextChanged = (type: string) => (text: string) => {
        setMovieFormValid(true);

        switch (type) {
            case 'TITLE':
                setMovieTitle(text);
                setErrorMovieTitle('');
                if (!validateMovieTitle(text)) {
                    setErrorMovieTitle('Not a valid movie title');
                    setMovieFormValid(false);
                }
                break;
            case 'TYPE':
                setMovieType(text);
                setErrorMovieType('');
                if (!validateMovieType(text)) {
                    setErrorMovieType('Not a valid movie type');
                    setMovieFormValid(false);
                }
                break;
            case 'YEAR':
                setMovieYear(text);
                setErrorMovieYear('');
                if (!validateMovieYear(text)) {
                    setErrorMovieYear('Not a valid movie year');
                    setMovieFormValid(false);
                }
                break;
            default:
                break;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Add new Movie to database</Text>
                <EditText
                    testID="title"
                    placeholder="Title"
                    placeholderTextColor="#ADB5BD"
                    value={movieTitle}
                    onChangeText={onTextChanged('TITLE')}
                    style={{ marginTop: 30 }}
                    errorText={errorMovieTitle}
                />
                <EditText
                    testID="type"
                    placeholder="Type"
                    placeholderTextColor="#ADB5BD"
                    value={movieType}
                    onChangeText={onTextChanged('TYPE')}
                    style={{ marginTop: 50 }}
                    errorText={errorMovieType}
                />
                <EditText
                    testID="year"
                    placeholder="Year"
                    placeholderTextColor="#ADB5BD"
                    value={movieYear}
                    onChangeText={onTextChanged('YEAR')}
                    style={{ marginTop: 50 }}
                    errorText={errorMovieYear}
                />
                <Button
                    icon={<AntDesign name="plus" size={35} color="black" />}
                    buttonStyle={styles.submitButton}
                    testID="addMovieButton"
                    onPress={onMovieAdd}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingVertical: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 35,
        color: '#495057'
    },
    submitButton: {
        borderRadius: 6,
        borderWidth: 0,
        marginTop: 40,
        width: 150,
        height: 48,
        backgroundColor: 'grey'
    }
});

export default AddMovie;
