import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { searchReviews } from "./api/addReview";
import { getReviews } from "./api/getReview";

const STAR_COLORS = {
  filled: "#FFD700", // Gold color for filled stars
  unfilled: "#C0C0C0", // Silver color for unfilled stars
};

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const username = route.params.username;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "", headerShown: false }); // Set an empty title for the screen
  }, [navigation]);

  const handleSearch = async () => {
    if (!searchQuery) {
      alert("Please enter a search query");
      return;
    }

    setIsSearched(true);

    const search = {
      username,
      searchQuery,
    };

    const results = await searchReviews(search);

    if (results.error) {
      alert("There was an error searching for reviews");
      console.log(results.error);
      return;
    }

    setSearchResults(results.reviews);
  };

  useEffect(() => {
    const getAllResults = async () => {
      const results = await getReviews(username);

      if (results.error) {
        alert("There was an error getting reviews");
        console.log(results.error);
        return;
      }
      setSearchResults(results.reviews);
    };

    if (isFocused && !isSearched) {
      getAllResults();
    }
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
    navigation.navigate("UserReview", { review: item });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search reviews"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <ScrollView>
        {searchResults && searchResults.length === 0 ? (
          isSearched ? (
            <Text style={styles.emptyMessage}>No results found</Text>
          ) : null // Render nothing if searchResults is undefined or null
        ) : (
          searchResults &&
          searchResults.map((item) => renderReviewItem({ item }))
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 64,
  },
  searchBar: {
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF", // White background color
    color: "#000000", // Black text color
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
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 24,
    color: "#808080",
  },
});
