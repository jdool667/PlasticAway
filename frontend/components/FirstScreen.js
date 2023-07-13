import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkToken } from "./api/auth";
import LoadingPage from "./LoadingPage";
import { useIsFocused } from "@react-navigation/native";

const FirstScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoginFormPress = () => {
    navigation.navigate("LoginForm");
  };

  const handleRegisterFormPress = () => {
    navigation.navigate("RegisterForm");
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        const response = await checkToken(storedToken);
        if (response.message === "Token is valid") {
          setTimeout(() => {
            navigation.navigate("Home", {
              username: response.username,
            });
          }, 3000);
        } else {
          alert("Token is invalid");
          await AsyncStorage.removeItem("token");
        }
      }

      setToken(storedToken);
      setIsLoading(false);
    };

    checkTokenValidity();
  }, [isFocused]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.container}>
          <LoadingPage />
        </View>
      );
    }

    if (!token) {
      return (
        <View style={styles.container}>
          <Button name="Login" onPress={handleLoginFormPress} size={30} />
          <View style={styles.gap} />
          <Button name="Register" onPress={handleRegisterFormPress} size={30} />
        </View>
      );
    } else {
      return null;
    }
  };

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  gap: {
    height: 20,
  },
});

export default FirstScreen;
