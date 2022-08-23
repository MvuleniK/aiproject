import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../assets/materials/colors';
import dimensions from '../assets/materials/constants';
import { Searchbar } from 'react-native-paper';
import theme from '../assets/materials/theme';
import { ScrollView } from 'react-native-gesture-handler';
import OptionsListItem from '../components/optionsListItem'
import patientData from '../assets/data/patientData'

const [width, height] = dimensions

const Search = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerTintColor: colors.blue,
            headerBackTitleVisible: false,
            headerLeftContainerStyle: { paddingHorizontal: 10 }
        })
    }, [navigation])
    const [search, setSearch] = useState('')
    const [patients, setPatients] = useState(patientData)
    const handleSearch = (text) => {
        setSearch(text);
        if (text == "") {
            setPatients(patientData);
        }
        else {
            setPatients(patients.filter((patient) => { return patient.name.startsWith(text) }))
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.headerTitleWrapper}>
                <Text style={styles.headerTitle}>Search Patient</Text>
                <Searchbar
                    placeholder="Search Patient Name"
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                    style={styles.searchBar}
                    theme={theme}
                    iconColor={colors.blue}
                />
            </View>
            <ScrollView style={styles.patientsList}>
                <View>
                    {
                        patients.map((patient) => {
                            return <OptionsListItem
                                key={patient.id}
                                title={patient.name}
                                isbottom
                                handlePress={() => navigation.navigate('Patient Profile', {
                                    patient: patient
                                })}
                            />
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    headerTitleWrapper: {
        marginTop: 100,
        marginLeft: 20,
    },
    headerTitle: {
        fontSize: 32,
        color: colors.black,
        fontFamily: 'Nunito-Semibold'
    },
    searchBar: {
        width: width - 40,
        marginLeft: 5,
        marginTop: 15,
    },
    patientsList: {
        marginTop: 50,
    }
})
