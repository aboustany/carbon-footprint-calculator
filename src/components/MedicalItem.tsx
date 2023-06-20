import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const MedicalItem = ({ title, onSelect, isSelected, count }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => onSelect(isSelected ? -1 : 1)}
      style={[styles.item, isSelected ? styles.selectedItem : {}]}
    >
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
    {isSelected && (
      <View style={styles.countContainer}>
        <TouchableOpacity onPress={() => onSelect(-1)}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{count}</Text>
        <TouchableOpacity onPress={() => onSelect(1)}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: "green",
  },
  itemText: {
    color: "black",
    alignSelf: "center",
  },
  countText: {
    alignSelf: "center",
    color: "black",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: "black",
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default MedicalItem;
