import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import colors from '../assets/materials/colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const GradientButton = ({ buttonText, margin, handlePress, style }) => {
    return (
        <TouchableOpacity onPress={handlePress} style={style}>
            <LinearGradient
                colors={['#4CA1AF', '#3D838E']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={[styles.buttonWrapper, { marginTop: margin }]}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton

const styles = StyleSheet.create({
    buttonWrapper: {
        width: width - 60,
        height: height * (50 / 896),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Nunito-Semibold',
        color: colors.white,
    }
})
