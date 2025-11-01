import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function CityCard({ city, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.endpoint}>{city.endpoint}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  endpoint: { fontSize: 12, color: "#888" }
});
