import React, { useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { register } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigation = useNavigation();

  const handleButtonClick = async () => {
    const user = {
      name,
      username,
      email,
      password,
      password2,
    };

    try {
      const response = await register(user);
      if (response.message === "User registered successfully") {
        const token = response.token;
        await AsyncStorage.setItem("token", JSON.stringify(token));
        navigation.navigate("LoginForm");
      } else alert(response.message);
    } catch (err) {}
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
          placeholder="First Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setPassword2}
          value={password2}
          autoCapitalize="none"
        />
        <View style={styles.button}>
          <Button name="Register" onPress={handleButtonClick} size={22.5} />
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
  button: {
    marginTop: 8,
    alignSelf: "center",
  },
});

export default RegisterForm;
