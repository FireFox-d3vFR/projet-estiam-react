import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StoreProvider from "./components/redux/store";
import DrawerNavigator from "./components/navigation/DrawerNavigator";

export default function App() {
  return (
    <StoreProvider>
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    </StoreProvider>
  );
}
