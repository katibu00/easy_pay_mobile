import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    setIsLoading(true);
  
    try {
      const apiUrl = 'https://easypay.intelps.cloud/api/login';
      const response = await axios.post(apiUrl, {
        email_or_phone: values.email,
        password: values.password,
      });
      setIsLoading(false);

      if (response.data.success) {
        // Store the token and user data in AsyncStorage
        await AsyncStorage.setItem('token', response.data.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  
        navigation.navigate('Home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
  
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          const errorMessage = Object.values(validationErrors).join('\n');
          Keyboard.dismiss();
          alert(errorMessage);
        } else if (error.response.status === 401) {
          alert(error.response.data.message || 'Invalid email or password. Please try again.');
        } else {
          console.error('Login error:', error);
        }
      } else {
        console.error('Login error:', error);
      }
  
      setIsLoading(false);
    }
  };
  

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior="position"
          >
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.jpg")}
              />
              <Text style={styles.appName}>EasyPay</Text>
              <Text style={styles.subHeading}>Login to Your Account</Text>
            </View>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <View>
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="email"
                      size={24}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      placeholder="Email Address"
                      placeholderTextColor="gray"
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="lock1"
                      size={24}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Password"
                      placeholderTextColor="gray"
                    />
                  </View>

                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={styles.registerLink}
                  >
                    <Text style={styles.registerText}>
                      Don't have an account? Register
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <LoadingModal isVisible={isLoading} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 0,
  },
  subHeading: {
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "gray",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    color: "gray",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});


export default LoginScreen;
