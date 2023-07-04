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
  total_emission: number;
  transportation_emissions: any;
  production_emissions: any;
  packaging_emissions: any;
  disposal_emissions: any;
};

type SelectedItem = {
  count: number;
  item: ItemData;
};

const DATA: ItemData[] = [
  {
    id: "1",
    picture: require("../assets/pictures/surgical_gloves.png"),
    title: "Latex Surgical Gloves (Pair)",
    total_emission: 1.2,
    transportation_emissions: 0.2,
    production_emissions: 0.5,
    packaging_emissions: 0.3,
    disposal_emissions: 0.2,
  },
  {
    id: "2",
    picture: require("../assets/pictures/surgical_mask.png"),
    title: "Surgical Mask",
    total_emission: 2.249,
    transportation_emissions: 2,
    production_emissions: 3.2,
    packaging_emissions: 1,
    disposal_emissions: 1.1,
  },
  {
    id: "3",
    picture: require("../assets/pictures/syringe.png"),
    title: "2mL Syringe",
    total_emission: 0.013,
    transportation_emissions: 1.1,
    production_emissions: 7,
    packaging_emissions: 3,
    disposal_emissions: 5,
  },
  {
    id: "4",
    picture: require("../assets/pictures/syringe.png"),
    title: "5mL Syringe",
    total_emission: 0.016,
    transportation_emissions: 9,
    production_emissions: 2,
    packaging_emissions: 3,
    disposal_emissions: 5,
  },
  {
    id: "5",
    picture: require("../assets/pictures/syringe.png"),
    title: "10mL Syringe",
    total_emission: 0.03,
    transportation_emissions: 10,
    production_emissions: 20,
    packaging_emissions: 25,
    disposal_emissions: 2,
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
    let totalEmission = Object.values(selectedItems)
      .filter((selectedItem) => selectedItem !== undefined)
      .reduce((total, selectedItem) => {
        if (selectedItem) {
          return total + selectedItem.count * selectedItem.item.total_emission;
        }
        return total;
      }, 0);
  
    totalEmission = parseFloat(totalEmission.toFixed(3));
  
    const emissionBreakdown = Object.values(selectedItems)
    .filter((selectedItem) => selectedItem !== undefined)
    .reduce(
      (totals, selectedItem) => {
        if (selectedItem) {
          totals.transportation_emissions += selectedItem.count * selectedItem.item.transportation_emissions;
          totals.production_emissions += selectedItem.count * selectedItem.item.production_emissions;
          totals.packaging_emissions += selectedItem.count * selectedItem.item.packaging_emissions;
          totals.disposal_emissions += selectedItem.count * selectedItem.item.disposal_emissions;
        }
        return totals;
      },
      {
        transportation_emissions: 0,
        production_emissions: 0,
        packaging_emissions: 0,
        disposal_emissions: 0,
      }
    );
  navigation.navigate("Total", { totalEmission, emissionBreakdown });
};
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["lightblue", "white"]} style={styles.container}>
        <Text style={styles.title}>Carbon Emissions Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for medical items..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <FlatList
          data={filteredData}
          numColumns={2}
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
          showsHorizontalScrollIndicator={false} 
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
    paddingHorizontal: 7,
  },
});

export default SelectionPage;
