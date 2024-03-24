import { View, Text, Pressable } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constant/theme";

const ColorPicker = ({ colorsOptions = [1, 2], colorSelected, onChange }) => {
  return (
    <View
      style={{ width: "100%", flexDirection: "row", justifyContent: "center" }}
    >
      {colorsOptions.map((color, index) => (
        <Pressable key={index} onPress={() => onChange(color)}>
          <View
            style={{
              height: 30,
              aspectRatio: 1,
              backgroundColor: color,
              borderRadius: 100,
              margin: 5,
              borderWidth: colorSelected === color ? 2 : 0,
              borderColor:
                colorSelected === color ? COLORS.darkGrey : "transparent",
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ColorPicker;
