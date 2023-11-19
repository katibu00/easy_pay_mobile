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

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    setIsLoading(true);

    try {
      const apiUrl = "https://easypay.intelps.cloud/api/register";
      const response = await axios.post(apiUrl, values);
      setIsLoading(false);
      Alert.alert(
        'Registration Successful',
        'You have successfully registered. Click OK to go to the login screen.',
        [
          {
            text: 'OK',
            onPress: () => {
             
              navigation.navigate('Login');
            },
          },
        ]
      );
      
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        const errorMessage = Object.values(validationErrors).join("\n");
        Keyboard.dismiss();
        alert(errorMessage);
        setIsLoading(false);
      } else {
        console.error("Registration error:", error);
        setIsLoading(false);
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Invalid name format"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{11}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
              <Text style={styles.subHeading}>
                Create an Account to Get Started
              </Text>
            </View>

            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <View>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="user"
                      size={24}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      placeholder="Full Name"
                      placeholderTextColor="gray"
                      autoCapitalize="words"
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}

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
                      name="phone"
                      size={24}
                      color="black"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      placeholder="Phone Number"
                      placeholderTextColor="gray"
                      keyboardType="phone-pad"
                    />
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
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
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      placeholder="Confirm Password"
                      placeholderTextColor="gray"
                    />
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginLink}
                  >
                    <Text style={styles.loginText}>
                      Already have an Account? Login
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
  registerButton: {
    width: "100%",
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 15,
    alignItems: "center",
  },
  loginText: {
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

export default RegisterScreen;
