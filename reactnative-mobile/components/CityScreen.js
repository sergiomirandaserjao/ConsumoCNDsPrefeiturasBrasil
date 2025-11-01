import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getCND } from "../utils/api";

export default function CityScreen({ route }) {
  const { city } = route.params;
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!cnpj) return Alert.alert("Informe um CNPJ");
    setLoading(true);
    try {
      const data = await getCND(city.endpoint, cnpj);
      setLoading(false);
      if (data && data.pdf_url) {
        const pdfUri = FileSystem.documentDirectory + `${city.id}.pdf`;
        await FileSystem.downloadAsync(data.pdf_url, pdfUri);
        await Sharing.shareAsync(pdfUri);
      } else {
        Alert.alert("Não encontrado", "Nenhum PDF disponível.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Falha ao consultar CND.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CNPJ"
        keyboardType="numeric"
        value={cnpj}
        onChangeText={setCnpj}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Consultar CND" onPress={handleFetch} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15 }
});
