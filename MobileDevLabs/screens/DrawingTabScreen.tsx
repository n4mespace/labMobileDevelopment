import * as React from 'react';
import { StyleSheet } from 'react-native';

import { SwitchToggle } from 'dooboo-ui';
import Plot from '../components/Plot';
import Diagram from '../components/Diagram';
import { View } from '../components/Themed';

const DrawingTabScreen = ({
    screenOrientation
}: {
    screenOrientation: string;
}) => {
    const [plotOrDiagram, setPlotOrDiagram] = React.useState(false);
    const toggleSwitch: () => void = () =>
        setPlotOrDiagram((previousState) => !previousState);

    return (
        <View style={styles.container}>
            {screenOrientation === 'portrait' ? (
                <SwitchToggle
                    buttonText={plotOrDiagram ? 'Diagram' : 'Plot'}
                    buttonStyle={styles.button}
                    rightContainerStyle={styles.rightContainerStyle}
                    leftContainerStyle={styles.leftContainerStyle}
                    buttonTextStyle={styles.text}
                    textRightStyle={styles.text}
                    textLeftStyle={styles.text}
                    containerStyle={{
                        marginTop: 16,
                        width: 170,
                        height: 60,
                        borderRadius: 50,
                        padding: 0
                    }}
                    backgroundColorOn="#e5e1e0"
                    backgroundColorOff="#e5e1e0"
                    circleStyle={{
                        width: 90,
                        height: 65,
                        borderRadius: 30,
                        backgroundColor: 'blue'
                    }}
                    switchOn={plotOrDiagram}
                    onPress={toggleSwitch}
                    circleColorOff="gray"
                    circleColorOn="gray"
                    duration={500}
                />
            ) : null}
            <View style={styles.container}>
                {plotOrDiagram ? <Diagram /> : <Plot />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        margin: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    // Switch
    leftContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    rightContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: { fontSize: 20, color: 'white' },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
});

export default DrawingTabScreen;
