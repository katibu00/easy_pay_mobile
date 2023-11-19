import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      {/* Phone Numbers */}
      <View style={styles.phoneNumberContainer}>
        <View style={styles.phoneNumberItem}>
          <Text style={styles.phoneNumber}>+(234) 803 317 4228</Text>
          <Text style={styles.language}>English</Text>
        </View>
        <View style={styles.phoneNumberItem}>
          <Text style={styles.phoneNumber}>+(234) 803 317 4228</Text>
          <Text style={styles.language}>Hausa</Text>
        </View>
        <View style={styles.phoneNumberItem}>
          <Text style={styles.phoneNumber}>+(234) 803 317 4228</Text>
          <Text style={styles.language}>Hausa</Text>
        </View>
      </View>

      {/* WhatsApp Button */}
      <TouchableOpacity style={styles.whatsappButton}>
        <Text style={styles.whatsappButtonText}>WhatsApp Us</Text>
      </TouchableOpacity>

      {/* Social Media Icons */}
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <FontAwesome name="facebook" size={30} color="#1877f2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <FontAwesome name="instagram" size={30} color="#bc2a8d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <MaterialCommunityIcons name="tiktok" size={30} color="#69c9d0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <FontAwesome name="twitter" size={30} color="#1da1f2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  phoneNumberContainer: {
    marginBottom: 20,
  },
  phoneNumberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 18,
  },
  language: {
    fontSize: 16,
    color: "gray",
  },
  whatsappButton: {
    backgroundColor: "#25d366",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  whatsappButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialMediaIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
});

export default ContactUsScreen;
