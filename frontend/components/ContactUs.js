import React, { useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { sendContactMessage } from "./api/contact";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  const handleSend = async () => {
    const contactMessage = {
      name,
      email,
      message,
    };

    try {
      const response = await sendContactMessage(contactMessage);
      if (response.message === "Message sent") {
        alert("Message sent successfully");
        navigation.goBack();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.log(error);
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
          placeholder="Name"
          onChangeText={setName}
          value={name}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          onChangeText={setMessage}
          value={message}
          multiline
          numberOfLines={4}
        />
        <View style={styles.button}>
          <Button name="Send Message" onPress={handleSend} size={22.5} />
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
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF", // White background color
    color: "#000000", // Black text color
  },
  messageInput: {
    height: 120,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF", // White background color
    color: "#000000", // Black text color
  },
  backButton: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    alignSelf: "center",
  },
});

export default ContactUs;
