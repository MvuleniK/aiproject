import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform } from 'react-native'
import OutlineButton from '../components/OutlineButton'
import colors from '../assets/materials/colors'
import dimensions from '../assets/materials/constants'
import { auth } from '../firebase'

const images = {
    "background": require('../assets/images/LandingBackground.png'),
};

const [width, height] = dimensions;
const leftMargin = width * (47 / 414)


const Landing = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('HomeTab')
            }
        });
        return unsubscribe;
    }, []);
    return (
        <View style={styles.container}>
            <ImageBackground source={images.background} style={styles.background}>
                <SafeAreaView style={styles.container} >
                    <Text style={[styles.logo, Platform.OS === "ios" ? styles.logo_ios : styles.logo_android]}>Cognicheck</Text>
                    <View style={styles.welcomeWrapper} >
                        <Text style={styles.welcomeHeader} >Welcome</Text>
                        <Text style={styles.welcomeSubtext}>Let's get you started</Text>
                        <OutlineButton
                            buttonText="Login"
                            handlePress={() => navigation.navigate('Login')}
                        />
                        <OutlineButton
                            buttonText="Create Account"
                            handlePress={() => navigation.navigate('Register')}
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        color: 'rgba(0, 0, 0, 0)',
    },
    background: {
        resizeMode: 'cover',
        width: width,
        height: height
    },
    logo: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 20,
        marginLeft: leftMargin
    },
    logo_ios: {
        marginTop: 10,
    },
    logo_android: {
        marginTop: 50,
    },
    welcomeWrapper: {
        position: 'absolute',
        bottom: 100,
        height: height * (232 / 896),
        width: width * (320 / 414),
        alignSelf: 'center'
    },
    welcomeHeader: {
        fontFamily: 'Roboto-Medium',
        color: colors.black,
        fontSize: 40,
    },
    welcomeSubtext: {
        fontFamily: 'Roboto-Light',
        color: colors.black,
        fontSize: 20,
        marginTop: 15
    },
    loginButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
    }
})
