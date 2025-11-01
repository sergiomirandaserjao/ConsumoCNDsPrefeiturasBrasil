import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CityScreen from "./screens/CityScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Certidões Negativas" }} />
        <Stack.Screen name="City" component={CityScreen} options={{ title: "Consultar CND" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
