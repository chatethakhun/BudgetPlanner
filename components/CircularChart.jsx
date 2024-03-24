import { View, Text, Pressable } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";
import { COLORS } from "../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CircularChart = () => {
  const [values, setValues] = React.useState([1]);
  const [colors, setColors] = React.useState([COLORS.primary]);
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        elevation: 1,
      }}
    >
      <View>
        <Text
          style={{ fontSize: hp(2), fontFamily: "Outfit-Bold" }}
        >{`Total Estimate: 0$`}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <PieChart
          widthAndHeight={150}
          series={values}
          sliceColor={colors}
          coverFill={"#fff"}
          coverRadius={0.65}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={hp(3)}
            color={COLORS.grey}
          />
          <Text style={{ fontSize: hp(1.5), fontFamily: "Outfit-Regular" }}>
            N/A
          </Text>
        </View>

        
      </View>
    </View>
  );
};

export default CircularChart;
