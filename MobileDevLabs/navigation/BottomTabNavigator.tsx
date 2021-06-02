import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Dimensions } from 'react-native';

import Colors from '../constants/Colors';
import { isPortrait, window } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

import GeneralTabScreen from '../screens/GeneralTabScreen';
import DrawingTabScreen from '../screens/DrawingTabScreen';
import MoviesTabScreen from '../screens/MoviesTabScreen';
import MovieDetailTabScreen from '../screens/MovieDetailTabScreen';
import AddMovieTabScreen from '../screens/AddMovieTabScreen';
import GalleryTabScreen from '../screens/GalleryTabScreen';

import {
    BottomTabParamList,
    GeneralTabParamList,
    MoviesTabParamList,
    DrawingTabParamList,
    GalleryTabParamList
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const GeneralTabStack = createStackNavigator<GeneralTabParamList>();
const DrawingTabStack = createStackNavigator<DrawingTabParamList>();
const MoviesTabStack = createStackNavigator<MoviesTabParamList>();
const GalleryTabStack = createStackNavigator<GalleryTabParamList>();

const GeneralTabNavigator = () => (
    <GeneralTabStack.Navigator>
        <GeneralTabStack.Screen
            name="GeneralTabScreen"
            component={GeneralTabScreen}
            options={{ headerTitle: 'Lab 5' }}
        />
    </GeneralTabStack.Navigator>
);

const MoviesTabNavigator = ({
    screenOrientation
}: {
    screenOrientation: string;
}) => (
    <MoviesTabStack.Navigator>
        <MoviesTabStack.Screen
            name="MoviesTabScreen"
            component={MoviesTabScreen}
            options={{
                headerTitle: 'Lab 5',
                headerShown: screenOrientation === 'portrait'
            }}
        />
        <MoviesTabStack.Screen
            name="MovieDetailTabScreen"
            component={MovieDetailTabScreen}
            options={{ headerShown: false }}
        />
        <MoviesTabStack.Screen
            name="AddMovieTabScreen"
            component={AddMovieTabScreen}
            options={{ headerShown: false }}
        />
    </MoviesTabStack.Navigator>
);

const DrawingTabNavigator = ({
    screenOrientation
}: {
    screenOrientation: string;
}) => (
    <DrawingTabStack.Navigator>
        <DrawingTabStack.Screen
            name="DrawingTabScreen"
            options={{
                headerTitle: 'Lab 5',
                headerShown: screenOrientation === 'portrait'
            }}
        >
            {() => <DrawingTabScreen screenOrientation={screenOrientation} />}
        </DrawingTabStack.Screen>
    </DrawingTabStack.Navigator>
);

const GalleryTabNavigator = ({
    screenOrientation,
    windowDims
}: {
    screenOrientation: string;
    windowDims: { height: number; width: number };
}) => (
    <GalleryTabStack.Navigator>
        <GalleryTabStack.Screen
            name="GalleryTabScreen"
            options={{
                headerTitle: 'Lab 5',
                headerShown: screenOrientation === 'portrait'
            }}
        >
            {() => (
                <GalleryTabScreen
                    screenOrientation={screenOrientation}
                    windowDims={windowDims}
                />
            )}
        </GalleryTabStack.Screen>
    </GalleryTabStack.Navigator>
);

const TabBarIcon = (props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
}) => <AntDesign size={24} {...props} />;

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    const [windowDims, setWindowDims] = React.useState<{
        height: number;
        width: number;
    }>(window);

    const [screenOrientation, setScreenOrientation] = React.useState<string>(
        isPortrait() ? 'portrait' : 'landscape'
    );

    const onDimensionsChange = () => {
        setScreenOrientation(isPortrait() ? 'portrait' : 'landscape');

        const { width, height } = Dimensions.get('window');
        setWindowDims({ width, height });
    };

    React.useEffect(() => {
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => {
            Dimensions.removeEventListener('change', onDimensionsChange);
        };
    });

    return (
        <BottomTab.Navigator
            initialRouteName="General"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="General"
                component={GeneralTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="book" color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="Drawing"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="areachart" color={color} />
                    )
                }}
            >
                {() => (
                    <DrawingTabNavigator
                        screenOrientation={screenOrientation}
                    />
                )}
            </BottomTab.Screen>
            <BottomTab.Screen
                name="Movies"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="database" color={color} />
                    )
                }}
            >
                {() => (
                    <MoviesTabNavigator screenOrientation={screenOrientation} />
                )}
            </BottomTab.Screen>
            <BottomTab.Screen
                name="Gallery"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="camera" color={color} />
                    )
                }}
            >
                {() => (
                    <GalleryTabNavigator
                        screenOrientation={screenOrientation}
                        windowDims={windowDims}
                    />
                )}
            </BottomTab.Screen>
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
