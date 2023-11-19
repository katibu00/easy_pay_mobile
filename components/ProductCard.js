// ProductCard.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProductCard = ({
  productId,
  image,
  name,
  price,
  duration,
  description,
  discount,
}) => {

  const navigation = useNavigation();
 
  const handleProductPress = (productId, productName) => {
    navigation.navigate('ProductDetails', { productId, productName });
  };
  

  return (
    <TouchableOpacity
      onPress={() => handleProductPress(productId, name)}
      style={styles.card}
    >
      {discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.priceDurationRow}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FEBE10",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    marginTop: 20,
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

export default ProductCard;
