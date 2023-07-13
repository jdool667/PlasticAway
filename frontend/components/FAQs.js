import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FAQs = () => {
  const navigation = useNavigation();
  const faqsData = [
    {
      question: "What is PlasticAway?",
      answer:
        "PlasticAway is a platform that allows users to search and add reviews for plastic-free products.",
    },
    {
      question: "How can I add a review?",
      answer:
        "To add a review, go to the 'Add Review' screen and fill out the required information about the product and your review.",
    },
    {
      question: "Why is the product link changed on my review?",
      answer:
        "This is so PlasticAway can convert the link to an affiliate link. If the product is not available on a site that supports affiliate links, the same product will be found on a site that does support affiliate links.",
    },
    {
      question: "Why are affiliate links used?",
      answer:
        "PlasticAway uses affiliate links to generate revenue. When a user clicks on an affiliate link, they are redirected to the product's website. If the user makes a purchase, PlasticAway receives a commission which is used to maintain the platform.",
    },
    {
      question: "How can I edit my review?",
      answer: "Go to your review and click the edit button on your review.",
    },
    {
      question: "How can I delete my review?",
      answer: "Go to your review and click the delete button on your review.",
    },
    {
      question: "How can I change my password?",
      answer: "Go to your profile and click the change password button.",
    },
    {
      question: "How can I contact you?",
      answer:
        "Go to your profile and click the contact us button and fill out the form.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account. Go to your profile and click the delete account button.",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        {faqsData.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  faqContainer: {
    marginBottom: 24,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: "#666666",
  },
  backButton: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default FAQs;
