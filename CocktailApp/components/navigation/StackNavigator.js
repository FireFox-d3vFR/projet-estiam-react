import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from "./BottomTabsNavigator";
import CocktailDetailScreen from "../screens/CocktailDetailScreen";
import TrendingCocktailsScreen from "../screens/TrendingCocktailsScreen";
import CategorySearchScreen from "../screens/CategorySearchScreen";
import IngredientSearchScreen from "../screens/IngredientSearchScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={BottomTabsNavigator} />
            <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="TrendingCocktails" component={TrendingCocktailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="CategorySearch" component={CategorySearchScreen} options={{ headerShown: true }} />
            <Stack.Screen name="IngredientSearch" component={IngredientSearchScreen} options={{ headerShown: true }} />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
