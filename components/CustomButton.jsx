import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constant/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomButton = ({ onPress, label, loading }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 15,
      }}
      onPress={onPress}
    >
      {!loading ? <Text
        style={{
          color: "white",
          fontFamily: "Outfit-Regular",
          fontSize: hp(2),
        }}
      >
        {label}
      </Text> : <ActivityIndicator  color="white" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
