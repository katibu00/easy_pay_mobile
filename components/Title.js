import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Title = ({ title, backgroundColor, textColor, onViewAllPress }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={onViewAllPress}
      >
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAllButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FEBE10",
  },
});
export default Title;
