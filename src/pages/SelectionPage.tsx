import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Item from "../components/MedicalItem";
import MedicalItem from "../components/MedicalItem";

type ItemData = {
  id: string;
  title: string;
  emission: number;
};

type SelectedItem = {
  count: number;
  item: ItemData;
};

const DATA: ItemData[] = [
  { id: "1", title: "Pair of Latex Gloves", emission: 10 },
  { id: "2", title: "Surgical Mask", emission: 20 },
  { id: "3", title: "Syringe 50mL", emission: 50 },
  { id: "4", title: "Syringe 20mL", emission: 30 },
  { id: "5", title: "Syringe 100mL", emission: 70 },
];

const SelectionPage = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedItem | undefined>
  >({});

  const handleSelect = (id, change) => {
    if (!selectedItems[id]) {
      setSelectedItems({
        ...selectedItems,
        [id]: { count: 1, item: DATA.find((item) => item.id === id) },
      });
    } else if (selectedItems[id].count + change < 1) {
      setSelectedItems({ ...selectedItems, [id]: undefined }); // deselect if count becomes 0
    } else {
      setSelectedItems({
        ...selectedItems,
        [id]: { ...selectedItems[id], count: selectedItems[id].count + change },
      });
    }
  };

  const handleNext = () => {
    const totalEmission = Object.values(selectedItems).reduce(
      (total, selectedItem) => {
        if (selectedItem) {
          return total + selectedItem.count * selectedItem.item.emission;
        }
        return total;
      },
      0
    );
    navigation.navigate("Total", { totalEmission });
  };

  return (
    <LinearGradient colors={["lightgreen", "white"]} style={styles.container}>
      <Text style={styles.title}>Medical Carbon Calculator</Text>
      <TextInput style={styles.input} placeholder="Search for items..." />

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            onSelect={(change) => handleSelect(item.id, change)}
            isSelected={!!selectedItems[item.id]}
            count={selectedItems[item.id]?.count}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

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
    color: "black",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "white",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default SelectionPage;
