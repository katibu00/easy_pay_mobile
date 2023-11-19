import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Product from "./Product";
import Title from "./Title"; // Import the Title component
import { useNavigation } from "@react-navigation/native";

const FoodStuffsSection = () => {
  const navigation = useNavigation();

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleViewAllPress = (categoryId) => {
    navigation.navigate("SeeAll", { categoryId });
  };

  const products = [
    {
      id: 1,
      image: require("../assets/product1.jpeg"),
      name: "Product 1",
      price: "$10",
      duration: "1 month",
      description: "1 bag of rice + 3Ltrs of oil",
    },
    {
      id: 2,
      image: require("../assets/product2.png"),
      name: "Product 2",
      price: "$15",
      duration: "2 months",
      description: "2 bags of rice + 5Ltrs of oil",
    },
    {
      id: 3,
      image: require("../assets/product3.jpeg"),
      name: "Product 3",
      price: "$8",
      duration: "1 week",
      description: "1 bag of flour",
    },
  ];

  return (
    <View style={styles.container}>
      <Title title="Food Stuffs" backgroundColor="#FEBE10" textColor="white" onViewAllPress={() => handleViewAllPress(5)} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => handleProductPress(product.id)}
          >
            <Product
              image={product.image}
              name={product.name}
              price={product.price}
              duration={product.duration}
              description={product.description}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
  },
});

export default FoodStuffsSection;
