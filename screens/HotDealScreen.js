import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Product from "../components/Product";
import Title from "../components/Title";
import { useNavigation } from "@react-navigation/native";
import ImageLoader from "../components/ImageLoader";
import Header from '../components/Header';

const HotDealScreen = () => {
  const navigation = useNavigation();
  const [categoriesWithCombos, setCategoriesWithCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make API call to fetch categories with combos
    fetch("https://easypay.intelps.cloud/api/categories-with-combos")
      .then((response) => response.json())
      .then((data) => {
        setCategoriesWithCombos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories with combos:", error);
        setIsLoading(false);
      });
  }, []);

  const handleProductPress = (productId, productName) => {
    navigation.navigate("ProductDetails", { productId, productName });
  };

  const handleViewAllPress = (categoryId, categoryName) => {
    navigation.navigate("SeeAll", { categoryId, categoryName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {isLoading ? (
        <ImageLoader
          numRows={2}
          numProducts={2}
          placeholderSource={require("../assets/placeholder.jpeg")}
          loadingStyle={{ size: "large", color: "#FEBE10" }}
        />
      ) : (
        <ScrollView>
          {categoriesWithCombos.map((category) => (
            <View key={category.id}>
              <Title
                title={category.name}
                backgroundColor="#FEBE10"
                textColor="white"
                onViewAllPress={() =>
                  handleViewAllPress(category.id, category.name)
                }
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {category.combos.map((combo) => (
                  <TouchableOpacity
                    key={combo.id}
                    onPress={() => handleProductPress(combo.id, combo.title)}
                  >
                    <Product
                      image={{
                        uri: `https://easypay.intelps.cloud/uploads/${combo.featured_image}`,
                      }}
                      name={combo.title}
                      price={`₦${parseFloat(combo.sale_price).toFixed(2)}`}
                      description={combo.short_description}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HotDealScreen;
