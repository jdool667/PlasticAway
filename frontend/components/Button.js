import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Button = ({ onPress, name, size }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonPress = () => {
    if (!isButtonDisabled) {
      onPress();
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isButtonDisabled]);

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
        onPress={handleButtonPress}
        disabled={isButtonDisabled}
      >
        <Text style={[styles.buttonText, { fontSize: size }]}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Button;
