import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail({ navigation, route }) {
    const incident = route.params.incident;
    const message = `Hello ${incident.name}, I would like to help you in the incident "${incident.title}", with the amount of ${Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(incident.value)}!`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Incident hero: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
                    <Text style={styles.incidentValue}>{incident.name}, {incident.city}/{incident.fu}</Text>

                    <Text style={styles.incidentProperty}>INCIDENT:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>DESCRIPTION:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALUE:</Text>
                    <Text style={styles.incidentValue}>
                        {
                            Intl.NumberFormat(
                                "en-US",
                                {
                                    style: "currency",
                                    currency: "USD"
                                })
                                .format(incident.value)
                        }
                    </Text>
                </View>

                <View style={styles.contactBox} >
                    <Text style={styles.heroTitle}> Save the day </Text>
                    <Text style={styles.heroTitle}> Be the Hero of this incident </Text>

                    <Text style={styles.heroDescription}> Get in touch: </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
