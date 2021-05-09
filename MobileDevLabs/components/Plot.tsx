import * as React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from '../hooks/Victory';
import { window } from '../constants/Layout';
import { View } from './Themed';

const Plot = () => (
    <View style={styles.container}>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
                domain={{ x: [-4, 4], y: [-1, 1] }}
                responsive={false}
                height={window.height / 1.5}
                width={window.width / 1.5}
                style={{
                    data: { stroke: '#c43a31' },
                    parent: { border: '1px solid #ccc' }
                }}
                samples={35}
                y={(d: { x: number }) => (d.x > 0 ? Math.log10(d.x) : -10000)}
            />
        </VictoryChart>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }
});

export default Plot;
