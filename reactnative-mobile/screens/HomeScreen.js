import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CityCard from "../components/CityCard";

const cities = [
  { id: "sp", name: "São Paulo", endpoint: "http://localhost/cnd/api/sp.php" },
  { id: "curitiba", name: "Curitiba", endpoint: "http://localhost/cnd/api/curitiba.php" },
  { id: "poa", name: "Porto Alegre", endpoint: "http://localhost/cnd/api/portoalegre.php" }
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <CityCard
            city={item}
            onPress={() => navigation.navigate("City", { city: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f7f7f7" }
});
