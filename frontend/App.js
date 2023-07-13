import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import FirstScreen from "./components/FirstScreen";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";
import MyReview from "./components/MyReview";
import UserReview from "./components/UserReview";
import ChangePassword from "./components/ChangePassword";
import FAQs from "./components/FAQs";
import ContactUs from "./components/ContactUs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyReview" component={MyReview} />
        <Stack.Screen name="UserReview" component={UserReview} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
