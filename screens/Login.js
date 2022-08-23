import React, { useLayoutEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    Platform
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/materials/colors';
import GradientButton from '../components/GradientButton'
import dimensions from '../assets/materials/constants'
import theme from '../assets/materials/theme'
import { TextInput, HelperText } from 'react-native-paper'
import DismissKeyboard from '../assets/materials/DismissKeyboard'
import loginValidateInfo from '../assets/materials/loginValidateInfo'
import error_messages from '../assets/materials/errorMessages'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase'
import Spinner from 'react-native-loading-spinner-overlay';

const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions;

const Login = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation]);

    const [email, setEmail] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [password, setPassword] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleChangeEmail = (text) => {
        setEmail((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }

    const handleChangePassword = (text) => {
        setPassword((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }

    const handleForgotPasswordPress = () => navigation.navigate('Forgot Password')

    const login = () => {
        setLoading(true);
        setEmail((prevState) => {
            return {
                ...prevState,
                value: prevState.value.toLowerCase()
            }
        })
        const result = loginValidateInfo(email.value, password.value);
        if (result.status == true) {
            auth
                .signInWithEmailAndPassword(email.value, password.value).then((userCred) => {
                    setLoading(false);
                })
                .catch((error) => alert(error));
        }
        else {
            setLoading(false);
            let has_password = false;
            let has_email = false;
            for (let key in result.messages) {
                has_email = has_email != key.startsWith('email');
                has_password = has_password != key.startsWith('password');
            }
            if (has_password == false) {
                setPassword((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
                    }
                })
            }
            if (has_email == false) {
                setEmail((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
                    }
                })
            }
            for (let key in error_messages) {
                if (result.messages.includes(key)) {
                    if (key.startsWith('email')) {
                        setEmail((prevState) => {
                            return {
                                ...prevState,
                                error: true,
                                error_message: error_messages[key]
                            }
                        })
                    }
                    else if (key.startsWith('password')) {
                        setPassword((prevState) => {
                            return {
                                ...prevState,
                                error: true,
                                error_message: error_messages[key]
                            }
                        })
                    }
                }
            }
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
                            <Text style={[styles.text, styles.heading]}>Login</Text>
                            <Text style={[styles.text, styles.subheading]}>Welcome Back! Let's Catch Up</Text>
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
                                error={email.error}
                                autoCapitalize="none"
                                onChangeText={(text) => handleChangeEmail(text)}
                            />
                            <HelperText theme={theme} type="error" visible={email.error} style={styles.helperText}>
                                {email.error_message}
                            </HelperText>
                            <TextInput
                                label="Password"
                                theme={theme}
                                mode="outlined"
                                style={styles.input}
                                secureTextEntry={passwordVisibility}
                                placeholder="Enter Password"
                                autoCorrect={false}
                                value={password.value}
                                error={password.error}
                                onChangeText={(text) => handleChangePassword(text)}
                                textContentType={'oneTimeCode'}
                                right={
                                    <TextInput.Icon
                                        style={styles.visibilityIcon}
                                        name={() => <Ionicons name={passwordVisibility ? "eye-outline" : "eye-off-outline"} size={24} color={colors.blue} />}
                                        onPress={() => setPasswordVisibility(!passwordVisibility)}
                                    />
                                }
                            />
                            <HelperText theme={theme} type="error" visible={password.error} style={styles.helperText}>
                                {password.error_message}
                            </HelperText>
                            <View style={{ flexWrap: 'wrap', alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={handleForgotPasswordPress}>
                                    <Text style={styles.forgot_label}>Forgot Password ?</Text>
                                </TouchableOpacity>
                            </View>
                            <GradientButton
                                buttonText="Sign In"
                                margin={50}
                                handlePress={() => login()}
                            />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </DismissKeyboard>

    )
}

export default Login

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
        marginTop: 100,
    },
    header_android: {
        marginTop: 150,
    },
    text: {
        fontFamily: 'Nunito-Regular',
        color: colors.black,
    },
    heading: {
        fontSize: 40,
    },
    subheading: {
        fontSize: 20,
        marginTop: 15
    },
    forgot_label: {
        color: colors.blue,
        fontSize: 20,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    visibilityIcon: {
        marginTop: 15
    }
})