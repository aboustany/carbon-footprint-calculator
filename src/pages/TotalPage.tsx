import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TotalPage = ({ route }) => (
  <LinearGradient colors={["green", "white"]} style={styles.container}>
    <Text style={styles.title}>Total Carbon Emission</Text>
    <Text style={styles.totalEmission}>{route.params.totalEmission}</Text>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  totalEmission: {
    fontSize: 20,
    color: "black",
  },
});

export default TotalPage;
