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
import registerValidateInfo from '../assets/materials/registerValidateInfo'
import error_messages from '../assets/materials/errorMessages'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase'
import Spinner from 'react-native-loading-spinner-overlay';

const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions

const Login = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])

    const [name, setName] = useState({
        value: '',
        error: false,
        error_message: ''
    })
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
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleChangeName = (text) => {
        setName((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }

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

    const handleChangeConfirmPassword = (text) => {
        setConfirmPassword((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const register = () => {
        setLoading(true)
        setEmail((prevState) => {
            return {
                ...prevState,
                value: prevState.value.toLowerCase()
            }
        })
        const result = registerValidateInfo(name.value, email.value, password.value, confirmPassword.value);
        if (result.status == true) {
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then(authUser => {
                    setLoading(false);
                    authUser.user.updateProfile({
                        displayName: name.value,
                    })
                })
                .catch(error => {
                    setLoading(false);
                    alert(error.message)
                });
        }
        else {
            let has_password = false;
            let has_email = false;
            let has_name = false;
            let has_confirmPassword = false;
            for (let key in result.messages) {
                has_email = has_email != key.startsWith('email');
                has_password = has_password != key.startsWith('password');
                has_name = has_name != key.startsWith('name');
                has_confirmPassword = has_confirmPassword != key.startsWith('confirm');
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
            if (has_name == false) {
                setName((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
                    }
                })
            }
            if (has_confirmPassword == false) {
                setConfirmPassword((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
                    }
                })
            }
            for (let key in error_messages) {
                if (result.messages.includes(key)) {
                    if (key.startsWith('name')) {
                        setName((prevState) => {
                            return {
                                ...prevState,
                                error: true,
                                error_message: error_messages[key]
                            }
                        })
                    }
                    else if (key.startsWith('email')) {
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
                    else if (key.startsWith('confirm')) {
                        setConfirmPassword((prevState) => {
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
                <ImageBackground source={images.background} style={styles.background}>
                    <SafeAreaView>
                        <View style={Platform.OS === "ios" ? styles.header_ios : styles.header_android}>
                            <View style={styles.header}>
                                <Text style={[styles.text, styles.heading]}>Register</Text>
                                <Text style={[styles.text, styles.subheading]}>Hello! Let's get you started</Text>
                            </View>
                            <View>
                                <TextInput
                                    label="Name"
                                    theme={theme}
                                    mode="outlined"
                                    style={styles.input}
                                    placeholder="Enter Full Name"
                                    autoCorrect={false}
                                    value={name.value}
                                    error={name.error}
                                    onChangeText={(text) => handleChangeName(text)}
                                />
                                <HelperText theme={theme} type="error" visible={name.error} style={styles.helperText}>
                                    {name.error_message}
                                </HelperText>
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
                                <TextInput
                                    label="Confirm Password"
                                    theme={theme}
                                    mode="outlined"
                                    style={styles.input}
                                    secureTextEntry={passwordVisibility}
                                    placeholder="Renter Password"
                                    autoCorrect={false}
                                    value={confirmPassword.value}
                                    error={confirmPassword.error}
                                    onChangeText={(text) => handleChangeConfirmPassword(text)}
                                    textContentType={'oneTimeCode'}
                                    right={
                                        <TextInput.Icon
                                            style={styles.visibilityIcon}
                                            name={() => <Ionicons name={passwordVisibility ? "eye-outline" : "eye-off-outline"} size={24} color={colors.blue} />}
                                            onPress={() => setPasswordVisibility(!passwordVisibility)}
                                        />
                                    }
                                />
                                <HelperText theme={theme} type="error" visible={confirmPassword.error} style={styles.helperText}>
                                    {confirmPassword.error_message}
                                </HelperText>
                                <GradientButton
                                    buttonText="Create Account"
                                    margin={30}
                                    handlePress={register}
                                />
                            </View>
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
        marginTop: 10,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        marginLeft: 20
    },
    header_ios: {
        marginTop: 80,
    },
    header_android: {
        marginTop: 170,
    },
    text: {
        fontFamily: 'Nunito-Regular',
        color: colors.black
    },
    heading: {
        fontSize: 40,
    },
    subheading: {
        fontSize: 20,
        marginTop: 15
    },
    visibilityIcon: {
        marginTop: 15
    }
})