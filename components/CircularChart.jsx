import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import PieChart from "react-native-pie-chart";
import { COLORS } from "../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pastelColors } from "../app/(app)/addNewCategory";

const CircularChart = ({ categories }) => {
  const [values, setValues] = React.useState([1]);
  const [colors, setColors] = React.useState([pastelColors[0]]);

  useEffect(() => {
    if (categories.length === 0) return;
    categories.forEach((category, index) => {
      let total = category.CategoryItems?.reduce(
        (acc, item) => acc + item.cost,
        0
      );
      setValues((prev) => [...prev, total]);
      setColors((prev) => [...prev, pastelColors[index]]);
    });
  }, [categories]);

  const totalEstimate = values.reduce((acc, value) => acc + value, 0);

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
        >{`Total Estimate: $${totalEstimate}`}</Text>
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

        <View
          style={{ flex: 1, justifyContent: "center" }}
        >
          {!categories.length ? (
            <Text style={{ fontSize: hp(1.5), fontFamily: "Outfit-Regular" }}>
              N/A
            </Text>
          ) : (
            categories.map((category, index) => (
              <View
                key={category.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={hp(3)}
                  color={pastelColors[index]}
                />
                <Text
                  style={{ fontSize: hp(1.5), fontFamily: "Outfit-Regular" }}
                >
                  {category.name}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default CircularChart;
