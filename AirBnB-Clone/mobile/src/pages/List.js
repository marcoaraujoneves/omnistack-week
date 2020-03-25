import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { AsyncStorage, StyleSheet, SafeAreaView, View, ScrollView, Image, Text, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List({ navigation }) {

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.105:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('technologies').then(storagedTechnologies => {
            var technologiesArray = storagedTechnologies.split(',');
            technologiesArray = technologiesArray.map(storagedTechnology => storagedTechnology.trim());
            setTechnologies(technologiesArray);
        })
    }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('technologies');

        navigation.navigate('Login');
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
            // dark-content, light-content and default
            />
            <SafeAreaView style={styles.container}>

                <TouchableOpacity onPress={handleLogout}>
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
                <ScrollView>
                    {technologies.map(technology => <SpotList key={technology} technology={technology} />)}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 3
    },
});