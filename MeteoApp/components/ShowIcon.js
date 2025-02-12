import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ShowIcon({ icon = "01d", size = 50 }) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return <Image source={{ uri: iconUrl }} style={{ width: size, height: size }} resizeMode="contain" />;
};
