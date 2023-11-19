import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Product = ({ image, name, price, duration, description }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.priceDurationRow}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceDurationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 14,
    color: "#FEBE10",
  },
  duration: {
    fontSize: 14,
    color: "gray",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default Product;
