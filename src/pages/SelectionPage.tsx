import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Item from "../components/MedicalItem";
import MedicalItem from "../components/MedicalItem";

type ItemData = {
  id: string;
  picture: Image;
  title: string;
  emission: number;
};

type SelectedItem = {
  count: number;
  item: ItemData;
};

const DATA: ItemData[] = [
  {
    id: "1",
    picture: require("../../assets/pictures/surgical_gloves.png"),
    title: "Surgical Gloves (Pair)",
    emission: 1.2,
  },
  {
    id: "2",
    picture: require("../../assets/pictures/surgical_mask.png"),
    title: "Surgical Mask",
    emission: 2.249,
  },
  {
    id: "3",
    picture: require("../../assets/pictures/syringe.png"),
    title: "2mL Syringe",
    emission: 0.013,
  },
  {
    id: "4",
    picture: require("../../assets/pictures/syringe.png"),
    title: "5mL Syringe",
    emission: 0.016,
  },
  {
    id: "5",
    picture: require("../../assets/pictures/syringe.png"),
    title: "10mL Syringe",
    emission: 0.03,
  },
];

const SelectionPage = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedItem | undefined>
  >({});

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id, change) => {
    if (!selectedItems[id]) {
      setSelectedItems({
        ...selectedItems,
        [id]: { count: 1, item: DATA.find((item) => item.id === id) },
      });
    } else if (selectedItems[id].count + change < 1) {
      setSelectedItems({ ...selectedItems, [id]: undefined });
    } else {
      setSelectedItems({
        ...selectedItems,
        [id]: { ...selectedItems[id], count: selectedItems[id].count + change },
      });
    }
  };

  const handleNext = () => {
    let totalEmission = Object.values(selectedItems).reduce(
      (total, selectedItem) => {
        if (selectedItem) {
          return total + selectedItem.count * selectedItem.item.emission;
        }
        return total;
      },
      0
    );

    totalEmission = parseFloat(totalEmission.toFixed(3));

    navigation.navigate("Total", { totalEmission });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["lightblue", "white"]} style={styles.container}>
        <Text style={styles.title}>Carbon Emissions Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for items..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <MedicalItem
              title={item.title}
              onSelect={(change) => handleSelect(item.id, change)}
              isSelected={!!selectedItems[item.id]}
              count={selectedItems[item.id]?.count}
              picture={item.picture}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={(item) => item.id}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 80,
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
    color: "black",
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
  flatListContent: {
    padding: 30,
  },
});

export default SelectionPage;
