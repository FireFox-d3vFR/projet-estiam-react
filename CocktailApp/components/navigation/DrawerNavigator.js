import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={StackNavigator} />
      <Drawer.Screen name="Cocktails Tendance" component={StackNavigator} initialParams={{ screen: 'TrendingCocktails' }} />
      <Drawer.Screen name="Recherche par Catégorie" component={StackNavigator} initialParams={{ screen: 'CategorySearch' }} />
      <Drawer.Screen name="Recherche par Ingrédient" component={StackNavigator} initialParams={{ screen: 'IngredientSearch' }} />
      <Drawer.Screen name="Liste de Courses" component={StackNavigator} initialParams={{ screen: 'ShoppingList' }} />
    </Drawer.Navigator>
  );
}
