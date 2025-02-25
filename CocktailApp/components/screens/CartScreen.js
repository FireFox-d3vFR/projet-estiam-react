import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getCart } from '../redux/selectors';

export default function CartScreen() {
  const cart = useSelector(getCart);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Aucun articles ajoutés.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.ingredient}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.ingredient}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  quantity: {
    fontSize: 18,
  },
});
