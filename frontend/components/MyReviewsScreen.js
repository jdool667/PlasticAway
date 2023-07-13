import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { getUserReviews } from "./api/getReview";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const STAR_COLORS = {
  filled: "#FFD700", // Gold color for filled stars
  unfilled: "#C0C0C0", // Silver color for unfilled stars
};

const MyReviewsScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { username } = route.params;
  const [reviewData, setReviewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false }); // Set an empty title for the screen
  }, [navigation]);

  useEffect(() => {
    const getReviews = async () => {
      const { reviews } = await getUserReviews(username);
      setReviewData(reviews);
    };
    getReviews();
  }, [isFocused]);

  const renderReviewItem = ({ item }) => {
    const renderStar = (index) => {
      const isFilled = index < item.rating;
      const starIconName = isFilled ? "star" : "star-o";
      const starColor = isFilled ? STAR_COLORS.filled : STAR_COLORS.unfilled;

      return <FontAwesome name={starIconName} size={16} color={starColor} />;
    };

    const stars = Array.from({ length: 5 }, (_, index) => renderStar(index));

    return (
      <TouchableOpacity
        style={styles.reviewItem}
        onPress={() => handleReviewPress(item)}
      >
        <View style={styles.reviewItemContent}>
          <Text style={styles.reviewItemTitle}>{item.productName}</Text>
          <Text style={styles.reviewItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.reviewItemRating}>{stars}</View>
      </TouchableOpacity>
    );
  };

  const handleReviewPress = (item) => {
    navigation.navigate("MyReview", { review: item });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const { reviews } = await getUserReviews(username);
    setReviewData(reviews);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
        <FontAwesome name="refresh" size={24} color="black" />
      </TouchableOpacity>

      {reviewData.length === 0 ? (
        <Text style={styles.emptyMessage}>
          You haven't added any reviews - go add your first review of a
          plastic-free product!
        </Text>
      ) : (
        <FlatList
          data={reviewData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderReviewItem}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

export default MyReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 8,
  },
  reviewItemContent: {
    flex: 1,
    marginRight: 8,
  },
  reviewItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000",
  },
  reviewItemDescription: {
    fontSize: 14,
    color: "#000000",
  },
  reviewItemRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  refreshButton: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 24,
    color: "#808080",
  },
});
