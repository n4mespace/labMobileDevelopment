import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { LoadingIndicator } from 'dooboo-ui';
import window from '../constants/Layout';
import { View, Text } from '../components/Themed';

const GalleryTabScreen = () => {
    const navigation = useNavigation();
    const [imagesGallery, setImagesGallery] = React.useState<Array<string>>([]);
    const [foundImages, setFoundImages] = React.useState<boolean>(false);

    const pickImage = async () => {
        const imageObject = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 4],
            quality: 1
        });

        if (!imageObject.cancelled) {
            setImagesGallery([...imagesGallery, imageObject.uri]);
            setFoundImages(true);
        }
    };

    const addImageButton = () => (
        <Button
            onPress={pickImage}
            icon={<AntDesign name="plus" size={25} color="black" />}
            buttonStyle={styles.addImageButton}
        />
    );

    navigation.setOptions({
        headerRight: addImageButton
    });

    const renderImage = React.useCallback(
        ({ item }) => (
            <Image
                resizeMode="contain"
                source={{ uri: item }}
                style={styles.image}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                PlaceholderContent={<LoadingIndicator color="gray" />}
            />
        ),
        []
    );

    React.useEffect(() => {
        const askForUserPermissions = async () => {
            const {
                status
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        };

        askForUserPermissions();
    }, []);

    return (
        <View style={styles.container}>
            {foundImages ? (
                <FlatList
                    data={imagesGallery}
                    renderItem={renderImage}
                    numColumns={3}
                    fadingEdgeLength={50}
                    removeClippedSubviews
                    maxToRenderPerBatch={10}
                    centerContent
                    initialNumToRender={10}
                    // style={{ width: window.window.width / 1.1 }}
                    windowSize={10}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.imagesNotFound}>No items found!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'space-evenly'
    },
    addImageButton: {
        backgroundColor: 'transparent',
        marginRight: 15
    },
    imagesNotFound: {
        fontSize: 30
    },
    image: {
        height: window.window.height / 5,
        width: window.window.width / 3,
        margin: 5
    }
});

export default GalleryTabScreen;
