import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Weather from './Weather';
import CustomScrollView from '../constants/customScrollView';
import colors from '../constants/colors';

const ForecastWeather = ({ data }) => {
    const [forecasts, setForecasts] = useState([]);
    const [visibleDay, setVisibleDay] = useState(null);

    useEffect(() => {
        if (data) {
            const forecastsData = data.list.map(forecast => ({
                hour: new Date(forecast.dt_txt).getHours(),
                temp: forecast.main.temp,
                icon: forecast.weather[0].icon,
                day: new Date(forecast.dt_txt).toLocaleDateString('fr-FR', { weekday: "long", day: 'numeric', month: "long" })
            }));

            const groupedForecasts = forecastsData.reduce((acc, curr) => {
                acc[curr.day] = [...(acc[curr.day] || []), curr];
                return acc;
            }, {});

            setForecasts(Object.entries(groupedForecasts).map(([day, data]) => ({ day, data })));
            setVisibleDay(Object.entries(groupedForecasts)[0][0]);  // Par défaut affiche le jour le plus récent
        }
    }, [data]);

    const toggleVisibility = (day) => {
        setVisibleDay(visibleDay === day ? null : day);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleVisibility(item.day)}>
                <Text style={styles.dayText}>{item.day}</Text>
            </TouchableOpacity>
            {visibleDay === item.day && (
                <CustomScrollView horizontal style={styles.forecastScrollView}>
                    <View style={styles.forecastContainer}>
                        {item.data.map((forecast, idx) => (
                            <Weather key={idx} forecast={forecast} />
                        ))}
                    </View>
                </CustomScrollView>
            )}
        </View>
    );

    return (
        <CustomScrollView style={styles.list}>
            <FlatList
                data={forecasts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        elevation: 5,
        overflow: 'hidden',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 10,
        textAlign: 'center',
    },
    forecastScrollView: {
        width: 300,
    },
    forecastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    }
});

export default ForecastWeather;
