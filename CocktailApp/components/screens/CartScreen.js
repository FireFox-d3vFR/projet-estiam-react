import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/selectors";
import { removeFromCart, updateShoppingListItem } from "../redux/actions";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  const handleRemoveFromCart = (ingredient) => {
    dispatch(removeFromCart(ingredient));
  };

  const handleQuantityChange = (ingredient, quantity) => {
    if (quantity > 0) {
      dispatch(updateShoppingListItem(ingredient, quantity));
    } else {
      dispatch(removeFromCart(ingredient));
    }
  };

  return (
    <View style={styles.container}>
      {cart.length < 1 ? (
        <Text style={styles.emptyText}>Aucun articles ajoutés.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.ingredient}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: `https://www.thecocktaildb.com/images/ingredients/${item.ingredient}-Medium.png`,
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.ingredient}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.ingredient, item.quantity - 1)}
                >
                  <Icon name="minus" size={20} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.ingredient, item.quantity + 1)}
                >
                  <Icon name="plus" size={20} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.ingredient)}>
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
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
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
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
    fontWeight: "bold",
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});
