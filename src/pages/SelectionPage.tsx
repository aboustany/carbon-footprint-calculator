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
    transportation_emissions: 1.07,
    production_emissions: 0.048,
    packaging_emissions: 0.03,
    disposal_emissions: 0.042,
  },
  {
    id: "2",
    picture: require("../assets/pictures/surgical_mask.png"),
    title: "Surgical Mask",
    total_emission: 2.249,
    transportation_emissions: 0.129,
    production_emissions: 2.15,
    packaging_emissions: 0.268,
    disposal_emissions: 0.05,
  },
  {
    id: "3",
    picture: require("../assets/pictures/syringe.png"),
    title: "2mL Syringe",
    total_emission: 0.5898,
    transportation_emissions: 0.178,
    production_emissions: 0.0349,
    packaging_emissions: 0.0084,
    disposal_emissions: 0.0175,
  },
  {
    id: "4",
    picture: require("../assets/pictures/syringe.png"),
    title: "5mL Syringe",
    total_emission: 0.6475,
    transportation_emissions: 0.178, 
    production_emissions: 0.0673,
    packaging_emissions: 0.0162,
    disposal_emissions: 0.035,
  },
  {
    id: "5",
    picture: require("../assets/pictures/syringe.png"),
    title: "10mL Syringe",
    total_emission: 0.7834,
    transportation_emissions: 0.178, 
    production_emissions: 0.1446,
    packaging_emissions: 0.0348,
    disposal_emissions: 0.075,
  },
  {
    id: "6",
    picture: require("../assets/pictures/syringe.png"),
    title: "20mL Syringe",
    total_emission: 0.9,
    transportation_emissions: 0.178, 
    production_emissions: 0.3107,
    packaging_emissions: 0.0748,
    disposal_emissions: 0.075,
  },
  {
    id: "7",
    picture: require("../assets/pictures/syringe.png"),
    title: "30mL Syringe",
    total_emission: 1.1,
    transportation_emissions: 0.178, 
    production_emissions: 0.4660,
    packaging_emissions: 0.1122,
    disposal_emissions: 0.075,
  },
  {
    id: "8",
    picture: require("../assets/pictures/syringe.png"),
    title: "50mL Syringe",
    total_emission: 1.4,
    transportation_emissions: 0.178, 
    production_emissions: 0.7783,
    packaging_emissions: 0.1880,
    disposal_emissions: 0.075,
  },
  {
    id: "9",
    picture: require("../assets/pictures/n95-with-valve.png"),
    title: "N95 Mask (with valve)",
    total_emission: 3.822,
    transportation_emissions: 0.129, 
    production_emissions: 1.525,
    packaging_emissions: 0.268,
    disposal_emissions: 0.075,
  },
  {
    id: "10",
    picture: require("../assets/pictures/n95-no-valve.png"),
    title: "N95 Mask (no valve)",
    total_emission: 1.904,
    transportation_emissions: 0.129, 
    production_emissions: 0.96,
    packaging_emissions: 0.0728,
    disposal_emissions: 0.075,
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
