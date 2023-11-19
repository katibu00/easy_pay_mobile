import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import ImageLoader from "../components/ImageLoader";

const SeeAllScreen = () => {
  const route = useRoute();
  const categoryId = route.params.categoryId;

  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make API call to fetch combos based on categoryId
    fetch(`https://easypay.intelps.cloud/api/combos-by-category/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCombos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching combos by category:", error);
        setIsLoading(false);
      });
  }, [categoryId]);

  // Split the combos into rows of 2
  const rows = [];
  for (let i = 0; i < combos.length; i += 2) {
    const row = combos.slice(i, i + 2);
    rows.push(row);
  }

  return (
    <>
      <View style={styles.container}>
      </View>
      {isLoading ? (
        <ImageLoader
          numRows={2}
          numProducts={2}
          placeholderSource={require("../assets/placeholder.jpeg")}
          loadingStyle={{ size: "large", color: "#FEBE10" }}
        />
      ) : (
        <View style={styles.container}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((combo) => (
                <ProductCard
                  key={combo.id}
                  productId={combo.id}
                  image={{ uri: `https://easypay.intelps.cloud/uploads/${combo.featured_image}` }}
                  name={combo.title}
                  price={`₦${parseFloat(combo.sale_price).toFixed(2)}`}
                  description={combo.short_description}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default SeeAllScreen;
