import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";
import { add } from "./api/addReview";

const STAR_COLORS = {
  filled: "#FFD700", // Gold color for filled stars
  unfilled: "#C0C0C0", // Silver color for unfilled stars
};

const AddScreen = ({ route }) => {
  const navigation = useNavigation();
  const username = route.params.username;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // Updated to use a numerical rating
  const [productLink, setProductLink] = useState("");
  const [isAffiliate, setIsAffiliate] = useState(false);

  const isUrlValid = (url) => {
    // Regular expression pattern to validate URL format
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleReviewSubmit = async () => {
    if (!productName || !description || !review || !rating || !productLink) {
      alert("Please fill out all fields");
      return;
    }

    if (productLink && !isUrlValid(productLink)) {
      alert("Invalid product link");
      return;
    }
    if (!isAffiliate) {
      alert(
        "Please check the box to allow affiliate links - this will support PlasticAway!"
      );
      return;
    }

    const Review = {
      username,
      productName,
      description,
      review,
      rating,
      productLink,
    };

    const result = await add(Review);

    if (result.error) {
      alert("There was an error adding your review");
      console.log(result.error);
    } else {
      alert("Your review was successfully added!");

      setProductName("");
      setDescription("");
      setReview("");
      setRating(0);
      setProductLink("");
      setIsAffiliate(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false }); // Set an empty title for the screen
  }, [navigation]);

  const renderStar = (index) => {
    const isFilled = index < rating;
    const starIconName = isFilled ? "star" : "star-o";
    const starColor = isFilled ? STAR_COLORS.filled : STAR_COLORS.unfilled;

    return (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <FontAwesome name={starIconName} size={30} color={starColor} />
      </TouchableOpacity>
    );
  };

  const renderStarRating = () => {
    const stars = Array.from({ length: 5 }, (_, index) => renderStar(index));

    return <View style={styles.starRating}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Review a Plastic-Free Product!</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        onChangeText={setProductName}
        value={productName}
      />

      <TextInput
        style={styles.largeInput}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        multiline={true}
      />

      <TextInput
        style={styles.largeInput}
        placeholder="Short Review"
        onChangeText={setReview}
        value={review}
        multiline={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Link"
        onChangeText={setProductLink}
        value={productLink}
      />

      <View style={styles.ratingContainer}>{renderStarRating()}</View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isAffiliate}
          onValueChange={setIsAffiliate}
          color="#000000" // Black checkbox color
        />
        <Text style={styles.checkboxText}>
          I acknowledge that the product link may be redirected to an affiliate
          link on another website if necessary.
        </Text>
      </View>

      <View style={styles.button}>
        <Button name="Submit Review" onPress={handleReviewSubmit} size={22.5} />
      </View>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF", // White background color
    paddingTop: 48,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#000000", // Black text color
    alignSelf: "center",
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
  largeInput: {
    height: 60,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF", // White background color
    color: "#000000", // Black text color
  },
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 8,
  },
  starRating: {
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    marginTop: 16,
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#000000", // Black text color
  },
  checkbox: {
    marginTop: 16,
    padding: 0,
  },
  button: {
    marginTop: 16,
    alignSelf: "center",
  },
});
