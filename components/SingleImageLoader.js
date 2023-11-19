import React from "react";
import { View, StyleSheet } from "react-native";
import ImageLoad from "react-native-image-placeholder";

const SingleImageLoader = ({ placeholderSource, loadingStyle }) => {
  return (
    <ImageLoad
      style={styles.singleImage}
      placeholderSource={placeholderSource}
      loadingStyle={loadingStyle}
    />
  );
};

const styles = StyleSheet.create({
  singleImage: {
    width: "100%",
    height: "25%",
    borderRadius: 8,
    padding: 10,
  },
});

export default SingleImageLoader;
