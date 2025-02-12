import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';
import colors from '../constants/colors';

const CurrentWeather = ({ data }) => {
    const [weather, setWeather] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        if (data) {
            setWeather({
                city: data.city.name,
                temp: data.list[0].main.temp,
                description: data.list[0].weather[0].description,
                icon: data.list[0].weather[0].icon
            });
        }

        // Met à jour la date et l'heure chaque seconde
        const updateDateTime = () => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
            const formattedTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            setCurrentDateTime(`${formattedDate} - ${formattedTime}`);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);

        return () => clearInterval(interval);
    }, [data]);

    return weather ? (
        <View style={styles.container}>
            <Text style={styles.city}>{weather.city}</Text>
            <Text style={styles.date}>{currentDateTime}</Text>

            {/* Conteneur avec radius et opacité autour de l'icône */}
            <View style={styles.iconContainer}>
                <ShowIcon icon={weather.icon} size={90} />
            </View>

            <Text style={styles.temp}>{weather.temp}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 20,
        width: '100%',
    },
    city: {
        fontSize: 24,
        color: colors.textPrimary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    date: {
        color: colors.textSecondary,
        textAlign: 'center',
    },
    temp: {
        fontSize: 50,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    description: {
        color: colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
    },
    iconContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    }
});

export default CurrentWeather;
