import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { signOut } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser } from "./api/auth";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const username = route.params.username;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false }); // Set an empty title for the screen
  }, [navigation]);

  const handleChangePassword = async () => {
    navigation.navigate("ChangePassword", { username: username });
  };
  const handleSignOut = async () => {
    await signOut(username);
    await AsyncStorage.removeItem("token");
    navigation.navigate("FirstScreen");
  };
  const handleFAQs = async () => {
    navigation.navigate("FAQs");
  };
  const handleContactUs = async () => {
    navigation.navigate("ContactUs");
  };
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account and all associated data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteAccount,
        },
      ]
    );
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(username);
      await AsyncStorage.removeItem("token");
      navigation.navigate("FirstScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            name="Change Password"
            onPress={handleChangePassword}
            size={20}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button name="Sign Out" onPress={handleSignOut} size={20} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button name="FAQs" onPress={handleFAQs} size={20} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button name="Contact Us" onPress={handleContactUs} size={20} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            name="Delete Account"
            onPress={handleDeleteAccount}
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    marginBottom: 24,
  },
});
