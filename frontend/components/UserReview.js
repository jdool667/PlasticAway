import { StyleSheet, Text, View, SafeAreaView, Linking } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { edit, deleteReview } from "./api/addReview";

const STAR_COLORS = {
  filled: "#FFD700", // Gold color for filled stars
  unfilled: "#C0C0C0", // Silver color for unfilled stars
};

const MyReview = ({ route }) => {
  const review = route.params.review;
  const id = review._id;
  const [productName, setProductName] = useState(review.productName);
  const [description, setDescription] = useState(review.description);
  const [reviewText, setReviewText] = useState(review.review);
  const [rating, setRating] = useState(review.rating);

  const navigation = useNavigation();

  const handleUpdateReview = async () => {
    const editRes = await edit({
      id,
      productName,
      description,
      review: reviewText,
      rating,
    });
    if (editRes.message === "Review updated") {
      navigation.navigate("Home", { username: review.username });
    } else {
      alert("Error updating review");
    }
  };

  const handleDeleteReview = async () => {
    try {
      const deleteRes = await deleteReview(id);
      if (deleteRes.message === "Review deleted") {
        navigation.navigate("Home", { username: review.username });
      } else {
        alert("Error deleting review");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting review");
    }
  };

  const renderStar = (index) => {
    const isFilled = index < rating;
    const starIconName = isFilled ? "star" : "star-outline";
    const starColor = isFilled ? STAR_COLORS.filled : STAR_COLORS.unfilled;

    return (
      <Ionicons
        name={starIconName}
        size={24}
        color={starColor}
        key={index}
        onPress={() => setRating(index + 1)}
      />
    );
  };

  const renderStarRating = () => {
    const stars = Array.from({ length: 5 }, (_, index) => renderStar(index));

    return (
      <View style={styles.starRatingContainer}>
        <View style={styles.starRating}>{stars}</View>
      </View>
    );
  };

  const handleAffiliateLinkPress = () => {
    if (review.productLink) {
      Linking.openURL(review.productLink);
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
        <Text style={styles.label}>Product Name:</Text>
        <Text style={styles.text}>{productName}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{description}</Text>

        <Text style={styles.label}>Review:</Text>
        <Text style={styles.text}>{reviewText}</Text>

        <Text style={styles.label}>Rating:</Text>
        {renderStarRating()}

        <Text style={styles.label}>Link To Product:</Text>
        <Text style={styles.link} onPress={handleAffiliateLinkPress}>
          {review.productLink}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000", // Black text color
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    color: "#000000", // Black text color
  },
  link: {
    fontSize: 16,
    marginBottom: 16,
    color: "blue", // Blue link color
    textDecorationLine: "underline",
  },
  backButton: {
    fontSize: 24,
    marginBottom: 16,
  },
  starRatingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  starRating: {
    flexDirection: "row",
  },
});
