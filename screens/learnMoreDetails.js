import React, { useLayoutEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View, } from 'react-native'
import colors from '../assets/materials/colors'
import { ScrollView } from 'react-native';
import dimensions from '../assets/materials/constants'

const [width, height] = dimensions;

const learnMoreDetails = ({ route, navigation }) => {
    const { item } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.white,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={item.imageBig} style={styles.backgroundImage}>
                    <View style={styles.itemTitleWrapper}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.descriptionWrapper}>
                    <View style={styles.descriptionTextWrapper}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>INCIDENT</Text>
                            <View style={styles.infoTextWrapper}>
                                <Text style={styles.infoText}>{item.incident}</Text>
                                <Text style={styles.infoSubText}>%</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>SURVIVAL</Text>
                            <View style={styles.infoTextWrapper}>
                                <Text style={styles.infoText}>{item.survival}</Text>
                                <Text style={styles.infoSubText}>%</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>PERCENTAGE</Text>
                            <View style={styles.infoTextWrapper}>
                                <Text style={styles.infoText}>{item.percentage}</Text>
                                <Text style={styles.infoSubText}>%</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: 50 }}></View>
            </View>
        </ScrollView>
    )
}

export default learnMoreDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    backgroundImage: {
        height: height * 0.5,
        justifyContent: 'space-between'

    },
    descriptionWrapper: {
        backgroundColor: colors.white,
        borderRadius: 25,
        flex: 1,
        marginTop: -20
    },
    itemTitleWrapper: {
        marginHorizontal: 20,
        marginTop: '85%'
    },
    itemTitle: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 32,
        color: colors.white
    },
    descriptionTextWrapper: {
        marginTop: 30,
        marginHorizontal: 20
    },
    descriptionTitle: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 32,
        color: colors.black
    },
    descriptionText: {
        marginTop: 20,
        fontFamily: 'Nunito-Semibold',
        color: colors.black
    },
    infoWrapper: {
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoTitle: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 12,
        color: colors.grey
    },
    infoTextWrapper: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    infoText: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 24,
        color: colors.orange,
    },
    infoSubText: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 14,
        color: colors.grey
    },
})
