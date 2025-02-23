import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector(state => state.favorites.favorites);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Aucun favori ajouté.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CocktailDetail', { cocktail: item })}
              style={[styles.itemContainer, hoveredItem === item.idDrink && styles.itemHover]}
              onMouseEnter={() => setHoveredItem(item.idDrink)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.strDrink}</Text>
                <Text style={styles.category}>{item.strCategory}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    transition: 'transform 0.2s',
  },
  itemHover: {
    transform: 'scale(1.02)',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});
