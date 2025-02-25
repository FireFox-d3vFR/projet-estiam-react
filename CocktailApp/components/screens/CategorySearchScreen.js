import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CategorySearchScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cocktails, setCocktails] = useState([]);
  const [loadingCocktails, setLoadingCocktails] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategories(response.data.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCocktailsByCategory = async (category) => {
    setLoadingCocktails(true);
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCocktails(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    fetchCocktailsByCategory(category);
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {selectedCategory ? (
        <>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
          {loadingCocktails ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={cocktails}
              keyExtractor={(item) => item.idDrink}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCocktailPress(item.idDrink)}
                  style={styles.itemContainer}
                >
                  <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                  <Text style={styles.title}>{item.strDrink}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.strCategory}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryPress(item.strCategory)}
              style={styles.itemContainer}
            >
              <Text style={styles.title}>{item.strCategory}</Text>
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
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
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
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
