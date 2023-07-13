import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { changePassword } from "./api/auth";

const ChangePassword = ({ route }) => {
  const username = route.params.username;
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false }); // Set an empty title for the screen
  }, [navigation]);

  const handleResetSubmit = async () => {
    const user = {
      username: username,
      password: password,
      password2: password2,
    };
    const response = await changePassword(user);
    if (response.message === "Password changed successfully") {
      navigation.navigate("LoginForm");
    } else {
      alert("Error changing password");
    }
  };

  return (
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
          onPress={handleResetSubmit}
          size={22.5}
          style={styles.buttons}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
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
