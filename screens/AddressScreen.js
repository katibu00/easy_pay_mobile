import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../components/LoadingModal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  setAddressState,
  setAddressCity,
  setPickupLocation,
  setAddressTown,
  setAddressStreetAddress,
  setAddressLandmark,
  setAddressType,
} from "../redux/CartReducer";

const AddressScreen = () => {
  const dispatch = useDispatch();
  const { addressType, address, productId, paymentMode, paymentDuration } = useSelector((state) => state.cart);


  const [deliveryOption, setDeliveryOption] = useState(addressType || 'pickup');
  const [selectedState, setSelectedState] = useState(address.state || '');
  const [selectedCity, setSelectedCity] = useState(address.city || '');
  const [selectedLocation, setSelectedLocation] = useState(address.pickupLocation || '');
  const [town, setTown] = useState(address.town || '');
  const [streetAddress, setStreetAddress] = useState(address.streetAddress || '');
  const [landmark, setLandmark] = useState(address.landmark || '');

  const [isCityPickerVisible, setCityPickerVisible] = useState(false);
  const [isStatePickerVisible, setStatePickerVisible] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    dispatch(setAddressType('pickup'));
    fetch('https://easypay.intelps.cloud/api/get-locations')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
        const transformedCities = {};
        data.states.forEach((state) => {
          transformedCities[state.name] = {};
          state.cities.forEach((city) => {
            transformedCities[state.name][city.name] = {
              pickupLocations: city.pickup_centers.map((pickupCenter) => pickupCenter.name),
            };
          });
        });
        setCities(transformedCities);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const handleContinue = async () => {

    const errorMessages = [];
  
    if (!selectedState) {
      errorMessages.push('Please select a State.');
    }
    
    if (!selectedCity) {
      errorMessages.push('Please select a City.');
    }
  
    if (deliveryOption === 'pickup' && !selectedLocation) {
      errorMessages.push('Please select a Pickup Location.');
    }
  
    if (deliveryOption === 'doorstep') {
      if (!town) {
        errorMessages.push('Please enter the Town.');
      }
      if (!streetAddress) {
        errorMessages.push('Please enter the Street Address.');
      }
    }
  
    if (errorMessages.length > 0) {
      
      Alert.alert('Error', errorMessages.join('\n'));

    } else {
     
      setIsLoading(true);


      try {
        const userToken = await AsyncStorage.getItem('token');
        const requestData = {
          productId,
          paymentMode,
          paymentDuration,
          addressType: address.addressType,
          city: address.city,
          landmark: address.landmark,
          pickupLocation: address.pickupLocation,
          state: address.state,
          streetAddress: address.streetAddress,
          town: address.town,
        };
      
        const response = await axios.post('https://easypay.intelps.cloud/api/place-order', requestData, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
      
        setIsLoading(false);
      
        if (response.status === 201) {
          Alert.alert('Success', response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            const errorMessages = Object.values(errors).join('\n');
            Alert.alert('Validation Error', errorMessages);
          } else if (error.response.status === 400) {
            const errorMessage = error.response.data.message;
            Alert.alert('Bad Request', errorMessage);
          } else {
            console.log(error);
            Alert.alert('Error', 'An error occurred while communicating with the server.');
          }
        } else {
          console.log(error);
          Alert.alert('Error', 'An error occurred while communicating with the server.');
        }
      }
      
    }
  };
  

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
    dispatch(setAddressType(option));
  };

  const showCityPicker = () => {
    setCityPickerVisible(true);
  };

  const showStatePicker = () => {
    setStatePickerVisible(true);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    dispatch(setAddressState(state));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    dispatch(setAddressCity(city));
  };

  const handlePickupLocationChange = (location) => {
    setSelectedLocation(location);
    dispatch(setPickupLocation(location));
  };

  const handleTownChange = (town) => {
    setTown(town);
    dispatch(setAddressTown(town));
  };

  const handleStreetAddressChange = (address) => {
    setStreetAddress(address);
    dispatch(setAddressStreetAddress(address));
  };

  const handleLandmarkChange = (text) => {
    setLandmark(text);
    dispatch(setAddressLandmark(text));
  };

  const renderPickupLocations = () => {
    if (
      deliveryOption === 'pickup' &&
      selectedCity &&
      cities[selectedState] &&
      cities[selectedState][selectedCity]
    ) {
      const pickupLocations = cities[selectedState][selectedCity].pickupLocations;
      return (
        <View>
          <Text style={styles.subTitle}>Pickup Locations:</Text>
          {pickupLocations.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.radio,
                { backgroundColor: location === selectedLocation ? '#FEBE10' : 'lightgray' },
              ]}
              onPress={() => handlePickupLocationChange(location)}
            >
              <View style={styles.radioCircle}>
                {location === selectedLocation && <View style={styles.selectedRadioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>{location}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: 'white' }]}>Select Delivery Address</Text>
      <View style={styles.deliveryOptions}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            { backgroundColor: deliveryOption === 'pickup' ? '#FEBE10' : 'lightgray' },
          ]}
          onPress={() => handleDeliveryOptionChange('pickup')}
        >
          <Text style={styles.optionButtonText}>PickUp Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            { backgroundColor: deliveryOption === 'doorstep' ? '#FEBE10' : 'lightgray' },
          ]}
          onPress={() => handleDeliveryOptionChange('doorstep')}
        >
          <Text style={styles.optionButtonText}>DoorStep Delivery</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={showStatePicker} style={styles.selectField}>
          <Text style={styles.selectFieldLabel}>
            {selectedState ? `Selected State: ${selectedState}` : 'Select State'}
          </Text>
          <Entypo name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showCityPicker} style={styles.selectField}>
          <Text style={styles.selectFieldLabel}>
            {selectedCity ? `Selected City: ${selectedCity}` : 'Select City'}
          </Text>
          <Entypo name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        {deliveryOption === 'doorstep' && (
          <TextInput
            placeholder="Town"
            value={town}
            onChangeText={(text) => handleTownChange(text)}
            style={styles.input}
          />
        )}
        {renderPickupLocations()}
        {deliveryOption === 'doorstep' && (
          <TextInput
            placeholder="Street Address"
            value={streetAddress}
            onChangeText={(text) => handleStreetAddressChange(text)}
            style={styles.input}
          />
        )}
        {deliveryOption === 'doorstep' && (
          <TextInput
            placeholder="Landmark (Optional)"
            value={landmark}
            onChangeText={(text) => handleLandmarkChange(text)}
            style={styles.input}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: '#FEBE10' }]}
        onPress={handleContinue}
      >
        <Text style={[styles.continueButtonText, { color: 'white' }]}>Place Order</Text>
      </TouchableOpacity>
      <LoadingModal isVisible={isLoading} />
      <Modal isVisible={isCityPickerVisible}>
        <View style={styles.pickerModal}>
          {selectedState && cities[selectedState] && (
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => handleCityChange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select City" value="" />
              {Object.keys(cities[selectedState]).map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          )}
          <TouchableOpacity
            onPress={() => {
              setCityPickerVisible(false);
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isStatePickerVisible}>
        <View style={styles.pickerModal}>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => handleStateChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select State" value="" />
            {states.map((state) => (
              <Picker.Item label={state.name} value={state.name} key={state.id} />
            ))}
          </Picker>
          <TouchableOpacity
            onPress={() => {
              setStatePickerVisible(false);
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deliveryOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  optionButtonText: {
    color: 'white',
  },
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  selectFieldLabel: {
    fontSize: 16,
    color: 'black',
  },
  pickerModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  picker: {
    marginBottom: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  continueButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
  },
});
export default AddressScreen;
