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
    const [imagesGallery, setImagesGallery] = React.useState<
        Array<{ imageURI: string; idx: number }>
    >([]);

    const emptyGallery = (
        <Text style={styles.imagesNotFound}>No items found!</Text>
    );

    const pickImage = async () => {
        const imageObject = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 4],
            quality: 1
        });

        if (!imageObject.cancelled) {
            const newImageIdx = imagesGallery.length + 1;
            const newImage = {
                imageURI: imageObject.uri,
                idx: newImageIdx
            };

            setImagesGallery([...imagesGallery, newImage]);
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

    const imageRenderOptions = React.useCallback(
        () =>
            new Map([
                [1, { width: 2 / 3, height: 2 / 3 }],
                [2, { width: 2 / 3 / 3, height: 1 / 2 }],
                [3, { width: 2 / 3 / 3, height: 1 / 3 }],
                [4, { width: 2 / 3 / 3, height: 1 / 3 }],
                [5, { width: 1 / 3, height: 1 / 3 }],
                [6, { width: 1 / 3, height: 1 / 2 }]
            ]),
        []
    );

    const getImageRenderOptionsByIdx = React.useCallback(
        (idx: number) => {
            const options = imageRenderOptions();
            const optionsLength = options.size;
            const imageOptions = options.get(idx % optionsLength);

            if (imageOptions) {
                const { width, height, ...rest } = imageOptions;
                return {
                    width: width * window.window.width,
                    height: height * window.window.height,
                    ...rest
                };
            }
            return {};
        },
        [imageRenderOptions]
    );

    const renderImage = React.useCallback(
        ({ item }) => (
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="contain"
                    source={{ uri: item.imageURI }}
                    style={getImageRenderOptionsByIdx(item.idx)}
                    placeholderStyle={{ backgroundColor: 'transparent' }}
                    PlaceholderContent={<LoadingIndicator color="gray" />}
                />
            </View>
        ),
        [getImageRenderOptionsByIdx]
    );

    React.useEffect(() => {
        const askForUserPermissions = async () => {
            const {
                status
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need your permissions to make this work!');
            }
        };

        askForUserPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={emptyGallery}
                data={imagesGallery}
                renderItem={renderImage}
                numColumns={2}
                fadingEdgeLength={50}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                centerContent
                initialNumToRender={10}
                windowSize={10}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />
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
        marginTop: '25%',
        fontSize: 30
    },
    imageContainer: {
        // flex: 1
    }
});

export default GalleryTabScreen;
