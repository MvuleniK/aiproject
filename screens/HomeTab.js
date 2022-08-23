import React from 'react'
import { StyleSheet } from 'react-native'
import colors from '../assets/materials/colors'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Profile from './Profile'
import Add from './Add'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: styles.tabBar,
                activeTintColor: colors.blue,
                inactiveTintColor: colors.grey,
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <AntDesign name="home" size={32} color={color} />
            }} />
            <Tab.Screen name="Add" component={Add} options={{
                tabBarIcon: ({ color }) => <Ionicons name="add" size={32} color={color} />
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={32} color={color} />
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
});