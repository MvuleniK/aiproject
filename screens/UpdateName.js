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
import { auth } from '../firebase'
import Spinner from 'react-native-loading-spinner-overlay';
const images = {
    "background": require('../assets/images/Background.png'),
};
const [width, height] = dimensions

const UpdateName = ({ navigation }) => {
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
    const [loading, setLoading] = useState(false);
    const handleChangeName = (text) => {
        setName((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const resetName = () => {
        setLoading(true)
        if (name.value.length > 0) {
            setName((prevState) => {
                return {
                    ...prevState,
                    error: false,
                    error_message: ''
                }
            })
            var user = auth.currentUser;
            user.updateProfile({
                displayName: name.value
            }).then(function () {
                setLoading(false);
                alert('Your name has been updated')
                navigation.replace('HomeTab')
            }).catch(function (error) {
                setLoading(false);
                alert(error)
            });

        }
        else {
            setLoading(false);
            setName((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    error_message: "Name Required"
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
                            <Text style={[styles.text, styles.heading]}>Update Name</Text>
                            <Text style={[styles.text, styles.subheading]}>Enter updated name</Text>
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <TextInput
                                label="Name"
                                theme={theme}
                                mode="outlined"
                                style={styles.input}
                                placeholder="Enter Name"
                                autoCorrect={false}
                                value={name.value}
                                error={name.error}
                                onChangeText={(text) => handleChangeName(text)}
                            />
                            <HelperText theme={theme} type="error" visible={name.error} style={styles.helperText}>
                                {name.error_message}
                            </HelperText>
                            <GradientButton
                                buttonText="Update Name"
                                margin={50}
                                handlePress={() => resetName()}
                            />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </DismissKeyboard>
    )
}

export default UpdateName

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
