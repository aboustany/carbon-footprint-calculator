import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Image, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const windowWidth = Dimensions.get('window').width;

const TotalPage = ({ route }) => {

  const moveAnimation = useRef(new Animated.Value(0)).current;

  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnimation, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const carEmissionsEquivalent = parseFloat((0.196974607*(route.params.totalEmission)).toFixed(3))

  const BreakdownButton = () => (
    <TouchableOpacity onPress={() => setShowBreakdown(!showBreakdown)} style={styles.breakdownButton}>
      <Text style={styles.breakdownButtonText}>{showBreakdown ? "Hide" : "Show"} Breakdown</Text>
    </TouchableOpacity>
  );

  const data = [
    {
      name: "Transportation",
      emissions: parseFloat(route.params.emissionBreakdown.transportation_emissions.toFixed(3)),
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Production",
      emissions: parseFloat(route.params.emissionBreakdown.production_emissions.toFixed(3)),
      color: "lightblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Packaging",
      emissions: parseFloat(route.params.emissionBreakdown.packaging_emissions.toFixed(3)),
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Disposal",
      emissions: parseFloat(route.params.emissionBreakdown.disposal_emissions.toFixed(3)),
      color: "lightgreen",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },

  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const BreakdownView = () => (
    <>
   
    <PieChart
      data={data}
      width={windowWidth-10}
      height={150}
      chartConfig={chartConfig}
      accessor={"emissions"}
      backgroundColor={"transparent"}
      paddingLeft={"-20"}
      center={[20, 10]}
    />
    </>
  );

  return (
    <LinearGradient colors={["lightgreen", "white"]} style={styles.container}>
      <Text style={styles.title}>Estimated Carbon Emission</Text>
      <Text style={styles.totalEmission}>
        {route.params.totalEmission} {"kg CO2e"}
      </Text>
      <BreakdownButton />
      {showBreakdown && <BreakdownView />}
      <View style={styles.emissionsContainer}>
        <Text style={styles.emissionsText}>
          {"Equivalent to "}{carEmissionsEquivalent}{"km driven by car!"}
        </Text>
      </View>
      <View style={styles.carContainer}>
        <Animated.Image
          source={require("../assets/pictures/car.png")} 
          style={[
            styles.carImage,
            {
              transform: [
                {
                  translateX: moveAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, windowWidth], 
                  }),
                },
              ],
            },
          ]}
        />
      </View>
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
  totalEmission: {
    fontSize: 20,
    color: "black",
  },
  carContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  carImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  emissionsContainer: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
    width: '100%',
  },
  emissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakdownButton: {
    backgroundColor: 'darkgreen',
    padding: 7,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20
  },
  breakdownButtonText: {
    color: 'white',
    fontSize: 15,
  },
  breakdownView: {
    padding: 20,
    marginTop: 10,
  },
  breakdownText: {
    fontSize: 15,
  },
});

export default TotalPage;
