import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../assets/materials/colors';
import dimensions from '../assets/materials/constants';
import ImageZoom from 'react-native-image-pan-zoom';

const [width, height] = dimensions

const PatientProfile = ({ route, navigation }) => {
    const { patient } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.blue,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])
    const [isModalVisible, setIsModalVisible] = useState(false)
    return isModalVisible === false ? (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.patientNameWrapper}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                </View>
                <View style={styles.patientDetails}>
                    <Text style={styles.text}>Age : {patient.age}</Text>
                    <Text style={styles.text}>Tumor : {patient.diagnosis}</Text>
                    {patient.diagnosis === "Positive" ? <Text style={styles.text}>Tumor Type : {patient.tumorType}</Text> : null}
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Image style={styles.mriImage} source={patient.mriImage} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    ) :
        (
            <ImageZoom cropWidth={width}
                cropHeight={height}
                imageWidth={300}
                imageHeight={300}
                enableSwipeDown={true}
                panToMove={true}
                onSwipeDown={() => setIsModalVisible(false)}
            >
                <Image style={{ width: 300, height: 300 }}
                    source={patient.mriImage} />
            </ImageZoom>
        )
}

export default PatientProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    patientNameWrapper: {
        marginTop: 100,
        marginLeft: 20,
    },
    patientName: {
        fontSize: 32,
        color: colors.black,
        fontFamily: 'Nunito-Semibold'
    },
    text: {
        fontSize: 16,
        color: colors.black,
        fontFamily: 'Nunito-Semibold'
    },
    patientDetails: {
        marginLeft: 20,
        marginTop: 30
    },
    mriImage: {
        width: width - 40,
        height: height * 0.5,
        alignSelf: 'center',
        marginTop: 30
    },
})
