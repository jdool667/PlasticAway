import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PlasticAway</Text>
      <ActivityIndicator
        size="large"
        color="#000000"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  activityIndicator: {
    marginBottom: 10,
  },
});

export default LoadingPage;
