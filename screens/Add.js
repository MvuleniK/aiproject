import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios"
import colors from '../assets/materials/colors';
import dimensions from '../assets/materials/constants';
import theme_2 from '../assets/materials/theme_2';
import GradientButton from '../components/GradientButton'
import DismissKeyboard from '../assets/materials/DismissKeyboard'
import { TextInput, HelperText } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, storageRef } from "../firebase"
import Spinner from 'react-native-loading-spinner-overlay';

const [width, height] = dimensions

const Add = ({ navigation }) => {
    const [name, setName] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [age, setAge] = useState({
        value: '',
        error: false,
        error_message: ''
    })
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result);
        }
    };
    const handleChangeName = (text) => {
        setName((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const handleChangeAge = (text) => {
        setAge((prevState) => {
            return {
                ...prevState,
                value: text
            }
        })
    }
    const addPatient = async () => {
        setLoading(true);
        let Age = parseInt(age.value)
        if (image !== null && name.value.length > 0 && Age > 0 && age.value.length > 0) {
            let filename = image.uri.split('/').pop();
            let filetype = filename.split('.').pop();
            let uri = image.uri
            try {
                const response = await fetch(uri);
                const file = await response.blob();
                imageRef = storageRef.child(`${auth.currentUser.uid}/${name.value}.${filetype}`);
                imageRef.put(file).then((snapshot) => {
                    imageRef.getDownloadURL().then((mri_url) => {
                        const data = JSON.stringify({
                            mri: mri_url
                        })
                        let url = 'http://127.0.0.1:5000/'
                        Axios.post(url, data, {
                            "headers": {
                                "content-type": "application/json",
                            }
                        }).then((response) => {
                            let patient = {
                                name: name.value,
                                age: age.value,
                                tumor_result: response.data.pred_result,
                                tumor_type: response.data.class_result,
                                mri_URL: mri_url,
                                image_width: image.width,
                                image_height: image.height
                            }
                            navigation.replace('Patient Result', {
                                patient: patient
                            })
                        }).catch((error) => {
                            setLoading(false);
                            alert("Please Try Again")
                        })
                    }).catch((error) => {
                        setLoading(false);
                        alert(error);
                    })
                }).catch((error) => {
                    setLoading(false);
                    alert(error);
                })
            }
            catch (error) {
                alert('Please Try Again')
            }
        }
        else {
            setLoading(false);
            if (image === null) {
                alert("MRI Image Required")
            }
            if (name.value.length === 0) {
                setName((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        error_message: 'Name is Required'
                    }
                })
            }
            else {
                setName((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
                    }
                })
            }
            if (age.value.length === 0) {
                setAge((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        error_message: 'Age is Required'
                    }
                })
            }
            else if (Age === 0) {
                setAge((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        error_message: 'Age should be at least 1'
                    }
                })
            }
            else {
                setAge((prevState) => {
                    return {
                        ...prevState,
                        error: false,
                        error_message: ''
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
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Add a New Patient</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        label="Name"
                        theme={theme_2}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Enter Patient's Full Name"
                        autoCorrect={false}
                        value={name.value}
                        error={name.error}
                        onChangeText={(text) => handleChangeName(text)}
                    />
                    <HelperText theme={theme_2} type="error" visible={name.error} style={styles.helperText}>
                        {name.error_message}
                    </HelperText>
                    <TextInput
                        label="Age"
                        theme={theme_2}
                        mode="outlined"
                        style={styles.input}
                        placeholder="Enter Patient's Age"
                        autoCorrect={false}
                        keyboardType='number-pad'
                        value={age.value}
                        error={age.error}
                        onChangeText={(text) => handleChangeAge(text)}
                    />
                    <HelperText theme={theme_2} type="error" visible={age.error} style={styles.helperText}>
                        {age.error_message}
                    </HelperText>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.uploadButton}>Upload MRI</Text>
                    </TouchableOpacity>
                </View>
                {image && <Image source={{ uri: image.uri }} style={{ marginVertical: 50, alignSelf: 'center', width: image.width > 400 ? image.width * 0.5 : image.width, height: image.height > 400 ? image.height * 0.5 : image.height }} />}
                <GradientButton
                    buttonText="Create Patient Profile"
                    style={styles.addButton}
                    margin={30}
                    handlePress={addPatient}
                />
            </View>
        </DismissKeyboard>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerTitleWrapper: {
        marginTop: 90,
        marginLeft: 20
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: 'Nunito-Semibold',
        color: colors.black
    },
    input: {
        height: 40,
        width: width - 60,
        marginLeft: 20,
    },
    helperText: {
        marginLeft: 20
    },
    uploadButton: {
        marginLeft: 20,
        fontFamily: 'Nunito-Semibold',
        fontSize: 20,
        color: colors.blue
    },
    addButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    }
})
