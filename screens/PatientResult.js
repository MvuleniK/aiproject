import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import colors from '../assets/materials/colors'
import GradientButton from '../components/GradientButton'
import dimensions from '../assets/materials/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';

const [width, height] = dimensions
const PatientResult = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation]);
    const { patient } = route.params;
    const { name, age, tumor_result, tumor_type, mri_URL, image_width, image_height } = patient;
    const [isModalVisible, setIsModalVisible] = useState(false)
    return isModalVisible === false ? (
        <View style={styles.container}>
            <View style={styles.headerTitleWrapper}>
                <Text style={styles.headerTitle}>Analysis Results</Text>
            </View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.MRIWrapper}>
                <Image source={{ uri: mri_URL }} style={{ width: 400, height: 400, alignSelf: 'center' }} />
            </TouchableOpacity>
            <View style={styles.patientDetails}>
                <Text style={styles.patientDetail}>Name : {name}</Text>
                <Text style={styles.patientDetail}>Age : {age}</Text>
                <Text style={styles.patientDetail}>Tumor : {tumor_result}</Text>
                {tumor_result === "Positive" && <Text style={styles.patientDetail}>Type : {tumor_type}</Text>}
            </View>
            <GradientButton
                buttonText="Back to Home"
                margin={30}
                style={styles.addButton}
                handlePress={() => navigation.replace('HomeTab')}
            />
        </View>
    ) : (
        <ImageZoom cropWidth={width}
            cropHeight={height}
            imageWidth={image_width}
            imageHeight={image_height}
            enableSwipeDown={true}
            panToMove={true}
            onSwipeDown={() => setIsModalVisible(false)}
        >
            <Image style={{ width: image_width, height: image_height }}
                source={{ uri: mri_URL }} />
        </ImageZoom>
    )
}

export default PatientResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerTitleWrapper: {
        marginTop: 50,
        marginLeft: 20
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: 'Nunito-Semibold',
        color: colors.black
    },
    MRIWrapper: {
        marginTop: 70,
    },
    patientDetails: {
        marginTop: 45,
        marginLeft: 20
    },
    patientDetail: {
        fontSize: 20,
        fontFamily: 'Nunito-Semibold',
        color: colors.black,
        marginBottom: 20
    },
    addButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    }
})
