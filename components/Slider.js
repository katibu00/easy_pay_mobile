import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const SliderComponent = () => {
  const images = [
    require("../assets/banner1.png"),
    require("../assets/banner2.png"),
    // Add more images as needed
  ];

  return (
    <View style={styles.container}>
      {/* Render an individual image for testing
      <Image source={images[0]} style={{ width: 200, height: 200 }} />
      
      {/* Use the SliderBox as before */}
      {/* <SliderBox
        images={images}
        autoplay={true}
        circleLoop={true}
        style={{ width: 200, height: 200 }}
      />  */}
       <SliderBox images={images} autoplay circleLoop dotColor={"#13274F"} inactiveColor={"#90A4AE"} ImageComponentStyle={{ width: "100%" }} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SliderComponent;
