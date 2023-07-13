import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { checkCode, reset } from "./api/auth";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isCodeSent, codeSent] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    const data = {
      email,
    };
    try {
      const response = await reset(data);
      if (response.message === "Email sent") {
        alert("Email sent, enter the code below");
        codeSent(true);
      } else {
        alert("Error sending email, please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCodeSubmit = async () => {
    const data = {
      email,
      code,
      password,
      password2,
    };
    try {
      const response = await checkCode(data);
      if (response.message === "Password updated successfully") {
        Alert.alert(
          "Success",
          "Password updated successfully - click ok to login",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("LoginForm"),
            },
          ]
        );
      } else {
        alert("Error updating password, please try again " + response.message);
      }
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
        <View style={{ alignItems: "center" }}>
          <Button
            name="Send Code"
            onPress={handlePasswordReset}
            size={22.5}
            style={styles.buttons}
          />
        </View>

        {isCodeSent && (
          <View>
            <TextInput
              style={[styles.input, { marginTop: 16 }]}
              placeholder="Code"
              onChangeText={setCode}
              value={code}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              onChangeText={setPassword2}
              value={password2}
            />
            <View style={{ alignItems: "center" }}>
              <Button
                name="Submit"
                onPress={handleCodeSubmit}
                size={22.5}
                style={styles.buttons}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
    alignSelf: "center",
  },
});
