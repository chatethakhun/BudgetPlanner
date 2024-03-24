import { View, Text, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../constant/theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const TextField = ({
  onChangeText,
  value,
  placeholder,
  icon,
  keyboardType = "default",
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 2,
        borderColor: COLORS.grey,
        elevation: 1,
      }}
    >
      <View style={{ width: wp(5), alignItems: "center" }}>{icon}</View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={{ flex: 1, height: "100%", fontFamily: "Outfit-Regular", fontSize: hp(1.85) }}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default TextField;
