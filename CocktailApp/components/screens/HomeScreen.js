import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        )
      );
      setCocktails(prevCocktails => [...prevCocktails, ...responses.map(response => response.data.drinks[0])]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      fetchCocktails();
    }
  };

  if (loading && cocktails.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={cocktails}
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
    />
  );
}

const styles = StyleSheet.create({
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
