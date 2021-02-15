import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';
import { View } from '../components/Themed';

const GalleryTabScreen = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    screenOrientation
}: {
    screenOrientation: string;
}) => {
    const navigation = useNavigation();
    const [image, setImage] = React.useState<string>('');

    const pickImage = async () => {
        const imageObject = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!imageObject.cancelled) {
            setImage(imageObject.uri);
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
        (async () => {
            const {
                status
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}
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
    addImageButton: {
        backgroundColor: 'transparent',
        marginRight: 15
    }
});

export default GalleryTabScreen;
