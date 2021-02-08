import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GeneralTabScreen from '../screens/GeneralTabScreen';
import InfoTabScreen from '../screens/InfoTabScreen';
import {
    BottomTabParamList,
    GeneralTabParamList,
    InfoTabParamList
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const GeneralTabStack = createStackNavigator<GeneralTabParamList>();
const InfoTabStack = createStackNavigator<InfoTabParamList>();

const GeneralTabNavigator = () => (
    <GeneralTabStack.Navigator>
        <GeneralTabStack.Screen
            name="GeneralTabScreen"
            component={GeneralTabScreen}
            options={{ headerTitle: 'Lab 1' }}
        />
    </GeneralTabStack.Navigator>
);

const InfoTabNavigator = () => (
    <InfoTabStack.Navigator>
        <InfoTabStack.Screen
            name="InfoTabScreen"
            component={InfoTabScreen}
            options={{ headerTitle: 'Lab 1' }}
        />
    </InfoTabStack.Navigator>
);

const TabBarIcon = (props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
}) => <AntDesign size={24} {...props} />;

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="GeneralTab"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="GeneralTab"
                component={GeneralTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="book" color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="InfoTab"
                component={InfoTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
