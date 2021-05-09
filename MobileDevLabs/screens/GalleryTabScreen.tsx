import * as React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { LoadingIndicator } from 'dooboo-ui';
import { View } from '../components/Themed';
import utils from '../utils';

const GalleryTabScreen = ({
    screenOrientation,
    windowDims
}: {
    screenOrientation: string;
    windowDims: { height: number; width: number };
}) => {
    const navigation = useNavigation();
    const [imagesGallery, setImagesGallery] = React.useState<Array<string>>([]);

    const getSmallImageSize = () => ({
        width: windowDims.width / 5,
        height:
            windowDims.height / 4 / 3 +
            (screenOrientation !== 'portrait' ? 100 : 0)
    });

    const getMediumImageSize = () => ({
        width: windowDims.width * (2 / 5),
        height:
            windowDims.height / 2 / 3 +
            (screenOrientation !== 'portrait' ? 100 : 0)
    });

    const getLargeImageSize = () => ({
        width: windowDims.width * (3 / 5),
        height:
            (windowDims.height * (3 / 4)) / 3 +
            (screenOrientation !== 'portrait' ? 100 : 0)
    });

    const emptyGallery = (
        <View
            style={{
                marginTop: screenOrientation === 'portrait' ? '25%' : '10%',
                alignItems: 'center',
                backgroundColor: 'transparent'
            }}
        >
            <Text style={styles.imagesNotFound}>No items found!</Text>
        </View>
    );

    const pickImage = async () => {
        const imageObject = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!imageObject.cancelled) {
            setImagesGallery([...imagesGallery, imageObject.uri]);
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

    const renderImage = (
        imageUri: string,
        imageSize: { height: number; width: number }
    ) => (
        <Image
            source={{ uri: imageUri }}
            style={imageSize}
            resizeMode="stretch"
            placeholderStyle={{ backgroundColor: 'transparent' }}
            PlaceholderContent={<LoadingIndicator color="gray" />}
        />
    );

    const smallImage = (imageUri: string) =>
        renderImage(imageUri, getSmallImageSize());

    const mediumImage = (imageUri: string) =>
        renderImage(imageUri, getMediumImageSize());

    const largeImage = (imageUri: string) =>
        renderImage(imageUri, getLargeImageSize());

    return (
        <ScrollView style={styles.container} centerContent>
            {imagesGallery.length
                ? utils.arrayChunks(imagesGallery, 6).map((images) => (
                      <View style={{ flexDirection: 'column' }}>
                          <View style={{ flexDirection: 'row' }}>
                              <View
                                  style={{ flexDirection: 'column', margin: 1 }}
                              >
                                  {images[0] && largeImage(images[0])}
                                  <View
                                      style={{
                                          flexDirection: 'row',
                                          margin: 1
                                      }}
                                  >
                                      {images[2] && smallImage(images[2])}
                                      {images[3] && smallImage(images[3])}
                                      {images[4] && smallImage(images[4])}
                                  </View>
                              </View>
                              <View
                                  style={{ flexDirection: 'column', margin: 1 }}
                              >
                                  {images[1] && mediumImage(images[1])}
                                  {images[5] && mediumImage(images[5])}
                              </View>
                          </View>
                      </View>
                  ))
                : emptyGallery}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: '3%',
        paddingBottom: 0
    },
    addImageButton: {
        backgroundColor: 'transparent',
        marginRight: 15
    },
    imagesNotFound: {
        fontSize: 30
    }
});

export default GalleryTabScreen;
