import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GeneralTabScreen from '../screens/GeneralTabScreen';
import DrawingTabScreen from '../screens/DrawingTabScreen';
import {
    BottomTabParamList,
    GeneralTabParamList,
    DrawingTabParamList
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const GeneralTabStack = createStackNavigator<GeneralTabParamList>();
const DrawingTabStack = createStackNavigator<DrawingTabParamList>();

const GeneralTabNavigator = () => (
    <GeneralTabStack.Navigator>
        <GeneralTabStack.Screen
            name="GeneralTabScreen"
            component={GeneralTabScreen}
            options={{
                headerTitle: 'Lab 2'
            }}
        />
    </GeneralTabStack.Navigator>
);

const DrawingTabNavigator = () => (
    <DrawingTabStack.Navigator>
        <DrawingTabStack.Screen
            name="DrawingTabScreen"
            component={DrawingTabScreen}
            options={{ headerTitle: 'Lab 2' }}
        />
    </DrawingTabStack.Navigator>
);

const TabBarIcon = (props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
}) => <AntDesign size={24} {...props} />;

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

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
                component={DrawingTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="areachart" color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
