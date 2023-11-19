import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const ProductCategories = () => {
  // Sample product categories data
  const categories = [
    { id: "1", title: "Electronics", image: require("../assets/electronics.png") },
    { id: "2", title: "Clothing", image: require("../assets/clothing.png") },
    { id: "3", title: "Home & Garden", image: require("../assets/home.png") },
    { id: "4", title: "Beauty & Care", image: require("../assets/beauty.png") },
    { id: "5", title: "Sports", image: require("../assets/sports.png") },
    // Add more categories as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
            <Text style={styles.categoryTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: "center",
    
  },
  categoryImage: {
    width: 50, 
    height: 40, 
    borderRadius: 40,
  },
  categoryTitle: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center", // Center the text horizontally
  },
});

export default ProductCategories;
