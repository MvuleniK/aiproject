import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, ImageBackground, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import colors from '../assets/materials/colors'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import learnMoreData from '../assets/data/learnMoreData'
import tutorialData from '../assets/data/tutorialData'
import dimensions from '../assets/materials/constants';
import { auth } from '../firebase'
import getFirstName from '../assets/materials/getFirstName';


const [width, height] = dimensions

const Home = ({ navigation }) => {
    const [name, setname] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser
            if (user != null) {
                setname(user.displayName)
            }
        }
        fetchData();
    }, [navigation])
    const renderTutorialItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Tutorial', {
            item: item
        })}>
            <ImageBackground
                source={item.image}
                style={[styles.tutorialItem, { marginLeft: item.id == 'tutorial-1' ? 20 : 0 }]}
                imageStyle={styles.tutorialItemImage}
            >
                <Text style={styles.tutorialItemTitle}>{item.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
    const renderLearnMoreItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Learn More', {
            item: item
        })}>
            <ImageBackground
                source={item.image}
                style={[styles.learnMoreItem, { marginLeft: item.id == 'learnMore-1' ? 20 : 0 }]}
                imageStyle={styles.learnMoreItemImage}
            >
                <Text style={styles.learnMoreItemTitle}>{item.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView>
                <SafeAreaView>
                    <View style={Platform.OS == "ios" ? styles.menuWrapper_ios : styles.menuWrapper_android}>
                        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                            <Feather name="info" size={32} color={colors.blue} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <AntDesign name="search1" size={32} color={colors.blue} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>{`Hello ${getFirstName(name)}`}</Text>
                </View>
                <View style={styles.tutorialWrapper}>
                    <Text style={styles.tutorialTitle}>Tutorial</Text>
                    <View style={styles.tutorialItemsWrapper}>
                        <FlatList
                            data={tutorialData}
                            renderItem={renderTutorialItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.learnMoreWrapper}>
                    <Text style={styles.learnMoreTitle}>Learn More</Text>
                    <View style={styles.learnMoreItemsWrapper}>
                        <FlatList
                            data={learnMoreData}
                            renderItem={renderLearnMoreItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.white
    },
    menuWrapper_ios: {
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuWrapper_android: {
        marginHorizontal: 20,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerWrapper: {
        marginTop: 30
    },
    header: {
        marginHorizontal: 20,
        fontFamily: 'Nunito-Semibold',
        fontSize: 32,
        color: colors.black
    },
    tutorialItemsWrapper: {
        marginTop: 20
    },
    tutorialWrapper: {
        marginTop: 20
    },
    tutorialTitle: {
        marginHorizontal: 20,
        fontFamily: 'Nunito-Semibold',
        fontSize: 28,
        color: colors.black
    },
    tutorialItem: {
        width: width * (170 / 414),
        height: height * (250 / 896),
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginRight: 20
    },
    tutorialItemImage: {
        borderRadius: 20
    },
    tutorialItemTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: colors.white
    },
    learnMoreWrapper: {
        marginTop: 20
    },
    learnMoreTitle: {
        marginHorizontal: 20,
        fontFamily: 'Nunito-Semibold',
        fontSize: 24,
        color: colors.black
    },
    learnMoreItemsWrapper: {
        marginTop: 20
    },
    learnMoreItem: {
        width: width * (170 / 414),
        height: height * (180 / 896),
        justifyContent: 'flex-end',
        marginRight: 20
    },
    learnMoreItemImage: {
        borderRadius: 20
    },
    learnMoreItemTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: colors.white,
        marginHorizontal: 10,
        marginVertical: 20
    },
})
