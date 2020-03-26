import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

export default function Incidents({ navigation }) {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadIncidents();
    }, []);

    async function loadIncidents() {

        if (loading) return;

        if (total > 0 && incidents.length === total) return;

        setLoading(true);

        try {
            const response = await api.get("incident", {
                params: { page }
            });

            setTotal(response.headers['x-total-count']);
            setIncidents([...incidents, ...response.data]);
            setPage(page + 1);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    function navigateToDetail(incident) {
        navigation.navigate("Detail", { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}> {total} incidents.</Text>
                </Text>
            </View>

            <Text style={styles.title}> Welcome!</Text>
            <Text style={styles.description}>Choose one of the incidents below and become a Hero! </Text>

            <FlatList
                styles={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>NGO:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>INCIDENT:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

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

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>See more</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

