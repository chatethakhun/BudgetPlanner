import { View, Text, TextInput } from "react-native";
import React from "react";

const TextField = ({ onChangeText, value, placeholder, icon }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={{ flex: 1, height: "100%"}}
      />
    </View>
  );
};

export default TextField;
