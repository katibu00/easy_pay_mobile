import React from "react";
import { View, StyleSheet } from "react-native";
import ImageLoad from "react-native-image-placeholder";

const ImageLoader = ({ numRows, numProducts, placeholderSource, loadingStyle }) => {
  const rows = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const products = [];
    for (let productIndex = 0; productIndex < numProducts; productIndex++) {
      products.push(
        <ImageLoad
          style={styles.placeholderCard}
          placeholderSource={placeholderSource}
          loadingStyle={loadingStyle}
          key={productIndex}
        />
      );
    }
    rows.push(
      <View key={rowIndex} style={styles.row}>
        {products}
      </View>
    );
  }

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  placeholderCard: {
    width: 160,
    height: 160,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
});

export default ImageLoader;
