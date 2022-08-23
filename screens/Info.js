import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import colors from '../assets/materials/colors';
import PersonCard from '../components/personCard'
import dimensions from '../assets/materials/constants';

const [width, height] = dimensions
const icon = require('../assets/adaptive-icon.png');

const Info = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Cognicheck",
            headerTransparent: true,
            headerTintColor: colors.blue,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])
    return (
        <View>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.text}>Cognicheck is a deep learning based application used for detecting and classifying brain tumors based on their location on an MRI Image as glioma, meningioma, or pituatory adenoma.</Text>
            <Text style={styles.text}>It is intended for physicians, surgeons and clinical researchers for managing patient’s data at a centralized location.</Text>
            <Text style={styles.developerTitle}>Developers</Text>
            <View style={styles.developers}>
                <PersonCard
                    name="Apoorva Reddy"
                    designation="ML Engineer"
                />
                <PersonCard
                    name="Aryak Roy"
                    designation="App Developer"
                />
            </View>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    icon: {
        marginTop: 150,
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    text: {
        marginTop: 25,
        marginLeft: 20,
        width: width - 30,
        fontFamily: 'Nunito-Semibold',
        color: colors.black,
        fontSize: 16
    },
    developerTitle: {
        marginTop: 25,
        marginLeft: 20,
        fontFamily: 'Nunito-Semibold',
        color: colors.black,
        fontSize: 25
    },
    developers: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
