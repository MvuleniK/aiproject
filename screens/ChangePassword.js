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
import validatePassword from '../assets/materials/validatePassword'
import error_messages from '../assets/materials/errorMessages'
import { auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions

const ChangePassword = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])
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
    const changePassword = () => {
        setLoading(true)
        const result = validatePassword(password.value, confirmPassword.value);
        if (result.status == true) {
            setPassword((prevState) => {
                return {
                    ...prevState,
                    error: false,
                    error_message: ''
                }
            })
            setConfirmPassword((prevState) => {
                return {
                    ...prevState,
                    error: false,
                    error_message: ''
                }
            })
            const user = auth.currentUser
            user.updatePassword(password.value)
                .then(() => {
                    setLoading(false);
                    alert('Your password has been updated')
                    navigation.replace('HomeTab')
                })
                .catch(error => {
                    setLoading(false);
                    alert(error.message);
                });
        }
        else {
            setLoading(false);
            setPassword((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    error_message: error_messages[result.messages]
                }
            })
            setConfirmPassword((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    error_message: error_messages[result.messages]
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
                        <View style={Platform.OS === "ios" ? styles.header_ios : styles.header_android}>
                            <View style={styles.header}>
                                <Text style={[styles.text, styles.heading]}>Change Password</Text>
                                <Text style={[styles.text, styles.subheading]}>Enter New Password </Text>
                            </View>
                            <View>
                                <TextInput
                                    label="Password"
                                    theme={theme}
                                    mode="outlined"
                                    style={styles.input}
                                    secureTextEntry={passwordVisibility}
                                    placeholder="Enter New Password"
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
                                    placeholder="Renter New Password"
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
                                    buttonText="Change Password"
                                    margin={50}
                                    handlePress={changePassword}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </DismissKeyboard>
    )
}

export default ChangePassword

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
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        marginLeft: 20
    },
    header_ios: {
        marginTop: 150,
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
