import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TrendingCocktailsScreen({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    fetchTrendingCocktails();
  }, []);

  const fetchTrendingCocktails = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        )
      );
      setCocktails(responses.map(response => response.data.drinks[0]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCocktailPress = async (cocktailId) => {
    const cocktailDetails = await fetchCocktailDetails(cocktailId);
    navigation.navigate('CocktailDetail', { cocktail: cocktailDetails });
  };

  const fetchCocktailDetails = async (cocktailId) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
      return response.data.drinks[0];
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteToggle = (cocktail) => {
    const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);
    if (isFavorite) {
      dispatch(removeFavorite(cocktail.idDrink));
    } else {
      dispatch(addFavorite(cocktail));
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => {
          const isFavorite = favorites.some(fav => fav.idDrink === item.idDrink);
          return (
            <TouchableOpacity
              onPress={() => handleCocktailPress(item.idDrink)}
              style={styles.itemContainer}
            >
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.strDrink}</Text>
                <Text style={styles.category}>{item.strCategory}</Text>
              </View>
              <TouchableOpacity onPress={() => handleFavoriteToggle(item)} style={styles.favoriteButton}>
                <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  favoriteButton: {
    padding: 10,
  },
});
