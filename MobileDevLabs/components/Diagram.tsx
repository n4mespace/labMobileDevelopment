import * as React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryPie } from '../Victory';
import window from '../constants/Layout';
import { View } from './Themed';

const data = [
    { x: 'yellow', y: 10 },
    { x: 'green', y: 20 },
    { x: 'blue', y: 25 },
    { x: 'red', y: 5 },
    { x: 'lightBlue', y: 40 }
];

const colorScale = ['yellow', 'green', 'blue', 'red', '#00ffff'];

const Diagram = () => (
    <View style={styles.container}>
        <VictoryPie
            responsive={false}
            colorScale={colorScale}
            labels={[]}
            data={data}
            innerRadius={window.window.width / 5}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Diagram;
