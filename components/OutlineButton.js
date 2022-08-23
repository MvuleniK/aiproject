import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../assets/materials/colors'
import dimensions from '../assets/materials/constants'

const [width, height] = dimensions;

const OutlineButton = ({ buttonText, handlePress }) => {
    return (
        <TouchableOpacity onPress={handlePress} style={styles.buttonWrapper}>
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default OutlineButton

const styles = StyleSheet.create({
    buttonWrapper: {
        width: width * (320 / 414),
        height: height * (54 / 896),
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        color: colors.black,
    }
})
