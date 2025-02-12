import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, ImageBackground, StyleSheet, SafeAreaView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import axios from 'axios';
import * as Location from 'expo-location';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import colors from './constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError("Permission de localisation refusée");
                setLoading(false);
                return;
            };
            let pos = await Location.getCurrentPositionAsync({});
            fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
        })();
    }, []);

    const fetchWeatherData = useCallback(async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`;
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (err) {
            setError("Impossible de récupérer les données météo");
        } finally {
            setLoading(false);
        }
    }, []);

    const searchCity = async () => {
        if (!city.trim()) return;
        try {
            setLoading(true);
            setError(null);
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
            const response = await axios.get(geoUrl);
            if (response.data.length > 0) {
                fetchWeatherData(response.data[0].lat, response.data[0].lon);
            } else {
                setError("Ville introuvable");
                setLoading(false);
            }
        } catch (err) {
            setError("Erreur lors de la recherche de la ville");
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('./assets/background.webp')} style={styles.backgroundImage}>
            <BlurView intensity={50} style={styles.blurContainer}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrer une ville..."
                            placeholderTextColor={colors.gray}
                            onChangeText={setCity}
                            value={city}
                        />
                        <TouchableOpacity onPress={searchCity} style={styles.searchButton}>
                            <Icon name="search" size={20} color={colors.white}/>
                        </TouchableOpacity>
                    </View>
                    {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    {weatherData && <CurrentWeather data={weatherData} />}
                    {weatherData && <ForecastWeather data={weatherData} />}
                </SafeAreaView>
            </BlurView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5',
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 20,
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 18,
        color: colors.dark,
        fontWeight: '500',
        paddingHorizontal: 15,
    },
    searchButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.red,
        fontSize: 16,
        marginTop: 10,
    },
});

export default App;
