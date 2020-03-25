import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, AsyncStorage, KeyboardAvoidingView, View, Image, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [technologies, setTechnologies] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, [])

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('technologies', technologies);

        navigation.navigate('List');
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
            // dark-content, light-content and default
            />
            <KeyboardAvoidingView behavior="padding" style={styles.container} >
                <Image source={logo} />

                <View style={styles.form}  >
                    <Text style={styles.label} > SEU E-MAIL: * </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu e-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}> TECNOLOGIAS: * </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tecnologias de interesse"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={technologies}
                        onChangeText={setTechnologies}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}> Encontrar Spots </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: "#F05A5B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    }
});