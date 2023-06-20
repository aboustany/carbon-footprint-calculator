import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectionPage from "../pages/SelectionPage";
import TotalPage from "../pages/TotalPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Selection">
      <Stack.Screen
        name="Selection"
        component={SelectionPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Total"
        component={TotalPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
