import { View, Text, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../constant/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TextField = ({
  onChangeText,
  value,
  placeholder,
  icon,
  keyboardType = "default",
  numberOfLines = 1,
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        height: numberOfLines * 50,
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
      {icon && (
        <View style={{ width: wp(5), alignItems: "center", justifyContent: "flex-start" }}>{icon}</View>
      )}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={{
          height: numberOfLines * 50,
          fontFamily: "Outfit-Regular",
          fontSize: hp(1.85),
          textAlign: "justify",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        multiline={numberOfLines > 1}
      />
    </View>
  );
};

export default TextField;
