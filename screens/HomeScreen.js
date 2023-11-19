import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import ImageLoader from "../components/ImageLoader";
import { fetchCombos } from "../api/productApi";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetchCombos()
      .then((data) => {
        setCombos(data.combos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching combos:", error);
        setIsLoading(false);
      });
  }, []);

  const createImageURL = (filename) => {
    return `https://easypay.intelps.cloud/uploads/${filename}`;
  };

  // Function to format the price as Naira (₦)
  const formatPriceAsNaira = (price) => {
    const formattedPrice = price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `₦${formattedPrice.replace(".00", "")}`;
  };

  // Split the combos into rows of 2
  const rows = [];
  for (let i = 0; i < combos.length; i += 2) {
    const row = combos.slice(i, i + 2);
    rows.push(row);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
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
                    image={{ uri: createImageURL(combo.featured_image) }}
                    name={combo.title}
                    price={formatPriceAsNaira(parseFloat(combo.sale_price))}
                    description={combo.short_description}
                  />
                ))}
              </View>
            ))}
            {/* Refer and Earn Button */}
            <TouchableOpacity style={styles.referEarnButton}>
              <Text style={styles.referEarnButtonText}>Refer and Earn</Text>
            </TouchableOpacity>

            {/* Become Our Agent Text */}
            <Text style={styles.becomeAgentText}>Become our agent</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  referEarnButton: {
    backgroundColor: "#FEBE10",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 50,
  },
  referEarnButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  becomeAgentText: {
    textAlign: "center",
    color: "#FEBE10",
    fontSize: 14,
    marginTop: 10,
  },
});

export default HomeScreen;
