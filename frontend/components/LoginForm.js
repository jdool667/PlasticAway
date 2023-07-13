import React, { useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { login } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePasswordReset = () => {
    navigation.navigate("ResetPassword");
  };

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };

    try {
      const response = await login(user);
      if (response.message === "User logged in successfully") {
        const token = response.token;
        await AsyncStorage.setItem("token", JSON.stringify(token));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home", params: { username: response.username } }],
          })
        );
      } else alert(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
        />
        <View style={styles.buttons}>
          <Button name="Login" onPress={handleLogin} size={22.5} />
          <View style={styles.gap} />
          <Button
            name="Forgot Password?"
            onPress={handlePasswordReset}
            size={22.5}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  backButton: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  gap: {
    height: 10,
  },
});

export default LoginForm;
