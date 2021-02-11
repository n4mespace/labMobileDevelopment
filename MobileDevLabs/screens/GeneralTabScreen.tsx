import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const GeneralTabScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Захарчук Даниїл</Text>
        <Text style={styles.title}>Група ІВ-82</Text>
        <Text style={styles.title}>ІВ-8210</Text>
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});

export default GeneralTabScreen;
