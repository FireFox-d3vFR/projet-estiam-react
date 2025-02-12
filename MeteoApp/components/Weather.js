import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

export default function Weather({ forecast }) {
    return (
        <View style={styles.container}>
            <Text style={styles.hour}>{forecast.hour}h</Text>
            <ShowIcon icon={forecast.icon} size={50} />
            <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80, // Largeur fixe pour chaque élément de prévision
        marginHorizontal: 10, // Espace entre les éléments
    },
    hour: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    temp: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
