import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, Alert } from 'react-native'
import { auth, storageRef } from '../firebase'
import OptionsListItem from '../components/optionsListItem'
import colors from '../assets/materials/colors'
import dimensions from '../assets/materials/constants';
import getInitials from '../assets/materials/getInitials'
import { Feather, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler'
import RBSheet from "react-native-raw-bottom-sheet";
import * as Linking from 'expo-linking';

const [width, height] = dimensions
const Profile = ({ navigation }) => {
    const refRBSheet = useRef()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [createdAt, setcreatedAt] = useState(null)
    const [lastLogin, setlastLogin] = useState(null)

    useEffect(() => {
        const fetchData = () => {
            const user = auth.currentUser
            if (user != null) {
                setname(user.displayName);
                setemail(user.email);
                let createdat = new Date(user.metadata.creationTime);
                setcreatedAt(`${createdat.getDate()}-${createdat.getMonth() + 1}-${createdat.getFullYear()}`);
                let lastlogin = new Date(user.metadata.lastSignInTime);
                setlastLogin(`${lastlogin.getDate()}-${lastlogin.getMonth() + 1}-${lastlogin.getFullYear()}`);
            }
        }
        fetchData()
    }, [navigation])
    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Landing')
        })
    }
    const deleteAccount = () => {
        const user = auth.currentUser
        const uid = user.uid
        var folderRef = storageRef.child(uid);
        user.delete().then(function () {
            navigation.replace('Landing')
        }).catch(function (error) {
            navigation.navigate('Reauthenticate', { path: 'Delete Account', comeBack: true })
        });
    }
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View>
                    <Text style={[styles.header, Platform.OS == "ios" ? styles.header_margin_ios : styles.header_margin_android]}>Profile</Text>
                    <LinearGradient
                        style={styles.card}
                        colors={['rgba(156, 224, 220, 0.8)', 'rgba(156, 224, 220, 0.2)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.1 }}>
                        <View style={styles.cardLeft}>
                            <View style={styles.cardHeader}>
                                <View style={styles.initialsWrapper}>
                                    <Text style={styles.initials}>{getInitials(name)}</Text>
                                </View>
                                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                    <Feather name="settings" size={32} color={colors.black} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardDetails}>
                                <Text style={styles.cardName}>{name}</Text>
                                <Text style={styles.cardEmail}>{email}</Text>
                            </View>
                        </View>
                        <View style={styles.cardRight}>
                            <Image style={styles.cardImage} source={require('../assets/images/profile.png')} />
                        </View>
                    </LinearGradient>
                    <View style={styles.optionsWrapper}>
                        <Text style={styles.optionsText}>Options</Text>
                        <View style={styles.options}>
                            <OptionsListItem
                                title="Visit-Website"
                                isbottom={true}
                                handlePress={() => Linking.openURL('https://docs.expo.io/guides/linking/?redirected')}
                            />
                            <OptionsListItem
                                title="Settings"
                                handlePress={() => refRBSheet.current.open()}
                            />
                        </View>
                    </View>
                    <View style={styles.loginDetails}>
                        <Text style={styles.created_at}>Account Created : {createdAt}</Text>
                        <Text style={styles.loast_login}>Last Login : {lastLogin}</Text>
                    </View>
                </View>
            </SafeAreaView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown
                closeOnPressMask
                closeOnPressBack
                height={290}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    container: {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30
                    },
                    draggableIcon: {
                        backgroundColor: colors.black
                    }
                }}
            >
                <View>
                    <OptionsListItem
                        title="Update Name"
                        icon={<Feather name="edit-3" size={20} color={colors.black} />}
                        handlePress={() => {
                            refRBSheet.current.close();
                            navigation.navigate('Update Name')
                        }}
                    />
                    <OptionsListItem
                        title="Update Email"
                        icon={<Entypo name="email" size={20} color={colors.black} />}
                        handlePress={() => {
                            refRBSheet.current.close();
                            navigation.navigate('Reauthenticate', { path: 'Update Email', comeBack: false })
                        }}
                    />
                    <OptionsListItem
                        title="Change Password"
                        icon={<MaterialCommunityIcons name="onepassword" size={20} color={colors.black} />}
                        handlePress={() => {
                            refRBSheet.current.close();
                            navigation.navigate('Reauthenticate', { path: 'Change Password', comeBack: false })
                        }}
                    />
                    <OptionsListItem
                        title="Delete Account"
                        icon={<MaterialCommunityIcons name="delete" size={20} color={colors.black} />}
                        handlePress={() => {
                            Alert.alert(
                                "Delete Account Confirmation",
                                "Do you want to delete your account ?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => { refRBSheet.current.close(); }
                                    },
                                    {
                                        text: "Delete Account",
                                        onPress: () => { refRBSheet.current.close(); deleteAccount(); }
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                    />
                    <OptionsListItem
                        title="Logout"
                        handlePress={signOut}
                        icon={<AntDesign name="logout" size={20} color={colors.black} />}
                    />
                </View>
            </RBSheet>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.white
    },
    header: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 32,
        color: colors.black,
        marginHorizontal: 20
    },
    header_margin_android: {
        marginTop: 80,
    },
    header_margin_ios: {
        marginTop: 30,
    },
    card: {
        marginTop: 20,
        width: width - 40,
        height: height * (193 / 896),
        marginHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row'
    },
    cardLeft: {
        flex: 0.7
    },
    cardHeader: {
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    initialsWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        marginRight: 20,
        alignItems: 'center',
        backgroundColor: colors.lightblue,
        borderRadius: 10
    },
    initials: {
        fontFamily: 'Nunito-Semibold',
        color: '#FFFFFF',
        fontSize: 16
    },
    cardDetails: {
        marginTop: 10,
        marginHorizontal: 20
    },
    cardName: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 24,
        color: colors.black
    },
    cardEmail: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 16,
        color: colors.black,
    },
    cardRight: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 20
    },
    optionsWrapper: {
        marginTop: 30
    },
    optionsText: {
        marginHorizontal: 20,
        fontFamily: 'Nunito-Semibold',
        fontSize: 16,
        color: colors.black
    },
    options: {
        marginTop: 20
    },
    loginDetails: {
        marginTop: 20,
        marginHorizontal: 20
    },
    created_at: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: colors.black
    },
    loast_login: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: colors.black,
        marginTop: 5
    },
})
