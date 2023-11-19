import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import SingleImageLoader from "../components/SingleImageLoader";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchComboDetails } from "../api/productApi";
import { useDispatch } from "react-redux";
import { setProductId, setPaymentMode, setPaymentDuration, clearCart } from "../redux/CartReducer";
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();



  const [comboDetails, setComboDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("weekly");
  const [selectedDuration, setSelectedDuration] = useState("30 days");
  const [durationOptions, setDurationOptions] = useState([]);
  const [selectedPaymentFrequency, setSelectedPaymentFrequency] = useState("daily");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [userSignedIn, setUserSignedIn] = useState(false);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();


  const handlePaymentModeSelect = (method) => {
    dispatch(setPaymentMode(method.toLowerCase()));
  
    dispatch(setProductId(productId));
  };

  const formatPriceAsNaira = (price) => {
    if (price !== null && price !== undefined) {
      const formattedPrice = price.toLocaleString("en-US", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      });
      return formattedPrice.replace("NGN", "₦").replace(".00", "");
    }
    return "";
  };

  const renderIndividualProduct = ({ item }) => (
    <View style={styles.individualProduct}>
      <Image
        source={{ uri: item.featured_image.image_path }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.title}</Text>
      <TouchableOpacity style={styles.moreDetailsButton}>
        <Text style={styles.moreDetailsText}>More Details</Text>
      </TouchableOpacity>
    </View>
  );

  const handleContinue = () => {
    if (userSignedIn) {
      navigation.navigate("AddressScreen");
    } else {
      navigation.navigate("Login");
    }
  };


  const createImageURL = (filename) => {
    return `https://easypay.intelps.cloud/uploads/${filename}`;
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setIsDurationModalVisible(false);
          dispatch(setPaymentDuration(duration));

  };

  const calculatePaymentAmount = () => {
    if (selectedDuration && selectedPaymentMethod) {
      const selectedCombo = comboDetails;

      if (selectedPaymentMethod === "daily") {
        if (selectedDuration.includes("30 days")) {
          return selectedCombo.price_30;
        }
        else if (selectedDuration.includes("60 days")) {
          return selectedCombo.price_60;
        }
        else if (selectedDuration.includes("90 days")) {
          return selectedCombo.price_90;
        }
      } else if (selectedPaymentMethod === "weekly") {
        if (selectedDuration.includes("30 days")) {
          return selectedCombo.price_30 * 7;
        }
        else if (selectedDuration.includes("60 days")) {
          return selectedCombo.price_60 * 7;
        }
        else if (selectedDuration.includes("90 days")) {
          return selectedCombo.price_90 * 7;
        }
      }
    }

    return 0;
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method.toLowerCase());
    setSelectedPaymentFrequency(method === "daily" ? "daily" : "weekly");
    const paymentAmount = calculatePaymentAmount();
    setPaymentAmount(paymentAmount);
    setIsPaymentModalVisible(false);
    dispatch(setPaymentMode(method));
  };
  // const cartItems = useSelector((state) => state.cart);

  useEffect(() => {

    dispatch(clearCart());
    dispatch(setPaymentMode("Weekly"));
    dispatch(setPaymentDuration("30 days"));
    dispatch(setProductId(productId));

    const checkUserSignInStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
      
        if (userData) {
          setUserSignedIn(true);
        } else {
          setUserSignedIn(false);
        }
      } catch (error) {
        console.error('Error checking sign-in status:', error);
      }
    };

    checkUserSignInStatus();

    // console.log("Cart Items:", cartItems);

    fetchComboDetails(productId)
      .then((data) => {
        data.combo.featured_image = createImageURL(data.combo.featured_image);
        data.combo.products.forEach((product) => {
          product.featured_image.image_path = createImageURL(
            product.featured_image.image_path
          );
        });

        setComboDetails(data.combo);
        setIsLoading(false);

        const durationOptions = [
          {
            label: `30 days - ${formatPriceAsNaira(data.combo.price_30)}`,
            value: "30 days",
          },
          {
            label: `60 days - ${formatPriceAsNaira(data.combo.price_60)}`,
            value: "60 days",
          },
          {
            label: `90 days - ${formatPriceAsNaira(data.combo.price_90)}`,
            value: "90 days",
          },
          {
            label: `125 days - ${formatPriceAsNaira(data.combo.price_125)}`,
            value: "125 days",
          },
        ];

        setDurationOptions(durationOptions);
        setSelectedDuration(durationOptions[0].value);
      })
      .catch((error) => {
        console.error("Error fetching combo details:", error);
        setIsLoading(false);
      });
  }, [dispatch, productId]);

  return (
    <>
      {isLoading ? (
        <SingleImageLoader
          placeholderSource={require("../assets/placeholder.jpeg")}
          loadingStyle={{ size: "large", color: "#FEBE10" }}
        />
      ) : comboDetails ? (
        <View style={styles.container}>
          <FlatList
            data={comboDetails.products}
            renderItem={renderIndividualProduct}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={
              <>
                <Image
                  source={{ uri: comboDetails.featured_image }}
                  style={styles.comboImage}
                />
                <Text style={styles.comboName}>{comboDetails.title}</Text>
                <Text style={styles.comboPrice}>
                  {formatPriceAsNaira(parseFloat(comboDetails.sale_price))}
                </Text>
                <Text style={styles.comboDescription}>
                  {comboDetails.long_description ? (
                    <HTML
                      source={{ html: comboDetails.long_description }}
                      contentWidth={width}
                    />
                  ) : (
                    ""
                  )}
                </Text>
                {comboDetails.combo_terms ? (
                  <>
                    <Text style={styles.termsTitle}>Terms and Conditions</Text>
                    <Text style={styles.comboTerms}>
                      <HTML
                        source={{ html: comboDetails.combo_terms }}
                        contentWidth={width}
                      />
                    </Text>
                  </>
                ) : null}
              </>
            }
            ListFooterComponent={
              <>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setIsPaymentModalVisible(true)}
                >
                  <Text style={styles.paymentDurationLabel}>
                    Payment Method
                  </Text>
                  <View style={styles.pickerInnerContainer}>
                    <Text style={styles.selectedValue}>
                      {selectedPaymentMethod}
                    </Text>
                    <Entypo name="chevron-down" size={20} color="#000" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setIsDurationModalVisible(true)}
                >
                  <Text style={styles.paymentDurationLabel}>Duration</Text>
                  <View style={styles.pickerInnerContainer}>
                    <Text style={styles.selectedValue}>{selectedDuration}</Text>
                    <Entypo name="chevron-down" size={20} color="#000" />
                  </View>
                </TouchableOpacity>

                <View style={styles.paymentInfoContainer}>
                  <Text style={styles.paymentInfoText}>
                    {selectedDuration &&
                      `You are going to pay ${formatPriceAsNaira(
                        calculatePaymentAmount()
                      )} ${selectedPaymentMethod}`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </>
            }
          />
          <Modal isVisible={isPaymentModalVisible}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => handlePaymentMethodSelect("Daily")}
              >
                <Text style={styles.modalOption}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePaymentMethodSelect("Weekly")}
              >
                <Text style={styles.modalOption}>Weekly</Text>
              </TouchableOpacity>
              {/* Add more payment method options as needed */}
              <TouchableOpacity onPress={() => setIsPaymentModalVisible(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Modal for Duration - Render the dynamic options */}
          <Modal isVisible={isDurationModalVisible}>
            <View style={styles.modalContainer}>
              {durationOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleDurationSelect(option.value)}
                >
                  <Text style={styles.modalOption}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setIsDurationModalVisible(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comboImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  comboName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 5,
  },
  comboDescription: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 5,
  },
  comboPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 5,
    color: "#FEBE10",
  },
  comboTerms: {
    fontSize: 14,
    color: "gray",
    marginBottom: 16,
    marginLeft: 5,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 5,
  },
  individualProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 8,
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  moreDetailsButton: {
    backgroundColor: "#FEBE10",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  moreDetailsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
  },
  pickerInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
  pickerContainer: {
    marginHorizontal: 5,
  },

  selectedValue: {
    fontSize: 16,
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
  continueButton: {
    backgroundColor: "#FEBE10",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 50,
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  paymentInfoContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  paymentInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductDetailsScreen;
