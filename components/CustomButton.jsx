import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constant/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity
      style={{
        width: wp("100%") - 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 15,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "Outfit-Regular",
          fontSize: hp(2),
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
