import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../assets/materials/colors.js';
import AppIntroSlider from 'react-native-app-intro-slider';
import dimensions from '../assets/materials/constants.js'
import AsyncStorage from "@react-native-async-storage/async-storage"

const [width, height] = dimensions;

const Onboard = ({ navigation }) => {
    const data = [
        {
            title: 'Expedite Research and Clinical Trials',
            text: 'Automate and save time on manual examination',
            image: require('../assets/images/Onboard-1.png'),
            backgroundColor: "#ffffff"
        },
        {
            title: 'Manage and process MRIs with efficiency',
            text: 'Manage and extract data dynamically at a fast pace',
            image: require('../assets/images/Onboard-2.png'),
            backgroundColor: colors.white,
        },
        {
            title: 'Prepare a more insightful surgical plan',
            text: "Gain Insightful information directly from the system",
            image: require('../assets/images/Onboard-3.png'),
            backgroundColor: "#ffffff"
        },
    ];
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
                <Image style={styles.image} source={item.image} />
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    }
    const renderDoneButton = () => {
        return (
            <View style={[styles.buttonTextWrapper, styles.rightButton]}>
                <Text style={styles.buttonText}>Done</Text>
            </View>
        )
    }
    const renderSkipButton = () => {
        return (
            <View style={[styles.buttonTextWrapper, styles.leftButton]}>
                <Text style={styles.buttonText}>Skip</Text>
            </View>
        )
    }
    const renderPrevButton = () => {
        return (
            <View style={[styles.buttonTextWrapper, styles.leftButton]}>
                <Text style={styles.buttonText}>Prev</Text>
            </View>
        )
    }
    const renderNextButton = () => {
        return (
            <View style={[styles.buttonTextWrapper, styles.rightButton]}>
                <Text style={styles.buttonText}>Next</Text>
            </View>
        )
    }
    const keyExtractor = (item) => {
        return item.title;
    }
    const handleDone = () => {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        navigation.replace('Landing')
    }
    return (
        <View style={{ flex: 1 }}>
            <AppIntroSlider
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSkipButton={renderSkipButton}
                showSkipButton
                renderNextButton={renderNextButton}
                showNextButton
                renderPrevButton={renderPrevButton}
                showPrevButton
                renderDoneButton={renderDoneButton}
                showDoneButton
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                data={data}
                onDone={handleDone}
                onSkip={handleDone}
                dotClickEnabled={true}
            />
        </View>
    )
}

export default Onboard

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    image: {
        marginVertical: 0,
        width: width - 40,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center',
        color: colors.black,
        marginHorizontal: 25
    },
    text: {
        fontSize: 16,
        fontFamily: 'Nunito-Semibold',
        textAlign: 'center',
        color: colors.black,
        marginHorizontal: 40,
        marginTop: 40
    },
    buttonText: {
        color: colors.blue,
        fontSize: 16,
        fontFamily: 'Nunito-Semibold',
    },
    buttonTextWrapper: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    leftButton: {
        marginLeft: 20
    },
    rightButton: {
        marginRight: 20
    },
    dotStyle: {
        backgroundColor: colors.grey
    },
    activeDotStyle: {
        backgroundColor: colors.blue
    }
});
