import React, { useLayoutEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    Platform
} from 'react-native'
import { TextInput, HelperText } from 'react-native-paper';
import colors from '../assets/materials/colors';
import dimensions from '../assets/materials/constants';
import theme from '../assets/materials/theme';
import GradientButton from '../components/GradientButton'
import DismissKeyboard from '../assets/materials/DismissKeyboard'
import forgotPasswordValidateInfo from '../assets/materials/forgotPasswordValidateInfo'
import error_messages from '../assets/materials/errorMessages'
import { auth } from '../firebase'
import Spinner from 'react-native-loading-spinner-overlay';

const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions

const ForgotPassword = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])
    const [email, setEmail] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [loading, setLoading] = useState(false);
    const handleChangeEmail = (text) => {
        setEmail((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const forgotPassword = () => {
        setLoading(true)
        setEmail((prevState) => {
            return {
                ...prevState,
                value: prevState.value.toLowerCase()
            }
        })
        const result = forgotPasswordValidateInfo(email.value)
        if (result.status) {
            setEmail((prevState) => {
                return {
                    ...prevState,
                    error: false,
                    error_message: ''
                }
            })
            auth.sendPasswordResetEmail(email.value).then(function () {
                setLoading(false);
                alert('We have sent you a mail to rest your password')
                navigation.goBack()
            }).catch(function (error) {
                setLoading(false);
                alert(error)
            });

        }
        else {
            setLoading(false);
            setEmail((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    error_message: error_messages[result.message]
                }
            })
        }
    }
    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <Spinner
                    visible={loading}
                />
                <ImageBackground source={images.background} style={styles.background}>
                    <SafeAreaView>
                        <View style={[styles.header, Platform.OS === "ios" ? styles.header_ios : styles.header_android]}>
                            <Text style={[styles.text, styles.heading]}>Forgot Password ?</Text>
                            <Text style={[styles.text, styles.subheading]}>Enter your Email and check for a mail</Text>
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <TextInput
                                label="Email"
                                theme={theme}
                                mode="outlined"
                                style={styles.input}
                                placeholder="Enter Email"
                                keyboardType='email-address'
                                autoCorrect={false}
                                value={email.value}
                                autoCapitalize="none"
                                error={email.error}
                                onChangeText={(text) => handleChangeEmail(text)}
                            />
                            <HelperText theme={theme} type="error" visible={email.error} style={styles.helperText}>
                                {email.error_message}
                            </HelperText>
                            <GradientButton
                                buttonText="Send Mail"
                                margin={50}
                                handlePress={() => forgotPassword()}
                            />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </DismissKeyboard>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        color: 'rgba(0, 0, 0, 0)',
    },
    background: {
        resizeMode: 'contain',
        width: width,
        height: height
    },
    input: {
        height: 40,
        width: width - 60,
        alignSelf: 'center',
        marginTop: 15,
    },
    helperText: {
        marginLeft: 20
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_ios: {
        marginTop: 180,
    },
    header_android: {
        marginTop: 200,
    },
    text: {
        fontFamily: 'Nunito-Regular',
        color: colors.black,
    },
    heading: {
        fontSize: 38,
    },
    subheading: {
        fontSize: 20,
        marginTop: 15,
        textAlign: 'center'
    },
})
