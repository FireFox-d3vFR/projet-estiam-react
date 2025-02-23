import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CocktailDetailScreen({ route }) {
  const { cocktail } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
        dispatch(removeFavorite(cocktail.idDrink));
    } else {
        dispatch(addFavorite(cocktail));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        </TouchableOpacity>
        <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
        <Text style={styles.ingredientsTitle}>Ingrédients :</Text>
        {Object.keys(cocktail)
          .filter(key => key.startsWith('strIngredient') && cocktail[key])
          .map(key => (
            <Text key={key} style={styles.ingredient}>
              {cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  favoriteButton: {
    marginVertical: 10,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#666',
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  ingredient: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
