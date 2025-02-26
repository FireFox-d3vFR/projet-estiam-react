import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateShoppingListItem,
  addToCart,
  addToShoppingList,
  removeFromShoppingList,
  resetShoppingListItem,
} from "../redux/actions";
import { getShoppingList } from "../redux/selectors";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ShoppingListScreen() {
  const dispatch = useDispatch();
  const shoppingList = useSelector(getShoppingList);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Shopping List", shoppingList);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
      );
      setIngredients(response.data.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (ingredient, quantity) => {
    console.log("Changing quantity for:", ingredient, "to:", quantity);
    if (quantity >= 0 && quantity <= 50) {
      dispatch(updateShoppingListItem(ingredient, quantity));
    }
  };

  const handleAddToCart = (ingredient) => {
    const item = shoppingList.find((item) => item.ingredient === ingredient);
    if (item) {
      dispatch(addToCart([{ ...item }]));
    } else {
      dispatch(addToCart([{ ingredient, quantity: 1 }]));
    }
    dispatch(resetShoppingListItem(ingredient));
  };

  const handleAddToShoppingList = (ingredient) => {
    dispatch(addToShoppingList({ ingredient }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.strIngredient1}
        renderItem={({ item }) => {
          const shoppingItem = shoppingList.find(
            (i) => i.ingredient === item.strIngredient1
          );
          const quantity = shoppingItem ? shoppingItem.quantity : 0;
          return (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Medium.png`,
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.strIngredient1}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleQuantityChange(item.strIngredient1, quantity - 1)
                  }
                >
                  <Icon name="minus" size={20} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleQuantityChange(item.strIngredient1, quantity + 1)
                  }
                >
                  <Icon name="plus" size={20} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => handleAddToCart(item.strIngredient1)}
                style={[
                  styles.cartButton,
                  quantity === 0 && styles.disabledButton,
                ]}
                disabled={quantity === 0}
              >
                <Icon
                  name="shopping-cart"
                  size={24}
                  color={quantity === 0 ? "gray" : "blue"}
                />
              </TouchableOpacity>
            </View>
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
  cartButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
