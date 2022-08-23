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
import error_messages from '../assets/materials/errorMessages'
import { auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions

const Reauthenticate = ({ route, navigation }) => {
    const { path, comeBack } = route.params;
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
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [loading, setLoading] = useState(false);
    const handleChangePassword = (text) => {
        setPassword((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const reauthenticate = () => {
        setLoading(true);
        if (password.value.length >= 6) {
            setPassword((prevState) => {
                return {
                    ...prevState,
                    error: false,
                    error_message: ''
                }
            })
            const user = auth.currentUser
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                password.value
            );
            user.reauthenticateWithCredential(credential).then(function () {
                setLoading(false);
                if (comeBack) {
                    navigation.goBack()
                }
                else {
                    navigation.navigate(path)
                }
            }).catch(function (error) {
                alert(error)
            });

        }
        else {
            setLoading(false);
            if (password.value.length === 0) {
                setPassword((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        error_message: error_messages['password_missing']
                    }
                })
            }
            else {
                setPassword((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        error_message: error_messages['password_invalid']
                    }
                })
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
                            <Text style={[styles.text, styles.heading]}>Re Authenticate</Text>
                            <Text style={[styles.text, styles.subheading]}>Your Password is required for this operation</Text>
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <TextInput
                                label="Password"
                                theme={theme}
                                mode="outlined"
                                style={styles.input}
                                placeholder="Enter Password"
                                autoCorrect={false}
                                value={password.value}
                                error={password.error}
                                secureTextEntry={passwordVisibility}
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
                            <GradientButton
                                buttonText="Re - Authenticate"
                                margin={50}
                                handlePress={() => reauthenticate()}
                            />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </DismissKeyboard>
    )
}

export default Reauthenticate

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
    visibilityIcon: {
        marginTop: 15
    }
})
