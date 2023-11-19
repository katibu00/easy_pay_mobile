import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const sampleNotifications = [
  {
    id: "1",
    title: "New Message",
    description: "You have a new message from Faruk FK.",
  },
  {
    id: "2",
    title: "Discount Alert",
    description: "Exclusive discount on selected items!",
  },
  {
    id: "3",
    title: "Reminder",
    description: "Don't forget to complete your profile.",
  },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>

      <FlatList
        data={sampleNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
  },
});

export default NotificationScreen;
