import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingleImageLoader from "../components/SingleImageLoader";

const CombosScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const createImageURL = (filename) => {
    return `https://easypay.intelps.cloud/uploads/${filename}`;
  };

  const fetchData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");

      if (!userToken) {
        return;
      }

      const response = await axios.get(
        "https://easypay.intelps.cloud/api/orders",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.orders) {
        setData(response.data.orders);
        setIsLoading(false);
      } else {
        console.log(
          "Data structure does not match expectations:",
          response.data
        );
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        navigation.navigate("Login");
      } else {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      fetchData();
    });

    return focusListener;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ComboDetails", { comboId: item.id })}
    >
      <Image
        source={{ uri: createImageURL(item.combo.featured_image) }}
        style={styles.comboImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.comboTitle}>{item.combo.title}</Text>
        <Text style={styles.paymentInfo}>
          {item.payment_duration} - {item.payment_mode}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={{
              width: `${item.progress}%`,
              backgroundColor: "#FEBE10",
              height: 10,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SingleImageLoader
          placeholderSource={require("../assets/placeholder.jpeg")}
          loadingStyle={{ size: "large", color: "#FEBE10" }}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginHorizontal: 10,
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  comboImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  comboTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentInfo: {
    fontSize: 14,
    color: "gray",
  },
  progressBar: {
    marginTop: 8,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
});

export default CombosScreen;
