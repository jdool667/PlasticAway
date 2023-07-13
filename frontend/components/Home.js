import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "./SearchScreen";
import AddScreen from "./AddScreen";
import ProfileScreen from "./ProfileScreen";
import MyReviewsScreen from "./MyReviewsScreen";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const username = route.params.username;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search Reviews",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
        initialParams={{ username: username }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: "Add Review",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
        initialParams={{ username: username }}
      />
      <Tab.Screen
        name="My Reviews"
        component={MyReviewsScreen}
        options={{
          tabBarLabel: "My Reviews",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
        initialParams={{ username: username }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        initialParams={{ username: username }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
