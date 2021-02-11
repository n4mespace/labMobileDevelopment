import * as React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from '../Victory';
import window from '../constants/Layout';
import { View } from './Themed';

const Plot = () => (
    <View style={styles.container}>
        <VictoryChart
            theme={VictoryTheme.material}
            height={window.window.height / 1.5}
            width={window.window.width}
        >
            <VictoryLine
                domain={{ x: [-4, 4], y: [-1, 1] }}
                responsive={false}
                style={{
                    data: { stroke: '#c43a31' },
                    parent: { border: '2px solid #ccc' }
                }}
                samples={30}
                y={(d: { x: number }) => (d.x > 0 ? Math.log(d.x) : -100)}
            />
        </VictoryChart>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Plot;
