import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../assets/materials/theme';
import { Avatar } from 'react-native-paper';
import dimensions from '../assets/materials/constants';
import colors from '../assets/materials/colors';
const [width, height] = dimensions
const PersonCard = ({ name, designation }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Avatar.Icon style={styles.avatar} size={90} theme={theme} icon="account" />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.designation}>{designation}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PersonCard

const styles = StyleSheet.create({
    container: {
        width: 0.4 * width,
        height: height * 0.25,
        alignItems: 'center',
        margin: 10,
        paddingVertical: height * 0.03
    },
    name: {
        marginTop: height * 0.04,
        fontFamily: 'Nunito-Semibold',
        color: colors.black,
        fontSize: 20
    },
    designation: {
        marginTop: height * 0.005,
        fontFamily: 'Nunito-Semibold',
        color: colors.black,
        fontSize: 16
    },
})
