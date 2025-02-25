import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

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

  const handleFavoriteToggle = (cocktail) => {
    const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);
    if (isFavorite) {
      dispatch(removeFavorite(cocktail.idDrink));
    } else {
      dispatch(addFavorite(cocktail));
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        setCocktails(response.data.drinks || []);
      } catch (error) {
        console.error(error);
      }
    } else {
      fetchCocktails();
    }
  };

  if (loading && cocktails.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un cocktail par nom"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => {
          const isFavorite = favorites.some(fav => fav.idDrink === item.idDrink);
          return (
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
              <TouchableOpacity onPress={() => handleFavoriteToggle(item)} style={styles.favoriteButton}>
                <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
  favoriteButton: {
    padding: 10,
  },
});
