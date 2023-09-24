import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";

const MedicalItem = ({ picture, title, onSelect, isSelected, count }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => onSelect(1)}
      style={[styles.item, isSelected ? styles.selectedItem : {}]}
    >
      <Image source={picture} style={styles.imageStyle} />
      <Text style={styles.itemText} numberOfLines={2}>{title}</Text>
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
    width: 150,
    marginHorizontal: 8,
    marginBottom: 10
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    height: 130
  },
  selectedItem: {
    backgroundColor: "lightgreen",
  },
  itemText: {
    color: "black",
    alignSelf: "center",
    fontSize: 13,
    textAlign: "center"
  },
  countText: {
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center"
  },
});

export default MedicalItem;
